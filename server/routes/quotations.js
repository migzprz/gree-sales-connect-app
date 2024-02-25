const express = require('express')
const router = express.Router()

module.exports = (query) => {

    router.post('/getQuotations', async (req, res) => {

    })

    router.post('/postQuotation', async (req, res) => {
        // post location
        // use location id in new quotation client
        // post tnc
        // use quotation client and tnc id to create quotation
        // post items into quotation products, referencing the new quotation id
    })

    return router
}