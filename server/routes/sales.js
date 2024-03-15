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
        
        let deliveryDate
        data.deliveryDate && data.deliveryTime ? deliveryDate = data.deliveryDate+'T'+data.deliveryTime : deliveryDate = null

        const deliveryQuery = 'INSERT INTO md_deliveries (quotation_id, is_pickup, delivery_date, is_delivered, comments) VALUES (?, ?, ?, ?, ?)'
        const response = await query(deliveryQuery, [id, data.isPickup, deliveryDate, 0, null])
        return response
    }

    const postInstallation = async (data, id) => {

        let installationStartDateTime
        data.installationSDate && data.installationSTime ? installationStartDateTime = data.installationSDate+'T'+data.installationSTime : installationStartDateTime = null

        let installationEndDateTime
        data.installationEDate && data.installationETime ? installationEndDateTime = data.installationEDate+'T'+data.installationETime : installationEndDateTime = null

        const installationQuery = 'INSERT INTO md_installations (quotation_id, start_installation_date, end_installation_date, is_installed, technician_id) VALUES (?, ?, ?, ?, ?)'
        const response = await query(installationQuery, [id, installationStartDateTime, installationEndDateTime, 0, data.installationTechnician])
        return response
    }

    const postPayment = async (data, id) => {
        const paymentQuery = 'INSERT INTO md_sales_payment (sales_id, mop_id, is_installment, amount, refNo, date_created) VALUES (?, ?, ?, ?, ?, NOW())'
        const response = await query(paymentQuery, [id, data.mop_id, data.isInstallment, data.amount, data.refNo])
        return response
    }

    const postServices = async (data, id) => {

        let serviceDate
        data.serviceDate && data.serviceTime ? serviceDate = data.serviceDate+'T'+data.serviceTime : null

        const serviceQuery = 'INSERT INTO md_service_schedules (quotation_id, service_date, is_completed, technician_id) VALUES (?, ?, ?, ?)'
        const response = await query(serviceQuery, [id, serviceDate, 0, data.serviceTechnician])
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
        } catch (error) {
            console.error(error)
            res.status(400).json({message: `Error... Failed to post at step ${step}.`, error: error})
        }
    })

    return router
}