import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEllipsisH, FaFilter, FaSort, FaSearch, FaCheck} from 'react-icons/fa';
import { Row, Col, Card, CardBody, CardHeader, Table, Dropdown } from 'react-bootstrap';
import '../index.css';
import { Link } from 'react-router-dom';
import axios from 'axios'

const ClientsList = () => {

    const [clientData, setClientData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getAllClients/')
                setClientData(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    },[])
    
    useEffect(() => {
        console.log(clientData)
    },[clientData])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (e) => {
        setSortOption(e.target.value);
    };

    let sortedClients = [...clientData];
    if (sortOption === 'client-asc') {
        sortedClients.sort((a, b) => a.client_name.localeCompare(b.client_name));
    } else if (sortOption === 'client-desc') {
        sortedClients.sort((a, b) => b.client_name.localeCompare(a.client_name));
    } else if (sortOption === 'company-asc') {
        sortedClients.sort((a, b) => a.company_name.localeCompare(b.company_name));
    } else if (sortOption === 'company-desc') {
        sortedClients.sort((a, b) => b.company_name.localeCompare(a.company_name));
    }

    const filteredClients = sortedClients.filter(client => (
        client.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.tin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contact_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    ));

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Manage Clients</h1>
            <h5>View and manage all clients</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />


            {/*Navigation Forms*/ }
            <Row>
                {/*Search Bar*/ }
                <Col lg="6">
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
                {/*Sorting Mechanism*/ }
                <Col lg="6">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex", 
                                                                    backgroundColor: "#014c91", borderRadius: "10px", 
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaSort, { size: 20 })}
                            </div>
                        </div>
                        <select className="form-select" value={sortOption} onChange={handleSort}>
                            <option value="client-asc">Client Name (A-Z)</option>
                            <option value="client-desc">Client Name (Z-A)</option>
                            <option value="company-asc">Company Name (A-Z)</option>
                            <option value="company-desc">Company Name (Z-A)</option>
                        </select>
                    </div>
                </Col>
            </Row>

            {filteredClients.length > 0 ? (
                <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
                    <CardBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th style={{color: '#014c91'}}>Client</th>
                                    <th style={{color: '#014c91'}}>Company</th>
                                    <th style={{color: '#014c91'}}>TIN ID</th>
                                    <th style={{color: '#014c91'}}>Contact Number</th>
                                    <th style={{color: '#014c91'}}>Email Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClients.map((client, index) => (
                                        <React.Fragment key={client.id}>
                                            <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                <td style={{ color: '#014c91' }}>
                                                    <Link to={`/viewclientdetails/${client.client_id}`} style={{ color: '#014c91'}}>{client.client_name}</Link>
                                                </td>
                                                <td style={{color: '#014c91'}}>{client.company_name}</td>
                                                <td style={{color: '#014c91'}}>{client.tin}</td>
                                                <td style={{color: '#014c91'}}>{client.contact_number}</td>
                                                <td style={{color: '#014c91'}}>{client.email}</td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            ):(
                <Card style={{ borderRadius: '20px', marginTop: '20px', textAlign: 'center' }}>
                    <CardBody style={{ padding:'100px', color: '#014c91'}}>
                        
                        
                        <h1 className="mt-3"> <FaSearch size={50} className="me-2" />No Clients Found  </h1>
                    </CardBody>
                </Card>
            )}

        </div>
    );
};

export default ClientsList;
