import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form,  InputGroup } from 'react-bootstrap';
import { FaSave, FaPlus} from 'react-icons/fa';

const AddProductModal = () => {
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

            <button className="btn w-40" onClick={handleShowModal} style={{color: "white", backgroundColor: "#014c91"}}>
                {React.createElement(FaPlus, { size: 18, style: { marginRight: '5px' } })}   Add Product/Service
            </button>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Add New Product/Service</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>

                        {/*Forms*/ }
        
                        <Row className="mt-1">
                            <Col lg="5">
                                <Form.Group controlId="type">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" required>
                                        <option value=""> Select </option>
                                        <option value="1"> Window Type </option>
                                        <option value="2"> Split Type </option>
                                        <option value="3"> AC Parts </option>
                                        <option value="4"> General Appliances </option>
                                        <option value="5"> Service </option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please select type.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col lg="8">
                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" name='description' required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide description
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="4">
                                <Form.Group controlId="srp">
                                    <Form.Label>SRP</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text> ₱ </InputGroup.Text>
                                        <Form.Control   className="money" type="number" inputmode="numeric" min="0" 
                                                        required onWheel={(e) => e.target.blur()}/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mt-2">

                            <Col lg="2">
                                <Form.Group controlId="inverter">
                                    <Form.Label>Inverter Type</Form.Label>
                                    <div>
                                        <Form.Check
                                            type="radio"
                                            id="yes"
                                            label="Yes"
                                            name="inverter"
                                            required
                                        />
                                        <Form.Check
                                            type="radio"
                                            id="no"
                                            label="No"
                                            name="inverter"
                                            required
                                        />
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        Please select a transportation mode.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="3">
                                <Form.Group controlId="description">
                                    <Form.Label>Unit Model</Form.Label>
                                    <Form.Control type="text" name='hp' required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide horse power
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="3">
                                <Form.Group controlId="description">
                                    <Form.Label>Horse Power</Form.Label>
                                    <Form.Control type="number" name='hp' required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide horse power
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="4">
                                <Form.Group controlId="srp">
                                    <Form.Label>SRP</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text> ₱ </InputGroup.Text>
                                        <Form.Control   className="money" type="number" inputmode="numeric" min="0" 
                                                        required onWheel={(e) => e.target.blur()}/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>

       
                               
                    
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                            <button className="btn" style={{color: "white", backgroundColor: "#014c91"}}>
                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Save Product/Service
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

export default AddProductModal;
