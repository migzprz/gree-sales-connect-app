import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaSave} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table } from 'react-bootstrap';

const TermsAndConditions = () => {
  const [hasItems, setHasItems] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
        <h5>Create Terms and Conditions</h5>
        <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
      

        {/*Forms*/ }
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mt-3">
                <Col lg="12">
                    <Form.Group controlId="inclusions">
                        <Form.Label>A. Inclusions</Form.Label>
                        <Form.Control as="textarea" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide text.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col lg="12">
                    <Form.Group controlId="equipment">
                        <Form.Label>B. Equipment</Form.Label>
                        <Form.Control type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please provide text.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col lg="12">
                    <Form.Group controlId="installation">
                        <Form.Label>C. Installation</Form.Label>
                        <Form.Control type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please provide text.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            
            <Row className="mt-3">
                <Col lg="12">
                    <Form.Group controlId="works">
                        <Form.Label>D. Works and Materials Not Included in this Quotation</Form.Label>
                        <Form.Control type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please provide text.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col lg="12">
                    <Form.Group controlId="note">
                        <Form.Label>E. Note</Form.Label>
                        <Form.Control type="text" required/>
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
