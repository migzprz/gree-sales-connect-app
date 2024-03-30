import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, PureComponent, useEffect } from 'react';
import { Row, Col, Card, CardBody, Table } from 'react-bootstrap';
import { FaFilter, FaSort, FaSearch} from 'react-icons/fa';
import axios from 'axios'
import LoadingScreen from '../LoadingScreen';

const SysAdDashboard = () => {

    const [loading, setLoading] = useState(true);
    const [productTotal, setProductTotal] = useState([]);
    const [serviceTotal, setServiceTotal] = useState([]);
    const [userTotal, setUserTotal] = useState([]);
    const [technicianTotal, setTechnicianTotal] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getProductCount/');
                const response2 = await axios.get('http://localhost:4000/api/getServicesCount/');
                const response3 = await axios.get('http://localhost:4000/api/getUsersCount/');
                const response4 = await axios.get('http://localhost:4000/api/getTechniciansCount/');
               
                setProductTotal(response.data[0].qty);
                setServiceTotal(response2.data[0].qty);
                setUserTotal(response3.data[0].qty);
                setTechnicianTotal(response4.data[0].qty);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchDashboardData();
    }, []);
    
    return (
        <>
            {loading ? 
            <LoadingScreen/> :
            <>
                <Row>
                    <Col lg="3">
                        <Card style={{color: '#014c91', overflow: 'hidden', height: '180px'}}>
                            <CardBody>
                                <h5>Total Active Products</h5>
                                <h1 style={{fontSize:'70px'}}> {productTotal}</h1>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="3">
                        <Card style={{color: '#014c91', overflow: 'hidden', height: '180px'}}>
                            <CardBody>
                                <h5>Total Active Services</h5>
                                <h1 style={{fontSize:'70px'}}> {serviceTotal}</h1>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="3">
                        <Card style={{color: '#014c91', overflow: 'hidden', height: '180px'}}>
                            <CardBody>
                                <h5>Total Active Users</h5>
                                <h1 style={{fontSize:'70px'}}> {userTotal}</h1>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="3">
                        <Card style={{color: '#014c91', overflow: 'hidden', height: '180px'}}>
                            <CardBody>
                                <h5>Total Active Technicians</h5>
                                <h1 style={{fontSize:'70px'}}> {technicianTotal}</h1>
                            </CardBody>
                        </Card>
                    </Col>
        
                </Row>

                

                
            </>}
        </>
    );
};

export default SysAdDashboard;
