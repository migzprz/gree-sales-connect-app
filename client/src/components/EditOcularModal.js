import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form, FormControl, Table, Dropdown } from 'react-bootstrap';
import { FaEdit} from 'react-icons/fa';

const EditOcularModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Dummy data for ocular details
    const ocularDetails = [
        {   id: 1,
            client: 'Client 1',
            company: 'Company 1',
            date: '2024-01-15',
            time: '10:00 AM',
            technician: 'Technician 1',
            status: 'Scheduled'}
      ];
      

    return (
        <div>

        <Dropdown.Item onClick={handleShowModal}>Edit Ocular Details</Dropdown.Item>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Edit Ocular Details</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>
                    <Row>
                        <Col>
                            <strong> Client Name: </strong> {ocularDetails[0].client}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <strong> Company Name: </strong> {ocularDetails[0].client}
                        </Col>
                    </Row>
                

                    
                </Modal.Body>
                <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                        <button className="btn" onClick={handleCloseModal} style={{color: "white", backgroundColor: "#014c91"}}>
                        {React.createElement(FaEdit, { size: 18, style: { marginRight: '5px' } })} Edit
                        </button>

                        <button className="btn" onClick={handleCloseModal} style={{color: "white", backgroundColor: "#6c757d"}}>
                        Cancel
                        </button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditOcularModal;
