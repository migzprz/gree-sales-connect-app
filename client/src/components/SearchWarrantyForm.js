import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaSearch, FaSort, FaFilter, FaCheck, FaClock, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { Row, Col, CardBody, Card, Table } from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom'

const SearchWarrantyForm = () => {
    const [warrantySearchData, setWarrantySearchData] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getWarrantySearch/')
                setWarrantySearchData(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    },[])

    const toggleRow = (quotationId) => {
        setExpandedRows(prevState => {
            if (prevState.includes(quotationId)) {
                return prevState.filter(id => id !== quotationId);
            } else {
                return [...prevState, quotationId];
            }
        });
    };

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Validate Warranty Claim</h1>
            <h5>Create a warranty claim by searching for an existing sale</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

            {/* Navigation Forms */}
            {/* Search Bar */}
            <Row>
                {/* Search Bar */}
                <Col lg="4">
                    <form>
                        <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", borderRadius: "10px", overflow: "hidden"}} >
                            <input type="search" className="form-control" placeholder="Search"/>
                            <button className="btn me-auto" style={{color: "white", backgroundColor: "#014c91"}}>
                                <div style={{color: 'white'}}>
                                    <FaSearch size={20} />
                                </div>
                            </button>
                        </div>
                    </form>
                </Col>
                {/* Sorting Mechanism */}
                <Col lg="4">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex", backgroundColor: "#014c91", borderRadius: "10px", overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>
                            <div style={{padding: "5px", color: 'white'}}>
                                <FaSort size={20} />
                            </div>
                        </div>
                        <select className="form-select">
                            <option value="">Sort by Date and Time (A-Z)</option>
                            <option value="1">Sort by Date and Time (Z-A)</option>
                        </select>
                    </div>
                </Col>
                {/* Filtering Mechanism */}
                <Col lg="4">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex", backgroundColor: "#014c91", borderRadius: "10px", overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>   
                            <div style={{padding: "5px", color: 'white'}}>
                                <FaFilter size={20} />
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

            <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
                <CardBody>
                    <Table>
                         <thead>
                            <tr>
                                <th style={{color: '#014c91'}}>Client</th>
                                <th style={{color: '#014c91'}}>Company</th>
                                <th style={{color: '#014c91'}}>Contact Number</th>
                                <th style={{color: '#014c91'}}>Email Address</th>
                                <th style={{color: '#014c91'}}>Location</th>
                                <th style={{color: '#014c91'}}>Delivery Date</th>
                                <th style={{color: '#014c91'}}>Status</th>
                                <th style={{color: '#014c91'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...new Set(warrantySearchData.map(item => item.quotation_id))].map((quotationId, index) => {
                                const claimables = warrantySearchData.filter(item => item.quotation_id === quotationId);
                                return (
                                    <React.Fragment key={index}>
                                        {expandedRows.includes(quotationId) ? (
                                            <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                <td style={{borderBottom: 'none',color: '#014c91', width:'9%'}}>{claimables[0].client_name}</td>
                                                <td style={{borderBottom: 'none',color: '#014c91', width:'12%'}}>{claimables[0].company_name}</td>
                                                <td style={{borderBottom: 'none',color: '#014c91'}}>{claimables[0].client_number}</td>
                                                <td style={{borderBottom: 'none',color: '#014c91'}}>{claimables[0].email}</td>
                                                <td style={{borderBottom: 'none',color: '#014c91', width:'15%'}}>{claimables[0].site_address}</td>
                                                <td style={{borderBottom: 'none',color: '#014c91'}}>{claimables[0].delivery_date}</td>
                                                <td style={{borderBottom: 'none',color: '#014c91'}}>
                                                    <Link to={`/claimwarranty/${claimables[0].quotation_id}`} className="btn w-60" style={{ color: "white", backgroundColor: "#014c91" }}>
                                                        Claim Warranty
                                                    </Link>
                                                </td>
                                                <td style={{borderBottom: 'none',color: '#014c91'}}>
                                                    <button className="btn w-60" style={{color: "white", backgroundColor: "#014c91"}} onClick={() => toggleRow(quotationId)}>
                                                        {expandedRows.includes(quotationId) ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}
                                                    </button>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                <td style={{color: '#014c91', width:'9%'}}>{claimables[0].client_name}</td>
                                                <td style={{color: '#014c91', width:'12%'}}>{claimables[0].company_name}</td>
                                                <td style={{color: '#014c91'}}>{claimables[0].client_number}</td>
                                                <td style={{color: '#014c91'}}>{claimables[0].email}</td>
                                                <td style={{color: '#014c91', width:'20%'}}>{claimables[0].site_address}</td>
                                                <td style={{color: '#014c91'}}>{claimables[0].delivery_date}</td>
                                                <td style={{color: '#014c91'}}>
                                                    <Link to={`/claimwarranty/${claimables[0].quotation_id}`} className="btn w-60" style={{ color: "white", backgroundColor: "#014c91" }}>
                                                        Claim Warranty
                                                    </Link>
                                                </td>
                                                <td style={{color: '#014c91'}}>
                                                    <button className="btn w-60" style={{color: "white", backgroundColor: "#014c91"}} onClick={() => toggleRow(quotationId)}>
                                                        {expandedRows.includes(quotationId) ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                        
                                        {expandedRows.includes(quotationId) && (
                                            <>
                                                <tr key={index}>
                                                    <th colSpan="1" style={{color: '#014c91', padding: '0', border: 'none' }}>Unit Model</th>
                                                    <th colSpan="2" style={{color: '#014c91', padding: '0', border: 'none' }}>Description</th>
                                                    <th colSpan="2" style={{color: '#014c91', padding: '0', border: 'none' }}>Quantity</th>
                                                </tr>
                                                {claimables.map((claimable, index) => (
                                                    <tr key={index}>
                                                        <td colSpan="1" style={{color: '#014c91',padding: '0', border: 'none' }}>{index+1}.) {claimable.unit_model}</td>
                                                        <td colSpan="2" style={{color: '#014c91', padding: '0', border: 'none' }}>{claimable.description}</td>
                                                        <td colSpan="2" style={{color: '#014c91', padding: '0', border: 'none' }}>{claimable.totalqty}</td>
                                                    </tr>
                                                ))}
                                                <tr >
                                                    <td colSpan="8" style={{ borderTop: 'none' }}/>
                                                </tr>
                                            </>
                                        )}

                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    );
};

export default SearchWarrantyForm;
