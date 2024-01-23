import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, LineChart, Line  } from 'recharts';
import { Row, Col, Card, CardBody, Table } from 'react-bootstrap';
import '../index.css';

const SalesDashboard = () => {

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


    const [ocularLinesVisibility, setOcularLinesVisibility] = useState({ocular: true});
    const [quotationLinesVisibility, setquotationLinesVisibility] = useState({quotation: true});
    
    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Sales Dashboard</h1>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

            <Row className="mt-4">
                <Col lg="6">
                    <Card style={{color: '#014c91', overflow: 'hidden'}}>
                        <CardBody className="mb-5">
                            <ResponsiveContainer width='100%' height={300}>
                                <h3>Number of Oculars Scheduled</h3>
                                <LineChart data={ocularData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name"/>
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    {Object.keys(ocularLinesVisibility).map((key, index) => (
                                        ocularLinesVisibility[key] && (
                                            <Line key={key} type="monotone" dataKey={key} stroke={'#E26014'}/>
                                        )
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="6">
                    <Card style={{color: '#014c91', overflow: 'hidden'}}>
                        <CardBody className="mb-5">
                            <ResponsiveContainer width='100%' height={300}>
                                <h3>Number of Quotations Generated</h3>
                                <LineChart data={quotationData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name"/>
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    {Object.keys(quotationLinesVisibility).map((key, index) => (
                                        quotationLinesVisibility[key] && (
                                            <Line key={key} type="monotone" dataKey={key} stroke={'#1427E2'}/>
                                        )
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </Col>
            </Row>


            <Row className="mt-4">
                <Col lg="12">
                    <Card style={{color: '#014c91'}}>
                        <CardBody>
                            <h2>Clients</h2>
                        </CardBody>
                    </Card>
                </Col>
            </Row>


            <Row className="mt-4">
                <Col lg="12">
                    <Card style={{color: '#014c91'}}>
                        <CardBody>
                            <h2>Sales</h2>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            

            


        </div>
    );
};

export default SalesDashboard;
