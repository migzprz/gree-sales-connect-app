const express = require('express')
const router = express.Router()

module.exports = (query) => {

    router.get('/getQuotations', async (req, res) => {
        const data = await query(`SELECT q.quotation_id, q.date_created,
                                CONCAT(cp.last_name, ", ", cp.first_name) as client_name, cp.contact_number as client_number,
                                co.company_name,
                                COALESCE(totalProducts, 0) + COALESCE(totalServices, 0) + COALESCE(totalParts, 0) AS totalPrice, q.is_cancelled
                                FROM td_quotations q
                                JOIN md_quotation_clients qc ON q.quotation_client_id = qc.quotation_client_id
                                JOIN md_clients c ON qc.client_id = c.client_id
                                JOIN md_contactperson cp ON c.contact_person_id = cp.contact_person_id
                                JOIN md_companies co ON c.company_id = co.company_id
                                LEFT JOIN (
                                    SELECT
                                        quotation_id,
                                        SUM(discounted_price_each * quantity) AS totalProducts
                                    FROM
                                        md_quotation_products
                                    GROUP BY
                                        quotation_id
                                ) qp ON q.quotation_id = qp.quotation_id
                                LEFT JOIN (
                                    SELECT
                                        quotation_id,
                                        SUM(discounted_price_each * quantity) AS totalServices
                                    FROM
                                        md_quotation_services
                                    GROUP BY
                                        quotation_id
                                ) qs ON q.quotation_id = qs.quotation_id
                                LEFT JOIN (
                                    SELECT
                                        quotation_id,
                                        SUM(discounted_price_each * quantity) AS totalParts
                                    FROM
                                        md_quotation_parts
                                    GROUP BY
                                        quotation_id
                                ) qr ON q.quotation_id = qr.quotation_id 
                                WHERE q.sales_id IS NULL
                                ORDER BY q.is_cancelled ASC;`, [])

        res.send(data)
    })

    router.get('/getQuotationDetailsById/:id', async (req, res) => {
        
        const id = req.params.id
        // getting the client info
        const clientQuery = `SELECT q.date_created, CONCAT(cp.last_name, ", ", cp.first_name) as client_name, cp.contact_number,
                            CONCAT(l.addr_bldg_no, " ", l.addr_street_name, " ", b.name, ", ", m.name, ", ", l.zipcode, " ", p.name) as site_address,
                            co.tin, co.company_name
                            FROM td_quotations q
                            JOIN md_quotation_clients qc ON q.quotation_client_id = qc.quotation_client_id
                            JOIN md_clients c ON qc.client_id = c.client_id
                            JOIN md_contactperson cp ON c.contact_person_id = cp.contact_person_id
                            JOIN md_companies co ON c.company_id = co.company_id
                            JOIN md_locations l ON qc.location_id = l.location_id
                            JOIN md_provinces p ON l.addr_province_id = p.province_id
                            JOIN md_municipalities m ON l.addr_municipality_id = m.municipality_id
                            JOIN md_barangays b ON l.addr_barangay_id = b.barangay_id
                            WHERE q.quotation_id = ?`
        const clientResponse = await query(clientQuery, [id])

        // getting the product info
        const productQuery =   `SELECT p.product_id, qp.quantity, qp.discounted_price_each*qp.quantity AS totalPrice, p.product_srp as srp, p.unit_model, qp.discounted_price_each as discPrice,
                                CONCAT(product_hp, ' HP ', UPPER(product_type), ' TYPE ', CASE WHEN is_inverter = 1 THEN 'INVERTER' WHEN is_inverter = 0 THEN 'NON-INVERTER' END) as article
                                FROM md_quotation_products qp
                                JOIN md_products p ON qp.product_id = p.product_id
                                WHERE qp.quotation_id = ?`
        const productResponse = await query(productQuery, [id])
        const products = productResponse.map(obj => {
            // Create a new object with the existing properties and the new property
            return { ...obj, unit: 'UNIT' };
        });

        // getting the services info
        const servicesQuery =  `SELECT s.services_id, s.description as article, s.service_srp AS srp, qs.discounted_price_each*qs.quantity as totalPrice, qs.quantity, qs.discounted_price_each as discPrice
                                FROM md_quotation_services qs
                                JOIN md_services s ON qs.services_id = s.services_id
                                WHERE quotation_id = ?`
        const servicesResponse = await query(servicesQuery, [id])
        const services = servicesResponse.map(obj => {
            return { ...obj, unit: 'SERVICE' };
        });
        // getting the parts info
        const partsQuery = `SELECT p.parts_id, CONCAT(p.description, ' ', '(', p.name, ')') as article, p.parts_srp as srp, qp.quantity, (qp.discounted_price_each*qp.quantity) as totalPrice, qp.discounted_price_each as discPrice
                            FROM md_quotation_parts qp
                            JOIN md_parts p ON qp.parts_id = p.parts_id
                            WHERE qp.quotation_id = ?`
        const partsResponse = await query(partsQuery, [id])
        const parts = partsResponse.map(obj => {
            return { ...obj, unit: 'PARTS' };
        });

        const termsQuery = `SELECT t.*
                            FROM td_quotations q
                            JOIN md_tnc t ON q.tnc_id = t.tnc_id
                            WHERE q.quotation_id = ?`
        const termsResponse = await query(termsQuery, [id])

        const quotation = [
            ...products,
            ...services,
            ...parts
        ]

        const data = {
            client: clientResponse,
            quotation: quotation,
            total: quotation.reduce((sum, item) => {
                return sum + item.totalPrice
            }, 0),
            term: termsResponse
        }

        console.log(data)

        res.send(data)
    })

    router.get('/getQuoClientIdByOcularId/:id', async (req, res) => {
        const { id } = req.params

        console.log(id)
        const data = await query('SELECT quotation_client_id FROM md_quotation_clients WHERE ocular_id = ?;', [id])

        res.send(data)
    })

    router.get('/getQuoClientIdByQuoId/:id', async (req, res) => {
        const { id } = req.params

        console.log(id)
        const data = await query('SELECT quotation_client_id FROM td_quotations WHERE quotation_id = ?', [id])

        res.send(data)
    })

    router.get('/doesQuotationContainOnlyService/:id', async (req, res) => {
        const { id } = req.params

        const data = await query(`SELECT
        CASE
            WHEN EXISTS (
                SELECT *
                FROM md_quotation_products qp
                WHERE qp.quotation_id = q.id
            ) THEN FALSE
            WHEN EXISTS (
                SELECT *
                FROM md_quotation_parts qr
                WHERE qr.quotation_id = q.id
            ) THEN FALSE
            WHEN EXISTS (
                SELECT *
                FROM md_quotation_services qs
                WHERE qs.quotation_id = q.id
            ) THEN TRUE
        END AS is_only_service,
        COALESCE(
            (SELECT TRUE
             FROM md_quotation_services qs
             WHERE qs.quotation_id = q.id
             LIMIT 1), 
            FALSE) AS has_service
        FROM (SELECT ? AS id) AS q`, [id])

        res.send(data)
    })

    router.get('/quotationTotalPrice/:id', async (req, res) => {
        const { id } = req.params
        const data = await query(`SELECT COALESCE(totalProducts, 0) + COALESCE(totalServices, 0) + COALESCE(totalParts, 0) AS totalPrice
                                FROM td_quotations q
                                JOIN md_quotation_clients qc ON q.quotation_client_id = qc.quotation_client_id
                                LEFT JOIN (
                                    SELECT
                                        quotation_id,
                                        SUM(discounted_price_each * quantity) AS totalProducts
                                    FROM
                                        md_quotation_products
                                    GROUP BY
                                        quotation_id
                                ) qp ON q.quotation_id = qp.quotation_id
                                LEFT JOIN (
                                    SELECT
                                        quotation_id,
                                        SUM(discounted_price_each * quantity) AS totalServices
                                    FROM
                                        md_quotation_services
                                    GROUP BY
                                        quotation_id
                                ) qs ON q.quotation_id = qs.quotation_id
                                LEFT JOIN (
                                    SELECT
                                        quotation_id,
                                        SUM(discounted_price_each * quantity) AS totalParts
                                    FROM
                                        md_quotation_parts
                                    GROUP BY
                                        quotation_id
                                ) qr ON q.quotation_id = qr.quotation_id
                                WHERE q.quotation_id = ?;`, [id])
        res.send(data)
    })

    router.post('/postQuotation', async (req, res) => {

        const { offer, terms, id, sales_id } = req.body

        try {
            
            // post tnc -> get id
            console.log('STEP 1: posting tnc')
            console.log(terms)
            const tnc_query = 'INSERT INTO md_tnc (A, B1, B2, B3, C1, C2, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, E) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            const data = Object.values(terms)

            console.log(data.length)

            const tnc_data = await query(tnc_query, data)
            const tnc_id = tnc_data.insertId

            console.log(tnc_data)


            console.log('STEP 2: posting quotation')

            // post quotation -> get id 
            let quo_id, quo_data
            if (sales_id) {
                console.log('STEP 2.1: sales id detected')
                const quo_query = 'INSERT INTO td_quotations (date_created, login_id, tnc_id, is_cancelled, quotation_client_id, sales_id) VALUES (NOW(), 1, ?, 0, ?, ?)'
                quo_data = await query(quo_query, [tnc_id, id, sales_id])
                quo_id = quo_data.insertId
            } else {
                console.log('STEP 2.1: creating new quotations')
                const quo_query = 'INSERT INTO td_quotations (date_created, login_id, tnc_id, is_cancelled, quotation_client_id) VALUES (NOW(), 1, ?, 0, ?)'
                quo_data = await query(quo_query, [tnc_id, id])
                quo_id = quo_data.insertId
            }

            console.log(quo_data)


            console.log('STEP 3: posting offer')

            //post products
            const offer_queryProduct = 'INSERT INTO md_quotation_products (quotation_id, product_id, discounted_price_each, quantity) VALUES (?, ?, ?, ?)'
            const offer_queryService = 'INSERT INTO md_quotation_services (quotation_id, services_id, discounted_price_each, quantity) VALUES (?, ?, ?, ?)'
            const offer_queryParts = 'INSERT INTO md_quotation_parts (quotation_id, parts_id, discounted_price_each, quantity) VALUES (?, ?, ?, ?)'
            offer.map(async (off, index) => {

                console.log(`STEP 3.${index}: posting offer item`)
                // determine offer type
                const offering = off.unit
                if (offering === 'product' || offering === 'UNIT') {
                    console.log('Offering is a', offering)
                    const offer_data = await query(offer_queryProduct, [quo_id, off.product_id, off.discPrice, off.quantity])
                    console.log(offer_data)
                }
                else if (offering.toLowerCase() === 'service'){
                    console.log('Offering is a', offering)
                    const offer_data = await query(offer_queryService, [quo_id, off.services_id, off.discPrice, off.quantity])
                    console.log(offer_data)
                }
                else if (offering.toLowerCase() === 'parts'){
                    console.log('Offering is a', offering)
                    const offer_data = await query(offer_queryParts, [quo_id, off.parts_id, off.discPrice, off.quantity])
                    console.log(offer_data)
                }
            })

            res.status(200).json({message: `Quotation successfully posted...`, quotation_id: quo_id})
        } catch (error) {
            res.status(400).json({message: `Error... Failed to post quotation... ${error}`})
        }
    })

    router.patch('/cancelQuotation/:id', async (req, res) => {
        try {
            const { id } = req.params
            const q = 'UPDATE td_quotations SET is_cancelled = 1, date_cancelled = NOW() WHERE quotation_id = ?'
            const response = await query(q, [id])
            res.status(200).json({message: 'Quotation cancelled successfully', response: response})
        } catch (error) {
            res.status(400).json({message: `Error... Failed to cancell quotation... ${error}`})
        }
    })
    return router
}