import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form,  Dropdown } from 'react-bootstrap';
import { FaTrash, FaCheck} from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompleteServiceModal = ({ id }) => {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
        if (form.checkValidity()) {
            try {
                const patchResponse = await axios.patch(`http://localhost:4000/api/changeWarrantyState/${id}/1`);
                console.log(patchResponse);
                navigate('/viewwarranties')
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error);
            }
        }
    };
      

    return (
        <div>
            <button className="btn w-40" onClick={handleShowModal} style={{color: "white", backgroundColor: "#014c91"}}>
                {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })} 
                Complete Warranty
            </button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title> Complete Warranty</Modal.Title>
                </Modal.Header>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>
                               
                                    <Row>
                                        <Col>
                                            Complete sale for <strong>Sale Ref. #{id}? </strong> <br/>
                                            No more changes can be made to this sale.
                                        </Col>
                                    </Row>
                              
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>
                            

                            <button className="btn" style={{color: "white", backgroundColor:  "#014c91"}} onClick={handleSubmit}>
                                {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })} Complete Warranty
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
