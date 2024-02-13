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
            const data = await query(`SELECT 	ocular_date, 
                                    CONCAT(t.last_name, ", ", t.first_name, " ", t.middle_name) as technician_name,
                                    CONCAT(cp.last_name, ", ", cp.first_name, " ", cp.middle_name) as client_name, cp.contact_number as client_number,
                                    co.company_name,
                                    CONCAT(loc.addr_street_name, " ", b.name, ", ", m.name, ", ", loc.zipcode, " ", p.name) as site_address
                                    FROM td_oculars o 
                                    JOIN md_quotation_clients qc ON o.ocular_id = qc.ocular_id
                                    JOIN md_technicians t ON o.technician_id = t.technician_id
                                    JOIN md_clients cl ON qc.client_id = cl.client_id
                                    JOIN md_contactperson cp ON cl.contact_person_id = cp.contact_person_id
                                    JOIN md_companies co ON cl.company_id = co.company_id
                                    JOIN md_locations loc ON qc.location_id = loc.location_id
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

        const location_name = req.body.location_name || null

        const client_values = [
            req.body.firstName,
            req.body.lastName,
            req.body.contactNumber,
            req.body.email,
            req.body.tin
        ]

        const ocu_values = [
            req.body.ocular_date,
            req.body.login_id,
            req.body.technician
        ]

        const loc_values = [
            req.body.region,
            req.body.province,
            req.body.city,
            req.body.baragay,
            req.body.street_name,
            req.body.bldg_no,
            req.body.zipcode,
            location_name
        ]

        var client_id = req.body.client_id
        var company_id = req.body.company_id

        const quo_client_values = [
            client_id,
            company_id
        ]

        // new post ocular using `md_quotation_clients`
        try {

            // check whether user is trying to input new client and company data
            if (client_id === null || company_id === null) {
                const client_query = 'INSERT INTO md_clients (first_name, last_name, email, contact_number, tin) VALUES (?, ?, ?, ?, ?)'
                try {
                    const client_data = await query(client_query, client_values)
                    quo_client_values[0] = client_data.insertId
                    
                } catch (error) {
                    // check if there 
                    res.status(400).json({message: `Error... Failed in recording new client information... ${error}`})
                }
            }


            // post new location record
            const loc_query = 'INSERT INTO md_locations (addr_region_id, addr_province_id, addr_municipality_id, addr_barangay_id, addr_street_name, addr_bldg_no, zipcode, location_name) VALUES (?, ?, ?, ?, ?, ?, ?, ? )'
            const loc_data = await query(loc_query, loc_values)

            // post new ocular record
            const ocu_query = 'INSERT INTO td_oculars (ocular_date, login_id, technician_id, date_created) VALUES (?, ?, ?, NOW())'
            const ocu_data = await query(ocu_query, ocu_values)

            // post new quotation client record
            const quo_client_query = 'INSERT INTO md_quotation_client (client_id, company_id, ocular_id, location_id) VALUES (?, ?, ?, ?)'
            const quo_client_data = await query(quo_client_query, [...quo_client_values, ocu_data.insertId, loc_data.insertId])

            res.status(200).json({message: 'Success... New ocular added to the database'})
            
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