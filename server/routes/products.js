const express = require('express')
const router = express.Router()

module.exports = (query) => {

      /**
     * Returns a list of all users
     */
      router.get('/getAllProducts', async (req, res) => {
        try {const data = await query(`  SELECT
                                            product_id as id,
                                            CASE 
                                                WHEN product_type = 'window' THEN 'Window Type AC' 
                                                ELSE 'Split Type AC' 
                                            END as type,
                                            product_srp as srp,
                                            is_active,
                                            CONCAT(product_hp, ' HP ', UPPER(product_type), ' TYPE ', 
                                                CASE 
                                                    WHEN is_inverter = 1 THEN 'INVERTER' 
                                                    WHEN is_inverter = 0 THEN 'NON-INVERTER' END) as description,
                                            unit_model
                                        FROM
                                            md_products
                                        WHERE
                                            is_active = 1
                                        UNION ALL
                                        SELECT
                                            parts_id as id,
                                            'AC Parts' as type,
                                            parts_srp as srp,
                                            is_active,
                                            description,
                                            name as unit_model
                                        FROM
                                            md_parts
                                        WHERE
                                            is_active = 1
                                        UNION ALL
                                        SELECT
                                            services_id as id,
                                            'Services' as type,
                                            service_srp as srp,
                                            is_active,
                                            description,
                                            '-' as unit_model
                                        FROM
                                            md_services
                                        WHERE
                                            is_active=1
                                        ORDER BY description ASC;
                                        `, [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    
    router.post('/postProduct', async (req, res) => {

        const product_values = [
            req.body.unit_model,
            req.body.product_srp,
            req.body.is_active,
            req.body.product_hp,
            req.body.is_inverter,
            req.body.product_type
        ]

        try {
            const product_query = 'INSERT INTO md_products (unit_model, product_srp, is_active, product_hp, is_inverter, product_type) VALUES (?,?,?,?,?,?)'
            const product_data = await query(product_query, product_values)

            res.status(200).json({message: `Data successfully posted`, data: product_data.insertId})

        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed one or more database operations... ${error}`})
        }

    })

    router.post('/postService', async (req, res) => {

        const product_values = [
            req.body.description,
            req.body.service_srp,
            req.body.is_active
        ]

        try {
            const product_query = 'INSERT INTO md_services (description, service_srp, is_active) VALUES (?,?,?)'
            const product_data = await query(product_query, product_values)

            res.status(200).json({message: `Data successfully posted`, data: product_data.insertId})

        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed one or more database operations... ${error}`})
        }

    })


    router.post('/postPart', async (req, res) => {

        const product_values = [
            req.body.unit_model,
            req.body.description,
            req.body.parts_srp,
            req.body.is_active
        ]

        try {
            const product_query = 'INSERT INTO md_parts (name, description, parts_srp, is_active) VALUES (?,?,?,?)'
            const product_data = await query(product_query, product_values)

            res.status(200).json({message: `Data successfully posted`, data: product_data.insertId})

        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed one or more database operations... ${error}`})
        }

    })

    router.get('/getProduct/:id', async (req, res) => {
        try {
            const { id } = req.params
            const q =  `SELECT product_id, unit_model, product_srp, is_active, product_hp, is_inverter, product_type, 
                            CONCAT(product_hp, ' HP ', UPPER(product_type), ' TYPE ', 
                            CASE 
                                WHEN is_inverter = 1 THEN 'INVERTER' 
                                WHEN is_inverter = 0 THEN 'NON-INVERTER' END) as description
                        FROM md_products
                        WHERE product_id = ?`
            const data = await query(q, [id])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }

    })

 
    router.get('/getPart/:id', async (req, res) => {
        try {
            const { id } = req.params
            const q =  `SELECT *
                    FROM md_parts
                    WHERE parts_id = ?`
            const data = await query(q, [id])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }

    })

    router.get('/getService/:id', async (req, res) => {
        try {
            const { id } = req.params
            const q =  `SELECT *
                    FROM md_services
                    WHERE services_id = ?`
            const data = await query(q, [id])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }

    })

    router.patch('/changeProductState/:id/:state', async (req, res) => {
        try {
            const values = [req.params.state, req.params.id]
            const data = await query('UPDATE md_products SET is_active = ? WHERE product_id = ?', values)
            console.log(data)
            res.status(200).json({message: `Product successfully updated... ${data}`})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed to update product... ${error}`})
        }
    })

    router.patch('/changePartState/:id/:state', async (req, res) => {
        try {
            const values = [req.params.state, req.params.id]
            const data = await query('UPDATE md_parts SET is_active = ? WHERE parts_id = ?', values)
            console.log(data)
            res.status(200).json({message: `Part successfully updated... ${data}`})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed to update part... ${error}`})
        }
    })

    router.patch('/changeServiceState/:id/:state', async (req, res) => {
        try {
            const values = [req.params.state, req.params.id]
            const data = await query('UPDATE md_services SET is_active = ? WHERE services_id = ?', values)
            console.log(data)
            res.status(200).json({message: `Service successfully updated... ${data}`})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed to update service... ${error}`})
        }
    })

   
    return router;
}