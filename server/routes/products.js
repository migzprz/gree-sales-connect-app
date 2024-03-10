const express = require('express')
const router = express.Router()

module.exports = (query) => {

      /**
     * Returns a list of all users
     */
      router.get('/getAllProducts', async (req, res) => {
        try {const data = await query(`  SELECT
                                            ROW_NUMBER() OVER() as id,
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
                                        UNION ALL
                                        SELECT
                                            ROW_NUMBER() OVER() as id,
                                            'AC Parts' as type,
                                            parts_srp as srp,
                                            is_active,
                                            description,
                                            name as unit_model
                                        FROM
                                            md_parts
                                        UNION ALL
                                        SELECT
                                            ROW_NUMBER() OVER() as id,
                                            'Services' as type,
                                            service_srp as srp,
                                            is_active,
                                            description,
                                            '-' as unit_model
                                        FROM
                                            md_services
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
            req.body.srp,
            req.body.is_active,
            req.body.product_hp,
            req.body.is_inverter,
            req.body.type
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
            req.body.srp,
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
            req.body.srp,
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

   
    return router;
}