import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaDownload, FaEye } from 'react-icons/fa';
import { Row, Col, Form, CardBody } from 'react-bootstrap';
import '../index.css';
import PreviewReport from './PreviewReport';

const ReportOptions = () => {

    const [validated, setValidated] = useState(false);
    const [preview, setPreview] = useState(false);

    const handleSubmit = (event) => {
    event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else {
        setPreview(true);
      }
  
      setValidated(true);
    };

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Generate Report</h1>
            <h5>Choose a report to generate</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />


        
        <Row>

            {/*Forms*/ }
            <Col lg="6">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mt-3">
                    <Col lg="12">
                        <Form.Group controlId="reporttype">
                            <Form.Label>Report Type</Form.Label>
                            <Form.Control as="select" required>
                                <option value=""> Select </option>
                                <option value="1"> Profit Report</option>
                                <option value="2"> Sales Report </option>
                                <option value="3"> Quotation Report </option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please choose a report type.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col lg="6">
                        <Form.Group controlId="startdate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" required/>
                            <Form.Control.Feedback type="invalid">
                                Please choose a valid date.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg="6">
                        <Form.Group controlId="enddate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" required/>
                            <Form.Control.Feedback type="invalid">
                                Please choose a valid date.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>


                <Row className="mt-5">
                    <Col lg="3">
                        <button className="btn w-100" style={{color: "white", backgroundColor: "#014c91"}}>
                        {React.createElement(FaDownload, { size: 18, style: { marginRight: '5px' } })}  Download
                        </button>
                    </Col>

                    <Col lg="3">
                        <button className="btn w-100" style={{color: "white", backgroundColor: "#6c757d"}}>
                        {React.createElement(FaEye, { size: 18, style: { marginRight: '5px' } })}  Preview
                        </button>
                    </Col>
                </Row>
                </Form>
            </Col>

            {/*Preview Report */}
            <Col lg="6">  
                {preview && <PreviewReport/>}
            </Col>
            
        </Row>
        



       
        

        
           


        </div>
    );
};

export default ReportOptions;
