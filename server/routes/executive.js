const express = require('express')
const router = express.Router()

module.exports = (query) => {

    router.post('/postExpenses/:login', async (req, res) => {

        const id = req.params.login

        try {
            // query for main expense
            const expense_data = await query(`INSERT INTO td_expenses (date_created, login_id) VALUES (NOW(), ${id})`)

            res.status(200).json({message: `Data successfully posted`, data: expense_data.insertId})

        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed one or more database operations... ${error}`})
        }

    })

    return router;
}