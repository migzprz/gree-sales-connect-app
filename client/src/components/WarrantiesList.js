import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaCheck, FaClock, FaFilter, FaSort, FaSearch} from 'react-icons/fa';
import { Row, Col, Card, CardBody, Table, Dropdown, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../index.css';
import axios from 'axios'

const WarrantiesList = () => {

    const [warrantyData, setWarrantyData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [filterOption, setFilterOption] = useState('');
    const [serviceFilterOption, setServiceFilterOption] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getWarranties/')
                setWarrantyData(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    },[])
    
    useEffect(() => {
        console.log(warrantyData)
    },[warrantyData])

    //Navigation Functions

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (e) => {
        setSortOption(e.target.value);
    };

    let sortedWarranties = [...warrantyData];
    if (sortOption === 'idate-asc') {
        sortedWarranties.sort((a, b) => new Date(a.inspection_date) - new Date(b.inspection_date));
    } else if (sortOption === 'idate-desc') {
        sortedWarranties.sort((a, b) => new Date(b.inspection_date) - new Date(a.inspection_date));
    } else if (sortOption === 'sdate-asc') {
        sortedWarranties.sort((a, b) => new Date(a.service_date) - new Date(b.service_date));
    } else if (sortOption === 'sdate-desc') {
        sortedWarranties.sort((a, b) => new Date(b.oservice_date) - new Date(a.service_date));
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
        (filterOption === '' || warranty.inspection_completed.toString() === filterOption) &&
        (serviceFilterOption === '' || warranty.service_completed.toString() === serviceFilterOption) &&
        (warranty.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warranty.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warranty.client_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warranty.site_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warranty.email.toLowerCase().includes(searchTerm.toLowerCase()) )
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
     const [itemsPerPage, setItemsPerPage] = useState(8); // Change this number as needed
     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentItems = filteredWarranties.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil( filteredWarranties.length / itemsPerPage);
 
     const handlePageChange = (pageNumber) => {
         setCurrentPage(pageNumber);
     };

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Manage Warranties</h1>
            <h5>View and manage warranties</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />


            {/*Navigation Forms*/ }
            <Row>
                {/*Search Bar*/ }
                <Col lg="3">
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
                <Col lg="3">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex", 
                                                                    backgroundColor: "#014c91", borderRadius: "10px", 
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaSort, { size: 20 })}
                            </div>
                        </div>
                        <select className="form-select" value={sortOption} onChange={handleSort}>
                            <option value="idate-asc">Sort by Inspection Date (A-Z)</option>
                            <option value="idate-desc">Sort by Inspection  Date (Z-A)</option>
                            <option value="sdate-asc">Sort by Service Date (A-Z)</option>
                            <option value="sdate-desc">Sort by Service Date (Z-A)</option>
                            <option value="client-asc">Sort by Client Name (A-Z)</option>
                            <option value="client-desc">Sort by Client Name (Z-A)</option>
                            <option value="company-asc">Sort by Company Name (A-Z)</option>
                            <option value="company-desc">Sort by Company Name (Z-A)</option>
                        </select>
                    </div>
                </Col>
                {/*Filtering Mechanism*/ }
                <Col lg="3">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                    backgroundColor: "#014c91", borderRadius: "10px",
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>   
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaFilter, { size: 20 })}
                            </div>  
                        </div>
                        <select className="form-select" value={filterOption} onChange={(e) => {setFilterOption(e.target.value); setCurrentPage(1);}}>
                            <option value="">All Inspection Status</option>
                            <option value="0">Pending Inspection</option>
                            <option value="1">Completed Inspection</option>
                        </select>

                    </div>
                </Col>
                <Col lg="3">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                    backgroundColor: "#014c91", borderRadius: "10px",
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>   
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaFilter, { size: 20 })}
                            </div>  
                        </div>
                        <select className="form-select" value={serviceFilterOption} onChange={(e) => {setServiceFilterOption(e.target.value); setCurrentPage(1);}}>
                            <option value="">All Service Status</option>
                            <option value="0">Pending Service</option>
                            <option value="1">Completed Service</option>
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
                                <th style={{color: '#014c91'}}>Claim #</th>
                                <th style={{color: '#014c91'}}>Sales Ref. #</th>
                                <th style={{color: '#014c91'}}>Client</th>
                                <th style={{color: '#014c91'}}>Company</th>
                                <th style={{color: '#014c91'}}>Contact Number</th>
                                <th style={{color: '#014c91'}}>Email Address</th>
                                <th style={{color: '#014c91'}}>Location</th>
                                <th style={{color: '#014c91'}}>Inspection Schedule</th>
                                <th style={{color: '#014c91'}}>Service Schedule</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((warranty, index) => (
                                <React.Fragment key={warranty.warranty_id}>
                                    <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                        <td style={{color: '#014c91'}}>
                                            <Link to={`/viewwarrantydetails/${warranty.warranty_id}`} style={{ color: '#014c91'}}>#{String(warranty.warranty_id).padStart(4, '0')}</Link>
                                        </td>
                                        <td style={{color: '#014c91'}}>#{String(warranty.sales_id).padStart(4, '0')}</td>
                                        <td style={{color: '#014c91'}}>{warranty.client_name}</td>
                                        <td style={{color: '#014c91'}}>{warranty.company_name}</td>
                                        <td style={{color: '#014c91'}}>{warranty.client_number}</td>
                                        <td style={{color: '#014c91'}}>{warranty.email}</td>
                                        <td style={{color: '#014c91'}}>{warranty.site_address}</td>
                                        <td style={{color: warranty.inspection_date !== null && warranty.inspection_completed ? '#008000' : warranty.inspection_date !== null && !warranty.inspection_completed ? '#DC6601' : '#014c91'}}>
                                            { warranty.inspection_date !== null && warranty.inspection_completed ? <FaCheck size={20} /> : warranty.inspection_date !== null && !warranty.inspection_completed ? <FaClock size={20} />: null}
                                            {warranty.inspection_date !== null ? `${formatDate(warranty.inspection_date)} ${new Date(warranty.inspection_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` : '-'}

                                        </td>
                                        <td style={{color: warranty.service_completed ? '#008000' : '#DC6601'}}>
                                            {warranty.service_completed ? <FaCheck size={20} /> : <FaClock size={20} />}
                                            {formatDate(warranty.service_date)} {new Date(warranty.service_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
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
                        <h1 className="mt-3"> <FaSearch size={50} className="me-2" />No Warranties Found  </h1>
                    </CardBody>
                </Card>
            )}

        </div>
    );
};

export default WarrantiesList;
