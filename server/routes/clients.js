const express = require('express')
const router = express.Router()

module.exports = (query) => {

      /**
     * Returns a list of clients
     */
      router.get('/getAllClients', async (req, res) => {
        try {
            const data = await query(`  SELECT c.client_id, 
                                                co.company_name, 
                                                CONCAT(cp.last_name, ', ', cp.first_name) as client_name, 
                                                cp.email, 
                                                cp.contact_number, 
                                                cp.last_name, 
                                                cp.first_name, 
                                                co.tin
                                        FROM md_clients c 
                                        JOIN md_companies co ON c.company_id = co.company_id
                                        JOIN md_contactperson cp ON c.contact_person_id = cp.contact_person_id
                                        JOIN (SELECT MAX(client_id) AS max_client_id, contact_person_id
                                            FROM md_clients
                                            GROUP BY contact_person_id) mc ON mc.max_client_id = c.client_id AND mc.contact_person_id = c.contact_person_id
                                        ORDER BY client_name ASC;`, [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

     /**
     * Returns the data of a specific client based on param id
     */
    router.get('/getClient/:id', async (req, res) => {
        try {
            const { id } = req.params
            const q =  `SELECT c.client_id, 
                                co.company_name, 
                                CONCAT(cp.last_name, ', ', cp.first_name) as client_name, 
                                cp.email, 
                                cp.contact_number, 
                                cp.last_name, 
                                cp.first_name, 
                                co.tin
                        FROM md_clients c 
                        JOIN md_companies co ON c.company_id = co.company_id
                        JOIN md_contactperson cp ON c.contact_person_id = cp.contact_person_id
                        WHERE c.client_id = ?;`
            const data = await query(q, [id])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }

    })


    return router;
}