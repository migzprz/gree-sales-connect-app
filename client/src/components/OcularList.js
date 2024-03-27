import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEllipsisH, FaFilter, FaSort, FaSearch} from 'react-icons/fa';
import { Row, Col, Card, CardBody, Table, Dropdown, Pagination } from 'react-bootstrap';
import '../index.css';
import EditOcularModal from './EditOcularModal';
import CancelOcularModal from './CancelOcularModal';
import axios from 'axios'

const OcularList = () => {

    const [ocularData, setOcularData] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)
    const [sortOption, setSortOption] = useState('');
    const [filterOption, setFilterOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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

    //Ellipsis Functions
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleEllipsisClick = (index) => {
        setActiveDropdown(index === activeDropdown ? null : index);
    };

    const renderDropdown = (index, id, date) => {
        if (index === activeDropdown) {
            return (
            <Dropdown.Menu style={{ position: 'absolute', right: '0', left: 'auto', top: '0px' }}>
                <Dropdown.Item href={`generatequotation/${id}`}>Generate Quotation</Dropdown.Item>
                <EditOcularModal id={id} date={date}/>
                <CancelOcularModal id={id}/>
            </Dropdown.Menu>
            );
        }
    return null;
    };

    //Navigation Functions

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (e) => {
        setSortOption(e.target.value);
    };

    let sortedOculars = [...ocularData];
    if (sortOption === 'date-asc') {
        sortedOculars.sort((a, b) => new Date(a.ocular_date) - new Date(b.ocular_date));
    } else if (sortOption === 'date-desc') {
        sortedOculars.sort((a, b) => new Date(b.ocular_date) - new Date(a.ocular_date));
    } else if (sortOption === 'client-asc') {
        sortedOculars.sort((a, b) => a.client_name.localeCompare(b.client_name));
    } else if (sortOption === 'client-desc') {
        sortedOculars.sort((a, b) => b.client_name.localeCompare(a.client_name));
    } else if (sortOption === 'company-asc') {
        sortedOculars.sort((a, b) => a.company_name.localeCompare(b.company_name));
    } else if (sortOption === 'company-desc') {
        sortedOculars.sort((a, b) => b.company_name.localeCompare(a.company_name));
    }

    const filteredOculars = sortedOculars.filter(ocular => (
        (filterOption === '' || ocular.technician_name.toString() === filterOption) &&
        (ocular.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ocular.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ocular.client_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ocular.site_address.toLowerCase().includes(searchTerm.toLowerCase()) )
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
     const currentItems = filteredOculars.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil( filteredOculars.length / itemsPerPage);
 
     const handlePageChange = (pageNumber) => {
         setCurrentPage(pageNumber);
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
                <Col lg="4">
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
                        <select className="form-select" value={filterOption} onChange={(e) => {setFilterOption(e.target.value); setCurrentPage(1);}}>
                            <option value="">All Oculars</option>
                            {ocularData && [...new Set(ocularData.map(item => item.technician_name))].map((technician, index) => (
                                <option key={index} value={technician}>Assigned to {technician}</option>
                            ))}
                        </select>

                    </div>
                </Col>
            </Row>

        
            {filteredOculars.length > 0 ? (
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
                            {currentItems.map((ocular, index) => (
                                <React.Fragment key={ocular.ocular_id}>
                                    <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                        <td style={{color: '#014c91'}}>{ocular.client_name}</td>
                                        <td style={{color: '#014c91'}}>{ocular.company_name}</td>
                                        <td style={{color: '#014c91'}}>{ocular.client_number}</td>
                                        <td style={{color: '#014c91'}}>{ocular.site_address}</td>
                                        <td style={{color: '#014c91'}}>{formatDate(ocular.ocular_date)}</td>
                                        <td style={{color: '#014c91'}}>{new Date(ocular.ocular_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                                        <td style={{color: '#014c91'}}>{ocular.technician_name}</td>
                                        <td style={{ color: '#014c91' }}>
                                            <div style={{ position: 'relative' }}>
                                                <div style={{cursor: 'pointer'}} onClick={() => handleEllipsisClick(index)}>
                                                    <FaEllipsisH size={20} />
                                                </div>
                                                    <Dropdown show={index === activeDropdown} align="start">
                                                        {renderDropdown(index, ocular.ocular_id, ocular.ocular_date)}
                                                    </Dropdown>
                                            </div>
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
                        <h1 className="mt-3"> <FaSearch size={50} className="me-2" />No Oculars Found  </h1>
                    </CardBody>
                </Card>
            )}


        </div>
    );
};

export default OcularList;
