import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form,  Dropdown } from 'react-bootstrap';
import { FaTrash} from 'react-icons/fa';
import useOcularById from '../hooks/useOcularById';
import axios from 'axios';

const CancelOcularModal = ({ id }) => {
    const [showModal, setShowModal] = useState(false);
    const { record } = useOcularById(id)
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
    };

    useEffect(() => {
        console.log(record)
    }, [record])


    const [validated, setValidated] = useState(false);
    const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    try {
        const response = await axios.patch(`http://localhost:4000/api/changeOcularState/${id}/0`)
        console.log(response)
    } catch (error) {
        console.error(error)
    }
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
                                        {record.client_name}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Company Name: </strong>
                                    </Col>
                                    <Col>
                                        {record.companyName}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> TIN ID: </strong> 
                                    </Col>
                                    <Col>
                                        {record.tin}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Contact Number: </strong>
                                    </Col>
                                    <Col>
                                        {record.contactNumber}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Email Address: </strong> 
                                    </Col>
                                    <Col>
                                        {record.email}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Ocular Location: </strong> 
                                    </Col>
                                    <Col>
                                        {record.site_address}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Ocular Date: </strong> 
                                    </Col>
                                    <Col>
                                        {new Date(record.ocular_date).toLocaleDateString()}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Ocular Time: </strong> 
                                    </Col>
                                    <Col>
                                        {new Date(record.ocular_date).toLocaleTimeString()}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Technician: </strong> 
                                    </Col>
                                    <Col>
                                        {record.technician_name}
                                    </Col>
                                </Row>
                
                               
                    
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                            <button className="btn" style={{color: "white", backgroundColor: "#8c1919"}} onClick={handleSubmit}>
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
