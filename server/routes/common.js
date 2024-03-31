// for get requests that will be used throughout multiple modules

const express = require('express')
const router = express.Router()

module.exports = (query) => {

    router.get('/getLogin', async (req, res) => {

        try {
            const data = await query('SELECT CONCAT(last_name, ", ", first_name, " ", middle_name) as complete_name, role FROM md_login', [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getTechnicians', async (req, res) => {
        try {
            const data = await query('SELECT CONCAT(last_name, ", ", first_name) as complete_name, email, contact_number, technician_id FROM md_technicians WHERE is_active = 1', [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getCompanies', async (req, res) => {
        try {
            const data = await query('SELECT * FROM md_companies', [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getContactPerson', async (req, res) => {
        try {
            const data = await query('SELECT * FROM md_contactperson', [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })


    /**
     *  Returns the list of regions, provinces, municipalities and barangays
     */
    router.get('/getLocationsForAddressInForms', async (req, res) => {

        try {
            const regions = await query('SELECT * FROM md_regions', [])
            const provinces = await query('SELECT * FROM md_provinces', [])
            const municipalities = await query('SELECT * FROM md_municipalities', [])
            const barangays = await query('SELECT * FROM md_barangays', [])

            const locations = {
                regions,
                provinces,
                municipalities,
                barangays
            }
        
            res.send(locations)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    /**
     * Returns list of stored locations for drop down use
     */
    router.get('/getStoredLocations', async (req, res) => {
        try {
            const data = await query(`SELECT location_id, CONCAT(loc.addr_bldg_no, " ", loc.addr_street_name, " ", b.name, ", ", m.name, ", ", loc.zipcode, " ", p.name) as site_address,
                                      p.province_id, m.municipality_id, b.barangay_id,  r.region_id
                                        FROM md_locations loc
                                        JOIN md_regions r ON loc.addr_region_id = r.region_id
                                        JOIN md_provinces p ON loc.addr_province_id = p.province_id
                                        JOIN md_municipalities m ON loc.addr_municipality_id = m.municipality_id
                                        JOIN md_barangays b ON loc.addr_barangay_id = b.barangay_id`, [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            
        }
    })

    /**
     * Returns a list of clients and accompanying data for returning clients selector for setting oculars
     */
    router.get('/getClients', async (req, res) => {
        try {
            const data = await query(`SELECT c.client_id, company_name, CONCAT(cp.last_name, ", ", cp.first_name) as client_name, cp.email, cp.contact_number, cp.last_name, cp.first_name, co.tin
                                    FROM md_clients c 
                                    JOIN md_companies co ON c.company_id = co.company_id
                                    JOIN md_contactperson cp ON c.contact_person_id = cp.contact_person_id
                                    ORDER BY client_name ASC;`, [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    /**
     *  Return a list of selectable products 
     */
    router.get('/getProducts', async (req, res) => {
        try {
            const data = await query(`SELECT *,
                                    CONCAT(product_hp, ' HP ', UPPER(product_type), ' TYPE ', 
                                    CASE 
                                        WHEN is_inverter = 1 THEN 'INVERTER' 
                                        WHEN is_inverter = 0 THEN 'NON-INVERTER' END) as display
                                    FROM greesalesconnect.md_products
                                    WHERE is_active = 1
                                    ORDER BY unit_model ASC;`, [])
            console.log(data)

            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    /**
     * Returns a string based of the identifiers of the address columns excluding the unit no, street and zipcode
     */
    router.get('/getAddressString', async (req, res) => {
        try {
            const data = await query(`SELECT CONCAT(b.name, ",", m.name, ",", p.name) as site_address
                                    FROM md_regions r 
                                    JOIN md_provinces p ON r.region_id = p.region_id
                                    JOIN md_municipalities m ON p.province_id = m.province_id
                                    JOIN md_barangays b ON m.municipality_id = b.municipality_id
                                    WHERE r.region_id = ?
                                    AND p.province_id = ?
                                    AND m.municipality_id = ?
                                    AND b.barangay_id = ?`, [req.body])
            console.log(data)

            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getServices', async (req, res) => {
        try {
            const data = await query('SELECT * FROM md_services WHERE is_active = 1', [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getParts', async (req, res) => {
        try {
            const data = await query('SELECT * FROM md_parts WHERE is_active = 1 ORDER BY description, name', [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getModeOfPayments', async (req, res) => {
        try {
            const data = await query('SELECT * FROM ref_mode_of_payment', [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    //DASHBOARD ROUTES
    router.get('/getOcularStatistics', async (req, res) => {
        try {const data = await query(` SELECT 
                                            YEAR(date_created) AS year, 
                                            CASE
                                                WHEN MONTH(date_created) = 1 THEN 'Jan'
                                                WHEN MONTH(date_created) = 2 THEN 'Feb'
                                                WHEN MONTH(date_created) = 3 THEN 'Mar'
                                                WHEN MONTH(date_created) = 4 THEN 'Apr'
                                                WHEN MONTH(date_created) = 5 THEN 'May'
                                                WHEN MONTH(date_created) = 6 THEN 'Jun'
                                                WHEN MONTH(date_created) = 7 THEN 'Jul'
                                                WHEN MONTH(date_created) = 8 THEN 'Aug'
                                                WHEN MONTH(date_created) = 9 THEN 'Sep'
                                                WHEN MONTH(date_created) = 10 THEN 'Oct'
                                                WHEN MONTH(date_created) = 11 THEN 'Nov'
                                                ELSE 'Dec'
                                            END AS month,
                                            MONTH(date_created) as monthNum,
                                            DAY(date_created) AS day, 
                                            COUNT(ocular_id) AS qty
                                        FROM td_oculars
                                        GROUP BY day, month, monthNum, year
                                        ORDER BY year, month, day;
                                        `, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getQuotationStatistics', async (req, res) => {
        try {const data = await query(` SELECT 
                                            YEAR(date_created) AS year, 
                                            CASE
                                                WHEN MONTH(date_created) = 1 THEN 'Jan'
                                                WHEN MONTH(date_created) = 2 THEN 'Feb'
                                                WHEN MONTH(date_created) = 3 THEN 'Mar'
                                                WHEN MONTH(date_created) = 4 THEN 'Apr'
                                                WHEN MONTH(date_created) = 5 THEN 'May'
                                                WHEN MONTH(date_created) = 6 THEN 'Jun'
                                                WHEN MONTH(date_created) = 7 THEN 'Jul'
                                                WHEN MONTH(date_created) = 8 THEN 'Aug'
                                                WHEN MONTH(date_created) = 9 THEN 'Sep'
                                                WHEN MONTH(date_created) = 10 THEN 'Oct'
                                                WHEN MONTH(date_created) = 11 THEN 'Nov'
                                                ELSE 'Dec'
                                            END AS month,
                                            MONTH(date_created) as monthNum,
                                            DAY(date_created) AS day, 
                                            COUNT(quotation_id) AS qty
                                        FROM td_quotations
                                        GROUP BY day, month, monthNum, year
                                        ORDER BY year, month, day;
    
                                        `, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getSalesStatistics', async (req, res) => {
        try {const data = await query(` SELECT 
                                            YEAR(date_created) AS year, 
                                            CASE
                                                WHEN MONTH(date_created) = 1 THEN 'Jan'
                                                WHEN MONTH(date_created) = 2 THEN 'Feb'
                                                WHEN MONTH(date_created) = 3 THEN 'Mar'
                                                WHEN MONTH(date_created) = 4 THEN 'Apr'
                                                WHEN MONTH(date_created) = 5 THEN 'May'
                                                WHEN MONTH(date_created) = 6 THEN 'Jun'
                                                WHEN MONTH(date_created) = 7 THEN 'Jul'
                                                WHEN MONTH(date_created) = 8 THEN 'Aug'
                                                WHEN MONTH(date_created) = 9 THEN 'Sep'
                                                WHEN MONTH(date_created) = 10 THEN 'Oct'
                                                WHEN MONTH(date_created) = 11 THEN 'Nov'
                                                ELSE 'Dec'
                                            END AS month,
                                            MONTH(date_created) as monthNum,
                                            DAY(date_created) AS day, 
                                            COUNT(sales_id) AS qty
                                        FROM td_sales
                                        GROUP BY day, month, monthNum, year
                                        ORDER BY year, month, day;
    
    
                                        `, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getRevenueStatistics', async (req, res) => {
        try {const data = await query(` SELECT year, month, SUM(total) AS total
                                            FROM (
                                                SELECT YEAR(s.date_created) AS year, MONTH(s.date_created) AS month, SUM(qp.discounted_price_each*qp.quantity) AS total
                                                FROM td_quotations q
                                                JOIN td_sales s ON q.sales_id = s.sales_id
                                                JOIN md_quotation_parts qp ON q.quotation_id = qp.quotation_id
                                                GROUP BY year, month
                                            
                                                UNION ALL
                                            
                                                SELECT YEAR(s.date_created) AS year, MONTH(s.date_created) AS month, SUM(qp.discounted_price_each*qp.quantity) AS total
                                                FROM td_quotations q
                                                JOIN td_sales s ON q.sales_id = s.sales_id
                                                JOIN md_quotation_products qp ON q.quotation_id = qp.quotation_id
                                                GROUP BY year, month
                                            
                                                UNION ALL
                                            
                                                SELECT YEAR(s.date_created) AS year, MONTH(s.date_created) AS month, SUM(qs.discounted_price_each*qs.quantity) AS total
                                                FROM td_quotations q
                                                JOIN td_sales s ON q.sales_id = s.sales_id
                                                JOIN md_quotation_services qs ON q.quotation_id = qs.quotation_id
                                                GROUP BY year, month
                                            ) AS combined_data
                                            GROUP BY year, month;
                                        `, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getWarrantyStatistics', async (req, res) => {
        try {const data = await query(` SELECT 
        YEAR(date_created) AS year, 
        CASE
            WHEN MONTH(date_created) = 1 THEN 'Jan'
            WHEN MONTH(date_created) = 2 THEN 'Feb'
            WHEN MONTH(date_created) = 3 THEN 'Mar'
            WHEN MONTH(date_created) = 4 THEN 'Apr'
            WHEN MONTH(date_created) = 5 THEN 'May'
            WHEN MONTH(date_created) = 6 THEN 'Jun'
            WHEN MONTH(date_created) = 7 THEN 'Jul'
            WHEN MONTH(date_created) = 8 THEN 'Aug'
            WHEN MONTH(date_created) = 9 THEN 'Sep'
            WHEN MONTH(date_created) = 10 THEN 'Oct'
            WHEN MONTH(date_created) = 11 THEN 'Nov'
            ELSE 'Dec'
        END AS month,
        MONTH(date_created) as monthNum,
        DAY(date_created) AS day, 
        COUNT(warranty_id) AS qty
    FROM td_warranty
    GROUP BY day, month, monthNum, year
    ORDER BY year, month, day; `, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getResolvedWarrantyStatistics', async (req, res) => {
        try {const data = await query(` SELECT 
        YEAR(date_created) AS year, 
        CASE
            WHEN MONTH(date_created) = 1 THEN 'Jan'
            WHEN MONTH(date_created) = 2 THEN 'Feb'
            WHEN MONTH(date_created) = 3 THEN 'Mar'
            WHEN MONTH(date_created) = 4 THEN 'Apr'
            WHEN MONTH(date_created) = 5 THEN 'May'
            WHEN MONTH(date_created) = 6 THEN 'Jun'
            WHEN MONTH(date_created) = 7 THEN 'Jul'
            WHEN MONTH(date_created) = 8 THEN 'Aug'
            WHEN MONTH(date_created) = 9 THEN 'Sep'
            WHEN MONTH(date_created) = 10 THEN 'Oct'
            WHEN MONTH(date_created) = 11 THEN 'Nov'
            ELSE 'Dec'
        END AS month,
        MONTH(date_created) as monthNum,
        DAY(date_created) AS day, 
        COUNT(warranty_id) AS qty
    FROM td_warranty
    WHERE is_completed = 1
    GROUP BY day, month, monthNum, year
    ORDER BY year, month, day; `, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getClaimedUnitStatistics', async (req, res) => {
        try {const data = await query(` SELECT 
        YEAR(w.date_created) AS year, 
        CASE
            WHEN MONTH(w.date_created) = 1 THEN 'Jan'
            WHEN MONTH(w.date_created) = 2 THEN 'Feb'
            WHEN MONTH(w.date_created) = 3 THEN 'Mar'
            WHEN MONTH(w.date_created) = 4 THEN 'Apr'
            WHEN MONTH(w.date_created) = 5 THEN 'May'
            WHEN MONTH(w.date_created) = 6 THEN 'Jun'
            WHEN MONTH(w.date_created) = 7 THEN 'Jul'
            WHEN MONTH(w.date_created) = 8 THEN 'Aug'
            WHEN MONTH(w.date_created) = 9 THEN 'Sep'
            WHEN MONTH(w.date_created) = 10 THEN 'Oct'
            WHEN MONTH(w.date_created) = 11 THEN 'Nov'
            ELSE 'Dec'
        END AS month,
        MONTH(w.date_created) as monthNum,
        wc.issue,
        COUNT(wc.claimed_unit_id) AS qty
    FROM td_warranty_claimed_units wc
    JOIN td_warranty w ON w.warranty_id = wc.warranty_id
    GROUP BY issue, month, monthNum, year
    ORDER BY year, month, issue; `, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getYearlyClaimedUnitStatistics', async (req, res) => {
        try {const data = await query(` SELECT 
                YEAR(w.date_created) AS year,
                wc.issue,
                COUNT(wc.claimed_unit_id) AS qty
            FROM td_warranty_claimed_units wc
            JOIN td_warranty w ON w.warranty_id = wc.warranty_id
            GROUP BY issue, year
            ORDER BY year, issue;`, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getExpenseStatistics', async (req, res) => {
        try {const data = await query(` SELECT year, monthNum, day, SUM(total) AS total,
                                                CASE
                                                    WHEN monthNum = 1 THEN 'Jan'
                                                    WHEN monthNum = 2 THEN 'Feb'
                                                    WHEN monthNum = 3 THEN 'Mar'
                                                    WHEN monthNum = 4 THEN 'Apr'
                                                    WHEN monthNum = 5 THEN 'May'
                                                    WHEN monthNum = 6 THEN 'Jun'
                                                    WHEN monthNum = 7 THEN 'Jul'
                                                    WHEN monthNum = 8 THEN 'Aug'
                                                    WHEN monthNum = 9 THEN 'Sep'
                                                    WHEN monthNum = 10 THEN 'Oct'
                                                    WHEN monthNum = 11 THEN 'Nov'
                                                    ELSE 'Dec'
                                                END AS month
                                        FROM (
                                            SELECT YEAR(expense_date) AS year, MONTH(expense_date) AS monthNum, DAY(expense_date) AS day, SUM(amount) AS total
                                            FROM td_operating_expense
                                            GROUP BY year, monthNum, day

                                            UNION ALL

                                            SELECT YEAR(expense_date) AS year, MONTH(expense_date) AS monthNum, DAY(expense_date) AS day, SUM(amount) AS total
                                            FROM td_nonoperating_expense
                                            GROUP BY year, monthNum, day
                                        ) AS expenses
                                        GROUP BY year, monthNum, day;`, [])
                                                    console.log(data)
                                                    res.send(data)
                                                } catch (error) {
                                                    console.error('Error: ', error)
                                                    throw error
                                                }
    })

    router.get('/getDetailedRevenueStatistics', async (req, res) => {
        try {const data = await query(` SELECT year, monthNum, day, SUM(total) AS total,
                                            CASE
                                                    WHEN monthNum = 1 THEN 'Jan'
                                                    WHEN monthNum = 2 THEN 'Feb'
                                                    WHEN monthNum = 3 THEN 'Mar'
                                                    WHEN monthNum = 4 THEN 'Apr'
                                                    WHEN monthNum = 5 THEN 'May'
                                                    WHEN monthNum = 6 THEN 'Jun'
                                                    WHEN monthNum = 7 THEN 'Jul'
                                                    WHEN monthNum = 8 THEN 'Aug'
                                                    WHEN monthNum = 9 THEN 'Sep'
                                                    WHEN monthNum = 10 THEN 'Oct'
                                                    WHEN monthNum = 11 THEN 'Nov'
                                                    ELSE 'Dec'
                                                END AS month
                                        FROM (
                                            SELECT YEAR(s.date_created) AS year, MONTH(s.date_created) AS monthNum, DAY(s.date_created) AS day, SUM(qp.discounted_price_each*qp.quantity) AS total
                                            FROM td_quotations q
                                            JOIN td_sales s ON q.sales_id = s.sales_id
                                            JOIN md_quotation_parts qp ON q.quotation_id = qp.quotation_id
                                            GROUP BY year, monthNum, day
                                        
                                            UNION ALL
                                        
                                            SELECT YEAR(s.date_created) AS year, MONTH(s.date_created) AS monthNum, DAY(s.date_created) AS day, SUM(qp.discounted_price_each*qp.quantity) AS total
                                            FROM td_quotations q
                                            JOIN td_sales s ON q.sales_id = s.sales_id
                                            JOIN md_quotation_products qp ON q.quotation_id = qp.quotation_id
                                            GROUP BY year, monthNum, day
                                        
                                            UNION ALL
                                        
                                            SELECT YEAR(s.date_created) AS year, MONTH(s.date_created) AS monthNum, DAY(s.date_created) AS day, SUM(qs.discounted_price_each*qs.quantity) AS total
                                            FROM td_quotations q
                                            JOIN td_sales s ON q.sales_id = s.sales_id
                                            JOIN md_quotation_services qs ON q.quotation_id = qs.quotation_id
                                            GROUP BY year, monthNum, day
                                        ) AS combined_data
                                        GROUP BY year, monthNum, day;`, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getProductCount', async (req, res) => {
        try {const data = await query(`SELECT COUNT(product_id) as qty 
                                        FROM md_products
                                        WHERE is_active=1;     `, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getServicesCount', async (req, res) => {
        try {const data = await query(`SELECT COUNT(services_id) as qty 
                                        FROM md_services
                                        WHERE is_active=1 
                                        `, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getUsersCount', async (req, res) => {
        try {const data = await query(`SELECT COUNT(login_id) as qty 
                                        FROM md_login
                                        WHERE is_active=1 
                                        `, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getTechniciansCount', async (req, res) => {
        try {const data = await query(` SELECT COUNT(technician_id) as qty 
                                        FROM md_technicians
                                        WHERE is_active=1
                                        `, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    /**
     * Return true if a given technician from input: technician_id is available 
     * (x) mins before first closest schedule from input and (y) mins after the next closest schedule
     */
    router.get('/getTechnicianAvailability/:id', async (req, res) => {
        const { id } = req.params

        // TEST: REPLACE WITH ACTUAL INPUT
        const inputDate = new Date(req.query.datetime)
        
        // Exclude the existing datetime when editing a record
        const editDateTime = req.query.editDateTime
        const excludedDateTime = editDateTime ? new Date(editDateTime) : null

        console.log("INPUT: ", inputDate, editDateTime)

        if (excludedDateTime) { console.log('Editing Record, Existing Datetime Discovered ', excludedDateTime) }

        const getHourDiff = (date1, date2) => {
            //console.log(date1, date2)
            if (!date1 || !date2) {
                return true
            }
            console.log(Math.abs((date1  - date2) / 36e5))
            return Math.abs((date1  - date2) / 36e5)
        }

        // collect non-cancelled technician schedules from different table
        // (note: only include records that are active)

        // [O] ocular (note that if the associated quotation_client_id has both a quotation id associated then it is excluded: ongoing oculars only)
        const oq = `SELECT DISTINCT o.ocular_id, o.ocular_date as date
                    FROM td_quotations q
                    LEFT JOIN md_quotation_clients qc ON q.quotation_client_id 
                    LEFT JOIN td_oculars o ON qc.ocular_id = o.ocular_id
                    WHERE qc.ocular_id IS NOT NULL
                    AND q.quotation_id NOT IN (SELECT quotation_client_id FROM md_quotation_clients)
                    AND o.is_active = 1
                    AND o.technician_id = ?;`
        const or = await query(oq, [id])

        // [Q] service schedule
        const qssq = `SELECT service_date as date
                        FROM md_service_schedules ss
                        JOIN td_quotations q ON ss.quotation_id = q.quotation_id
                        WHERE q.is_cancelled = 0
                        AND ss.is_completed = 0
                        AND technician_id = ?;`
        const qssr = await query(qssq, [id])

        // [Q] installation schedule
        const qiq = `SELECT start_installation_date as date
                    FROM md_installations i
                    JOIN td_quotations q ON i.quotation_id = q.quotation_id
                    WHERE q.is_cancelled = 0
                    AND i.is_installed = 0
                    AND technician_id = ?;`
        const qir = await query(qiq, [id])
        
        // [W] inspection schedule
        const wiq = `SELECT inspection_date as date
                    FROM td_warranty_inspection wi 
                    WHERE wi.is_completed = 0
                    AND wi.technician_id = ?;`
        const wir = await query(wiq, [id])

        // [W] warranty service schedule
        const wsq = `SELECT ws.service_date as date
                    FROM td_warranty_service ws
                    WHERE is_completed = 0
                    AND technician_id = ?`
        const wsr = await query(wsq, [id])

        // insert each query outputs into a set, and return as array
        const response_array = [or, qssr, qir, wir, wsr]


        const date_raw = []
        // Add all responses into a list
        response_array.forEach(res => {
            res.forEach(item => {
                const date = new Date(item.date)
                date_raw.push(date)
            })
        })

        // Transform into a set, removing duplicates
        const filterUniqueDates = (date_raw) => {
            const lookup = new Set()
            return date_raw.filter(date => {
                const serialised = date.getTime()
                if (lookup.has(serialised)) {
                    return false
                } else {
                    lookup.add(serialised)
                    return true
                }
            })
        }

        const dateNoDupe = filterUniqueDates(date_raw)
        const dateSorted = dateNoDupe.sort((a, b) => new Date(a) - new Date(b))

        // Filter array to remove excluded datetime
        const date_list = dateSorted.filter(item => new Date(item).getTime() !== new Date(excludedDateTime).getTime())

        // modified insertion sort to find index where input would be inserted
        let low = 0;
        let high = date_list.length;

        while (low < high) {
            let mid = Math.floor((low + high) / 2);
            if (date_list[mid] < inputDate) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        // check condition if value at the previous index has a one hour difference and the value at the next index has a 5 hour difference
        let validDateCheck = false
        if ((low === 0 || getHourDiff(date_list[low - 1], inputDate) >= 1) && 
            (low === date_list.length || getHourDiff(date_list[low], inputDate) >= 5)) {
            validDateCheck = true
        }

        // testing return
        res.send([date_raw, date_raw.length, dateSorted, dateSorted.length, date_list, date_list.length, validDateCheck, inputDate, editDateTime, low])
        // res.send(validDateCheck)
    })




    //NOTIFICATION ROUTES
    router.get('/getSalesNotifications', async (req, res) => {
        try {const data = await query(` SELECT *
                                                FROM (
                                                    SELECT 1 AS description, 1 AS user_type, COUNT(o.ocular_id) AS count
                                                    FROM td_oculars o
                                                    JOIN md_quotation_clients qc ON qc.ocular_id = o.ocular_id
                                                    LEFT JOIN td_quotations q ON q.quotation_client_id = qc.quotation_client_id
                                                    WHERE DATE(ocular_date) = CURDATE() AND q.quotation_id IS NULL AND o.is_active = 1
                                                                                                    
                                                    UNION ALL
                                                                                                    
                                                    SELECT 2 AS description, 1 AS user_type, COUNT(o.ocular_id) AS count
                                                    FROM td_oculars o
                                                    JOIN md_quotation_clients qc ON qc.ocular_id = o.ocular_id
                                                    JOIN md_technicians t ON o.technician_id = t.technician_id
                                                    JOIN md_clients cl ON qc.client_id = cl.client_id
                                                    JOIN md_contactperson cp ON cl.contact_person_id = cp.contact_person_id
                                                    JOIN md_companies co ON cl.company_id = co.company_id
                                                    JOIN md_locations loc ON qc.location_id = loc.location_id
                                                    JOIN md_provinces p ON loc.addr_province_id = p.province_id
                                                    JOIN md_municipalities m ON loc.addr_municipality_id = m.municipality_id
                                                    JOIN md_barangays b ON loc.addr_barangay_id = b.barangay_id
                                                    LEFT JOIN td_quotations q ON q.quotation_client_id = qc.quotation_client_id
                                                    WHERE DATE(ocular_date) <= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND q.quotation_id IS NULL AND o.is_active = 1
                                                
                                                UNION ALL
                                                
                                                SELECT 3 AS description, 1 AS user_type, COUNT(quotation_id) AS count
                                                FROM td_quotations
                                                WHERE sales_id IS NULL AND DATE(date_created) <= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
                                                
                                                UNION ALL
                                                
                                                SELECT 4 AS description, 1 AS user_type, COUNT(delivery_id) AS count
                                                FROM md_deliveries
                                                WHERE DATE(delivery_date) = CURDATE()
                                                
                                                UNION ALL
                                                
                                                SELECT 5 AS description, 1 AS user_type, COUNT(delivery_id) AS count
                                                FROM md_deliveries
                                                WHERE DATE(delivery_date) <= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
                                                
                                                UNION ALL
                                                
                                                SELECT 6 AS description, 1 AS user_type, COUNT(installation_id) AS count
                                                FROM md_installations
                                                WHERE DATE(start_installation_date) = CURDATE()
                                                
                                                UNION ALL
                                                
                                                SELECT 7 AS description, 1 AS user_type, COUNT(installation_id) AS count
                                                FROM md_installations
                                                WHERE DATE(start_installation_date) <= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
                                                
                                                UNION ALL
                                                
                                                SELECT 8 AS description, 1 AS user_type, COUNT(service_schedule_id) AS count
                                                FROM md_service_schedules
                                                WHERE DATE(service_date) = CURDATE()
                                                
                                                UNION ALL
                                                
                                                SELECT 9 AS description, 1 AS user_type, COUNT(service_schedule_id) AS count
                                                FROM md_service_schedules
                                                WHERE DATE(service_date) <= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
                                                ) AS combined_data
                                        `, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getAfterSalesNotifications', async (req, res) => {
                try {const data = await query(` SELECT DISTINCT cp.contact_person_id, CONCAT(cp.last_name, ', ', cp.first_name) as client_name, cp.contact_number
                                                    FROM td_sales s 
                                                    JOIN td_quotations q ON q.sales_id = s.sales_id
                                                    JOIN md_installations i ON q.quotation_id = i.quotation_id
                                                    JOIN md_quotation_clients qc ON qc.quotation_client_id = q.quotation_client_id
                                                    JOIN md_clients c ON c.client_id = qc.client_id
                                                    JOIN md_contactperson cp ON cp.contact_person_id = c.contact_person_id
                                                    WHERE s.is_completed = 1 
                                                    AND i.start_installation_date <= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
                                                    AND i.start_installation_date > DATE_SUB(DATE_SUB(CURDATE(), INTERVAL 6 MONTH), INTERVAL 1 WEEK)
                
                                        `, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getExecutiveNotifications', async (req, res) => {
        try {const data = await query(` SELECT 
                                            IFNULL(
                                                CASE 
                                                    WHEN DATEDIFF(CURDATE(), MAX(date_created)) < 30 THEN 0
                                                    ELSE FLOOR(DATEDIFF(CURDATE(), MAX(date_created)) / 30)
                                                END,
                                                0
                                            ) AS months_since_last_expense
                                        FROM 
                                            td_expenses;
        
                                `, [])
                console.log(data)
                res.send(data)
            } catch (error) {
                console.error('Error: ', error)
                throw error
            }
            })

        
        

    return router;
}