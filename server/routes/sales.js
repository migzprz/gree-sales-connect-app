const express = require('express')
const router = express.Router()

module.exports = (query) => {

    /**
     * 
     * @param {Object} data form data for the respective function
     * @param {Integer} id for specific sales record
     */
    const postDelivery = async (data, id) => {
        const query = 'INSERT INTO md_deliveries (sales_id, is_pickup, delivery_date_start, delivery_date_end, is_delivered, comments) VALUES (?, ?, ?, ?, ?, ?)'
        const response = await query(query, [/** insert data here */])
        return response
    }

    const postInstallation = async (data, id) => {
        const query = 'INSERT INTO md_installations (sales_id, start_installation_date, end_installation_date, is_installed, technician_id) VALUES (?, ?, ?, ?, ?)'
        /** handle conditional for selecting between one time and multiple installations */
        const response = await query(query, [/** insert data here */])
        return response
    }

    const postPayment = async (data, id) => {
        const query = 'INSERT INTO md_sales_payments (sales_id, mop_id, is_installment, amount, date_created) VALUES (?, ?, ?, ?, ?)'
        const response = await query(query, [/** insert data here */])
        return response
    }

    const postServices = async (data, id) => {
        const query = ''
        const response = await query(query, [/** insert data here */])
        return response
    }

    router.post('/convertToSale', async (req, res) => {
        const { id, delivery, installation, services, payment } = req.body

        // post order: sales, delivery, installation, payment
        let step = 1 // for debugging
        try {
            // STEP 1: sales
            console.log('STEP 1: Attempting to post SALES record...')
            const salesQuery = 'INSERT INTO td_sales (date_created, login_id) VALUES (NOW(), ?)'
            const salesResponse = await query(salesQuery, [1])
            console.log('SALES SUCCESSFULL: ', salesResponse)
            const salesId = salesResponse.insertId
            step++

            // STEP 2: update quotation


            // STEP 3: delivery
            console.log('STEP 2: Attempting to post DELIVERY record...')
            const deliveryResponse = await postDelivery(delivery, salesId)
            console.log('DELIVERY SUCCESSFULL: ', deliveryResponse)
            step++ 

            // STEP 4: installation
            console.log('STEP 3: Attempting to post INSTALLATION record...')
            const installationResponse = await postInstallation(installation, salesId)
            console.log('INSTALLATION SUCCESSFULL: ', installationResponse)
            step++ 

            // STEP 5: services
            console.log('STEP 3: Attempting to post INSTALLATION record...')
            const servicesResponse = await postServices(services, salesId)
            console.log('SERVICES SUCCESSFULL: ', servicesResponse)
            step++ 

            // STEP 6: payment
            console.log('STEP 4: Attempting to post PAYMENT record...')
            const paymentResponse = await postPayment(payment, salesId)
            console.log('PAYMENT SUCCESSFULL: ', paymentResponse)
            step++ 

        } catch (error) {
            console.error(error)
            res.status(400).json({message: `Error... Failed to post at step ${step}.`, error: error})
        }
    })

    return router
}