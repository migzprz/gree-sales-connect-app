import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, LineChart, Line  } from 'recharts';
import { Row, Col, Card, CardBody, Table } from 'react-bootstrap';
import { FaFilter, FaSort, FaSearch} from 'react-icons/fa';

const ExecutiveDashboard = () => {

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
        <>
            <Row className="mb-3">
                <Col lg="3">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                    backgroundColor: "#014c91", borderRadius: "10px",
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>   
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaFilter, { size: 20 })}
                            </div>  
                        </div>
                        <select className="form-select">
                            <option value="">2024</option>
                        </select>

                    </div>
                </Col>
                <Col lg="3">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                    backgroundColor: "#014c91", borderRadius: "10px",
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>   
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaFilter, { size: 20 })}
                            </div>  
                        </div>
                        <select className="form-select">
                            <option value="">All Months</option>
                        </select>

                    </div>
                </Col>
            </Row>

            <Row>
                <Col lg="4">
                    <Card style={{color: '#014c91', overflow: 'hidden'}}>
                        <CardBody>
                             <h5>Total Expenses</h5>
                             <h1 style={{fontSize:'48px'}}> 21</h1>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="4">
                    <Card style={{color: '#014c91', overflow: 'hidden'}}>
                        <CardBody>
                             <h5>Total Sales Revenue</h5>
                             <h1 style={{fontSize:'48px'}}> 45</h1>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="4">
                    <Card style={{color: '#014c91', overflow: 'hidden'}}>
                        <CardBody>
                             <h5>Total Profits</h5>
                             <h1 style={{fontSize:'48px'}}> 32</h1>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col lg="12">
                    <Card style={{color: '#014c91', overflow: 'hidden'}}>
                        <CardBody className="mb-5">
                            <ResponsiveContainer width='100%' height={300}>
                                <h3>Revenue</h3>
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
            </Row>


            
        </>
    );
};

export default ExecutiveDashboard;
