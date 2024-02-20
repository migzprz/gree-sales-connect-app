import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form,  InputGroup } from 'react-bootstrap';
import { FaSave, FaPlus} from 'react-icons/fa';

const AddUserModal = () => {
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
                {React.createElement(FaPlus, { size: 18, style: { marginRight: '5px' } })}   Add Employee
            </button>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Add New Employee</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>

                        {/*Forms*/ }
        
                        <Row className="mt-1">
                            <Col lg="4">
                                <Form.Group controlId="type">
                                    <Form.Label>Employee Role</Form.Label>
                                    <Form.Control as="select" required>
                                        <option value=""> Select </option>
                                        <option value="1"> Sales Rep. </option>
                                        <option value="2"> AfterSales Rep. </option>
                                        <option value="3"> Executive </option>
                                        <option value="4"> System Administrator </option>
                                        <option value="5"> Technician </option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please select role.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="4">
                                <Form.Group controlId="description">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name='hp' required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide first name
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="4">
                                <Form.Group controlId="description">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name='hp' required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide last name
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                           
                        </Row>

                        <Row className="mt-1">
                            <Col lg="4">
                                <Form.Group controlId="description">
                                    <Form.Label>User ID</Form.Label>
                                    <Form.Control type="text" name='hp' required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide user ID
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="4">
                                <Form.Group controlId="description">
                                    <Form.Label>Default Password</Form.Label>
                                    <Form.Control type="text" name='hp' required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide default password
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                           
                        </Row>



                        <Row className="mt-5">
                            <Col >
                                <Form.Group controlId="modules">
                                    <Form.Label>System Access Level</Form.Label>
                                    <div>
                                        <Form.Check
                                            type="checkbox"
                                            id="sales"
                                            label="Sales Module"
                                            name="modules"
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            id="aftersales"
                                            label="Aftersales Module"
                                            name="modules"
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            id="executive"
                                            label="Executive Module"
                                            name="modules"
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            id="admin"
                                            label="System Administrator Module"
                                            name="modules"
                                        />
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        Please select at least one module.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>


       
                               
                    
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                            <button className="btn" style={{color: "white", backgroundColor: "#014c91"}}>
                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Save Employee
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

export default AddUserModal;
