import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEdit, FaSearch, FaCheck, FaTruck, FaClock, FaChevronRight, FaPlus, FaMoneyBillWave, FaShoppingBag} from 'react-icons/fa';
import { Row, Col, Card, CardBody, CardHeader, Table, Form, InputGroup } from 'react-bootstrap';
import '../index.css';

const ClaimWarrantyForm= () => {


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

    const [forInspection, setForInspection] = useState(false);

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Validate Warranty Claim</h1>
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

                </Col>
            </Row>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
        
                <Row className="mt-1">
                    <Col lg="2">
                        <Form.Group controlId="inverter">
                            <Form.Label>For Inspection</Form.Label>
                            <div>
                                <Form.Check
                                    type="radio"
                                    id="yes"
                                    label="Yes"
                                    name="inverter"
                                    checked={forInspection}
                                    onChange={() => setForInspection(true)}
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    id="no"
                                    label="No"
                                    name="inverter"
                                    checked={!forInspection}
                                    onChange={() => setForInspection(false)}
                                    required
                                />

                            </div>
                            <Form.Control.Feedback type="invalid">
                                Please select a transportation mode.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                {forInspection && ( 
                    <Row className="mt-1">
                        <Col lg="3">
                            <Form.Group controlId="description">
                                <Form.Label>Inspection Date</Form.Label>
                                <Form.Control type="date" name="inspectionDate" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide inspection date
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg="3">
                            <Form.Group controlId="description">
                                <Form.Label>Inspection Time</Form.Label>
                                <Form.Control type="time" name="inspectionTime" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide inspection time
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg="3">
                            <Form.Group controlId="type">
                                <Form.Label>Assigned Technician</Form.Label>
                                <Form.Control as="select" required>
                                    <option value=""> Select </option>
                                    <option value="1"> Window Type </option>
                                    <option value="2"> Split Type </option>
                                    <option value="3"> AC Parts </option>
                                    <option value="4"> General Appliances </option>
                                    <option value="5"> Service </option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please select technician.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                )}

                <Row className="mt-2">
                        <Col lg="3">
                            <Form.Group controlId="description">
                                <Form.Label>Service Date</Form.Label>
                                <Form.Control type="date" name="inspectionDate" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide service date
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg="3">
                            <Form.Group controlId="description">
                                <Form.Label>Service Time</Form.Label>
                                <Form.Control type="time" name="inspectionTime" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide service time
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg="3">
                            <Form.Group controlId="type">
                                <Form.Label>Assigned Technician</Form.Label>
                                <Form.Control as="select" required>
                                    <option value=""> Select </option>
                                    <option value="1"> Window Type </option>
                                    <option value="2"> Split Type </option>
                                    <option value="3"> AC Parts </option>
                                    <option value="4"> General Appliances </option>
                                    <option value="5"> Service </option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please select technician.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                </Row>
                
                <Row  className="mt-4">
                    <Col lg="9">
                        <strong>Ordered Units </strong> (Select units that have an issue)
                        <Card style={{ borderRadius: '20px'}}>
                            <CardBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th style={{color: '#014c91', width: "15%"}}>Qty. Claimed</th>
                                            <th style={{color: '#014c91'}}>Max Qty.</th>
                                            <th style={{color: '#014c91'}}>Description</th>
                                            <th style={{color: '#014c91'}}>Model.</th>
                                            <th style={{color: '#014c91'}}>Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quotationList.map((item, index) => (
                                            <React.Fragment key={item.id}>
                                                <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                    <td style={{ color: '#014c91' }}>
                                                        <Form.Group controlId={`qty-${index}`}>
                                                            <Form.Control   type="number" inputmode="numeric" min="1" required
                                                                            value={item.quantity} />
                                                        </Form.Group>
                                                    </td>
                                                    <td style={{color: '#014c91'}}>2</td>
                                                    <td style={{color: '#014c91'}}>{item.contactNumber}</td>
                                                    <td style={{color: '#014c91'}}>{item.dateGenerated}</td>
                                                    <td style={{ color: '#014c91' }}>
                                                        <Form.Group controlId={`qty-${index}`}>
                                                            <Form.Control   type="text" required />
                                                        </Form.Group>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col lg="2">
                        <button className="btn w-100" style={{color: "white", backgroundColor: "#014c91"}}>
                        {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })}  Claim Warranty
                        </button>
                    </Col>

                    <Col lg="2">
                        <button className="btn w-100" style={{color: "white", backgroundColor: "#6c757d"}}>
                            Cancel
                        </button>
                    </Col>
                </Row>
                    

            
            
            




        </div>
    );
};

export default ClaimWarrantyForm;
