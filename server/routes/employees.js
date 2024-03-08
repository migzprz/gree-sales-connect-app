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

    router.post('/postTechnician', async (req, res) => {

        const user_values = [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.contact_number,
            req.body.date_added,
            req.body.is_active
            
        ]

        try {
            // queries for client
            const user_query = 'INSERT INTO md_technicians (first_name, last_name, email, contact_number, date_added, is_active) VALUES (?,?,?,?,?,?)'
            const user_data = await query(user_query, user_values)

            res.status(200).json({message: `Data successfully posted`, data: user_data.insertId})

        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed one or more database operations... ${error}`})
        }

    })

    router.get('/getUser/:id', async (req, res) => {
        try {
            const { id } = req.params
            const q =  `SELECT 
                            login_id, 
                            CONCAT(last_name, ", ", first_name) AS name,
                            date_added, 
                            role,
                            first_name,
                            last_name, 
                            username, 
                            sales_access, 
                            aftersales_access, 
                            exec_access, 
                            sysad_access,
                            is_active
                    FROM md_login
                    WHERE login_id = ?`
            const data = await query(q, [id])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }

    })

    router.patch('/updateUserDetails/:id', async (req, res) => {
        const id = req.params.id
        const data = Object.fromEntries(
            // Use Object.entries to get key-value pairs, and filter out null values
            Object.entries(req.body).filter(([key, value]) => value !== '' && value !== null)
        );

        try {
            let updateResponse
            console.log('patch user data w/ id:', data)
            const columnsToUpdate = Object.keys(data).map(column => `${column} = ?`).join(', ');
            const values = [...Object.values(data), id];
            updateResponse = await query(`UPDATE md_login SET ${columnsToUpdate} WHERE login_id = ?`, values)

            res.status(200).json({message: `User successfully updated... ${updateResponse}`})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed to update user record... ${error}`})
        }
    })

    router.patch('/changeUserState/:id/:state', async (req, res) => {
        try {
            const values = [req.params.state, req.params.id]
            const data = await query('UPDATE md_login SET is_active = ? WHERE login_id = ?', values)
            console.log(data)
            res.status(200).json({message: `User successfully updated... ${data}`})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed to update user... ${error}`})
        }
    })

    router.patch('/changePassword/:id', async (req, res) => {
        try {
            const values = [req.body.password, req.params.id]
            const data = await query('UPDATE md_login SET password = ? WHERE login_id = ?', values)
            console.log(data)
            res.status(200).json({message: `User successfully updated... ${data}`})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed to update user... ${error}`})
        }
    })


    return router;
}