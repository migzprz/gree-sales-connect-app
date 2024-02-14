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
            const data = await query(`SELECT location_id, CONCAT(loc.addr_street_name, " ", b.name, ", ", m.name, ", ", loc.zipcode, " ", p.name) as site_address,
                                      p.province_id, m.municipality_id, b.barangay_id,  r.region_id
                                        FROM md_locations loc
                                        JOIN md_regions r ON loc.addr_region_id = r.region_id
                                        JOIN md_provinces p ON loc.addr_province_id = p.province_id
                                        JOIN md_municipalities m ON loc.addr_municipality_id = m.municipality_id
                                        JOIN md_barangays b ON loc.addr_barangay_id = b.barangay_id`, [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })
    return router;
}