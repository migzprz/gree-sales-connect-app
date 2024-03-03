import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEdit, FaCheck, FaSearch, FaScrewdriver, FaToolbox, FaPlus, FaMoneyBillWave, FaShoppingBag} from 'react-icons/fa';
import { Row, Col, Card, CardBody, CardHeader, Table, Form, Dropdown } from 'react-bootstrap';
import '../index.css';

const WarrantyDetails= () => {

    const quotationList = [
        {
            id: 1,
            client: 'Client 1',
            company: 'Company 1',
            contactNumber: '0165189598',
            dateGenerated: '2024-01-15',
            totalPrice: 20000,
            status: 'Active'
        },
        {
            id: 1,
            client: 'Client 1',
            company: 'Company 1',
            contactNumber: '0165189598',
            dateGenerated: '2024-01-15',
            totalPrice: 20000,
            status: 'Active'
        },
        {
            id: 1,
            client: 'Client 1',
            company: 'Company 1',
            contactNumber: '0165189598',
            dateGenerated: '2024-01-15',
            totalPrice: 20000,
            status: 'Active'
        },
        {
            id: 1,
            client: 'Client 1',
            company: 'Company 1',
            contactNumber: '0165189598',
            dateGenerated: '2024-01-15',
            totalPrice: 20000,
            status: 'Active'
        },
        // Add more ocular objects as needed
    ];

    const [activeOption, setActiveOption] = useState('newClient');

    const handleOptionClick = (option) => {
        setActiveOption(option);
    };

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Warranty Claim #0001</h1>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            Sale Ref.: <strong> #0001</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Client: <strong>Miguel Josh C. Perez</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Company: <strong> ABC Company</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Contact Number: <strong> 09165189598</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Email Address: <strong> miguel_josh_perez@dlsu.edu.ph</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Warranty Claim Status: <strong> Ongoing</strong>
                        </Col>
                    </Row>

                </Col>
            </Row>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

            <Row>
                <Col lg="3">
                    <Card style={{padding: '15px', borderRadius: '20px', background:'#CCDBE9', display: 'flex', flexDirection: 'column', height: '100%'}}>

                        <Card style={{padding: '15px', borderRadius: '20px', color: '#014c91'}}>
                            <Row>
                                <Col lg="9">
                                    <h3>{React.createElement(FaSearch, { size: 25, style: { marginRight: '5px', marginBottom: '5px'  }})}Inspection</h3>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    {React.createElement(FaEdit, { size: 18 })}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Date: <strong> Jan. 15, 2024</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Time: <strong> 12:00 PM</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Technician: <strong> Blake, Lively</strong>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col>
                                        <button className="btn w-40" style={{color: "white", backgroundColor: "#014c91"}}>
                                        {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })}   Complete Inspection
                                        </button>
                                </Col>
                            </Row>
                        </Card>


                        <Card className="mt-2" style={{padding: '15px', borderRadius: '20px', background: '#E7FFE2', color: '#008000'}}>
                            <Row>
                                <Col lg="9">
                                    <h3>{React.createElement(FaToolbox, { size: 25, style: { marginRight: '5px', marginBottom: '5px' }})}Service</h3>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    {React.createElement(FaCheck, { size: 18 })}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Date: <strong> Jan. 15, 2024</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Time: <strong> 12:00 PM</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Technician: <strong> Blake, Lively</strong>
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
                                            <th style={{color: '#014c91'}}>Issue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <React.Fragment>
                                            <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                <td style={{color: '#014c91'}}>Jan. 24, 2024</td>
                                                <td style={{color: '#014c91'}}>Cash</td>
                                                <td style={{color: '#014c91'}}>2678982</td>
                                            </tr>
                                        </React.Fragment>
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
                                        <React.Fragment>
                                            <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                <td style={{color: '#014c91'}}>Jan. 24, 2024</td>
                                                <td style={{color: '#014c91'}}>#0001</td>
                                            </tr>    
                                        </React.Fragment>
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
