const express = require('express')
const router = express.Router()

module.exports = (query) => {

    router.post('/postExpenses/:login', async (req, res) => {
        const id = req.params.login;
        const { expenseList } = req.body;
    
        try {
            // Insert main expense data into td_expenses table
            const expense_data = await query(`INSERT INTO td_expenses (date_created, login_id) VALUES ('${expenseList[0].date}', ${id})`);
            const expense_id = expense_data.insertId;
    
            for (const expenseItem of expenseList) {
                const { type, is_operating, expense } = expenseItem;
    
                for (const exp of expense) {
                    const { name, description, expense_date, amount } = exp;
                    let table = is_operating ? 'td_operating_expense' : 'td_nonoperating_expense';
    
                    // Insert expense data into the respective table
                    await query(`INSERT INTO ${table} (name, description, expense_date, amount, expense_id) 
                                 VALUES ('${name}', '${description}', '${expense_date}', '${amount}', ${expense_id})`);
                }
            }
    
            res.status(200).json({ message: 'Data successfully posted' });
        } catch (error) {
            console.error('Error: ', error);
            res.status(400).json({ message: `Error... Failed one or more database operations... ${error}` });
        }
    });

    router.get('/getExpenses', async (req, res) => {
        try {const data = await query(` SELECT 
                                            expense_id, 
                                            login_id, 
                                            date_created, 
                                            login_name, 
                                            SUM(amount) AS totalAmount
                                        FROM(
                                            SELECT 
                                                e.expense_id, 
                                                e.login_id, 
                                                e.date_created, 
                                                CONCAT(l.last_name, ', ', l.first_name) AS login_name, 
                                                ne.amount AS amount
                                            FROM td_expenses e
                                            JOIN md_login l ON e.login_id = l.login_id
                                            JOIN td_nonoperating_expense ne ON e.expense_id = ne.expense_id
                                            UNION ALL
                                            SELECT 
                                                e.expense_id, 
                                                e.login_id, 
                                                e.date_created, 
                                                CONCAT(l.last_name, ', ', l.first_name) AS login_name, 
                                                oe.amount
                                            FROM td_expenses e
                                            JOIN md_login l ON e.login_id = l.login_id
                                            JOIN td_operating_expense oe ON e.expense_id = oe.expense_id
                                        ) AS subquery
                                        GROUP BY expense_id, login_id, date_created, login_name
                                        ORDER BY date_created DESC;
                                        `, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getYearExpenses', async (req, res) => {
        try {const data = await query(` SELECT DISTINCT YEAR(date_created) AS year FROM td_expenses ORDER by year DESC;
                                        `, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getExpenseDetails/:id', async (req, res) => {
        try {
            const { id } = req.params
            const q =  `SELECT 
                            expense_id, 
                            login_id, 
                            date_created, 
                            login_name, 
                            SUM(amount) AS totalAmount
                        FROM(
                            SELECT 
                                e.expense_id, 
                                e.login_id, 
                                e.date_created, 
                                CONCAT(l.last_name, ', ', l.first_name) AS login_name, 
                                ne.amount AS amount
                            FROM td_expenses e
                            JOIN md_login l ON e.login_id = l.login_id
                            JOIN td_nonoperating_expense ne ON e.expense_id = ne.expense_id
                            WHERE e.expense_id = ?
                            UNION ALL
                            SELECT 
                                e.expense_id, 
                                e.login_id, 
                                e.date_created, 
                                CONCAT(l.last_name, ', ', l.first_name) AS login_name, 
                                oe.amount
                            FROM td_expenses e
                            JOIN md_login l ON e.login_id = l.login_id
                            JOIN td_operating_expense oe ON e.expense_id = oe.expense_id
                            WHERE e.expense_id = ?
                        ) AS subquery
                        GROUP BY expense_id, login_id, date_created, login_name
                        ORDER BY date_created DESC;`
            const data = await query(q, [id, id])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getOperatingExpenses/:id', async (req, res) => {
        try {
            const { id } = req.params
            const q =  `SELECT *
                        FROM td_operating_expense
                        WHERE expense_id = ?`
            const data = await query(q, [id])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getNonOperatingExpenses/:id', async (req, res) => {
        try {
            const { id } = req.params
            const q =  `SELECT *
                        FROM td_nonoperating_expense
                        WHERE expense_id = ?`
            const data = await query(q, [id])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

   
    router.delete('/deleteExpenses/:id', async (req, res) => {
        try {
            const { id } = req.params;
    
            // Delete from td_nonoperating_expense
            await query('DELETE FROM td_nonoperating_expense WHERE expense_id = ?', [id]);
    
            // Delete from td_operating_expense
            await query('DELETE FROM td_operating_expense WHERE expense_id = ?', [id]);
    
            // Delete from td_expenses
            await query('DELETE FROM td_expenses WHERE expense_id = ?', [id]);
    
            res.status(200).json({ message: 'Expense deleted successfully' });
        } catch (error) {
            console.error('Error deleting expense:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    //REPORT GENERATION ROUTES

    //Sales Report
    router.get('/getReportSalesTotal/:syear/:smonth/:sday/:eyear/:emonth/:eday', async (req, res) => {
        try {
            const { syear, smonth, sday, eyear, emonth, eday } = req.params;
    
            // Format the start and end dates for SQL query
            const startDate = `${syear}-${smonth.padStart(2, '0')}-${sday.padStart(2, '0')}`;
            const endDate = `${eyear}-${emonth.padStart(2, '0')}-${eday.padStart(2, '0')}`;
    
            const q = `SELECT SUM(total) AS total
                    FROM (
                        SELECT s.date_created, (qp.discounted_price_each*qp.quantity) AS total
                        FROM td_quotations q
                        JOIN td_sales s ON q.sales_id = s.sales_id
                        JOIN md_quotation_parts qp ON q.quotation_id = qp.quotation_id
                    
                        UNION ALL
                    
                        SELECT s.date_created, (qp.discounted_price_each*qp.quantity) AS total
                        FROM td_quotations q
                        JOIN td_sales s ON q.sales_id = s.sales_id
                        JOIN md_quotation_products qp ON q.quotation_id = qp.quotation_id
                    
                        UNION ALL
                        
                        SELECT s.date_created, (qs.discounted_price_each*qs.quantity) AS total
                        FROM td_quotations q
                        JOIN td_sales s ON q.sales_id = s.sales_id
                        JOIN md_quotation_services qs ON q.quotation_id = qs.quotation_id
                ) AS combined_data
                WHERE date_created >= ? AND date_created <= ?`;
    
            const data = await query(q, [startDate, endDate]);
            console.log(data);
            res.send(data);
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    });

    router.get('/getReportSalesProducts/:syear/:smonth/:sday/:eyear/:emonth/:eday', async (req, res) => {
        try {
            const { syear, smonth, sday, eyear, emonth, eday } = req.params;
    
            // Format the start and end dates for SQL query
            const startDate = `${syear}-${smonth.padStart(2, '0')}-${sday.padStart(2, '0')}`;
            const endDate = `${eyear}-${emonth.padStart(2, '0')}-${eday.padStart(2, '0')}`;
    
            const q = `SELECT *
            FROM (
                SELECT
                    1 AS type,
                    p.product_id,
                    CONCAT(
                        p.product_hp,
                        ' HP ',
                        UPPER(p.product_type),
                        ' TYPE ',
                        CASE
                            WHEN p.is_inverter = 1 THEN 'INVERTER'
                            WHEN p.is_inverter = 0 THEN 'NON-INVERTER'
                        END,
                        ' (',
                        p.unit_model,
                        ')'
                    ) AS description,
                    AVG(qp.discounted_price_each) AS average_amount,
                    SUM(qp.quantity * qp.discounted_price_each) AS revenue,
                    SUM(qp.quantity) AS units
                FROM
                    md_quotation_products qp
                JOIN md_products p ON p.product_id = qp.product_id
                JOIN td_quotations q ON q.quotation_id = qp.quotation_id
                JOIN td_sales s ON s.sales_id = q.sales_id
                WHERE
                    ? <= s.date_created
                    AND s.date_created <= ?
                    AND p.product_type = 'window'
                GROUP BY
                    p.product_id
                UNION ALL
                SELECT
                    2 AS type,
                    p.product_id,
                    CONCAT(
                        p.product_hp,
                        ' HP ',
                        UPPER(p.product_type),
                        ' TYPE ',
                        CASE
                            WHEN p.is_inverter = 1 THEN 'INVERTER'
                            WHEN p.is_inverter = 0 THEN 'NON-INVERTER'
                        END,
                        ' (',
                        p.unit_model,
                        ')'
                    ) AS description,
                    AVG(qp.discounted_price_each) AS average_amount,
                    SUM(qp.quantity * qp.discounted_price_each) AS revenue,
                    SUM(qp.quantity) AS units
                FROM
                    md_quotation_products qp
                JOIN md_products p ON p.product_id = qp.product_id
                JOIN td_quotations q ON q.quotation_id = qp.quotation_id
                JOIN td_sales s ON s.sales_id = q.sales_id
                WHERE
                    ? <= s.date_created
                    AND s.date_created <= ?
                    AND p.product_type = 'split'
                GROUP BY
                    p.product_id
                UNION ALL
                SELECT
                    3 AS type,
                    p.parts_id,
                    CONCAT(p.description, ' (', p.name, ')') AS description,
                    AVG(qp.discounted_price_each) AS average_amount,
                    SUM(qp.quantity * qp.discounted_price_each) AS revenue,
                    SUM(qp.quantity) AS units
                FROM
                    md_quotation_parts qp
                JOIN md_parts p ON p.parts_id = qp.parts_id
                JOIN td_quotations q ON q.quotation_id = qp.quotation_id
                JOIN td_sales s ON s.sales_id = q.sales_id
                WHERE
                    ? <= s.date_created
                    AND s.date_created <= ?
                GROUP BY
                    p.parts_id
                UNION ALL
                SELECT
                    4 AS type,
                    p.services_id,
                    p.description,
                    AVG(qp.discounted_price_each) AS average_amount,
                    SUM(qp.quantity * qp.discounted_price_each) AS revenue,
                    SUM(qp.quantity) AS units
                FROM
                    md_quotation_services qp
                JOIN md_services p ON p.services_id = qp.services_id
                JOIN td_quotations q ON q.quotation_id = qp.quotation_id
                JOIN td_sales s ON s.sales_id = q.sales_id
                WHERE
                    ? <= s.date_created
                    AND s.date_created <= ?
                GROUP BY
                    p.services_id
            ) AS combined_data
            ORDER BY type, revenue DESC
            `;
    
            const data = await query(q, [startDate, endDate,startDate, endDate, startDate, endDate, startDate, endDate]);
            console.log(data);
            res.send(data);
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    });


    //Detailed Sales Report


    router.get('/getDetailedReportSalesProductsTotal/:id/:syear/:smonth/:sday/:eyear/:emonth/:eday', async (req, res) => {
        try {
            const { id, syear, smonth, sday, eyear, emonth, eday } = req.params;
    
            // Format the start and end dates for SQL query
            const startDate = `${syear}-${smonth.padStart(2, '0')}-${sday.padStart(2, '0')}`;
            const endDate = `${eyear}-${emonth.padStart(2, '0')}-${eday.padStart(2, '0')}`;
    
            const q = `SELECT SUM(qp.discounted_price_each*qp.quantity) AS total
                        FROM td_quotations q
                        JOIN td_sales s ON q.sales_id = s.sales_id
                        JOIN md_quotation_products qp ON q.quotation_id = qp.quotation_id
                        WHERE
                            ? <= s.date_created
                            AND s.date_created <= ?
                            AND qp.product_id = ?
                        `;
    
            const data = await query(q, [startDate, endDate, id]);
            console.log(data);
            res.send(data);
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    });

    router.get('/getDetailedReportSalesProducts/:id/:syear/:smonth/:sday/:eyear/:emonth/:eday', async (req, res) => {
        try {
            const { id, syear, smonth, sday, eyear, emonth, eday } = req.params;
    
            // Format the start and end dates for SQL query
            const startDate = `${syear}-${smonth.padStart(2, '0')}-${sday.padStart(2, '0')}`;
            const endDate = `${eyear}-${emonth.padStart(2, '0')}-${eday.padStart(2, '0')}`;
    
            const q = `SELECT
                            s.sales_id,
                            s.date_created,
                            p.product_id,
                            CONCAT(
                                p.product_hp,
                                ' HP ',
                                UPPER(p.product_type),
                                ' TYPE ',
                                CASE
                                    WHEN p.is_inverter = 1 THEN 'INVERTER'
                                    WHEN p.is_inverter = 0 THEN 'NON-INVERTER'
                                END,
                                ' (',
                                p.unit_model,
                                ')'
                            ) AS description,
                            qp.discounted_price_each,
                            (qp.quantity * qp.discounted_price_each) AS revenue,
                            qp.quantity
                        FROM
                            md_quotation_products qp
                        JOIN md_products p ON p.product_id = qp.product_id
                        JOIN td_quotations q ON q.quotation_id = qp.quotation_id
                        JOIN td_sales s ON s.sales_id = q.sales_id
                        WHERE
                            ? <= s.date_created
                            AND s.date_created <= ?
                            AND p.product_id = ?
            `;
    
            const data = await query(q, [startDate, endDate, id]);
            console.log(data);
            res.send(data);
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    });

    router.get('/getDetailedReportSalesPartsTotal/:id/:syear/:smonth/:sday/:eyear/:emonth/:eday', async (req, res) => {
        try {
            const { id, syear, smonth, sday, eyear, emonth, eday } = req.params;
    
            // Format the start and end dates for SQL query
            const startDate = `${syear}-${smonth.padStart(2, '0')}-${sday.padStart(2, '0')}`;
            const endDate = `${eyear}-${emonth.padStart(2, '0')}-${eday.padStart(2, '0')}`;
    
            const q = `SELECT SUM(qp.discounted_price_each*qp.quantity) AS total
                        FROM td_quotations q
                        JOIN td_sales s ON q.sales_id = s.sales_id
                        JOIN md_quotation_parts qp ON q.quotation_id = qp.quotation_id
                        WHERE
                            ? <= s.date_created
                            AND s.date_created <= ?
                            AND qp.parts_id = ?
                        `;
    
            const data = await query(q, [startDate, endDate, id]);
            console.log(data);
            res.send(data);
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    });

    router.get('/getDetailedReportSalesParts/:id/:syear/:smonth/:sday/:eyear/:emonth/:eday', async (req, res) => {
        try {
            const { id, syear, smonth, sday, eyear, emonth, eday } = req.params;
    
            // Format the start and end dates for SQL query
            const startDate = `${syear}-${smonth.padStart(2, '0')}-${sday.padStart(2, '0')}`;
            const endDate = `${eyear}-${emonth.padStart(2, '0')}-${eday.padStart(2, '0')}`;
    
            const q = `SELECT
                            s.sales_id,
                            s.date_created,
                            p.parts_id,
                            CONCAT(
                                p.description, ' (', p.name, ')'
                            ) AS description,
                            qp.discounted_price_each,
                            (qp.quantity * qp.discounted_price_each) AS revenue,
                            qp.quantity
                        FROM
                            md_quotation_parts qp
                        JOIN md_parts p ON p.parts_id = qp.parts_id
                        JOIN td_quotations q ON q.quotation_id = qp.quotation_id
                        JOIN td_sales s ON s.sales_id = q.sales_id
                        WHERE
                            ? <= s.date_created
                            AND s.date_created <= ?
                            AND p.parts_id = ?
            `;
    
            const data = await query(q, [startDate, endDate, id]);
            console.log(data);
            res.send(data);
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    });

    router.get('/getDetailedReportSalesServicesTotal/:id/:syear/:smonth/:sday/:eyear/:emonth/:eday', async (req, res) => {
        try {
            const { id, syear, smonth, sday, eyear, emonth, eday } = req.params;
    
            // Format the start and end dates for SQL query
            const startDate = `${syear}-${smonth.padStart(2, '0')}-${sday.padStart(2, '0')}`;
            const endDate = `${eyear}-${emonth.padStart(2, '0')}-${eday.padStart(2, '0')}`;
    
            const q = `SELECT SUM(qp.discounted_price_each*qp.quantity) AS total
                        FROM td_quotations q
                        JOIN td_sales s ON q.sales_id = s.sales_id
                        JOIN md_quotation_services qp ON q.quotation_id = qp.quotation_id
                        WHERE
                            ? <= s.date_created
                            AND s.date_created <= ?
                            AND qp.services_id = ?
                        `;
    
            const data = await query(q, [startDate, endDate, id]);
            console.log(data);
            res.send(data);
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    });

    router.get('/getDetailedReportSalesServices/:id/:syear/:smonth/:sday/:eyear/:emonth/:eday', async (req, res) => {
        try {
            const { id, syear, smonth, sday, eyear, emonth, eday } = req.params;
    
            // Format the start and end dates for SQL query
            const startDate = `${syear}-${smonth.padStart(2, '0')}-${sday.padStart(2, '0')}`;
            const endDate = `${eyear}-${emonth.padStart(2, '0')}-${eday.padStart(2, '0')}`;
    
            const q = `SELECT
                            s.sales_id,
                            s.date_created,
                            p.services_id,
                            p.description,
                            qp.discounted_price_each,
                            (qp.quantity * qp.discounted_price_each) AS revenue,
                            qp.quantity
                        FROM
                            md_quotation_services qp
                        JOIN md_services p ON p.services_id = qp.services_id
                        JOIN td_quotations q ON q.quotation_id = qp.quotation_id
                        JOIN td_sales s ON s.sales_id = q.sales_id
                        WHERE
                            ? <= s.date_created
                            AND s.date_created <= ?
                            AND p.services_id = ?
            `;
    
            const data = await query(q, [startDate, endDate, id]);
            console.log(data);
            res.send(data);
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    });

    //Quotation Conversion Report

    router.get('/getQuotationConversionReport/:syear/:smonth/:sday/:eyear/:emonth/:eday', async (req, res) => {
        try {
            const { syear, smonth, sday, eyear, emonth, eday } = req.params;
    
            // Format the start and end dates for SQL query
            const startDate = `${syear}-${smonth.padStart(2, '0')}-${sday.padStart(2, '0')}`;
            const endDate = `${eyear}-${emonth.padStart(2, '0')}-${eday.padStart(2, '0')}`;
    
            const q = `SELECT *
            FROM (
                SELECT 1 AS type, date_created, quotation_id, SUM(total) AS revenue
                FROM (
                    SELECT q.quotation_id, q.date_created, (qp.discounted_price_each*qp.quantity) AS total
                    FROM td_quotations q
                    JOIN td_sales s ON q.sales_id = s.sales_id
                    JOIN md_quotation_parts qp ON q.quotation_id = qp.quotation_id
                    WHERE q.date_created >= ? AND q.date_created <= ?
                    
                    UNION ALL
                    
                    SELECT q.quotation_id, q.date_created, (qp.discounted_price_each*qp.quantity) AS total
                    FROM td_quotations q
                    JOIN td_sales s ON q.sales_id = s.sales_id
                    JOIN md_quotation_products qp ON q.quotation_id = qp.quotation_id
                    WHERE q.date_created >= ? AND q.date_created <= ?
                    
                    UNION ALL
                    
                    SELECT q.quotation_id, q.date_created, (qs.discounted_price_each*qs.quantity) AS total
                    FROM td_quotations q
                    JOIN td_sales s ON q.sales_id = s.sales_id
                    JOIN md_quotation_services qs ON q.quotation_id = qs.quotation_id
                    WHERE q.date_created >= ? AND q.date_created <= ?
                ) AS combined_data
                GROUP BY quotation_id, date_created

                UNION ALL
            
                SELECT 2 AS type, date_created, quotation_id, SUM(total) AS revenue
                FROM (
                    SELECT q.quotation_id, q.date_created, (qp.discounted_price_each*qp.quantity) AS total
                    FROM td_quotations q
                    JOIN md_quotation_parts qp ON q.quotation_id = qp.quotation_id
                    WHERE q.sales_id IS null AND q.date_cancelled IS null AND q.date_created >= ? AND q.date_created <= ?
                    
                    UNION ALL
                    
                    SELECT q.quotation_id, q.date_created, (qp.discounted_price_each*qp.quantity) AS total
                    FROM td_quotations q
                    JOIN md_quotation_products qp ON q.quotation_id = qp.quotation_id
                    WHERE q.sales_id IS null AND q.date_cancelled IS null AND q.date_created >= ? AND q.date_created <= ?
                    
                    UNION ALL
                    
                    SELECT q.quotation_id, q.date_created, (qs.discounted_price_each*qs.quantity) AS total
                    FROM td_quotations q
                    JOIN md_quotation_services qs ON q.quotation_id = qs.quotation_id
                    WHERE q.sales_id IS null AND q.date_cancelled IS null AND q.date_created >= ? AND q.date_created <= ?
                ) AS combined_data
                GROUP BY quotation_id, date_created
            
                UNION ALL
            
                SELECT 3 AS type, date_created, quotation_id, SUM(total) AS revenue
                FROM (
                    SELECT q.quotation_id, q.date_created, (qp.discounted_price_each*qp.quantity) AS total
                    FROM td_quotations q
                    JOIN md_quotation_parts qp ON q.quotation_id = qp.quotation_id
                    WHERE q.date_cancelled IS NOT null AND q.date_created >= ? AND q.date_created <= ?
                    
                    UNION ALL
                    
                    SELECT q.quotation_id, q.date_created, (qp.discounted_price_each*qp.quantity) AS total
                    FROM td_quotations q
                    JOIN md_quotation_products qp ON q.quotation_id = qp.quotation_id
                    WHERE q.date_cancelled IS NOT null AND q.date_created >= ? AND q.date_created <= ?
                    
                    UNION ALL
                    
                    SELECT q.quotation_id, q.date_created, (qs.discounted_price_each*qs.quantity) AS total
                    FROM td_quotations q
                    JOIN md_quotation_services qs ON q.quotation_id = qs.quotation_id
                    WHERE q.date_cancelled IS NOT null AND q.date_created >= ? AND q.date_created <= ?
                ) AS combined_data
                GROUP BY quotation_id, date_created
            ) AS combined_data
            ORDER BY type, date_created;
            `;
    
            const data = await query(q, [startDate, endDate, startDate, endDate, startDate, endDate,startDate, endDate, startDate, endDate, startDate, endDate, startDate, endDate, startDate, endDate, startDate, endDate]);
            console.log(data);
            res.send(data);
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    });
    
    


    
    

    return router;
}