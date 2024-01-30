import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form, FormControl, Table } from 'react-bootstrap';
import { FaSearch} from 'react-icons/fa';
const ExistingClientModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Dummy data for existing clients
    const existingClients = [
        { company: "SM Superstore", client: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890' },
        { company: "Robinsons Malls", client: 'Jane Doe', email: 'jane@example.com', phoneNumber: '987-654-3210' },
        // Add more clients as needed
    ];

    return (
        <div>

        <Row className="mt-5">
            <Col lg="3">
                <button className="btn w-100" onClick={handleShowModal} style={{color: "white", backgroundColor: "#014c91"}}>
                {React.createElement(FaSearch, { size: 18, style: { marginRight: '5px' } })} Search for an Existing Client
                 </button>
            </Col>
        </Row>
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Existing Clients</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: "#E5EDF4"}}>
                <Row>
                    {/*Search Bar*/ }
                    <Col lg="12">
                        <form>
                            <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", borderRadius: "10px", 
                                                                            overflow: "hidden"}} >
                                <input type="search" className="form-control" placeholder="Search"/>
                                <button className="btn me-auto" style={{color: "white", backgroundColor: "#014c91"}}>
                                    <div style={{color: 'white'}}>
                                        {React.createElement(FaSearch, { size: 20 })}
                                    </div>
                                </button>
                            </div>
                        </form>
                    </Col>
                </Row>

                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Client Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {existingClients.map((client) => (
                                <tr>
                                    <td>{client.company}</td>
                                    <td>{client.client}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phoneNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>
                    <Button variant="danger" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ExistingClientModal;
