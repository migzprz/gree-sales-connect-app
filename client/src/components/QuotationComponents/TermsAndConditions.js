import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';
import { FaSave } from 'react-icons/fa';
import { Row, Col, Form } from 'react-bootstrap';

const TermsAndConditions = ({ onTermsSubmission }) => {
    const [validated, setValidated] = useState(false);
    const [terms, setTerms] = useState({
        A: 
        `First 10 feet of copper tubing, rubber insulation, Breaker, PVC drain pipe and other consumables`,
        B1:
        `One (1) year from the date of start-up on units with factory defects.`,
        B2:
        `Five (5) years warranty on the Compressor`,
        B3:
        `No warranty claims unless units are fully paid by the client.`,
        C1: 
        `Warranty: Warranty for workmanship within a period of three (3) months.`,
        C2: 
        `Work Schedule: To be arranged after receipt of down-payment.`,
        D1: 
        `i. Electrical power lines of sufficient capacity and appropriate phase and voltage terminating to a main disconnect switch.`,
        D2: 
        `ii. Construction of equipment platform, foundation of support and enclosure where necessary including all civil works required such as provision for opening through walls, floor, ceiling, patching and repainting of same after installation thereof; and`,
        D3: 
        `iii. Plans, Permits and other licenses.`,
        D4: 
        `In Excess of 10 feet piping to be charged:`,
        D5: 
        `350`,
        D6: 
        `php per feet on the 1.0hp-1.5hp Wall Mounted Type`,
        D7: 
        `400`,
        D8: 
        `php per feet for 2.0hp-2.5hp Wall Mounted Type`,
        D9: 
        `500`,
        D10: 
        `php per feet for 3.0hp-4.0hp Wall Mounted Type. 4.0hp Floor Mounted Type`,
        D11: 
        `550`,
        D12: 
        `php per feet for 4.0hp Cassette Type. 7.0hp Cassette Type.`,
        E: 
        `*These prices are subject to change without prior notice. If a unit runs out of stock, the price of this unit may change as well`,
    });

    const handleTermsChange = (event) => {
        const { id, value } = event.target;
        setTerms({ ...terms, [id]: value });
    };

    useEffect(() => {
        console.log("Updated terms:", terms);
    }, [terms]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      setValidated(true);
      if (form.checkValidity()) {
            onTermsSubmission(terms)
          }
        
    };

    return (
        <>
            <h5>Create Terms and Conditions</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
          
    
            {/*Forms*/ }
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mt-3">
                    <Col lg="12">
                        <Form.Group controlId="A">
                            <Form.Label>A. Inclusions</Form.Label>
                            <Form.Control type="text" required value={terms.A}  onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
    
                <Row className="mt-3">
                    <Col lg="12">
                        <Form.Group controlId="B1">
                            <Form.Label>B. Equipment</Form.Label>
                            <Form.Control type="text" required value={terms.B1} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col lg="12">
                        <Form.Group controlId="B2">
                            <Form.Control type="text" required value={terms.B2} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col lg="12">
                        <Form.Group controlId="B3">
                            <Form.Control type="text" required value={terms.B3} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
    
                <Row className="mt-3">
                    <Col lg="12">
                        <Form.Group controlId="C1">
                            <Form.Label>C. Installation</Form.Label>
                            <Form.Control type="text" required value={terms.C1} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <Form.Group controlId="C2">
                            <Form.Control type="text" required value={terms.C2} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row className="mt-3">
                    <Col lg="12">
                        <Form.Group controlId="D1">
                            <Form.Label>D. Works and Materials Not Included in This Quotation</Form.Label>
                            <Form.Control as="textarea" required value={terms.D1} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <Form.Group controlId="D2">
                            <Form.Control as="textarea" required value={terms.D2} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <Form.Group controlId="D3">
                            <Form.Control as="textarea" required value={terms.D3} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col lg="12">
                        <Form.Group controlId="D4">
                            <Form.Control type="text" required value={terms.D4} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col lg="1">
                        <Form.Group controlId="D5">
                            <Form.Control type="text" required value={terms.D5} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg="11">
                        <Form.Group controlId="D6">
                            <Form.Control type="text" required value={terms.D6} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col lg="1">
                        <Form.Group controlId="D7">
                            <Form.Control type="text" required value={terms.D7} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg="11">
                        <Form.Group controlId="D8">
                            <Form.Control type="text" required value={terms.D8} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col lg="1">
                        <Form.Group controlId="D9">
                            <Form.Control type="text" required value={terms.D9} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg="11">
                        <Form.Group controlId="D10">
                            <Form.Control type="text" required value={terms.D10} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col lg="1">
                        <Form.Group controlId="D11">
                            <Form.Control type="text" required value={terms.D11} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg="11">
                        <Form.Group controlId="D12">
                            <Form.Control type="text" required value={terms.D12} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col lg="12">
                        <Form.Group controlId="E">
                            <Form.Label>E. Note</Form.Label>
                            <Form.Control type="text" required value={terms.E} onChange={(e) => handleTermsChange(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide text.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
    
    
                <Row className="mt-5">
                    <Col lg="3">
                        <button className="btn w-100" style={{color: "white", backgroundColor: "#014c91"}}>
                        {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })}   Save Terms & Conditions
                        </button>
                    </Col>
                </Row>
    
            </Form>
    
    
        
        </>
      );
    };

export default TermsAndConditions;
