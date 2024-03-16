import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEdit, FaUserTie, FaCheck, FaTruck, FaScrewdriver, FaToolbox, FaPlus, FaMoneyBillWave, FaShoppingBag} from 'react-icons/fa';
import { Row, Col, Card, CardBody, CardHeader, Table, Form, Dropdown } from 'react-bootstrap';
import '../index.css';
import CompleteServiceModal from './CompleteServiceModal';
import AddPaymentModal from './AddPaymentModal';
import EditServiceDetailsModal from './EditServiceDetailsModal';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const SaleDetails= () => {

    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')

    const [detail, setDetail] = useState([])
    const [deliveries, setDeliveries] = useState([])
    const [installations, setInstallations] = useState([])
    const [services, setServices] = useState([])
    const [payments, setPayments] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = (await axios.get(`http://localhost:4000/api/getSalesById/${id}`)).data
                console.log(response)
                setDetail(response.detail[0])
                setDeliveries(response.delivery)
                setInstallations(response.installation)
                setServices(response.service)
                setPayments(response.payment)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    }, [])

    const [activeOption, setActiveOption] = useState('newClient');

    const handleOptionClick = (option) => {
        setActiveOption(option);
    };

    //Amount Conversion Function
    const formatNumber = (number) => {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Sale Ref. #{String(detail.sales_id).padStart(4, '0')}</h1>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            Client: <strong>{detail.client_name}</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Company: <strong>{detail.company_name}</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Contact Number: <strong>{detail.contact_number}</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Email Address: <strong>{detail.email}</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Sale Status: <strong>{detail.is_completed === 0 ? 'ONGOING' : 'COMPLETED'}</strong>
                        </Col>
                    </Row>

                </Col>
            </Row>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />



            <Row>
                <Col lg="3">
                    <Card style={{padding: '15px', borderRadius: '20px', background:'#CCDBE9'}}>

                        <Card style={{padding: '15px', borderRadius: '20px', color: '#014c91'}}>
                            <Row>
                                <Col lg="9">
                                    <h3>{React.createElement(FaTruck, { size: 25, style: { marginRight: '5px', marginBottom: '5px'  }})}Delivery</h3>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <EditServiceDetailsModal type={"pickup"}/>
                                </Col>
                            </Row>

                            {deliveries && deliveries.length > 0 ? (
                                <>
                                    <Row>
                                        <Col>
                                            Date: <strong>{new Date(deliveries[0].delivery_date).toLocaleDateString()}</strong>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            Time: <strong>{new Date(deliveries[0].delivery_date).toLocaleTimeString()}</strong>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {deliveries.length > 1 ? `There ${deliveries.length-1 > 1 ? 'are' : 'is'} ${deliveries.length-1} more ${installations.length-1 > 1 ? 'deliveries' : 'delivery'} left` : null}
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                                <CompleteServiceModal type={"delivery"}/>
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                <Row>
                                        <Col>
                                            None
                                        </Col>
                                </Row>
                            )}
                        </Card>

                        <Card className="mt-2" style={{padding: '15px', borderRadius: '20px', color: '#014c91'}}>
                                <Row>
                                    <Col lg="9">
                                        <h3>{React.createElement(FaScrewdriver, { size: 25, style: { marginRight: '5px', marginBottom: '5px'  }})}Installation</h3>
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                        <EditServiceDetailsModal type={"installation"}/>
                                    </Col>
                                </Row>
                                {installations && installations.length > 0 ? (
                                    <>
                                        <Row>
                                            <Col>
                                                Technician: <strong>{installations[0].technician_name}</strong>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                Start Date: <strong>{new Date(installations[0].start_installation_date).toLocaleDateString()}</strong>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                Start Time: <strong>{new Date(installations[0].start_installation_date).toLocaleTimeString()}</strong>
                                            </Col>
                                        </Row>
                                    
                                        {installations[0].end_installation_date ? (
                                            <>
                                                <Row className="mt-2">
                                                    <Col>
                                                        End Date: <strong>{new Date(installations[0].end_installation_date).toLocaleDateString()}</strong>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        End Time: <strong>{new Date(installations[0].end_installation_date).toLocaleTimeString()}</strong>
                                                    </Col>
                                                </Row>
                                            </>
                                        ): null}
                                        <Row>
                                            <Col>
                                                {installations.length > 1 ? `There ${installations.length-1 > 1 ? 'are' : 'is'} ${installations.length-1} more ${installations.length-1 > 1 ? 'installations' : 'installation'} left` : null}
                                            </Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col>
                                                <CompleteServiceModal type={"installation"}/>
                                            </Col>
                                        </Row>
                                    </>
                                ):(
                                    <Row>
                                            <Col>
                                                None
                                            </Col>
                                    </Row>
                                ) }
                        </Card>

                        <Card className="mt-2" style={{padding: '15px', borderRadius: '20px', background: '#E7FFE2', color: '#008000'}}>
                            <Row>
                                <Col lg="9">
                                    <h3>{React.createElement(FaToolbox, { size: 25, style: { marginRight: '5px', marginBottom: '5px' }})}Service</h3>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <EditServiceDetailsModal type={"service"}/>
                                </Col>
                            </Row>
                            
                            {services && services.length > 1 ? (
                                <>
                                    <Row>
                                        <Col>
                                            Date: <strong>{new Date(services[0].service_date).toLocaleDateString()}</strong>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            Time: <strong>{new Date(services[0].service_date).toLocaleTimeString()}</strong>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            Technician: <strong>{services[0].technician_name}</strong>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {services.length > 1 ? `There ${services.length-1 > 1 ? 'are' : 'is'} ${services.length-1} more ${services.length-1 > 1 ? 'services' : 'service'} left` : null}
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                            <Col>
                                                <CompleteServiceModal type={"service"}/>
                                            </Col>
                                    </Row>
                                </>
                            ) : (
                                <Row>
                                        <Col>
                                            None
                                        </Col>
                                </Row>
                            )}
                            
                        </Card>

                    </Card>
                </Col>
                <Col lg="4">
                    <Card style={{padding: '15px', borderRadius: '20px', background:'#CCDBE9', display: 'flex', flexDirection: 'column', height: '100%'}}>
                        <Card style={{padding: '15px', borderRadius: '20px', color: '#014c91',display: 'flex', flexDirection: 'column', height: '100%'}}>
                            <Row>
                                <Col lg="9">
                                    <h3>{React.createElement(FaMoneyBillWave, { size: 25, style: { marginRight: '5px', marginBottom: '5px'  }})}Payment History</h3>
                                </Col>
                            </Row>

                            {payments && payments.length > 0 ? (
                                <>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th style={{color: '#014c91'}}>Date</th>
                                                <th style={{color: '#014c91'}}>Method</th>
                                                <th style={{color: '#014c91'}}>Ref. #</th>
                                                <th style={{color: '#014c91'}}>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <React.Fragment>
                                                <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                    <td style={{color: '#014c91'}}>{new Date(payments[0].date_created).toLocaleDateString()}</td>
                                                    <td style={{color: '#014c91'}}>{payments[0].name}</td>
                                                    <td style={{color: '#014c91'}}>{payments[0].refNo ?? ''}</td>
                                                    <td style={{color: '#014c91'}}>₱{formatNumber(payments[0].amount)}</td>
                                                </tr>

                                                <tr>
                                                    <td colspan="3" style={{color: '#014c91', textAlign: 'right'}}>Total Amount Paid</td>
                                                    <td style={{color: '#014c91'}}><strong>₱{formatNumber(payments.reduce((sum, item) => item.amount + sum, 0))} </strong></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" style={{color: '#014c91', textAlign: 'right'}}>Remaining Balance</td>
                                                    <td style={{color: '#014c91'}}><strong>₱15,000.00 </strong></td>
                                                </tr>
                                            </React.Fragment>
                                        </tbody>
                                    </Table>
                                </>
                            ) : (
                                <Row>
                                        <Col>
                                            No Payments Made Yet
                                        </Col>
                                </Row>
                            )}

                            
                            <Row className="mt-2">
                                <Col>
                                    <AddPaymentModal/>
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
                                    <h3>{React.createElement(FaShoppingBag, { size: 25, style: { marginRight: '5px', marginBottom: '5px'  }})}Purchase Summary</h3>
                                </Col>
                            </Row>

                            <Table>
                                    <thead>
                                        <tr>
                                            <th style={{color: '#014c91'}}>Date</th>
                                            <th style={{color: '#014c91'}}>Quotation</th>
                                            <th style={{color: '#014c91'}}>Invoice</th>
                                            <th style={{color: '#014c91'}}>Purchase Order</th>
                                            <th style={{color: '#014c91'}}>Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <React.Fragment>
                                            <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                <td style={{color: '#014c91'}}>Jan. 24, 2024</td>
                                                <td style={{color: '#014c91'}}>#0001</td>
                                                <td style={{color: '#014c91'}}>#0001</td>
                                                <td style={{color: '#014c91'}}>#0001</td>
                                                <td style={{color: '#014c91'}}>₱60,000.00</td>
                                            </tr>

                                        
                                        </React.Fragment>
                                    </tbody>
                            </Table>

                        

                            
                            <Row className="mt-2">
                                <Col>
                                    <button className="btn w-40" style={{color: "white", backgroundColor: "#014c91"}}>
                                        {React.createElement(FaPlus, { size: 18, style: { marginRight: '5px' } })}   Add Purchase
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

export default SaleDetails;
