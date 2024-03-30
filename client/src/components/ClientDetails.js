import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect} from 'react'; 
import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaCheck, FaTruck, FaPlus, FaShoppingBag, FaUserTie} from 'react-icons/fa';
import { Row, Col, Card, CardBody, CardHeader, Table, Form, Dropdown } from 'react-bootstrap';
import '../index.css';
import axios from 'axios'
import EditClientDetailsModal from './EditClientDetailsModal';
import TransferCompanyModal from './TransferCompanyModal';

const ClientDetails= () => {

    const { id } = useParams();
    const [clientData, setClientData] = useState([])
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getClient/${id}/`)
                setClientData(response.data[0])
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    },[])
    
    useEffect(() => {
        console.log(clientData)
    },[clientData])

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
                                    <h3>{React.createElement(FaUserTie, { size: 50, style: { marginRight: '5px', marginBottom: '5px'  }})}{clientData.client_name}</h3>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <EditClientDetailsModal id={id}/> <TransferCompanyModal className="ms-4" contact_person_id={clientData.contact_person_id}/>
                                </Col>
                            </Row>
                            {clientData.company_name &&
                            <Row>
                                <Col>
                                    Company: <strong> {clientData.company_name} </strong>
                                </Col>
                            </Row>
                            }
                            {clientData.tin &&
                           <Row>
                                <Col>
                                    TIN ID: <strong> {clientData.tin} </strong>
                                </Col>
                            </Row>
                            }
                            
                            <Row>
                                <Col>
                                    Contact Number: <strong> {clientData.contact_number}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Email: <strong> {clientData.email}</strong>
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
