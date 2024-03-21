const express = require('express')
const router = express.Router()

module.exports = (query) => {

      /**
     * Returns a list of all users
     */
      router.get('/getWarrantySearch', async (req, res) => {
        try {const data = await query(`  SELECT
        s.sales_id,
        q.quotation_id,
        p.product_id,
        p.unit_model,
        p.product_hp,
        p.product_type,
        p.is_inverter,
        d.delivery_date,
        SUM(qp.quantity) AS totalqty,
        CONCAT(cp.last_name, ", ", cp.first_name) as client_name,
        cp.contact_number as client_number,
        cm.company_name,
        cp.email,
        CONCAT(loc.addr_street_name, " ", b.name, ", ", m.name, ", ", loc.zipcode, " ", pr.name) as site_address,
        CONCAT(p.product_hp, ' HP ', UPPER(p.product_type), ' TYPE ', 
            CASE 
                WHEN p.is_inverter = 1 THEN 'INVERTER' 
                WHEN p.is_inverter = 0 THEN 'NON-INVERTER' 
            END) as description
    FROM
        td_sales s
        JOIN td_quotations q ON q.sales_id = s.sales_id
        JOIN md_quotation_products qp ON qp.quotation_id = q.quotation_id
        JOIN md_products p ON p.product_id = qp.product_id
        JOIN md_deliveries d ON d.quotation_id = q.quotation_id
        JOIN md_quotation_clients qc ON qc.quotation_client_id = q.quotation_client_id
        JOIN md_clients c ON qc.client_id = c.client_id
        JOIN md_companies cm ON cm.company_id = c.company_id
        JOIN md_contactperson cp ON cp.contact_person_id = c.contact_person_id
        JOIN md_locations loc ON qc.location_id = loc.location_id
        JOIN md_provinces pr ON loc.addr_province_id = pr.province_id
        JOIN md_municipalities m ON loc.addr_municipality_id = m.municipality_id
        JOIN md_barangays b ON loc.addr_barangay_id = b.barangay_id
    WHERE d.is_delivered = 1 AND NOT (DATE_ADD(d.delivery_date, INTERVAL 1 YEAR) <= CURDATE())
    GROUP BY
        s.sales_id,
        q.quotation_id,
        p.product_id,
        p.unit_model,
        p.product_hp,
        p.product_type,
        p.is_inverter,
        d.delivery_date,
        cp.last_name,
        cp.first_name,
        cp.contact_number,
        cm.company_name,
        cp.email,
        loc.addr_street_name,
        b.name,
        m.name,
        loc.zipcode,
        pr.name;`, [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getWarrantySearchDetails/:id', async (req, res) => {
        try {
            const { id } = req.params
            const q =  ` SELECT
            s.sales_id,
            q.quotation_id,
            p.product_id,
            p.unit_model,
            p.product_hp,
            p.product_type,
            p.is_inverter,
            delivery_date,
            SUM(qp.quantity) AS totalqty,
            CONCAT(cp.last_name, ", ", cp.first_name) as client_name,
            cp.contact_number as client_number,
            cm.company_name,
            cp.email,
            CONCAT(loc.addr_street_name, " ", b.name, ", ", m.name, ", ", loc.zipcode, " ", pr.name) as site_address,
            CONCAT(p.product_hp, ' HP ', UPPER(p.product_type), ' TYPE ', 
                CASE 
                    WHEN p.is_inverter = 1 THEN 'INVERTER' 
                    WHEN p.is_inverter = 0 THEN 'NON-INVERTER' 
                END) as description,
            CASE 
                WHEN DATE_ADD(delivery_date, INTERVAL 1 YEAR) <= CURDATE() THEN 0 
                ELSE 1 
            END as is_claimable
        FROM
            td_sales s
            JOIN td_quotations q ON q.sales_id = s.sales_id
            JOIN md_quotation_products qp ON qp.quotation_id = q.quotation_id
            JOIN md_products p ON p.product_id = qp.product_id
            JOIN md_deliveries d ON d.quotation_id = q.quotation_id
            JOIN md_quotation_clients qc ON qc.quotation_client_id = q.quotation_client_id
            JOIN md_clients c ON qc.client_id = c.client_id
            JOIN md_companies cm ON cm.company_id = c.company_id
            JOIN md_contactperson cp ON cp.contact_person_id = c.contact_person_id
            JOIN md_locations loc ON qc.location_id = loc.location_id
            JOIN md_provinces pr ON loc.addr_province_id = pr.province_id
            JOIN md_municipalities m ON loc.addr_municipality_id = m.municipality_id
            JOIN md_barangays b ON loc.addr_barangay_id = b.barangay_id
        WHERE q.quotation_id = ?
        GROUP BY
            s.sales_id,
            q.quotation_id,
            p.product_id,
            p.unit_model,
            p.product_hp,
            p.product_type,
            p.is_inverter,
            delivery_date,
            cp.last_name,
            cp.first_name,
            cp.contact_number,
            cm.company_name,
            cp.email,
            loc.addr_street_name,
            b.name,
            m.name,
            loc.zipcode,
            pr.name;`
            const data = await query(q, [id])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }

    })

    router.post('/postWarranty/', async (req, res) => {

        const { data } = req.body;
    
        try {
            // Insert main warranty data into td_warranty table
            const warranty_data = await query(`INSERT INTO td_warranty (date_created, login_id, quotation_id, is_completed) VALUES (NOW(), '${data.login_id}', '${data.quotation_id}', '${data.is_completed}')`);
            const warranty_id = warranty_data.insertId;

            if(data.installation_date !== null){
                const installation_data = await query(`INSERT INTO td_warranty_inspection (warranty_id, inspection_date, technician_id, is_completed) VALUES ('${warranty_id}', '${data.inspection_date}', '${data.inspection_technician_id}', '${data.is_completed}')`);
            }

            const service_data = await query(`INSERT INTO td_warranty_service (warranty_id, service_date, technician_id, is_completed) VALUES ('${warranty_id}', '${data.service_date}', '${data.service_technician_id}', '${data.is_completed}')`);
    

            for (const unit of data.claimed_units) {
                const { product_id, issue, for_claiming } = unit;
                if(for_claiming){
                // Insert claimed unit data into respective table
                await query(`INSERT INTO td_warranty_claimed_units (warranty_id, unit_id, issue) 
                                VALUES ('${warranty_id}', '${product_id}', '${issue}')`);
                }
            }
            
          
    
            res.status(200).json({ message: 'Data successfully posted' });
        } catch (error) {
            console.error('Error: ', error);
            res.status(400).json({ message: `Error... Failed one or more database operations... ${error}` });
        }
    });

    router.get('/getWarranties', async (req, res) => {
        try {const data = await query(`  SELECT
        DISTINCT q.quotation_id,
        s.sales_id,
        CONCAT(cp.last_name, ", ", cp.first_name) AS client_name,
        cp.contact_number AS client_number,
        cm.company_name,
        cp.email,
        w.date_created,
        CONCAT(loc.addr_street_name, " ", b.name, ", ", m.name, ", ", loc.zipcode, " ", pr.name) AS site_address,
        w.warranty_id,
        wi.inspection_date,
        ws.service_date,
        ws.service_completed,
        wi.inspection_completed,
        w.is_completed AS warranty_completed
    FROM
        td_sales s
        JOIN td_quotations q ON q.sales_id = s.sales_id
        JOIN md_quotation_products qp ON qp.quotation_id = q.quotation_id
        JOIN md_quotation_clients qc ON qc.quotation_client_id = q.quotation_client_id
        JOIN md_clients c ON qc.client_id = c.client_id
        JOIN md_companies cm ON cm.company_id = c.company_id
        JOIN md_contactperson cp ON cp.contact_person_id = c.contact_person_id
        JOIN md_locations loc ON qc.location_id = loc.location_id
        JOIN md_provinces pr ON loc.addr_province_id = pr.province_id
        JOIN md_municipalities m ON loc.addr_municipality_id = m.municipality_id
        JOIN md_barangays b ON loc.addr_barangay_id = b.barangay_id
        JOIN td_warranty w ON w.quotation_id = q.quotation_id
        LEFT JOIN (
            SELECT
                warranty_id,
                MAX(inspection_date) AS inspection_date,
                MIN(is_completed) AS inspection_completed
            FROM
                td_warranty_inspection
            GROUP BY
                warranty_id
        ) wi ON w.warranty_id = wi.warranty_id
        LEFT JOIN (
            SELECT
                warranty_id,
                MAX(service_date) AS service_date,
                MIN(is_completed) AS service_completed
            FROM
                td_warranty_service
            GROUP BY
                warranty_id
        ) ws ON w.warranty_id = ws.warranty_id
        WHERE w.is_completed = 0
    ORDER BY
        wi.inspection_date DESC,
        ws.service_date DESC
    
    `, [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    router.get('/getWarranty/:id', async (req, res) => {
        try {
            const { id } = req.params
            const q =  `SELECT DISTINCT q.quotation_id,
            s.sales_id,
            Concat(cp.last_name, ",", cp.first_name) AS client_name,
            cp.contact_number                         AS client_number,
            cm.company_name,
            cp.email,
            w.date_created,
            Concat(loc.addr_street_name, "", b.NAME, ",", m.NAME, ",",
            loc.zipcode, "",
            pr.NAME)                                  AS site_address,
            w.warranty_id,
            ws.warranty_service_id,
            wi.inspection_id,
            wi.inspection_date,
            ws.service_date,
            ws.service_completed,
            wi.inspection_completed,
            w.is_completed                            AS warranty_completed,
            Concat(ts.last_name, ",", ts.first_name) AS
            service_technician_name,
            Concat(ti.last_name, ",", ti.first_name) AS
            inspection_technician_name
FROM   td_sales s
   JOIN td_quotations q
     ON q.sales_id = s.sales_id
   JOIN md_quotation_products qp
     ON qp.quotation_id = q.quotation_id
   JOIN md_quotation_clients qc
     ON qc.quotation_client_id = q.quotation_client_id
   JOIN md_clients c
     ON qc.client_id = c.client_id
   JOIN md_companies cm
     ON cm.company_id = c.company_id
   JOIN md_contactperson cp
     ON cp.contact_person_id = c.contact_person_id
   JOIN md_locations loc
     ON qc.location_id = loc.location_id
   JOIN md_provinces pr
     ON loc.addr_province_id = pr.province_id
   JOIN md_municipalities m
     ON loc.addr_municipality_id = m.municipality_id
   JOIN md_barangays b
     ON loc.addr_barangay_id = b.barangay_id
   JOIN td_warranty w
     ON w.quotation_id = q.quotation_id
   LEFT JOIN (SELECT t1.warranty_id,
					 t1.inspection_id,
                     t1.technician_id AS inspection_technician,
                     t1.inspection_date,
                     t1.is_completed  AS inspection_completed
              FROM   td_warranty_inspection t1
                     JOIN (SELECT warranty_id,
                                  Max(inspection_date) AS
                                  max_inspection_date
                           FROM   td_warranty_inspection
                           GROUP  BY warranty_id) t2
                       ON t1.warranty_id = t2.warranty_id
                          AND t1.inspection_date = t2.max_inspection_date
              ORDER  BY t1.warranty_id) wi
          ON w.warranty_id = wi.warranty_id
   LEFT JOIN (SELECT t1.warranty_id,
					 t1.warranty_service_id,
                     t1.technician_id AS service_technician,
                     t1.service_date,
                     t1.is_completed  AS service_completed
              FROM   td_warranty_service t1
                     JOIN (SELECT warranty_id,
                                  Max(service_date) AS max_service_date
                           FROM   td_warranty_service
                           GROUP  BY warranty_id) t2
                       ON t1.warranty_id = t2.warranty_id
                          AND t1.service_date = t2.max_service_date
              ORDER  BY t1.warranty_id) ws
          ON w.warranty_id = ws.warranty_id
   JOIN md_technicians ts
     ON ws.service_technician = ts.technician_id
   JOIN md_technicians ti
     ON wi.inspection_technician = ti.technician_id
WHERE  w.warranty_id = ?
ORDER  BY wi.inspection_date DESC,
      ws.service_date DESC`
            const data = await query(q, [id])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }

    })

    router.get('/getClaimedUnits/:id', async (req, res) => {
        try {
            const { id } = req.params
            const q =  `  SELECT 
                                cu.warranty_id,
                                cu.unit_id,
                                CONCAT(p.product_hp, ' HP ', UPPER(p.product_type), ' TYPE ', 
                                CASE 
                                    WHEN p.is_inverter = 1 THEN 'INVERTER' 
                                    WHEN p.is_inverter = 0 THEN 'NON-INVERTER' END) as description,
                                p.unit_model,
                                cu.issue
                        FROM td_warranty_claimed_units cu
                        JOIN md_products p ON cu.unit_id = p.product_id
                        WHERE cu.warranty_id = ?;`
            const data = await query(q, [id])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }

    })

    router.patch('/changeWarrantyInspectionState/:id/:state/:note', async (req, res) => {
        try {
            const values = [req.params.state, req.params.note, req.params.id]
            const data = await query('UPDATE td_warranty_inspection SET is_completed = ?, notes=? WHERE inspection_id = ?', values)
            console.log(data)
            res.status(200).json({message: `Inspection successfully updated... ${data}`})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed to update inspection... ${error}`})
        }
    })

    router.post('/postWarrantyInspection/', async (req, res) => {

        const { data } = req.body;
    
        try {
            const inspection_data = await query(`INSERT INTO td_warranty_inspection (warranty_id, inspection_date, technician_id, is_completed) VALUES ('${data.warranty_id}', '${data.date}', '${data.technician_id}', '${data.is_completed}')`);
            res.status(200).json({ message: 'Data successfully posted' });
        } catch (error) {
            console.error('Error: ', error);
            res.status(400).json({ message: `Error... Failed one or more database operations... ${error}` });
        }
    });

    router.patch('/changeWarrantyServiceState/:id/:state/:note', async (req, res) => {
        try {
            const values = [req.params.state, req.params.note, req.params.id]
            const data = await query('UPDATE td_warranty_service SET is_completed = ?, notes = ? WHERE warranty_service_id = ?', values)
            console.log(data)
            res.status(200).json({message: `Service successfully updated... ${data}`})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed to update service... ${error}`})
        }
    })

    router.post('/postWarrantyService/', async (req, res) => {

        const { data } = req.body;
    
        try {
            const inspection_data = await query(`INSERT INTO td_warranty_service (warranty_id, service_date, technician_id, is_completed) VALUES ('${data.warranty_id}', '${data.date}', '${data.technician_id}', '${data.is_completed}')`);
            res.status(200).json({ message: 'Data successfully posted' });
        } catch (error) {
            console.error('Error: ', error);
            res.status(400).json({ message: `Error... Failed one or more database operations... ${error}` });
        }
    });

    router.patch('/updateInspection', async (req, res) => {
        const values = [req.body.date, req.body.technician_id, req.body.service_id];
        console.log(values)
        try {
            const data = await query('UPDATE td_warranty_inspection SET inspection_date = ?, technician_id = ? WHERE inspection_id = ?', values)
            console.log(data)
            res.status(200).json({message: `Inspection successfully updated... ${data}`})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed to update inspection... ${error}`})
        }
    })

    router.patch('/updateService', async (req, res) => {
        const values = [req.body.date, req.body.technician_id, req.body.service_id];
        console.log(values)
        try {
            const data = await query('UPDATE td_warranty_service SET service_date = ?, technician_id = ? WHERE warranty_service_id = ?', values)
            console.log(data)
            res.status(200).json({message: `Service successfully updated... ${data}`})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed to update service... ${error}`})
        }
    })

    router.post('/postWarrantyParts/:id', async (req, res) => {

        const { data } = req.body;
        const id = req.params.id;
    
        try {
            
            for (const unit of data) {
                const { part, quantity} = unit;
            
                // Insert claimed unit data into respective table
                await query(`INSERT INTO td_warranty_requested_parts (warranty_id, part_id, quantity) 
                                VALUES ('${id}', '${part}', '${quantity}')`);
            }
            
            res.status(200).json({ message: 'Data successfully posted' });
        } catch (error) {
            console.error('Error: ', error);
            res.status(400).json({ message: `Error... Failed one or more database operations... ${error}` });
        }
    });

    router.get('/getWarrantyRequestedParts/:id', async (req, res) => {
        try {
            const { id } = req.params
            const q =  `  SELECT wr.requested_part_id, wr.part_id, wr.quantity, wr.warranty_id, p.description, p.name, wr.date_claimed
            FROM td_warranty_requested_parts wr
            JOIN md_parts p ON p.parts_id = wr.part_id
            WHERE wr.warranty_id = ?;
                                  `
            const data = await query(q, [id])
            console.log(data)
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }

    })


    router.patch('/changeWarrantyState/:id/:state', async (req, res) => {
        try {
            const values = [req.params.state, req.params.id]
            const data = await query('UPDATE td_warranty SET is_completed = ? WHERE warranty_id = ?', values)
            console.log(data)
            res.status(200).json({message: `Service successfully updated... ${data}`})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed to update service... ${error}`})
        }
    })

    router.patch('/claimWarrantyRequestedPart/:id', async (req, res) => {
        try {
            const values = [req.params.id]
            const data = await query('UPDATE td_warranty_requested_parts SET date_claimed = NOW() WHERE requested_part_id = ?', values)
            console.log(data)
            res.status(200).json({message: `Requested Part successfully updated... ${data}`})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed to update Requested Part... ${error}`})
        }
    })

    router.get('/getDeductableUnits', async (req, res) => {
        try {const data = await query(`  SELECT w.warranty_id, w.quotation_id, wc.unit_id, COUNT(wc.claimed_unit_id) AS qty_claimed
        FROM td_warranty w
        JOIN td_warranty_claimed_units wc ON w.warranty_id = wc.warranty_id
        WHERE w.is_completed = 0
        GROUP BY  w.quotation_id, w.warranty_id, wc.unit_id;`, [])
            console.log(data)
        
            res.send(data)
        } catch (error) {
            console.error('Error: ', error)
            throw error
        }
    })

    



    return router;
}