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
import LoadingScreen from './LoadingScreen';

const ClientDetails= () => {

    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [clientData, setClientData] = useState([])
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getClient/${id}/`)
                setClientData(response.data[0])

                setLoading(false);
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
        <>
            {loading ? 
            <LoadingScreen/> :
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

                        </Card>
                    </Col>


                </Row>




            </div>
            }
         </>
    );
};

export default ClientDetails;
