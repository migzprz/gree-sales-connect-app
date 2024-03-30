import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Form, FormControl, Table, Card, CardBody } from 'react-bootstrap';
import { FaSearch} from 'react-icons/fa';
import axios from 'axios';

const ReturningClientModal = ({ formData, setFormData }) => {
    const [showModal, setShowModal] = useState(false);
    const [clients, setClients] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [selectedClient, setSelectedClient] = useState('')
    const [selectedCompany, setSelectedCompany] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const clientResponse = await axios.get('http://localhost:4000/api/getAllClients/')
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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
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
        handleCloseModal();

    }

    const filteredClients = clients.filter(client => (
        (client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contact_number.toLowerCase().includes(searchTerm.toLowerCase()))
    ));

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
                    <Col lg="12">
                        <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex", 
                                                                        backgroundColor: "#014c91", borderRadius: "10px", 
                                                                        overflow: "hidden"}}>
                            <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>
                                <div style={{padding: "5px", color: 'white'}}>
                                    {React.createElement(FaSearch, { size: 20 })}
                                </div>
                            </div>
                            <input type="search" className="form-control" placeholder="Search" value={searchTerm} onChange={handleSearch}/>
                        </div>
                    </Col>
                </Row>
                    {filteredClients.length > 0 ? (
                    <Card  style={{ borderRadius: '20px', marginTop: '20px'}}>
                        <CardBody>
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
                                    {filteredClients.map((client, index) => (
                                        <tr key={index} onClick={() => handleOnClick(index, client)} className={index === selectedRowIndex ? 'bg-gray-200': ''}>
                                            <td>{client.company_name ?? '--'}</td>
                                            <td>{client.client_name}</td>
                                            <td>{client.email}</td>
                                            <td>{client.contact_number}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                       
                    ):(
                        <Card style={{ borderRadius: '20px', marginTop: '20px', textAlign: 'center' }}>
                            <CardBody style={{ padding:'100px', color: '#014c91'}}>
                                <h1 className="mt-3"> <FaSearch size={50} className="me-2" />No Clients Found </h1>
                            </CardBody>
                        </Card>
                    )}
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
