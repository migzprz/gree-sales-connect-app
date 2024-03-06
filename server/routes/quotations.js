const express = require('express')
const router = express.Router()

module.exports = (query) => {

    router.post('/getQuotations', async (req, res) => {

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