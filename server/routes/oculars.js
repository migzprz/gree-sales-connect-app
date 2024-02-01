const express = require('express')
const router = express.Router()

module.exports = (query) => {

    // COPY AND PASTE LINE TO INSERT NEW QUERY
    // try {
    //     const data = await query('', [])
    //     console.log(data)
    //
    //      ... insert extra code here ...
    //
    //     res.send(data)
    // } catch (error) {
    //     console.error('Error: ', error)
    //     throw error
    // }


    /**
     * Returns the list of pending oculars to perform by searching for records
     * in the ocular table without a quotation id
     * 
     * Sorted by ocular date in ascending order (earliest oculars first)
     */
    router.get('/getOculars', async (req, res) => {
        try {
            const data = await query(`SELECT ocular_date, date_created, CONCAT(l.last_name, ", ", l.first_name, " ", l.middle_name) as user_name,
                                      CONCAT(t.last_name, ", ", t.first_name, " ", t.middle_name) as technician_name, t.email, t.contact_number
                                      FROM greesalesconnect.td_oculars o
                                      JOIN md_login l ON o.login_id = l.login_id
                                      JOIN md_technicians t ON o.technician_id = t.technician_id 
                                      WHERE quotation_id IS NULL
                                      ORDER BY ocular_date ASC;`, [])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    /**
     * Posts form data containing details of a new ocular
     */
    router.post('/postOcular', async (req, res) => {

        const values = [
            req.body.ocular_date,
            req.body.login_id,
            req.body.technician_id
        ]

        console.log(values)

        try {
            const data = await query('INSERT INTO td_oculars (ocular_date, date_created, login_id, technician_id) VALUES (?, NOW(), ?, ?)', values)
            console.log(data)
            res.status(200).json({message: 'Success... New ocular added to database'})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: 'Error... Unable to add entry to database'})
            throw error
        }
    })


    // extra dev notes:
    /**
     *  sample response for POST requests
     * 
     * ResultSetHeader {
     *    fieldCount: 0,
     *    affectedRows: 1,
     *    insertId: 5,
     *    info: '',
     *    serverStatus: 2,
     *    warningStatus: 0,
     *    changedRows: 0
}
     */

    return router;
}