import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEdit, FaCheck, FaSearch, FaScrewdriver, FaToolbox, FaPlus, FaMoneyBillWave, FaShoppingBag} from 'react-icons/fa';
import { Row, Col, Card, CardBody, CardHeader, Table, Form, Dropdown } from 'react-bootstrap';
import '../index.css';
import axios from 'axios'

const WarrantyDetails= () => {
    const [warrantyData, setWarrantyData] = useState([]);
    const [claimedUnitsData, setClaimedUnitsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getWarranty/5/')
                setWarrantyData(response.data[0])

                const response2 = await axios.get('http://localhost:4000/api/getClaimedUnits/5/')
                setClaimedUnitsData(response2.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    },[])
    
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
            <h1>Warranty Claim #{warrantyData.warranty_id}</h1>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            Sale Ref.: <strong> {warrantyData.sales_id}</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Client: <strong>{warrantyData.client_name}</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Company: <strong> {warrantyData.company_name}</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Contact Number: <strong> {warrantyData.client_number}</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Email Address: <strong> {warrantyData.email}</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Warranty Claim Status: <strong> {warrantyData.warranty_completed === 0 ? "Ongoing" : "Completed"}</strong>
                        </Col>
                    </Row>

                </Col>
            </Row>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

            <Row>
                <Col lg="3">
                    <Card style={{padding: '15px', borderRadius: '20px', background:'#CCDBE9', display: 'flex', flexDirection: 'column', height: '100%'}}>
                        
                        {warrantyData.inspection_date !== null ? (
                        <Card style={{padding: '15px', borderRadius: '20px', background: warrantyData.inspection_completed?'#E7FFE2':'white', color: warrantyData.inspection_completed?'#008000':'#014c91'}}>
                            <Row>
                                <Col lg="9">
                                    <h3>{React.createElement(FaSearch, { size: 25, style: { marginRight: '5px', marginBottom: '5px'  }})}Inspection</h3>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    {warrantyData.inspection_completed ? (
                                        <FaCheck size={18} />
                                    ) : (
                                        <FaEdit size={18} />
                                    )}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Date: <strong> {formatDate(warrantyData.inspection_date)}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Time: <strong> {new Date(warrantyData.inspection_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Technician: <strong> {warrantyData.inspection_technician_name}</strong>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col>
                                    {!warrantyData.inspection_completed ? (
                                         <button className="btn w-40" style={{color: "white", backgroundColor: "#014c91"}}>
                                         {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })}   Complete Inspection
                                         </button>
                                    ) : (
                                        null
                                    )}
                                </Col>
                            </Row>
                        </Card>
                        ) : null}


                        <Card className={warrantyData.inspection_date!==null?"mt-2":null} style={{padding: '15px', borderRadius: '20px', height: '100%', background: warrantyData.service_completed?'#E7FFE2':'white', color: warrantyData.service_completed?'#008000':'#014c91'}}>
                            <Row>
                                <Col lg="9">
                                    <h3>{React.createElement(FaToolbox, { size: 25, style: { marginRight: '5px', marginBottom: '5px' }})}Service</h3>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    {warrantyData.service_completed ? (
                                        <FaCheck size={18} />
                                    ) : (
                                        <FaEdit size={18} />
                                    )}

                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Date: <strong> {formatDate(warrantyData.service_date)}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Time: <strong> {new Date(warrantyData.service_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Technician: <strong> {warrantyData.service_technician_name}</strong>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col>
                                    {!warrantyData.service_completed ? (
                                         <button className="btn w-40" style={{color: "white", backgroundColor: "#014c91"}}>
                                         {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })}   Complete Service
                                         </button>
                                    ) : (
                                        null
                                    )}
                                       
                                </Col>
                            </Row>
                        </Card>

                    </Card>
                </Col>

                <Col lg="5">
                    <Card style={{padding: '15px', borderRadius: '20px', background:'#CCDBE9', display: 'flex', flexDirection: 'column', height: '100%'}}>
                        <Card style={{padding: '15px', borderRadius: '20px', color: '#014c91',display: 'flex', flexDirection: 'column', height: '100%'}}>
                            <Row>
                                <Col lg="9">
                                    <h3>{React.createElement(FaMoneyBillWave, { size: 25, style: { marginRight: '5px', marginBottom: '5px'  }})}Units Claimed</h3>
                                </Col>
                            </Row>

                            <Table>
                                    <thead>
                                        <tr>
                                            <th style={{color: '#014c91'}}>Description</th>
                                            <th style={{color: '#014c91'}}>Unit Model</th>
                                            <th style={{color: '#014c91'}}>Qty</th>
                                            <th style={{color: '#014c91'}}>Issue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {claimedUnitsData.map((unit, index) => (
                                            <React.Fragment key={unit.unit_id}>
                                                <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                    <td style={{color: '#014c91'}}>{unit.description}</td>
                                                    <td style={{color: '#014c91'}}>{unit.unit_model}</td>
                                                    <td style={{color: '#014c91'}}>{unit.quantity}</td>
                                                    <td style={{color: '#014c91'}}>{unit.issue}</td>
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                            </Table>

                        </Card>
                    </Card>
                </Col>

                <Col lg="4">
                    <Card style={{padding: '15px', borderRadius: '20px', background:'#CCDBE9', display: 'flex', flexDirection: 'column', height: '100%'}}>
                        <Card style={{padding: '15px', borderRadius: '20px', color: '#014c91', display: 'flex', flexDirection: 'column', height: '100%'}}>
                            <Row>
                                <Col lg="9">
                                    <h3>{React.createElement(FaShoppingBag, { size: 25, style: { marginRight: '5px', marginBottom: '5px'  }})}Requested Parts </h3>
                                </Col>
                            </Row>

                            <Table>
                                    <thead>
                                        <tr>
                                            <th style={{color: '#014c91'}}>Part Type</th>
                                            <th style={{color: '#014c91'}}>Description</th>                                    
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                    </tbody>
                            </Table>

                        

                            
                            <Row className="mt-2">
                                <Col>
                                    <button className="btn w-40" style={{color: "white", backgroundColor: "#014c91"}}>
                                        {React.createElement(FaPlus, { size: 18, style: { marginRight: '5px' } })} Add a Requested Part
                                    </button>
                                </Col>
                            </Row>
                        </Card>
                    </Card>
                </Col>
            </Row>




        </div>
    );
};

export default WarrantyDetails;
