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
            const data = await query(`SELECT ocular_date, CONCAT(l.last_name, ", ", l.first_name, " ", l.middle_name) as user_name,
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
     * Database design:
     *  // In md_oculars: date_created and login_id belong to the user who created the ocular 
     *
     * Other tables will need to have data stored:
     *     // md_locations: create new record, stores the location where the ocular will be performed 
     *     // md_quotations: create new record, store client, company and location id 
     *
     */
    router.post('/postOcular', async (req, res) => {

        const values = [
            req.body.ocular_date,
            req.body.login_id,
            req.body.technician_id
        ]

        const loc_values = [
            req.body.region_id,
            req.body.province_id,
            req.body.municipality_id,
            req.body.barangay_id,
            req.body.street_name,
            req.body.bldg_no,
            req.body.zipcode
        ]

        const ocu_values = [
            req.body.client_id, 
            req.body.company_id
        ]

        console.log(values)

        try {
            const data = await query('INSERT INTO td_oculars (ocular_date, date_created, login_id, technician_id) VALUES (?, NOW(), ?, ?)', values)
            const loc_data = await query('INSERT INTO md_locations (addr_region_id, addr_province_id, addr_municipality_id, addr_barangay_id, addr_street_name, addr_bldg_no, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, )', loc_values)

            console.log(loc_data.insertId)

            const ocu_data = await query('INSERT INTO md_oculars (client_id, company_id, location_id) VALUES (?, ?, ?)', [...ocu_values, loc_data.insertId])

            console.log(data)
            res.status(200).json({message: 'Success... New ocular added to database'})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed one or more database operations... ${error}`})
            throw error
        }
    })


    // Determining Quotation Statuses:
    /**
     * Ocular made, not converted to quotation ---- md_quotations.login_id IS NULL
     * Quotation converted to sale ---- md_quotation.sale_id IS NOT NULL
     *  
     */

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