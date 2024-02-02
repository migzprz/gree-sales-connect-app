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
            const data = await query('SELECT CONCAT(last_name, ", ", first_name, " ", middle_name) as complete_name, email, contact_number FROM md_technicians', [])
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
            const data = await query('SELECT * FROM md_locations', [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })
    return router;
}