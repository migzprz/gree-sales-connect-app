import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer  } from 'recharts';
import { Row, Col, Card, CardBody, Table } from 'react-bootstrap';
import { FaFilter, FaSort, FaSearch} from 'react-icons/fa';

const SysAdDashboard = () => {

    const ocularData = [
        {name: 'JAN', ocular: 10}, {name: 'FEB', ocular: 120}, {name: 'MAR', ocular: 110}, {name: 'APR', ocular: 150}, 
        {name: 'MAY', ocular: 160}, {name: 'JUN', ocular: 180}, {name: 'JUL', ocular: 160}, {name: 'AUG', ocular: 130},
        {name: 'SEP', ocular: 130}, {name: 'OCT', ocular: 130}, {name: 'NOV', ocular: 130}, {name: 'DEC', ocular: 130}
      ];

    const quotationData = [
        {name: 'JAN', quotation: 120}, {name: 'FEB', quotation: 120}, {name: 'MAR', quotation: 110}, {name: 'APR', quotation: 150}, 
        {name: 'MAY', quotation: 160}, {name: 'JUN', quotation: 180}, {name: 'JUL', quotation: 160}, {name: 'AUG', quotation: 130},
        {name: 'SEP', quotation: 130}, {name: 'OCT', quotation: 30}, {name: 'NOV', quotation: 230}, {name: 'DEC', quotation: 130}
      ];


      const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
      ];
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const [ocularLinesVisibility, setOcularLinesVisibility] = useState({ocular: true});
    const [quotationLinesVisibility, setquotationLinesVisibility] = useState({quotation: true});
    
    return (
        <>
            <Row>
                <Col lg="3">
                    <Card style={{color: '#014c91', overflow: 'hidden', height: '180px'}}>
                        <CardBody>
                             <h5>Total Active Products</h5>
                             <h1 style={{fontSize:'70px'}}> 44</h1>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3">
                    <Card style={{color: '#014c91', overflow: 'hidden', height: '180px'}}>
                        <CardBody>
                             <h5>Total Active Services</h5>
                             <h1 style={{fontSize:'70px'}}> 23</h1>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3">
                    <Card style={{color: '#014c91', overflow: 'hidden', height: '180px'}}>
                        <CardBody>
                             <h5>Total Active Users</h5>
                             <h1 style={{fontSize:'70px'}}> 5</h1>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3">
                    <Card style={{color: '#014c91', overflow: 'hidden', height: '180px'}}>
                        <CardBody>
                             <h5>Total Active Technicians</h5>
                             <h1 style={{fontSize:'70px'}}> 3</h1>
                        </CardBody>
                    </Card>
                </Col>
    
            </Row>

            

            
        </>
    );
};

export default SysAdDashboard;
