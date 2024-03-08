const express = require('express')
const router = express.Router()

module.exports = (query) => {

    router.get('/getQuotations', async (req, res) => {
        const data = await query(`SELECT q.quotation_id, q.date_created,
                                CONCAT(cp.last_name, ", ", cp.first_name) as client_name, cp.contact_number as client_number,
                                co.company_name,
                                SUM(qp.discounted_price_each*qp.quantity) AS totalprice, q.is_cancelled
                                FROM td_quotations q
                                JOIN md_quotation_clients qc ON q.quotation_client_id = qc.quotation_client_id
                                JOIN md_clients c ON qc.client_id = c.client_id
                                JOIN md_contactperson cp ON c.contact_person_id = cp.contact_person_id
                                JOIN md_companies co ON c.company_id = co.company_id
                                JOIN md_quotation_products qp ON q.quotation_id = qp.quotation_id
                                GROUP BY q.quotation_id`, [])

        res.send(data)
    })

    router.get('/getQuoClientIdByOcularId/:id', async (req, res) => {
        const { id } = req.params

        console.log(id)
        const data = await query('SELECT quotation_client_id FROM md_quotation_clients WHERE ocular_id = ?;', [id])

        res.send(data)
    })

    router.post('/postQuotation', async (req, res) => {

        const { offer, terms, id } = req.body

        try {
            
            // post tnc -> get id
            console.log('STEP 1: posting tnc')
            console.log(terms)
            const tnc_query = 'INSERT INTO md_tnc (A, B1, B2, B3, C1, C2, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, E) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            const data = Object.values(terms)

            console.log(data.length)

            const tnc_data = await query(tnc_query, data)
            const tnc_id = tnc_data.insertId

            console.log(tnc_data)


            console.log('STEP 2: posting quotation')

            // post quotation -> get id 
            const quo_query = 'INSERT INTO td_quotations (date_created, login_id, tnc_id, is_cancelled, quotation_client_id) VALUES (NOW(), 1, ?, 0, ?)'
            const quo_data = await query(quo_query, [tnc_id, id])
            const quo_id = quo_data.insertId

            console.log(quo_data)


            console.log('STEP 3: posting offer')

            //post products
            const offer_query = 'INSERT INTO md_quotation_products (quotation_id, product_id, discounted_price_each, quantity) VALUES (?, ?, ?, ?)'
            offer.map(async (off, index) => {

                console.log(`STEP 3.${index}: posting offer item`)

                const offer_data = await query(offer_query, [quo_id, off.product_id, off.discPrice, off.quantity])
                console.log(offer_data)
            })

            res.status(200).json({message: `Quotation successfully posted...`})
        } catch (error) {
            res.status(400).json({message: `Error... Failed to post quotation... ${error}`})
        }
    })

    return router
}