import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form } from 'react-bootstrap';
import { FaCheck} from 'react-icons/fa';
import axios from 'axios';

const CompleteServiceModal = ({ type, id, refId }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
    };

    const [validated, setValidated] = useState(false);

    const handleSubmit = async () => {
        if (type === 'delivery' || type === 'pickup') {
            try {
                const res = await axios.patch(`http://localhost:4000/api/completeDelivery/${id}`)
                console.log(res)
            } catch (error) {
                console.error(error)
            }
        }
        if (type === 'installation') {
            try {
                const res = await axios.patch(`http://localhost:4000/api/completeInstallation/${id}`)
                console.log(res)
            } catch (error) {
                console.error(error)
            }
        }
        if (type === 'service') {
            try {
                const res = await axios.patch(`http://localhost:4000/api/completeService/${id}`)
                console.log(res)
            } catch (error) {
                console.error(error)
            }
        }

        window.location.reload()
    };
      

    return (
        <div>
            <button className="btn w-40" onClick={handleShowModal} style={{color: "white", backgroundColor: "#014c91"}}>
                {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })} 
                {type === "delivery" ? (
                    "Complete Delivery"
                ) : type === "installation" ? (
                    "Complete Installation"
                ) : type === "pickup" ? (
                    "Complete Pick up"
                ): (
                    "Complete Service"
                )}
            </button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>{type==="delivery" ? "Complete Delivery" : type==="installation" ? "Complete Installation" : type==="pickup" ? "Complete Pick up": "Complete Service"}</Modal.Title>
                </Modal.Header>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>
                                {type === "delivery" ? (
                                    <Row>
                                        <Col>
                                            Complete delivery for Sale Ref. #{refId}
                                        </Col>
                                    </Row>
                                ): type === "installation" ? (
                                    <Row>
                                        <Col>
                                            Complete installation for Sale Ref. #{refId}
                                        </Col>
                                    </Row>
                                ): type === "pickup" ? (
                                    <Row>
                                        <Col>
                                            Complete pick up for Sale Ref. #{refId}
                                        </Col>
                                    </Row>
                                ):(
                                    <Row>
                                        <Col>
                                            Complete service for Sale Ref. #{refId}
                                        </Col>
                                    </Row>
                                )}
                               
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>
                            

                            <button className="btn" style={{color: "white", backgroundColor: "#014c91"}} onClick={handleSubmit}>
                                {type === "delivery" ? (
                                    <>
                                        {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })} Complete Delivery
                                    </>
                                ): type === "installation" ? (
                                    <>
                                        {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })} Complete Installation
                                    </>
                                ): type === "pickup" ? (
                                    <>
                                        {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })} Complete Pick up
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
                
            </Modal>
        </div>
    );
};

export default CompleteServiceModal;
