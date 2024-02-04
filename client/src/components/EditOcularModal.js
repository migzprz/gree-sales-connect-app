import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form,  Dropdown } from 'react-bootstrap';
import { FaEdit} from 'react-icons/fa';

const EditOcularModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
    };

    // Dummy data for ocular details
    const ocularDetails = [
        {   id: 1,
            client: 'Client 1',
            company: 'Company 1',
            location: '41B K1st St. Kamuning Quezon City NCR 1103',
            contactNumber: '0165189598',
            emailAddress: 'miguel_josh_perez@dlsu.edu.ph',
            TIN: '77788899900000',
            date: '2024-01-15',
            time: '10:00 AM',
            technician: 'Technician 1',
            status: 'Scheduled'}
      ];

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
        <div>

        <Dropdown.Item onClick={handleShowModal}>Edit Ocular Details</Dropdown.Item>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Edit Ocular Details</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>

                                <Row>
                                    <Col lg="3">
                                        <strong> Client Name: </strong> 
                                    </Col>
                                    <Col lg="3">
                                        {ocularDetails[0].client}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Company Name: </strong>
                                    </Col>
                                    <Col lg="3">
                                        {ocularDetails[0].company}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> TIN ID: </strong> 
                                    </Col>
                                    <Col lg="3">
                                        {ocularDetails[0].TIN}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Contact Number: </strong>
                                    </Col>
                                    <Col lg="3">
                                        {ocularDetails[0].contactNumber}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Email Address: </strong> 
                                    </Col>
                                    <Col lg="3">
                                        {ocularDetails[0].emailAddress}
                                    </Col>
                                </Row>
                
                                <Row className="mt-3">
                                    <Col lg="4">
                                        <Form.Group controlId="unitNo">
                                            <Form.Label>Unit No.</Form.Label>
                                            <Form.Control type="text" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid Unit No.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="4">
                                        <Form.Group controlId="street">
                                            <Form.Label>Street</Form.Label>
                                            <Form.Control type="text" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid Street Name.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="3">
                                        <Form.Group controlId="barangay">
                                            <Form.Label>Barangay</Form.Label>
                                            <Form.Control as="select" required>
                                                <option value=""> Select </option>
                                                <option value="1"> One </option>
                                                <option value="2"> Two </option>
                                                <option value="3"> Three </option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a barangay.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col lg="3">
                                        <Form.Group controlId="city">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control as="select" required>
                                                <option value=""> Select </option>
                                                <option value="1"> One </option>
                                                <option value="2"> Two </option>
                                                <option value="3"> Three </option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a city.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="3">
                                        <Form.Group controlId="province">
                                            <Form.Label>Province</Form.Label>
                                            <Form.Control as="select" required>
                                                <option value=""> Select </option>
                                                <option value="1"> One </option>
                                                <option value="2"> Two </option>
                                                <option value="3"> Three </option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a province.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="3">
                                        <Form.Group controlId="region">
                                            <Form.Label>Region</Form.Label>
                                            <Form.Control as="select" required>
                                                <option value=""> Select </option>
                                                <option value="1"> One </option>
                                                <option value="2"> Two </option>
                                                <option value="3"> Three </option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a region.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="2">
                                        <Form.Group controlId="companyName">
                                            <Form.Label>ZIP Code</Form.Label>
                                            <Form.Control pattern="[0-9]{4}" type="text" required/>
                                            <Form.Control.Feedback type="invalid" required>
                                                Please provide a valid ZIP Code.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col lg="3">
                                        <Form.Group controlId="date">
                                            <Form.Label>Ocular Date</Form.Label>
                                            <Form.Control type="date" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a valid date.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="3">
                                        <Form.Group controlId="time">
                                            <Form.Label>Ocular Time</Form.Label>
                                            <Form.Control type="time" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a valid time.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="3">
                                        <Form.Group controlId="technician">
                                            <Form.Label>Assigned Technician</Form.Label>
                                            <Form.Control as="select" required>
                                                <option value=""> Select </option>
                                                <option value="1"> One </option>
                                                <option value="2"> Two </option>
                                                <option value="3"> Three </option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a technician.
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                    </Col>
                                </Row>
                    
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                            <button className="btn" style={{color: "white", backgroundColor: "#014c91"}}>
                            {React.createElement(FaEdit, { size: 18, style: { marginRight: '5px' } })} Edit
                            </button>

                            <button className="btn" onClick={handleCloseModal} style={{color: "white", backgroundColor: "#6c757d"}}>
                            Cancel
                            </button>

                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default EditOcularModal;
