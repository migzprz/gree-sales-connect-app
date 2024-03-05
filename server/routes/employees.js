const express = require('express')
const router = express.Router()

module.exports = (query) => {

      /**
     * Returns a list of all users
     */
      router.get('/getUsers', async (req, res) => {
        try {const data = await query(`  SELECT 
                                                login_id, 
                                                CONCAT(last_name, ", ", first_name) AS name,
                                                date_added, 
                                                role, 
                                                username, 
                                                sales_access, 
                                                aftersales_access, 
                                                exec_access, 
                                                sysad_access,
                                                is_active,
                                            CASE 
                                                WHEN sales_access = 1 AND aftersales_access = 1 AND exec_access = 1 AND sysad_access = 1 THEN 'Sales, Aftersales, Executive, and System Admin Modules'
                                                WHEN sales_access = 1 AND aftersales_access = 1 AND exec_access = 1 THEN 'Sales, Aftersales, and Executive Modules'
                                                WHEN sales_access = 1 AND aftersales_access = 1 AND sysad_access = 1 THEN 'Sales, Aftersales, and System Admin Modules'
                                                WHEN sales_access = 1 AND exec_access = 1 AND sysad_access = 1 THEN 'Sales, Executive, and System Admin Modules'
                                                WHEN aftersales_access = 1 AND exec_access = 1 AND sysad_access = 1 THEN 'Aftersales, Executive, and System Admin Modules'
                                                WHEN sales_access = 1 AND aftersales_access = 1 THEN 'Sales and Aftersales Modules'
                                                WHEN sales_access = 1 AND exec_access = 1 THEN 'Sales and Executive Modules'
                                                WHEN sales_access = 1 AND sysad_access = 1 THEN 'Sales and System Admin Modules'
                                                WHEN aftersales_access = 1 AND exec_access = 1 THEN 'Aftersales and Executive Modules'
                                                WHEN aftersales_access = 1 AND sysad_access = 1 THEN 'Aftersales and System Admin Modules'
                                                WHEN exec_access = 1 AND sysad_access = 1 THEN 'Executive and System Admin Modules'
                                                WHEN sales_access = 1 THEN 'Sales Modules'
                                                WHEN aftersales_access = 1 THEN 'Aftersales Modules'
                                                WHEN exec_access = 1 THEN 'Executive Modules'
                                                WHEN sysad_access = 1 THEN 'System Admin Modules'
                                                ELSE 'No Access'
                                            END AS system_access
                                        FROM md_login
                                        ORDER BY name ASC;
                                        `, [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    /**
     * Returns a list of all technicians
     */
    router.get('/getAllTechnicians', async (req, res) => {
        try {const data = await query(`     SELECT 
                                            technician_id, first_name, middle_name, last_name,
                                            CONCAT(last_name, ", ", first_name) AS name,
                                            date_added, contact_number, email, is_active
                                            FROM md_technicians
                                            ORDER BY name ASC;
                                        `, [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.post('/postSystemUser', async (req, res) => {

        const user_values = [
            req.body.first_name,
            req.body.last_name,
            req.body.password,
            req.body.role,
            req.body.username,
            req.body.aftersales_access,
            req.body.sales_access,
            req.body.exec_access,
            req.body.sysad_access,
            req.body.date_added,
            req.body.is_active
            
        ]

        try {
            // queries for client
            const user_query = 'INSERT INTO md_login (first_name, last_name, password, role, username, aftersales_access, sales_access, exec_access, sysad_access, date_added, is_active) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
            const user_data = await query(user_query, user_values)

            res.status(200).json({message: `Data successfully posted`, data: user_data.insertId})

        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed one or more database operations... ${error}`})
        }

    })


    return router;
}