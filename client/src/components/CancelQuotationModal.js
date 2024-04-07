import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form,  Dropdown } from 'react-bootstrap';
import { FaTrash, FaCheck} from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CancelQuotationModal = ({ id }) => {

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()
    
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
    };


    const [validated, setValidated] = useState(false);

    const handleSubmit = async () => {
        try {
            const res = await axios.patch(`http://localhost:4000/api/cancelQuotation/${id}`)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    };
      

    return (
        <div>
            <Dropdown.Item onClick={handleShowModal}>Cancel Quotation</Dropdown.Item>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header style={{color: "white", backgroundColor: "#8c1919"}}>
                    <Modal.Title> Cancel Quotation</Modal.Title>
                </Modal.Header>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>
                        <Row>
                            <Col>
                                Cancel quotation for <strong>Quotation #{String(id).padStart(4, '0')}? </strong> <br/>
                                This change cannot be reversed.
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>
                        <button className="btn" style={{color: "white", backgroundColor:  "#8c1919"}} onClick={handleSubmit}>
                            {React.createElement(FaTrash, { size: 18, style: { marginRight: '5px' } })} Cancel Quotation
                        </button>
                        <button className="btn" onClick={handleCloseModal} style={{color: "white", backgroundColor: "#6c757d"}}>
                            Cancel
                        </button>
                    </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CancelQuotationModal;
