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
            const data = await query(`SELECT ocular_date, 
                                        CONCAT(t.last_name, ", ", t.first_name, " ", t.middle_name) as technician_name, c.company_name, 
                                        CONCAT(cl.last_name, ", ", cl.first_name, " ", cl.middle_name) as client_name, cl.contact_number as client_number,
                                        CONCAT(loc.addr_street_name, " ", b.name, ", ", m.name, ", ", loc.zipcode, " ", p.name) as site_address
                                        FROM greesalesconnect.td_oculars o
                                        JOIN md_login l ON o.login_id = l.login_id
                                        JOIN md_technicians t ON o.technician_id = t.technician_id
                                        JOIN td_quotations q ON o.quotation_id = q.quotation_id
                                        JOIN md_companies c ON q.company_id = c.company_id
                                        JOIN md_clients cl ON q.client_id = cl.client_id
                                        JOIN md_locations loc ON q.location_id = loc.location_id
                                        JOIN md_provinces p ON loc.addr_province_id = p.province_id
                                        JOIN md_municipalities m ON loc.addr_municipality_id = m.municipality_id
                                        JOIN md_barangays b ON loc.addr_barangay_id = b.barangay_id
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

        const region_id = req.body.region_id
        const location_id = req.body.location_id

        const values = [
            req.body.ocular_date,
            req.body.login_id,
            req.body.technician_id
        ]

        const loc_values = [
            region_id,
            req.body.province_id,
            req.body.municipality_id,
            req.body.barangay_id,
            req.body.street_name,
            req.body.bldg_no,
            req.body.zipcode
        ]

        const quo_values = [
            req.body.client_id, 
            req.body.company_id
        ]


        try {
            
            const quotations_query = 'INSERT INTO td_quotations (client_id, company_id, location_id, login_id, date_created ) VALUES (?, ?, ?, ?, NOW())'
            let quo_data, val
            
            if (region_id !== null) { // new location 
                const loc_query_partial = 'INSERT INTO md_locations (addr_region_id, addr_province_id, addr_municipality_id, addr_barangay_id, addr_street_name, addr_bldg_no, zipcode'
                const with_name = ', location_name) VALUES (?, ?, ?, ?, ?, ?, ?, ? )'
                const wo_name = ') VALUES (?, ?, ?, ?, ?, ?, ?)'

                // change function parameter for location query depending on the presence of a location name
                if (req.body.location_name === null) {
                    location_query = loc_query_partial + wo_name
                    val = loc_values
                } else {
                    location_query = loc_query_partial + with_name
                    val = [...loc_values, req.body.location_name]
                }
                // POSTING new location record
                const loc_data = await query(location_query, val)
                console.log('new location record: ', loc_data)
                console.log('new location_id: ', loc_data.insertId)

                // POSTING new quotation query record
                quo_data = await query(quotations_query, [...quo_values, loc_data.insertId, req.body.login_id])
                console.log(quo_data)

            } else { // location already recorded in the db

                // POSTING new quotation query record
                quo_data = await query(quotations_query, [...quo_values, location_id, req.body.login_id])
                console.log('new quotation record: ', quo_data)
            }

            // POSTING new ocular record
            const data = await query('INSERT INTO td_oculars (ocular_date, login_id, technician_id, quotation_id, date_created) VALUES (?, ?, ?, ?, NOW())', [...values, quo_data.insertId])
            console.log('new ocular record: ', data)

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