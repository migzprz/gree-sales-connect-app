import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaCheck, FaSearch, FaScrewdriver, FaToolbox, FaPlus, FaMoneyBillWave, FaShoppingBag} from 'react-icons/fa';
import { Row, Col, Card, CardBody, CardHeader, Table, Form, Dropdown } from 'react-bootstrap';
import '../index.css';
import axios from 'axios'
import CompleteWarrantyServiceModal from './CompleteWarrantyServiceModal';
import EditWarrantyServiceModal from './EditWarrantyServiceModal';
import AddWarrantyPartModal from './AddWarrantyPartModal';
import CompleteWarrantyModal from './CompleteWarrantyModal';
import ClaimWarrantyPartModal from './ClaimWarrantyPartModal';
import LoadingScreen from './LoadingScreen';

const WarrantyDetails= () => {

    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [warrantyData, setWarrantyData] = useState([]);
    const [claimedUnitsData, setClaimedUnitsData] = useState([]);
    const [requestedPartsData, setRequestedPartsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getWarranty/${id}/`)
                setWarrantyData(response.data[0])
                console.log(response.data[0])

                const response2 = await axios.get(`http://localhost:4000/api/getClaimedUnits/${id}/`)
                setClaimedUnitsData(response2.data)

                const response3 = await axios.get(`http://localhost:4000/api/getWarrantyRequestedParts/${id}/`)
                setRequestedPartsData(response3.data)

                setLoading(false);
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
        <>
            {loading ? 
                <LoadingScreen/> :
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
                            
                            {warrantyData.service_completed && (warrantyData.inspection_date === null || warrantyData.inspection_completed) ? (
                            <Row className="mt-3">
                                <Col>
                                    <CompleteWarrantyModal id={id}/>
                                </Col>
                            </Row>
                            ): null}

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
                                            <EditWarrantyServiceModal service_id={warrantyData.inspection_id} id={id} type={"inspection"} is_completed={warrantyData.inspection_completed} date={warrantyData.inspection_date}/>
                                        </Col>
                                    </Row>
                                    {!warrantyData.inspection_completed  ?   
                                    <>    
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
                                    </> : ("No upcoming Inspection") }
                                    <Row className="mt-2">
                                        <Col>
                                            {!warrantyData.inspection_completed ? (
                                                <CompleteWarrantyServiceModal service_id={warrantyData.inspection_id} id={id} type={"inspection"}/>
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
                                        <EditWarrantyServiceModal service_id={warrantyData.warranty_service_id} id={id} type={"service"} is_completed={warrantyData.service_completed} date={warrantyData.service_date}/>

                                        </Col>
                                    </Row>
                                    {!warrantyData.service_completed  ?   
                                    <>           
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
                                    </> : ("No upcoming Services") 
                                    }  
                                    <Row className="mt-2">
                                        <Col>
                                            {(!warrantyData.service_completed && warrantyData.inspection_completed) ?  (
                                                <CompleteWarrantyServiceModal service_id={warrantyData.warranty_service_id} id={id} type={"service"}/>
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
                                <Card style={{padding: '15px', borderRadius: '20px', color: '#014c91', display: 'flex', flexDirection: 'column', height: '100%'}}>
                                    <Row>
                                        <Col lg="9">
                                            <h3>{React.createElement(FaShoppingBag, { size: 25, style: { marginRight: '5px', marginBottom: '5px'  }})}Requested Parts </h3>
                                        </Col>
                                    </Row>
                                    
                                    {requestedPartsData.length>0 ?
                                    <Table>
                                            <thead>
                                                <tr>
                                                    <th style={{color: '#014c91'}}>Description</th>
                                                    <th style={{color: '#014c91'}}>Unit Model</th>             
                                                    <th style={{color: '#014c91'}}>Quantity</th>
                                                    <th style={{color: '#014c91'}}>Status</th>                         
                                                </tr>
                                            </thead>
                                            <tbody>
                                            
                                                {requestedPartsData.map((part, index) => (
                                                    <React.Fragment key={part.requested_part_id}>
                                                        <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                            <td style={{color: '#014c91'}}>{part.description}</td>
                                                            <td style={{color: '#014c91'}}>{part.name}</td>
                                                            <td style={{color: '#014c91'}}>{part.quantity}</td>
                                                            <td style={{color: '#014c91'}}>
                                                                {part.date_claimed === null ?
                                                                <ClaimWarrantyPartModal description={part.description} quantity={part.quantity} id={part.requested_part_id}/> :
                                                                "Claimed"}
                                                                </td>
                                                        </tr>
                                                    </React.Fragment>
                                                ))}
                                                
                                            </tbody>
                                    </Table> :
                                    <strong>No Requested Parts </strong>}

                                

                                    {!warrantyData.service_completed &&
                                    <Row className="mt-2">
                                        <Col>
                                            <AddWarrantyPartModal id={id}/>
                                        </Col>
                                    </Row>}
                                </Card>
                            </Card>
                        </Col>

                        <Col lg="4">
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
                                                {claimedUnitsData.map((unit, index) => (
                                                    <React.Fragment key={unit.unit_id}>
                                                        <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                            <td style={{color: '#014c91'}}>{unit.description}</td>
                                                            <td style={{color: '#014c91'}}>{unit.unit_model}</td>
                                                            <td style={{color: '#014c91'}}>{unit.issue}</td>
                                                        </tr>
                                                    </React.Fragment>
                                                ))}
                                            </tbody>
                                    </Table>

                                </Card>
                            </Card>
                        </Col>


                    </Row>




                </div>
            }
            </>
    );
};

export default WarrantyDetails;
