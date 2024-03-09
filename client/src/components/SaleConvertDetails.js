import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaBriefcase} from 'react-icons/fa';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import '../index.css';
import ReturningClientModal from './ReturningClientModal';
import axios from 'axios';

const SaleConvertDetails = () => {
    
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);

    };



    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Convert to Sale</h1>
            <h5>Provide information on the sale</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

        
            

        {/*Forms*/ }
        
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        
            <Row className="mt-3">
                <Col lg="2">
                    <Form.Group controlId="paymentOption">
                        <Form.Label>Payment Option</Form.Label>
                        <div>
                            <Form.Check
                                type="radio"
                                id="downPayment"
                                label="Down Payment"
                                name="paymentOption"
                                required
                            />
                            <Form.Check
                                type="radio"
                                id="fullPayment"
                                label="Full Payment"
                                name="paymentOption"
                                required
                            />
                        </div>
                        <Form.Control.Feedback type="invalid">
                            Please select a payment option.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col lg="2">
                        <Form.Group controlId="paymentMode">
                            <Form.Label>Mode of Payment</Form.Label>
                            <Form.Control as="select" required>
                                <option value=""> Select </option>
                                <option value="1"> One </option>
                                <option value="2"> Two </option>
                                <option value="3"> Three </option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please choose a mode of payment.
                            </Form.Control.Feedback>
                        </Form.Group>
                </Col>
                
                <Col lg="2">
                            <Form.Group controlId="amount">
                            <Form.Label>Amount</Form.Label>
                            <InputGroup>
                                <InputGroup.Text> ₱ </InputGroup.Text>
                                <Form.Control   className="money" type="number" inputmode="numeric" min="0" 
                                                required onWheel={(e) => e.target.blur()}  />
                            </InputGroup>
                            <Form.Control.Feedback type="invalid">
                                Please provide an amount.
                            </Form.Control.Feedback>
                        </Form.Group>
                </Col>

                <Col lg="2">
                        <Form.Group controlId="paymentMode">
                            <Form.Label>Reference Number</Form.Label>
                            <Form.Control type="text" required/>
                            <Form.Control.Feedback type="invalid">
                                Please input reference number
                            </Form.Control.Feedback>
                        </Form.Group>
                </Col>   
            </Row>

            <Row className="mt-3">
                <Col lg="2">
                    <Form.Group controlId="transportationMode">
                        <Form.Label>Mode of Transportation</Form.Label>
                        <div>
                            <Form.Check
                                type="radio"
                                id="delivery"
                                label="Delivery"
                                name="transportationMode"
                                required
                            />
                            <Form.Check
                                type="radio"
                                id="pickup"
                                label="Pick Up"
                                name="transportationMode"
                                required
                            />
                        </div>
                        <Form.Control.Feedback type="invalid">
                            Please select a transportation mode.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col lg="2">
                    <Form.Group controlId="date">
                        <Form.Label>Delivery Date</Form.Label>
                        <Form.Control type="date" required/>
                        <Form.Control.Feedback type="invalid">
                            Please choose a valid date.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col lg="2">
                    <Form.Group controlId="time">
                        <Form.Label>Delivery Time</Form.Label>
                        <Form.Control type="time" required/>
                        <Form.Control.Feedback type="invalid">
                            Please choose a valid time.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col lg="2">
                    <Form.Group controlId="forInstallation">
                        <Form.Label>Installation Details</Form.Label>
                        <div>
                            <Form.Check
                                type="radio"
                                id="yesInstall"
                                label="One Day installation"
                                name="forInstallation"
                                required
                            />
                            <Form.Check
                                type="radio"
                                id="noInstall"
                                label="Multiple Days Installation"
                                name="forInstallation"
                                required
                            />
                            <Form.Check
                                type="radio"
                                id="noInstall"
                                label="No Installation"
                                name="forInstallation"
                                required
                            />
                        </div>
                        <Form.Control.Feedback type="invalid">
                            Please select a transportation mode.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col lg="2">
                    <Form.Group controlId="installstartdate">
                        <Form.Label>Installation Start Date</Form.Label>
                        <Form.Control type="date" required/>
                        <Form.Control.Feedback type="invalid">
                            Please choose a valid date.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col lg="2">
                    <Form.Group controlId="installstarttime">
                        <Form.Label>Installation Start Time</Form.Label>
                        <Form.Control type="time" required/>
                        <Form.Control.Feedback type="invalid">
                            Please choose a valid time.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row style={{ marginTop: '-30px' }}>
                <Col lg="2"/>
                <Col lg="2">
                    <Form.Group controlId="installstartdate">
                        <Form.Label>Installation End Date</Form.Label>
                        <Form.Control type="date" required/>
                        <Form.Control.Feedback type="invalid">
                            Please choose a valid date.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col lg="2">
                    <Form.Group controlId="installstarttime">
                        <Form.Label>Installation End Time</Form.Label>
                        <Form.Control type="time" required/>
                        <Form.Control.Feedback type="invalid">
                            Please choose a valid time.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col lg="2">
                    <Form.Group controlId="paymentMode">
                        <Form.Label>Technician</Form.Label>
                        <Form.Control as="select" required>
                            <option value=""> Select </option>
                            <option value="1"> One </option>
                            <option value="2"> Two </option>
                            <option value="3"> Three </option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please choose a mode of payment.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col lg="2"/>

                <Col lg="2">
                    <Form.Group controlId="installstartdate">
                        <Form.Label>Service Date</Form.Label>
                        <Form.Control type="date" required/>
                        <Form.Control.Feedback type="invalid">
                            Please choose a valid date.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col lg="2">
                    <Form.Group controlId="installstarttime">
                        <Form.Label>Service Time</Form.Label>
                        <Form.Control type="time" required/>
                        <Form.Control.Feedback type="invalid">
                            Please choose a valid time.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col lg="2">
                    <Form.Group controlId="paymentMode">
                        <Form.Label>Technician</Form.Label>
                        <Form.Control as="select" required>
                            <option value=""> Select </option>
                            <option value="1"> One </option>
                            <option value="2"> Two </option>
                            <option value="3"> Three </option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please choose a mode of payment.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col lg="2"/>

                <Col lg="2">
                    <button className="btn w-100" style={{color: "white", backgroundColor: "#014c91"}}>
                    {React.createElement(FaBriefcase, { size: 18, style: { marginRight: '5px' } })}   Convert to Sale
                    </button>
                </Col>

                <Col lg="2">
                    <button className="btn w-100" style={{color: "white", backgroundColor: "#6c757d"}}>
                    Cancel
                    </button>
                </Col>
            </Row>
            
        
    </Form>


       
        

        
           


        </div>
    );
};

export default SaleConvertDetails;
