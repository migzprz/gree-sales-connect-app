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
            const q =  `  SELECT
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
                                pr.name; `
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
                const { product_id, quantity, issue } = unit;
            
                // Insert claimed unit data into respective table
                await query(`INSERT INTO td_warranty_claimed_units (warranty_id, unit_id, issue, quantity) 
                                VALUES ('${warranty_id}', '${product_id}', '${issue}', '${quantity}')`);
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
      ws.service_date DESC `
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
                                cu.quantity,
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

    return router;
}