import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form,  InputGroup } from 'react-bootstrap';
import { FaSave, FaPlus} from 'react-icons/fa';

const AddPaymentModal = () => {
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
                {React.createElement(FaPlus, { size: 18, style: { marginRight: '5px' } })}   Add Payment
            </button>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Add Payment</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>

                        {/*Forms*/ }
                        <Row className="mt-3">

                            <Col lg="4">
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
                            
                            <Col lg="4">
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

                            <Col lg="4">
                                    <Form.Group controlId="paymentMode">
                                        <Form.Label>Reference Number</Form.Label>
                                        <Form.Control type="text" required/>
                                        <Form.Control.Feedback type="invalid">
                                            Please input reference number
                                        </Form.Control.Feedback>
                                    </Form.Group>
                            </Col>   
                        </Row>

       
                               
                    
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                            <button className="btn" style={{color: "white", backgroundColor: "#014c91"}}>
                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Save Payment
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

export default AddPaymentModal;
