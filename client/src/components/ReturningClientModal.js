import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Form, FormControl, Table } from 'react-bootstrap';
import { FaSearch} from 'react-icons/fa';
import axios from 'axios';

const ReturningClientModal = ({ formData, setFormData }) => {
    const [showModal, setShowModal] = useState(false);
    const [clients, setClients] = useState([])
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [selectedClient, setSelectedClient] = useState('')
    const [selectedCompany, setSelectedCompany] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const clientResponse = await axios.get('http://localhost:4000/api/getClients/')
                setClients(clientResponse.data)
            } catch (error) {
                console.error('Error fetching client data: ', error)
            }
        }
        fetchData()
    },[])
    useEffect(() => {
        console.log('client data: ', clients)
    }, [clients])

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOnClick = (index, client) => {
        setSelectedRowIndex(index)
        setSelectedClient(client.client_name)
        setSelectedCompany(client.company_name)
        console.log(index, client.client_id)

        const form = {
            ...formData,
            client_id: client.client_id,
            returningClientFirstName: client.first_name,
            returningClientLastName: client.last_name,
            returningClientCompanyTin: client.tin,
            returningClientContactNumber: client.contact_number,
            returningClientEmail: client.email,
            returningClientCompanyName: client.company_name
        }
        setFormData(form)

    }

    return (
        <div>

        <Row className="mt-5">
            <Col lg="3">
                <button className="btn w-100" onClick={handleShowModal} style={{color: "white", backgroundColor: "#014c91"}}>
                {React.createElement(FaSearch, { size: 18, style: { marginRight: '5px' } })} Search for a Returning Client
                 </button>
            </Col>
        </Row>
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Select a Returning Client</Modal.Title>
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
                            {clients.map((client, index) => (
                                <tr key={index} onClick={() => handleOnClick(index, client)} className={index === selectedRowIndex ? 'bg-gray-200': ''}>
                                    <td>{client.company_name}</td>
                                    <td>{client.client_name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.contact_number}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {selectedRowIndex ? `Selected Client ${selectedClient} under ${selectedCompany}`: ''}
                </Modal.Body>
                <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>
                <button className="btn" onClick={handleCloseModal} style={{color: "white", backgroundColor: "#6c757d"}}>
                            Cancel
                            </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ReturningClientModal;
