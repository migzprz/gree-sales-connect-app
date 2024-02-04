import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form,  Dropdown } from 'react-bootstrap';
import { FaTrash} from 'react-icons/fa';

const CancelOcularModal = () => {
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

        <Dropdown.Item onClick={handleShowModal}>Cancel Ocular</Dropdown.Item>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#8c1919"}}>
                    <Modal.Title>Cancel Scheduled Ocular</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#8c1919", backgroundColor: "#E5EDF4"}}>

                                <Row>
                                    <Col>
                                    Are you sure you want to <strong> cancel </strong> the ocular with the following details?
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col lg="3">
                                        <strong> Client Name: </strong> 
                                    </Col>
                                    <Col>
                                        {ocularDetails[0].client}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Company Name: </strong>
                                    </Col>
                                    <Col>
                                        {ocularDetails[0].company}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> TIN ID: </strong> 
                                    </Col>
                                    <Col>
                                        {ocularDetails[0].TIN}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Contact Number: </strong>
                                    </Col>
                                    <Col>
                                        {ocularDetails[0].contactNumber}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Email Address: </strong> 
                                    </Col>
                                    <Col>
                                        {ocularDetails[0].emailAddress}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Ocular Location: </strong> 
                                    </Col>
                                    <Col>
                                        {ocularDetails[0].location}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Ocular Date: </strong> 
                                    </Col>
                                    <Col>
                                        {ocularDetails[0].date}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Ocular Time: </strong> 
                                    </Col>
                                    <Col>
                                        {ocularDetails[0].time}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Technician: </strong> 
                                    </Col>
                                    <Col>
                                        {ocularDetails[0].technician}
                                    </Col>
                                </Row>
                
                               
                    
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                            <button className="btn" style={{color: "white", backgroundColor: "#8c1919"}}>
                            {React.createElement(FaTrash, { size: 18, style: { marginRight: '5px' } })} Cancel Ocular
                            </button>

                            <button className="btn" onClick={handleCloseModal} style={{color: "white", backgroundColor: "#6c757d"}}>
                            No, Don't Cancel
                            </button>

                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default CancelOcularModal;
