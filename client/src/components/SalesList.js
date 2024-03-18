import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEllipsisH, FaFilter, FaSort, FaSearch, FaCheck, FaClock} from 'react-icons/fa';
import { Row, Col, Card, CardBody, CardHeader, Table, Dropdown } from 'react-bootstrap';
import '../index.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SalesList = () => {

    const [sales, setSales] = useState([])
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getSales/')
                setSales(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    }, [])
    useEffect(() => {
        console.log(sales)
    }, [sales])

    const handleEllipsisClick = (index) => {
        setActiveDropdown(index === activeDropdown ? null : index);
    };

    const renderDropdown = (index) => {
    if (index === activeDropdown) {
        return (
        <Dropdown.Menu style={{ position: 'absolute', right: '0', left: 'auto', top: '0px' }}>
            <Dropdown.Item>Convert to Sale</Dropdown.Item>
            <Dropdown.Item>Cancel Quotation</Dropdown.Item>
        </Dropdown.Menu>
        );
    }
    return null;
    };
    
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
    
    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Manage Sales</h1>
            <h5>Manage all generated sales</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />


            {/*Navigation Forms*/ }
            <Row>
                {/*Search Bar*/ }
                <Col lg="4">
                    <form>
                        <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", borderRadius: "10px", 
                                                                        overflow: "hidden"}} >
                            <input type="search" className="form-control" placeholder="Search"/>
                            <button className="btn me-auto" style={{color: "white", backgroundColor: "#014c91"}}>
                                <div style={{color: 'white'}}>
                                    {React.createElement(FaSearch, { size: 20 })}
                                </div>
                            </button>
                        </div>
                    </form>
                </Col>
                {/*Sorting Mechanism*/ }
                <Col lg="4">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex", 
                                                                    backgroundColor: "#014c91", borderRadius: "10px", 
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaSort, { size: 20 })}
                            </div>
                        </div>
                        <select className="form-select">
                            <option value="">Sort by Date and Time (A-Z)</option>
                            <option value="1">Sort by Date and Time (Z-A)</option>
                        </select>
                    </div>
                </Col>
                {/*Filtering Mechanism*/ }
                <Col lg="4">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                    backgroundColor: "#014c91", borderRadius: "10px",
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>   
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaFilter, { size: 20 })}
                            </div>  
                        </div>
                        <select className="form-select">
                            <option value="">All Sales</option>
                            <option value="1">Active</option>
                            <option value="0">Expired</option>
                        </select>
                    </div>
                </Col>
            </Row>

        
            {/*Table for page content*/}
            <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
                <CardBody>
                    <Table>
                         <thead>
                            <tr>
                                <th style={{color: '#014c91'}}>Sale Ref. #</th>
                                <th style={{color: '#014c91'}}>Client</th>
                                <th style={{color: '#014c91'}}>Company</th>
                                <th style={{color: '#014c91'}}>Contact Number</th>
                                <th style={{color: '#014c91'}}>Transport Mode</th>
                                <th style={{color: '#014c91'}}>Transport Schedule</th>
                                <th style={{color: '#014c91'}}>Installation Schedule</th>
                                <th style={{color: '#014c91'}}>Service Schedule</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((sales, index) => (
                                <React.Fragment key={sales.sales_id}>
                                    <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                        <td style={{ color: '#014c91' }}>
                                            <Link to={`/viewsaledetails?id=${sales.sales_id}`} style={{ color: '#014c91'}}>{String(sales.sales_id).padStart(4, '0')}</Link>
                                        </td>
                                        <td style={{color: '#014c91'}}>{sales.client_name}</td>
                                        <td style={{color: '#014c91'}}>{sales.company_name}</td>
                                        <td style={{color: '#014c91'}}>{sales.contact_number}</td>
                                        <td style={{color: '#014c91'}}>{sales.transportMode === 'DELIVERY' ? "Delivery" : "Pick Up"}</td>
                                        <td style={{color: sales.hasDelivery && sales.allDeliveriesCompleted ? '#008000' : (sales.hasDelivery && !sales.allDeliveriesCompleted ? '#DC6601' : '')}}>
                                            {sales.hasDelivery && sales.allDeliveriesCompleted ? (<FaCheck size={20} className="me-1"/>) : (sales.hasDelivery && !sales.allDeliveriesCompleted ? (<FaClock size={20} className="me-1"/>) : null)}
                                            {sales.latest_delivery_date ? (
                                                <>
                                                    {formatDate(new Date(sales.latest_delivery_date))}{' '}
                                                    {new Date(sales.latest_delivery_date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                                                </>
                                            ) : ''}

                                        </td>
                                        <td style={{color: sales.hasInstallation && sales.allInstallationsCompleted ? '#008000' : (sales.hasInstallation && !sales.allInstallationsCompleted ? '#DC6601' : '')}}>
                                            {sales.hasInstallation && sales.allInstallationsCompleted ? (<FaCheck size={20} className="me-1"/>) : (sales.hasInstallation && !sales.allInstallationsCompleted ? (<FaClock size={20} className="me-1"/>) : null)}
                                            {sales.latest_installation_date ? (
                                                <>
                                                    {formatDate(new Date(sales.latest_installation_date))}{' '}
                                                    {new Date(sales.latest_installation_date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                                                </>
                                            ) : ''}
                                        </td>
                                        <td style={{color: sales.hasService && sales.allServiceCompleted ? '#008000' : (sales.hasService && !sales.allServiceCompleted ? '#DC6601' : '#014c91')}}>
                                            {sales.hasService && sales.allServiceCompleted ? (<FaCheck size={20} className="me-1"/>) : (sales.hasService && !sales.allServiceCompleted ? (<FaClock size={20} className="me-1"/>) : 'No Scheduled Service ')}
                                            {sales.latest_service_date ? (
                                                <>
                                                    {formatDate(new Date(sales.latest_service_date))}{' '}
                                                    {new Date(sales.latest_service_date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                                                </>
                                            ) : ''}
                                            
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>

            


        </div>
    );
};

export default SalesList;
