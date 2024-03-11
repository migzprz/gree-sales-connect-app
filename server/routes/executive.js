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
    

    return router;
}