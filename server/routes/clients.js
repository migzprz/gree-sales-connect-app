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
                                        LEFT JOIN md_companies co ON c.company_id = co.company_id
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
                                co.company_id,
                                cp.contact_person_id,
                                co.company_name, 
                                CONCAT(cp.last_name, ', ', cp.first_name) as client_name, 
                                cp.email, 
                                cp.contact_number, 
                                cp.last_name, 
                                cp.first_name, 
                                co.tin
                        FROM md_clients c 
                        LEFT JOIN md_companies co ON c.company_id = co.company_id
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

    router.patch('/updateContactPerson/:id', async (req, res) => {
        const id = req.params.id
        const data = Object.fromEntries(
            // Use Object.entries to get key-value pairs, and filter out null values
            Object.entries(req.body).filter(([key, value]) => value !== '' && value !== null)
        );

        try {
            let updateResponse
            console.log('patch client data w/ id:', data)
            const columnsToUpdate = Object.keys(data).map(column => `${column} = ?`).join(', ');
            const values = [...Object.values(data), id];
            updateResponse = await query(`UPDATE md_contactperson SET ${columnsToUpdate} WHERE contact_person_id = ?`, values)

            res.status(200).json({message: `Contact Person successfully updated... ${updateResponse}`})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed to update company record... ${error}`})
        }
    })

    router.patch('/updateCompany/:id', async (req, res) => {
        const id = req.params.id
        const data = Object.fromEntries(
            // Use Object.entries to get key-value pairs, and filter out null values
            Object.entries(req.body).filter(([key, value]) => value !== '' && value !== null)
        );

        try {
            let updateResponse
            console.log('patch company data w/ id:', data)
            const columnsToUpdate = Object.keys(data).map(column => `${column} = ?`).join(', ');
            const values = [...Object.values(data), id];
            updateResponse = await query(`UPDATE md_companies SET ${columnsToUpdate} WHERE company_id = ?`, values)

            res.status(200).json({message: `Company successfully updated... ${updateResponse}`})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed to update company record... ${error}`})
        }
    })


    router.post('/transferClientCompany/:id', async (req, res) => {
        const id = req.params.id
        const company_values = [
            req.body.company_name,
            req.body.tin
        ]

        try {
            // queries for client
            const company_query = 'INSERT INTO md_companies (company_name, tin) VALUES (?,?)'
            const company_data = await query(company_query, company_values)
            res.status(200).json({message: `Data successfully posted`, data: company_data.insertId})
            const company_id = company_data.insertId;

            await query(`INSERT INTO md_clients (contact_person_id, company_id) 
                        VALUES ('${id}', '${company_id}')`);

            

        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed one or more database operations... ${error}`})
        }
    })


    return router;
}