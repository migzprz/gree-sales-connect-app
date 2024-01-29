import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { FaMale } from 'react-icons/fa';
import { Row, Col, Form, CardBody } from 'react-bootstrap';
import '../index.css';

const OcularList = () => {

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Set New Ocular Schedule</h1>
            <h5>Schedule an ocular</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />


        {/*Forms*/ }
        <h5 className="mt-4">Client Details</h5>
        <Row className="mt-3">
            <Col lg="3">
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>
            </Col>
            <Col lg="5">
                 <Form.Group controlId="companyName">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>
            </Col>
        </Row>

        <Row className="mt-2">
            <Col lg="3">
                <Form.Group controlId="contactNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="text" placeholder="e.g. 09123456789" />
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"/>
                </Form.Group>
            </Col>
            <Col lg="5">
                 <Form.Group controlId="tin">
                    <Form.Label>TIN ID</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>
            </Col>
        </Row>

        <h5 className="mt-4">Ocular Details</h5>
        <Row className="mt-3">
            <Col lg="4">
                <Form.Group controlId="unitNo">
                    <Form.Label>Unit No.</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
            </Col>
            <Col lg="4">
                <Form.Group controlId="street">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="barangay">
                    <Form.Label>Barangay</Form.Label>
                    <Form.Select>
                        <option value="0"> Select </option>
                        <option value="1"> One </option>
                        <option value="2"> Two </option>
                        <option value="3"> Three </option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

        <Row className="mt-2">
             <Col lg="3">
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Select>
                        <option value="0"> Select </option>
                        <option value="1"> One </option>
                        <option value="2"> Two </option>
                        <option value="3"> Three </option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="province">
                    <Form.Label>Province</Form.Label>
                    <Form.Select>
                        <option value="0"> Select </option>
                        <option value="1"> One </option>
                        <option value="2"> Two </option>
                        <option value="3"> Three </option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="region">
                    <Form.Label>Region</Form.Label>
                    <Form.Select>
                        <option value="0"> Select </option>
                        <option value="1"> One </option>
                        <option value="2"> Two </option>
                        <option value="3"> Three </option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col lg="2">
                <Form.Group controlId="companyName">
                    <Form.Label>ZIP Code</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>
            </Col>
        </Row>

        <Row className="mt-2">
             <Col lg="3">
                <Form.Group controlId="date">
                    <Form.Label>Ocular Date</Form.Label>
                    <Form.Control type="date"/>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="time">
                    <Form.Label>Ocular Time</Form.Label>
                    <Form.Control type="time"/>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="region">
                    <Form.Label>Assigned Technician</Form.Label>
                    <Form.Select>
                        <option value="0"> Select </option>
                        <option value="1"> One </option>
                        <option value="2"> Two </option>
                        <option value="3"> Three </option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

        <Row className="mt-5">
            <Col lg="2">
                <button className="btn w-100" style={{color: "white", backgroundColor: "#014c91"}}>
                    Set Ocular
                 </button>
            </Col>

        </Row>


       
        

        
           


        </div>
    );
};

export default OcularList;
