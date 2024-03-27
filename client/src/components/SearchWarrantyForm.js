import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaSearch, FaSort, FaFilter, FaCheck, FaClock, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { Row, Col, CardBody, Card, Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom'

const SearchWarrantyForm = () => {
    const [warrantySearchData, setWarrantySearchData] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getWarrantySearch/')
                const response2 = await axios.get('http://localhost:4000/api/getDeductableUnits/')
                
                const remainingQuantities = {}; // Map to track remaining quantities for each key
                response2.data.forEach((data2Item) => {
                    const key = `${data2Item.quotation_id}-${data2Item.unit_id}`;
                    if (!remainingQuantities[key]) {
                        remainingQuantities[key] = 0;
                    }
                    remainingQuantities[key] += data2Item.qty_claimed;
                });
    
                const updatedData = response.data.map((dataItem) => {
                    const key = `${dataItem.quotation_id}-${dataItem.product_id}`;
                    const remainingQty = remainingQuantities[key] || 0;
                    if (remainingQty > 0) {
                        dataItem.totalqty -= remainingQty;
                        remainingQuantities[key] = Math.max(0, remainingQty - dataItem.totalqty); // Ensure remaining quantity is not negative
                    }
                    return dataItem;
                }).filter((dataItem) => dataItem.totalqty > 0); // Filter out items with totalqty <= 0
                
                setWarrantySearchData(updatedData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, []);
    
    
    

    const toggleRow = (quotationId) => {
        setExpandedRows(prevState => {
            if (prevState.includes(quotationId)) {
                return prevState.filter(id => id !== quotationId);
            } else {
                return [...prevState, quotationId];
            }
        });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (e) => {
        setSortOption(e.target.value);
    };

    let sortedWarranties = [...warrantySearchData];
    if (sortOption === 'date-asc') {
        sortedWarranties.sort((a, b) => new Date(a.delivery_date) - new Date(b.delivery_date));
    } else if (sortOption === 'date-desc') {
        sortedWarranties.sort((a, b) => new Date(b.delivery_date) - new Date(a.delivery_date));
    } else if (sortOption === 'client-asc') {
        sortedWarranties.sort((a, b) => a.client_name.localeCompare(b.client_name));
    } else if (sortOption === 'client-desc') {
        sortedWarranties.sort((a, b) => b.client_name.localeCompare(a.client_name));
    } else if (sortOption === 'company-asc') {
        sortedWarranties.sort((a, b) => a.company_name.localeCompare(b.company_name));
    } else if (sortOption === 'company-desc') {
        sortedWarranties.sort((a, b) => b.company_name.localeCompare(a.company_name));
    }

    const filteredWarranties = sortedWarranties.filter(warranty => (
        (warranty.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warranty.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warranty.client_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warranty.site_address.toLowerCase().includes(searchTerm.toLowerCase()) )
    ));

     //Date Conversion Function
     function formatDate(dateString) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Parse the date string to a Date object
        const date = new Date(dateString);
        
        // Get day, month, and year from the date object
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        
        // Format day with leading zero if necessary
        const formattedDay = day < 10 ? '0' + day : day;
        
        // Format date in desired format
        return `${formattedDay}-${months[monthIndex]}-${year}`;
    }
    
    
    //Pagination Functionality
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(7); // Change this number as needed
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredWarranties.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredWarranties.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Validate Warranty Claim</h1>
            <h5>Create a warranty claim by searching for an existing sale</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

            {/* Navigation Forms */}
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
                            <option value="date-asc">Sort by Date (A-Z)</option>
                            <option value="date-desc">Sort by Date (Z-A)</option>
                            <option value="client-asc">Sort by Client Name (A-Z)</option>
                            <option value="client-desc">Sort by Client Name (Z-A)</option>
                            <option value="company-asc">Sort by Company Name (A-Z)</option>
                            <option value="company-desc">Sort by Company Name (Z-A)</option>
                        </select>
                    </div>
                </Col>
            </Row>

            {filteredWarranties.length > 0 ? (
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
                                <th style={{color: '#014c91'}}>Claim Warranty</th>
                                <th style={{color: '#014c91'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...new Set(currentItems.map(item => item.quotation_id))].map((quotationId, index) => {
                                const claimables = currentItems.filter(item => item.quotation_id === quotationId);
                                return (
                                    <React.Fragment key={index}>
                                        {expandedRows.includes(quotationId) ? (
                                            <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                <td style={{borderBottom: 'none',color: '#014c91', width:'9%'}}>{claimables[0].client_name}</td>
                                                <td style={{borderBottom: 'none',color: '#014c91', width:'12%'}}>{claimables[0].company_name}</td>
                                                <td style={{borderBottom: 'none',color: '#014c91'}}>{claimables[0].client_number}</td>
                                                <td style={{borderBottom: 'none',color: '#014c91'}}>{claimables[0].email}</td>
                                                <td style={{borderBottom: 'none',color: '#014c91', width:'15%'}}>{claimables[0].site_address}</td>
                                                <td style={{borderBottom: 'none',color: '#014c91'}}>{new Date(claimables[0].delivery_date).toLocaleString()}</td>
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
                                                <td style={{color: '#014c91'}}>{new Date(claimables[0].delivery_date).toLocaleString()}</td>
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

                    <Row className="mt-3">
                        <Col className="d-flex justify-content-end">
                            {totalPages > 1 && (
                                <Pagination>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <Pagination.Item key={index + 1} active={currentPage === index + 1} onClick={() => handlePageChange(index + 1)}>
                                            {index + 1}
                                        </Pagination.Item>
                                    ))}
                                </Pagination>
                            )}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
             ):(
                <Card style={{ borderRadius: '20px', marginTop: '20px', textAlign: 'center' }}>
                    <CardBody style={{ padding:'100px', color: '#014c91'}}>
                        <h1 className="mt-3"> <FaSearch size={50} className="me-2" />No Claimable Warranties Found  </h1>
                    </CardBody>
                </Card>
            )}


        </div>
    );
};

export default SearchWarrantyForm;
