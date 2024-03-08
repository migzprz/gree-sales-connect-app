import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form,  Dropdown } from 'react-bootstrap';
import { FaTrash, FaCheck} from 'react-icons/fa';
import axios from 'axios';

const CompleteServiceModal = ({ type }) => {
    const [showModal, setShowModal] = useState(false);
    const [record, setRecord] = useState({})

    
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

    };
      

    return (
        <div>
            <button className="btn w-40" onClick={handleShowModal} style={{color: "white", backgroundColor: "#014c91"}}>
                {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })} 
                {type === "delivery" ? (
                    "Complete Delivery"
                ) : type === "installation" ? (
                    "Complete Installation"
                ) : (
                    "Complete Service"
                )}
            </button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header style={{color: "white", backgroundColor: record.is_active ? "#8c1919" : "#014c91"}}>
                    <Modal.Title>{type==="delivery" ? "Complete Delivery" : type==="installation" ? "Complete Installation": "Complete Service"}</Modal.Title>
                </Modal.Header>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>
                                {type === "delivery" ? (
                                    <Row>
                                        <Col>
                                            Complete delivery for Sale Ref. #0001
                                        </Col>
                                    </Row>
                                ): type === "installation" ? (
                                    <Row>
                                        <Col>
                                            Complete installation for Sale Ref. #0001
                                        </Col>
                                    </Row>
                                ):(
                                    <Row>
                                        <Col>
                                            Complete service for Sale Ref. #0001
                                        </Col>
                                    </Row>
                                )}
                               
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>
                            

                            <button className="btn" style={{color: "white", backgroundColor: record.is_active ? "#8c1919" : "#014c91"}} onClick={handleSubmit}>
                                {type === "delivery" ? (
                                    <>
                                        {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })} Complete Delivery
                                    </>
                                ): type === "installation" ? (
                                    <>
                                        {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })} Complete Installation
                                    </>
                                ):(
                                    <>
                                        {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })} Complete Service
                                    </>
                                )}
                            </button>
                            

                            <button className="btn" onClick={(e) => { e.preventDefault(); handleCloseModal(); }} style={{color: "white", backgroundColor: "#6c757d"}}>
                                Cancel
                            </button>

                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default CompleteServiceModal;
