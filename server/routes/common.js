// for get requests that will be used throughout multiple modules

const express = require('express')
const router = express.Router()

module.exports = (query) => {

    router.get('/getLogin', async (req, res) => {

        try {
            const data = await query('SELECT CONCAT(last_name, ", ", first_name, " ", middle_name) as complete_name, role FROM md_login', [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getTechnicians', async (req, res) => {
        try {
            const data = await query('SELECT CONCAT(last_name, ", ", first_name, " ", middle_name) as complete_name, email, contact_number, technician_id FROM md_technicians', [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getCompanies', async (req, res) => {
        try {
            const data = await query('SELECT * FROM md_companies', [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getContactPerson', async (req, res) => {
        try {
            const data = await query('SELECT * FROM md_contactperson', [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })


    /**
     *  Returns the list of regions, provinces, municipalities and barangays
     */
    router.get('/getLocationsForAddressInForms', async (req, res) => {

        try {
            const regions = await query('SELECT * FROM md_regions', [])
            const provinces = await query('SELECT * FROM md_provinces', [])
            const municipalities = await query('SELECT * FROM md_municipalities', [])
            const barangays = await query('SELECT * FROM md_barangays', [])

            const locations = {
                regions,
                provinces,
                municipalities,
                barangays
            }
        
            res.send(locations)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    /**
     * Returns list of stored locations for drop down use
     */
    router.get('/getStoredLocations', async (req, res) => {
        try {
            const data = await query(`SELECT location_id, CONCAT(loc.addr_bldg_no, " ", loc.addr_street_name, " ", b.name, ", ", m.name, ", ", loc.zipcode, " ", p.name) as site_address,
                                      p.province_id, m.municipality_id, b.barangay_id,  r.region_id
                                        FROM md_locations loc
                                        JOIN md_regions r ON loc.addr_region_id = r.region_id
                                        JOIN md_provinces p ON loc.addr_province_id = p.province_id
                                        JOIN md_municipalities m ON loc.addr_municipality_id = m.municipality_id
                                        JOIN md_barangays b ON loc.addr_barangay_id = b.barangay_id`, [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            
        }
    })

    /**
     * Returns a list of clients and accompanying data for returning clients selector for setting oculars
     */
    router.get('/getClients', async (req, res) => {
        try {
            const data = await query(`SELECT c.client_id, company_name, CONCAT(cp.last_name, ", ", cp.first_name) as client_name, cp.email, cp.contact_number, cp.last_name, cp.first_name, co.tin
                                    FROM md_clients c 
                                    JOIN md_companies co ON c.company_id = co.company_id
                                    JOIN md_contactperson cp ON c.contact_person_id = cp.contact_person_id
                                    ORDER BY client_name ASC;`, [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    /**
     *  Return a list of selectable products 
     */
    router.get('/getProducts', async (req, res) => {
        try {
            const data = await query(`SELECT *,
                                    CONCAT(product_hp, ' HP ', UPPER(product_type), ' TYPE ', 
                                    CASE 
                                        WHEN is_inverter = 1 THEN 'INVERTER' 
                                        WHEN is_inverter = 0 THEN 'NON-INVERTER' END) as display
                                    FROM greesalesconnect.md_products
                                    ORDER BY unit_model ASC;`, [])
            console.log(data)

            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    /**
     * Returns a string based of the identifiers of the address columns excluding the unit no, street and zipcode
     */
    router.get('/getAddressString', async (req, res) => {
        try {
            const data = await query(`SELECT CONCAT(b.name, ",", m.name, ",", p.name) as site_address
                                    FROM md_regions r 
                                    JOIN md_provinces p ON r.region_id = p.region_id
                                    JOIN md_municipalities m ON p.province_id = m.province_id
                                    JOIN md_barangays b ON m.municipality_id = b.municipality_id
                                    WHERE r.region_id = ?
                                    AND p.province_id = ?
                                    AND m.municipality_id = ?
                                    AND b.barangay_id = ?`, [req.body])
            console.log(data)

            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getServices', async (req, res) => {
        try {
            const data = await query('SELECT * FROM md_services WHERE is_active = 1', [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getParts', async (req, res) => {
        try {
            const data = await query('SELECT * FROM md_parts WHERE is_active = 1', [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    return router;
}