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
                                    CONCAT(cp.last_name, ", ", cp.first_name) as client_name, cp.contact_number as client_number,
                                    co.company_name,
                                    CONCAT(loc.addr_street_name, " ", b.name, ", ", m.name, ", ", loc.zipcode, " ", p.name) as site_address,
                                    o.ocular_id
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
     * Returns an ocular record and related information by ID parameter
     */
    router.get('/getOcular/:id', async (req, res) => {
        try {
            const { id } = req.params
            const q =  `SELECT      ocular_date,
                                    CONCAT(cp.last_name, ", ", cp.first_name) as client_name, cp.contact_number as client_number, cp.email,
                                    co.company_name, co.tin,
                                    o.ocular_id,
                                    loc.*
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
                        WHERE o.ocular_id = ?
                        ORDER BY ocular_date ASC;`
            const data = await query(q, [id])
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

        const cp_values = [
            req.body.firstName,
            req.body.lastName,
            req.body.contactNumber,
            req.body.email
        ]

        const com_values = [
            req.body.companyName,
            req.body.tin
        ]

        const ocu_values = [
            req.body.ocular_date,
            req.body.login_id,
            req.body.technician
        ]

        const loc_values = [
            req.body.addr_region_id,
            req.body.addr_province_id,
            req.body.addr_municipality_id,
            req.body.addr_barangay_id,
            req.body.street_name,
            req.body.bldg_no,
            req.body.zipcode,
        ]

        try {
            // queries for client
            const cp_query = 'INSERT INTO md_contactperson (first_name, last_name, contact_number, email) VALUES (?, ?, ?, ?)'
            const com_query = 'INSERT INTO md_companies (company_name, tin) VALUES (?, ?)'
            const client_query = 'INSERT INTO md_clients (contact_person_id, company_id) VALUES (?,?)'
            let cp_data, com_data, client_data

            var client_id = req.body.client_id || null
            var location_id = req.body.location_id || null

            // STEP 1: INSERT NEW CLIENT IF APPLICABLE
            // if entirely new client
            if (client_id === null) {

                // TESTING
                console.log ('step 1 data: ', cp_values, com_values)

                // store new contact person and company record
                cp_data = await query(cp_query, cp_values)
                com_data = await query(com_query, com_values)

                // insert new client data with new contact person and company record 
                client_data = await query(client_query, [cp_data.insertId, com_data.insertId])

                // store client id as var
                client_id = client_data.insertId
                console.log('client data result: ', client_data, client_id)
            }

            // STEP 2: INSERT NEW OCULAR RECORD

            // TESTING
            console.log('step 2 data: ', ocu_values)

            const ocu_query = 'INSERT INTO td_oculars (ocular_date, login_id, technician_id, date_created) VALUES (?, ?, ?, NOW())'
            const ocu_data = await query(ocu_query, ocu_values)

            console.log('ocular data result: ', ocu_data)

            // STEP 3: INSERT LOCATION INFO
            // account for if the location selected already exist in the database
            if (location_id === null) {

                // TESTING:
                console.log('location query reached')
                console.log('step 3 data: ', loc_values)

                const loc_query = 'INSERT INTO md_locations (addr_region_id, addr_province_id, addr_municipality_id, addr_barangay_id, addr_street_name, addr_bldg_no, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?)'
                const loc_data = await query(loc_query, loc_values)
                location_id = loc_data.insertId

                // TESTING: 
                console.log('location_id: ', location_id)
                console.log(loc_data)
            }

            // STEP 4: INSERT NEW QUOTATION CLIENT RECORD
            // (client, ocular and location id)
            const quo_client_query = 'INSERT INTO md_quotation_clients (client_id, ocular_id, location_id) VALUES (?, ?, ?)'
            const quo_client_data = await query(quo_client_query, [client_id, ocu_data.insertId, location_id])

            res.status(200).json({message: `Ocular successfully posted ${quo_client_data}`})

        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed one or more database operations... ${error}`})
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