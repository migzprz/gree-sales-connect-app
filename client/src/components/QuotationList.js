import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEllipsisH, FaFilter, FaSort, FaSearch} from 'react-icons/fa';
import { Row, Col, Card, CardBody, Table, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../index.css';
import EditOcularModal from './EditOcularModal';
import CancelOcularModal from './CancelOcularModal';
import axios from 'axios';


const QuotationList = () => {
    
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [quotations, setQuotations] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getQuotations/')
                setQuotations(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    }, [])


    const handleEllipsisClick = (index) => {
        setActiveDropdown(index === activeDropdown ? null : index);
    };

    const renderDropdown = (index, id) => {
        if (index === activeDropdown) {
            return (
            <Dropdown.Menu style={{ position: 'absolute', right: '0', left: 'auto', top: '0px' }}>
                <Dropdown.Item><Link to={`/generateinvoice?id=${id}`} style={{ color: '#014c91'}}>Convert To Sale</Link></Dropdown.Item>
                <Dropdown.Item>Cancel Quotation</Dropdown.Item>
            </Dropdown.Menu>
            );
        }
        return null;
    };

    const formatNumber = (number) => {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Manage Quotations</h1>
            <h5>Manage all generated quotations</h5>
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
                            <option value="">All Quotations</option>
                            <option value="1">Active</option>
                            <option value="0">Expired</option>
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
                                <th style={{color: '#014c91'}}>Quotation #</th>
                                <th style={{color: '#014c91'}}>Client</th>
                                <th style={{color: '#014c91'}}>Company</th>
                                <th style={{color: '#014c91'}}>Contact Number</th>
                                <th style={{color: '#014c91'}}>Date Generated</th>
                                <th style={{color: '#014c91'}}>Total Price</th>
                                <th style={{color: '#014c91'}}>Status</th>
                                <th style={{color: '#014c91'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotations.map((quotation, index) => (
                                <React.Fragment key={quotation.quotation_id}>
                                    <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                        <td style={{color: '#014c91'}}>{quotation.quotation_id}</td>
                                        <td style={{color: '#014c91'}}>{quotation.client_name}</td>
                                        <td style={{color: '#014c91'}}>{quotation.company_name}</td>
                                        <td style={{color: '#014c91'}}>{quotation.client_number}</td>
                                        <td style={{color: '#014c91'}}>{new Date(quotation.date_created).toLocaleString()}</td>
                                        <td style={{color: '#014c91'}}>Php {formatNumber(quotation.totalprice)}</td>
                                        <td style={{color: '#014c91'}}>{quotation.is_cancelled === 0 ? 'ACTIVE' : 'INACTIVE'}</td>
                                        <td style={{ color: '#014c91' }}>
                                        <div style={{ position: 'relative' }}>
                        <div style={{cursor: 'pointer'}} onClick={() => handleEllipsisClick(index)}>
                          <FaEllipsisH size={20} />
                        </div>
                        <Dropdown show={index === activeDropdown} align="start">
              
                          {renderDropdown(index, quotation.quotation_id)}
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

export default QuotationList;
