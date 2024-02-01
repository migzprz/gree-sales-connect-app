const express = require('express')
const router = express.Router()

module.exports = (query) => {

    router.get('/getOculars', async (req, res) => {
        try {
            const data = await query('SELECT * FROM td_oculars', [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    return router;
}