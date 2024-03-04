const express = require('express')
const router = express.Router()

module.exports = (query) => {

    router.post('/getQuotations', async (req, res) => {

    })

    router.post('/postQuotation', async (req, res) => {

        const { offer, client, terms } = req.body
        console.log(offer, client, terms)

        try {
            // post quotation client -> get id

            // post tnc -> get id

            // post quotation -> get id

            

            // post products
            // const offerQuery = 'INSER INTO md_quotation_products (quotation_id, product_id, discounted_price_each, quantity) VALUES ?'
            // const offerResponse = 

            res.status(200).json({message: `Quotation successfully posted... ${offer}`})
        } catch (error) {
            res.status(400).json({message: `Error... Failed to post quotation... ${error}`})
        }

        // reuse posting quotation client logic in oculars
        // post tnc
        // use quotation client and tnc id to create quotation
        // post items into quotation products, referencing the new quotation id
    })

    return router
}