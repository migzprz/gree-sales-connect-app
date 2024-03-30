import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaBell } from 'react-icons/fa';
import { Row, Col, Card, CardBody, Table, Dropdown, Pagination } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import '../index.css';
import axios from 'axios'


const NotificationDetails = () => {

    const [salesData, setSalesData] = useState([]);
    const [aftersalesData, setAftersalesData] = useState([]);
    const [executiveData, setExecutiveData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getSalesNotifications/')
                setSalesData(response.data)

                const response2 = await axios.get('http://localhost:4000/api/getAftersalesNotifications/')
                setAftersalesData(response2.data)

                const response3 = await axios.get('http://localhost:4000/api/getExecutiveNotifications/')
                setExecutiveData(response3.data)

            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    },[])
    
    useEffect(() => {
        console.log(salesData)
    },[salesData])
    useEffect(() => {
        console.log(aftersalesData)
    },[aftersalesData])
    useEffect(() => {
        console.log(executiveData)
    },[executiveData])

      //Date Conversion Function
      function formatDate(dateString) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Parse the date string to a Date object
        const date = new Date(dateString);
        
        // Get day, month, and year from the date object
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        
        // Format day with leading zero if necessary
        const formattedDay = day < 10 ? '0' + day : day;
        
        // Format date in desired format
        return `${formattedDay}-${months[monthIndex]}-${year}`;
    }
    
    const access = sessionStorage.getItem('accessString')
    console.log('accessString', access)
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        if(access[0] === '1' && salesData.some(data => data.count > 0)){
            setIsEmpty(false)
        } 

        if(access[1] === '1' && aftersalesData.length > 0){
            setIsEmpty(false)
        } 

        
        if(access[2] === '1' && executiveData.some(data => data.months_since_last_expense > 0)){
            setIsEmpty(false)
        } 
       

    },[access, salesData, aftersalesData, executiveData])

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Notifications</h1>
            <h5>View notifications</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

                         {access[0] === '1' &&  
                            <>
                                {salesData
                                    .filter(sales => sales.count !== 0)
                                    .map((sales, index) => (
                                        <Link
                                            key={index}
                                            to={sales.description === 1 || sales.description === 2 ? '/viewoculars' : 
                                                sales.description === 3 ? '/viewquotations' : '/viewsales'}
                                            style={{ textDecoration: 'none' }}
                                        >
                                        
                                        <Card key={index} style={{ borderRadius: '10px', marginTop: '10px', color: '#014c91'}}>
                                            <CardBody>
                                                {React.createElement(FaBell, { size: 20, style: { marginRight: '15px' } })}
                                                {sales.description === 1 ?
                                                <>You have {sales.count} upcoming {sales.count > 1 ? "oculars" : "ocular"} scheduled today.</> :
                                                sales.description === 2 ?
                                                <>You have {sales.count} delayed {sales.count > 1 ? "oculars" : "ocular"}. Reminder to update ocular status.</> :
                                                sales.description === 3 ?
                                                <>You have {sales.count} {sales.count > 1 ? "quotations" : "quotation"} that have exceeded 7 days since generated. Reminder to update quotation status.</> :
                                                sales.description === 4 ?
                                                <>You have {sales.count} upcoming {sales.count > 1 ? "deliveries" : "delivery"} scheduled today.</> :
                                                sales.description === 5 ?
                                                <>You have {sales.count} delayed {sales.count > 1 ? "deliveries" : "delivery"}. Reminder to update delivery status.</> :
                                                sales.description === 6 ?
                                                <>You have {sales.count} upcoming {sales.count > 1 ? "installations" : "installation"} scheduled today.</> :
                                                sales.description === 7 ?
                                                <>You have {sales.count} delayed {sales.count > 1 ? "installations" : "installation"}. Reminder to update installation status.</> :
                                                sales.description === 8 ?
                                                <>You have {sales.count} upcoming {sales.count > 1 ? "services" : "service"} scheduled today.</> :
                                                sales.description === 9 ?
                                                <>You have {sales.count} delayed {sales.count > 1 ? "services" : "service"}. Reminder to update service status.</> :
                                                null}
                                            
                                            </CardBody>
                                        </Card>
                                    </Link>
                                ))}
                            </>
                        } 
                        {access[1] === '1' &&  
                            <>
                                {aftersalesData.map((user, index) => (
                                <Card style={{ borderRadius: '10px', marginTop: '10px', color: '#014c91'}}>
                                        <CardBody>
                                                    {React.createElement(FaBell, { size: 20, style: { marginRight: '15px' } })}
                                                <>Reminder to contact <strong> {user.client_name} </strong> via <strong>{user.contact_number}</strong> for aftersales services. It has been 6 months since their installation. </>
                                        </CardBody>
                                </Card>
                                ))}
                            </>
                        } 

                        {access[2] === '1' &&  
                            <>
                                {executiveData.filter(exec => exec.months_since_last_expense !== 0).map((record, index) => (
                                    <Link to="/recordexpenses" style={{ textDecoration: 'none' }}>
                                        <Card style={{ borderRadius: '10px', marginTop: '10px', color: '#014c91'}}>
                                                <CardBody>
                                                    {React.createElement(FaBell, { size: 20, style: { marginRight: '15px' } })}
                                                    {record.months_since_last_expense > 0 &&
                                                    <>Reminder to record expenses. It has been {record.months_since_last_expense} {record.months_since_last_expense > 1 ? "months" : "month"} since the last recording.</>}
                                                </CardBody>
                                        </Card>
                                    </Link>
                                ))}
                            </>
                        } 

                        {isEmpty &&
                            <>
                                <Card style={{ borderRadius: '10px', marginTop: '10px', color: '#014c91'}}>
                                    <CardBody>
                                                You have no new notifications.
                                    </CardBody>
                                </Card>
                            </>
                        } 

                       
 


        </div>
    );
};

export default NotificationDetails;
