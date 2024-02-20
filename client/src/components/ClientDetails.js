import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEdit, FaCheck, FaTruck, FaPlus, FaShoppingBag, FaUserTie} from 'react-icons/fa';
import { Row, Col, Card, CardBody, CardHeader, Table, Form, Dropdown } from 'react-bootstrap';
import '../index.css';

const ClientDetails= () => {

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
            <h1>Manage Client</h1>
            <h5>View and manage a specific client</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

            <Row>
                <Col lg="8">
                    <Card style={{padding: '15px', borderRadius: '20px', background:'#CCDBE9'}}>

                        <Card style={{padding: '15px', borderRadius: '20px', color: '#014c91'}}>
                            <Row>
                                <Col lg="9">
                                    <h3>{React.createElement(FaUserTie, { size: 50, style: { marginRight: '5px', marginBottom: '5px'  }})}Miguel Perez</h3>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    {React.createElement(FaEdit, { size: 18 })}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Company: <strong> De La Salle University Inc. </strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    TIN ID: <strong> 777 555 333</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Contact Number: <strong> 0916 518 9598</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Email: <strong> miguel_josh_perez@dlsu.edu.ph</strong>
                                </Col>
                            </Row>
                         
                        </Card>

                        <Card className="mt-3" style={{padding: '15px', borderRadius: '20px', color: '#014c91'}}>
                        <Row>
                            <Col lg="9">
                                <h3>{React.createElement(FaShoppingBag, { size: 25, style: { marginRight: '5px', marginBottom: '5px'  }})}Transaction Summary</h3>
                            </Col>
                        </Row>

                        <Table>
                                <thead>
                                    <tr>
                                        <th style={{color: '#014c91'}}>Start Date</th>
                                        <th style={{color: '#014c91'}}>End Date</th>
                                        <th style={{color: '#014c91'}}>Ocular Schedule</th>
                                        <th style={{color: '#014c91'}}>Quotation</th>
                                        <th style={{color: '#014c91'}}>Invoice</th>
                                        <th style={{color: '#014c91'}}>Purchase Order</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <React.Fragment>
                                        <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                            <td style={{color: '#014c91'}}>Jan. 24, 2024</td>
                                            <td style={{color: '#014c91'}}>Jan. 24, 2024</td>
                                            <td style={{color: '#014c91'}}>Jan. 24, 2024 (11:00 PM)</td>
                                            <td style={{color: '#014c91'}}>#0001</td>
                                            <td style={{color: '#014c91'}}>#0001</td>
                                            <td style={{color: '#014c91'}}>#0001</td>
                                        </tr>

                                      
                                    </React.Fragment>
                                </tbody>
                        </Table>

                        </Card>

                    </Card>
                </Col>


            </Row>




        </div>
    );
};

export default ClientDetails;
