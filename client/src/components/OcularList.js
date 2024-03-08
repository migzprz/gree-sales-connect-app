import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEllipsisH, FaFilter, FaSort, FaSearch} from 'react-icons/fa';
import { Row, Col, Card, CardBody, Table, Dropdown } from 'react-bootstrap';
import '../index.css';
import EditOcularModal from './EditOcularModal';
import CancelOcularModal from './CancelOcularModal';
import axios from 'axios'

const OcularList = () => {

    const [ocularData, setOcularData] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)

    // fetch and mount ocular data to useState
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getOculars/')
                setOcularData(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    },[])
    useEffect(() => {
        console.log(ocularData)
    },[ocularData])

    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleEllipsisClick = (index) => {
        setActiveDropdown(index === activeDropdown ? null : index);
    };

    const renderDropdown = (index, id) => {
        if (index === activeDropdown) {
            return (
            <Dropdown.Menu style={{ position: 'absolute', right: '0', left: 'auto', top: '0px' }}>
                <Dropdown.Item href={`generatequotation/${id}`}>Generate Quotation</Dropdown.Item>
                <EditOcularModal id={id}/>
                <CancelOcularModal id={id}/>
            </Dropdown.Menu>
            );
        }
    return null;
    };
      

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Manage Oculars</h1>
            <h5>Manage all scheduled oculars</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />


            {/*Navigation Forms*/ }
            <Row>
                {/*Search Bar*/ }
                <Col lg="4">
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
                {/*Sorting Mechanism*/ }
                <Col lg="4">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex", 
                                                                    backgroundColor: "#014c91", borderRadius: "10px", 
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaSort, { size: 20 })}
                            </div>
                        </div>
                        <select className="form-select">
                            <option value="">Sort by Date and Time (A-Z)</option>
                            <option value="1">Sort by Date and Time (Z-A)</option>
                        </select>
                    </div>
                </Col>
                {/*Filtering Mechanism*/ }
                <Col lg="4">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                    backgroundColor: "#014c91", borderRadius: "10px",
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>   
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaFilter, { size: 20 })}
                            </div>  
                        </div>
                        <select className="form-select">
                            <option value="">All Technicians</option>
                            <option value="1">Technician 1</option>
                            <option value="0">Techinician 2</option>
                        </select>
                    </div>
                </Col>
            </Row>

        
            {/*Table for page content*/}
            <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
                <CardBody>
                    <Table>
                         <thead>
                            <tr>
                                <th style={{color: '#014c91'}}>Client</th>
                                <th style={{color: '#014c91'}}>Company</th>
                                <th style={{color: '#014c91'}}>Contact Number</th>
                                <th style={{color: '#014c91'}}>Ocular Location</th>
                                <th style={{color: '#014c91'}}>Date of Ocular</th>
                                <th style={{color: '#014c91'}}>Time of Ocular</th>
                                <th style={{color: '#014c91'}}>Assigned Technician</th>
                                <th style={{color: '#014c91'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ocularData.map((ocular, index) => (
                                <React.Fragment key={ocular.ocular_id}>
                                    <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                        <td style={{color: '#014c91'}}>{ocular.client_name}</td>
                                        <td style={{color: '#014c91'}}>{ocular.company_name}</td>
                                        <td style={{color: '#014c91'}}>{ocular.client_number}</td>
                                        <td style={{color: '#014c91'}}>{ocular.site_address}</td>
                                        <td style={{color: '#014c91'}}>{new Date(ocular.ocular_date).toLocaleDateString()}</td>
                                        <td style={{color: '#014c91'}}>{new Date(ocular.ocular_date).toLocaleTimeString()}</td>
                                        <td style={{color: '#014c91'}}>{ocular.technician_name}</td>
                                        <td style={{ color: '#014c91' }}>
                                            <div style={{ position: 'relative' }}>
                                                <div style={{cursor: 'pointer'}} onClick={() => handleEllipsisClick(index)}>
                                                    <FaEllipsisH size={20} />
                                                </div>
                                                    <Dropdown show={index === activeDropdown} align="start">
                                                        {renderDropdown(index, ocular.ocular_id)}
                                                    </Dropdown>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>


        </div>
    );
};

export default OcularList;
