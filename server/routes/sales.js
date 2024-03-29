const express = require('express')
const router = express.Router()

module.exports = (query) => {

    const hasKeys = (obj) => {
        if (Object.keys(obj).length > 0) {
            return true
        }
        return false
    }

    /**
     * 
     * @param {Object} data form data for the respective function
     * @param {Integer} id for specific sales record
     */
    const postDelivery = async (data, id) => {
        
        let deliveryDate = data.deliveryDate && data.deliveryTime ? 
            data.deliveryDate+'T'+data.deliveryTime : null

        const deliveryQuery = 'INSERT INTO md_deliveries (quotation_id, is_pickup, delivery_date, is_delivered, comments) VALUES (?, ?, ?, ?, ?)'
        const response = await query(deliveryQuery, [id, data.isPickup, deliveryDate, 0, null])
        return response
    }

    const postInstallation = async (data, id) => {

        let installationStartDateTime = data.installationSDate && data.installationSTime 
            ? data.installationSDate+'T'+data.installationSTime : null

        let installationEndDateTime = data.installationEDate && data.installationETime 
            ? data.installationEDate + 'T' + data.installationETime : null;


        const installationQuery = 'INSERT INTO md_installations (quotation_id, start_installation_date, end_installation_date, is_installed, technician_id) VALUES (?, ?, ?, ?, ?)'
        const response = await query(installationQuery, [id, installationStartDateTime, installationEndDateTime, 0, data.installationTechnician])
        return response
    }

    const postPayment = async (data, id) => {

        const refno = data.refno || null

        const paymentQuery = 'INSERT INTO md_sales_payment (sales_id, mop_id, is_installment, amount, refNo, date_created) VALUES (?, ?, ?, ?, ?, NOW())'
        const response = await query(paymentQuery, [id, data.mop_id, data.isInstallment, data.amount, refno])
        return response
    }

    const postServices = async (data, id) => {

        let serviceDate = data.serviceDate && data.serviceTime ? data.serviceDate+'T'+data.serviceTime : null

        const serviceQuery = 'INSERT INTO md_service_schedules (quotation_id, service_date, is_completed, technician_id) VALUES (?, ?, ?, ?)'
        const response = await query(serviceQuery, [id, serviceDate, 0, data.serviceTechnician])
        return response
    }

    router.post('/convertToSale/:type', async (req, res) => {
        const { id, delivery, installation, services, payment, sales, login_id } = req.body
        const { type } = req.params
        
        // post order: sales, delivery, installation, payment
        let step = 1 // for debugging
        try {
            // STEP 1: sales (for converting a quotation to a sale NOT for adding a quotation to a sale)
            // to account for adding a quotation to a sale, reference an existing id
            let salesId
            if (type === 'add') {
                console.log('STEP 1: Adding to existing sales record, skipping sales record generation step...')
                salesId = sales
                step++
            } else {
                console.log('STEP 1: Attempting to post SALES record...')
                const salesQuery = 'INSERT INTO td_sales (date_created, login_id, main_quotation_id, is_completed) VALUES (NOW(), ?, ?, ?)'
                console.log(id)
                const salesResponse = await query(salesQuery, [login_id, id, 0])
                console.log('SALES SUCCESSFULL: ', salesResponse)
                salesId = salesResponse.insertId
                step++
            }

            // STEP 2: update quotation
            console.log('STEP 2: Attempting to UPDATE QUOTATION record...')
            const updateQuery = 'UPDATE td_quotations SET sales_id = ? WHERE quotation_id = ?'
            const updateResponse = await query(updateQuery, [salesId, id])
            console.log('UPDATE SUCCESSFUL', updateResponse)
            step++
            
            // STEP 3: delivery
            if (hasKeys(delivery)) {
                console.log('STEP 3: Attempting to post DELIVERY record...')
                const deliveryResponse = await postDelivery(delivery, id)
                console.log('DELIVERY SUCCESSFULL: ', deliveryResponse)
                step++ 
            } else {console.log('No delivery information...skipping'); step++}

            // STEP 4: installation
            if (hasKeys(installation)) {
                console.log('STEP 3: Attempting to post INSTALLATION record...')
                const installationResponse = await postInstallation(installation, id)
                console.log('INSTALLATION SUCCESSFULL: ', installationResponse)
                step++ 
            } else {console.log('No installation information...skipping'); step++}

            // STEP 5: services
            if (hasKeys(services)) {
                console.log('STEP 3: Attempting to post SERVICES record...')
                const servicesResponse = await postServices(services, id)
                console.log('SERVICES SUCCESSFULL: ', servicesResponse)
                step++ 
            } else {console.log('No service information...skipping'); step++}

            // STEP 6: payment
            console.log('STEP 4: Attempting to post PAYMENT record...')
            const paymentResponse = await postPayment(payment, salesId)
            console.log('PAYMENT SUCCESSFULL: ', paymentResponse)
            step++ 

            console.log('Completed ', step, ' steps out of 7')
            res.status(200).json({message: 'Completed '+step+' steps out of 7'})
        } catch (error) {
            console.error(error)
            res.status(400).json({message: `Error... Failed to post at step ${step}.`, error: error})
        }
    })

    /** Return a list of sales summaries */
    router.get('/getSales', async (req, res) => {
        const salesQuery = `SELECT 
        s.sales_id,
        CONCAT(cp.last_name, ', ', cp.first_name) AS client_name,
        cp.contact_number,
        co.company_name,
        MAX(deliveries.latest_delivery_date) AS latest_delivery_date,
        MAX(installations.latest_installation_date) AS latest_installation_date,
        MAX(services.latest_service_date) AS latest_service_date,
        s.is_completed,
        MAX(CASE WHEN deliveries.sales_id IS NOT NULL THEN 1 ELSE 0 END) AS hasDelivery,
        MAX(CASE WHEN installations.sales_id IS NOT NULL THEN 1 ELSE 0 END) AS hasInstallation,
        MAX(CASE WHEN services.sales_id IS NOT NULL THEN 1 ELSE 0 END) AS hasService,
        CASE 
            WHEN SUM(deliveries.is_completed = 0) = 0 THEN 1 
            ELSE 0 
        END AS allDeliveriesCompleted,
        CASE 
            WHEN SUM(installations.is_completed = 0) = 0 THEN 1 
            ELSE 0 
        END AS allInstallationsCompleted,
        CASE 
            WHEN SUM(services.is_completed = 0) = 0 THEN 1 
            ELSE 0 
        END AS allServicesCompleted
    FROM 
        td_sales s
    JOIN 
        td_quotations q ON s.main_quotation_id = q.quotation_id
    JOIN 
        md_quotation_clients qc ON q.quotation_client_id = qc.quotation_client_id
    JOIN 
        md_clients c ON qc.client_id = c.client_id
    JOIN 
        md_contactperson cp ON c.contact_person_id = cp.contact_person_id
    JOIN 
        md_companies co ON c.company_id = co.company_id
    LEFT JOIN 
        (SELECT 
             q.sales_id,
             MAX(d.delivery_date) AS latest_delivery_date,
             MIN(d.is_delivered) AS is_completed
         FROM 
             td_quotations q
         JOIN 
             md_deliveries d ON q.quotation_id = d.quotation_id
         GROUP BY 
             q.sales_id) AS deliveries ON s.sales_id = deliveries.sales_id
    LEFT JOIN 
        (SELECT 
             q.sales_id,
             MAX(i.start_installation_date) AS latest_installation_date,
             MIN(i.is_installed) AS is_completed
         FROM 
             td_quotations q
         JOIN 
             md_installations i ON q.quotation_id = i.quotation_id
         GROUP BY 
             q.sales_id) AS installations ON s.sales_id = installations.sales_id
    LEFT JOIN 
        (SELECT 
             q.sales_id,
             MAX(ss.service_date) AS latest_service_date,
             MIN(ss.is_completed) AS is_completed
         FROM 
             td_quotations q
         JOIN 
             md_service_schedules ss ON q.quotation_id = ss.quotation_id
         GROUP BY 
             q.sales_id) AS services ON s.sales_id = services.sales_id
	WHERE s.is_completed = 0
    GROUP BY 
        s.sales_id;       
    `
        const data = await query(salesQuery, [])

        res.send(data)
    })

    router.get('/getSalesById/:id', async (req, res) => {

        const { id } = req.params

        const detailsQuery = `SELECT 
                                s.sales_id,
                                CONCAT(cp.last_name, ', ', cp.first_name) AS client_name,
                                cp.contact_number,
                                co.company_name,
                                cp.email,
                                s.is_completed
                            FROM td_sales s
                            JOIN td_quotations q ON s.main_quotation_id = q.quotation_id
                            JOIN md_quotation_clients qc ON q.quotation_client_id = qc.quotation_client_id
                            JOIN md_clients c ON qc.client_id = c.client_id
                            JOIN md_contactperson cp ON c.contact_person_id = cp.contact_person_id
                            JOIN md_companies co ON c.company_id = co.company_id
                            WHERE s.sales_id = ?`
        const detailsResponse = await query(detailsQuery, [id])

        const deliveryQuery = `SELECT d.delivery_date, d.delivery_id, d.is_pickup
                                FROM td_quotations q
                                JOIN md_deliveries d ON q.quotation_id = d.quotation_id
                                WHERE q.sales_id = ?
                                AND d.is_delivered <> 1
                                ORDER BY d.delivery_date ASC`
        const deliveryRespponse = await query(deliveryQuery, [id])

        const installationQuery = `SELECT i.installation_id, i.start_installation_date, i.end_installation_date, CONCAT(t.last_name, ", ", t.first_name) as technician_name
                                    FROM td_quotations q
                                    JOIN md_installations i ON q.quotation_id = i.quotation_id
                                    JOIN md_technicians t ON i.technician_id = t.technician_id
                                    WHERE q.sales_id = ?
                                    AND i.is_installed <> 1
                                    ORDER BY i.start_installation_date ASC`
        const installationResponse = await query(installationQuery, [id])

        const serviceQuery = `SELECT ss.service_schedule_id, ss.service_date, CONCAT(t.last_name, ", ", t.first_name) as technician_name
                                FROM td_quotations q
                                JOIN md_service_schedules ss ON q.quotation_id = ss.quotation_id
                                JOIN md_technicians t ON ss.technician_id = t.technician_id
                                WHERE q.sales_id = ?
                                AND ss.is_completed <> 1
                                ORDER BY ss.service_date ASC`
        const serviceResponse = await query(serviceQuery, [id])

        const paymentQuery = `SELECT sp.sales_payment_id, sp.date_created,  mop.name, sp.refNo, sp.amount
                                FROM md_sales_payment sp
                                JOIN ref_mode_of_payment mop ON sp.mop_id = mop.mop_id
                                WHERE sales_id = ? ORDER BY sp.date_created;`
        const paymentResponse = await query(paymentQuery, [id])

        const quotationsQuery = `SELECT q.quotation_id, q.date_created,
                                COALESCE(totalProducts, 0) + COALESCE(totalServices, 0) + COALESCE(totalParts, 0) AS totalPrice
                                FROM td_quotations q
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
                                ) qr ON q.quotation_id = qr.quotation_id WHERE q.sales_id = ? ORDER BY date_created;`
        const quotationsResponse = await query(quotationsQuery, [id])

        const data = {
            detail: detailsResponse,
            delivery: deliveryRespponse,
            installation: installationResponse,
            service: serviceResponse,
            payment: paymentResponse,
            quotation: quotationsResponse
        }

        res.send(data)

    })

    /** Mark a particular sales detail record (delivery, installation, service schedule) as completed */
    /**
     * Takes @param {Integer} id which cooresponds to the sales detail id of a particular record 
     */
    router.patch('/completeDelivery/:id', async (req, res) => {
        try {
            const upQ = 'UPDATE md_deliveries SET is_delivered = 1 WHERE delivery_id = ?'
            const response = await query(upQ, [req.params.id])
            res.status(200).json({message: 'Successfully completed delivery', response: response})
        } catch (error) {
            res.status(400).json({message: `Error... Failed to patch`, error: error})
        }
    })

    router.patch('/completeInstallation/:id', async (req, res) => {
        try {
            const upQ = 'UPDATE md_installations SET is_installed = 1 WHERE installation_id = ?'
            const response = await query(upQ, [req.params.id])
            res.status(200).json({message: 'Successfully completed installation', response: response}) 
        } catch (error) {
            res.status(400).json({message: `Error... Failed to patch`, error: error})
        }
    })

    router.patch('/completeService/:id', async (req, res) => {
        try {
            const upQ = 'UPDATE md_service_schedules SET is_completed = 1 WHERE service_schedule_id = ?'
            const response = await query(upQ, [req.params.id])
            res.status(200).json({message: 'Successfully completed service', response: response}) 
        } catch (error) {
            res.status(400).json({message: `Error... Failed to patch`, error: error})
        }
    })

    router.post('/newPayment/:id', async (req, res) => {
        try {
            const { id, mop_id, amount, refNo } = req.body
            const pQ = 'INSERT INTO md_sales_payment (sales_id, mop_id, is_installment, amount, date_created, refNo) VALUES (?, ?, 0, ?, NOW(), ?)'
            const response = await query(pQ, [id, mop_id, amount, refNo])
            res.status(200).json({message: 'Successfully posted new payment', response: response}) 
        } catch (error) {
            console.error(error)
            res.status(400).json({message: `Error... Failed to post new payment`, error: error})
        }
    })

    router.get('/getQuoClientIdBySalesId/:id', async (req, res) => {
        const { id } = req.params

        const q = `SELECT qc.quotation_client_id
                    FROM td_sales s
                    JOIN td_quotations q ON s.main_quotation_id = q.quotation_id
                    JOIN md_quotation_clients qc ON q.quotation_client_id = qc.quotation_client_id
                    WHERE s.sales_id = ?;`
        const response = await query(q, [id])
        res.send(response)
    })

    router.patch('/changeSaleState/:id/:state', async (req, res) => {
        try {
            const values = [req.params.state, req.params.id]
            const data = await query('UPDATE td_sales SET is_completed = ? WHERE sales_id = ?', values)
            console.log(data)
            res.status(200).json({message: `Service successfully updated... ${data}`})
        } catch (error) {
            console.error('Error: ', error)
            res.status(400).json({message: `Error... Failed to update service... ${error}`})
        }
    })

    return router
}