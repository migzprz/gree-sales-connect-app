import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEllipsisH, FaFilter, FaSort, FaSearch, FaCheck, FaClock} from 'react-icons/fa';
import { Row, Col, Card, CardBody, CardHeader, Table, Dropdown, Pagination} from 'react-bootstrap';
import '../index.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SalesList = () => {

    const [sales, setSales] = useState([])
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [sortOption, setSortOption] = useState('');
    const [filterOption, setFilterOption] = useState('');
    const [filterOption2, setFilterOption2] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getSales/')
                setSales(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    }, [])
    useEffect(() => {
        console.log(sales)
    }, [sales])

    //Navigation Functions

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (e) => {
        setSortOption(e.target.value);
    };

    let sortedSales = [...sales];
    if (sortOption === 'delivdate-asc') {
        sortedSales.sort((a, b) => new Date(a.latest_delivery_date) - new Date(b.latest_delivery_date));
    } else if (sortOption === 'delivdate-desc') {
        sortedSales.sort((a, b) => new Date(b.latest_delivery_date) - new Date(a.latest_delivery_date));
    } else if (sortOption === 'installdate-asc') {
        sortedSales.sort((a, b) => new Date(a.latest_installation_date) - new Date(b.latest_installation_date));
    } else if (sortOption === 'installdate-desc') {
        sortedSales.sort((a, b) => new Date(b.latest_installation_date) - new Date(a.latest_installation_date));
    } else if (sortOption === 'servicedate-asc') {
        sortedSales.sort((a, b) => new Date(a.latest_service_date) - new Date(b.latest_service_date));
    } else if (sortOption === 'servicedate-desc') {
        sortedSales.sort((a, b) => new Date(b.latest_service_date) - new Date(a.latest_service_date));
    }
        

    const filteredSales = sortedSales.filter(sale => (
        (filterOption === '' || sale.hasService.toString() === filterOption) &&
        (filterOption2 === '' || sale.hasDelivery.toString() === filterOption2) &&
        (sale.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.contact_number.toLowerCase().includes(searchTerm.toLowerCase()) )
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
     const currentItems = filteredSales.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil( filteredSales.length / itemsPerPage);
 
     const handlePageChange = (pageNumber) => {
         setCurrentPage(pageNumber);
     };
    
    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Manage Sales</h1>
            <h5>Manage all generated sales</h5>
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
                            <option value="delivdate-asc">Sort by Delivery Date (A-Z)</option>
                            <option value="delivdate-desc">Sort by Delivery Date (Z-A)</option>
                            <option value="installdate-asc">Sort by Installation Date (A-Z)</option>
                            <option value="installdate-desc">Sort by Installation Date (Z-A)</option>
                            <option value="servicedate-asc">Sort by Service Date (A-Z)</option>
                            <option value="servicedate-desc">Sort by Service Date (Z-A)</option>
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
                            <option value="">All Sales (Service)</option>
                            <option value="1">With Services</option>
                            <option value="0">With No Services</option>
                            
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
                        <select className="form-select" value={filterOption2} onChange={(e) => {setFilterOption2(e.target.value); setCurrentPage(1);}}>
                            <option value="">All Sales (Delivery and Installation)</option>
                            <option value="1">With Delivery and Installation</option>
                            <option value="0">With No Delivery and Installation</option>
                            
                        </select>

                    </div>
                </Col>
            </Row>

        
            {filteredSales.length > 0 ? (
            <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
                <CardBody>
                    <Table>
                         <thead>
                            <tr>
                                <th style={{color: '#014c91'}}>Sale Ref. #</th>
                                <th style={{color: '#014c91'}}>Client</th>
                                <th style={{color: '#014c91'}}>Company</th>
                                <th style={{color: '#014c91'}}>Contact Number</th>
                                <th style={{color: '#014c91'}}>Transport Schedule</th>
                                <th style={{color: '#014c91'}}>Installation Schedule</th>
                                <th style={{color: '#014c91'}}>Service Schedule</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((sales, index) => (
                                <React.Fragment key={sales.sales_id}>
                                    <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                        <td style={{ color: '#014c91' }}>
                                            <Link to={`/viewsaledetails?id=${sales.sales_id}`} style={{ color: '#014c91'}}>{String(sales.sales_id).padStart(4, '0')}</Link>
                                        </td>
                                        <td style={{color: '#014c91'}}>{sales.client_name}</td>
                                        <td style={{color: '#014c91'}}>{sales.company_name}</td>
                                        <td style={{color: '#014c91'}}>{sales.contact_number}</td>
                                        <td style={{color: sales.hasDelivery && sales.allDeliveriesCompleted ? '#008000' : (sales.hasDelivery && !sales.allDeliveriesCompleted ? '#DC6601' : '')}}>
                                            {sales.hasDelivery && sales.allDeliveriesCompleted ? (<FaCheck size={20} className="me-1"/>) : (sales.hasDelivery && !sales.allDeliveriesCompleted ? (<FaClock size={20} className="me-1"/>) : null)}
                                            {sales.latest_delivery_date ? (
                                                <>
                                                    {formatDate(new Date(sales.latest_delivery_date))}{' '}
                                                    {new Date(sales.latest_delivery_date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                                                </>
                                            ) : ''}

                                        </td>
                                        <td style={{color: sales.hasInstallation && sales.allInstallationsCompleted ? '#008000' : (sales.hasInstallation && !sales.allInstallationsCompleted ? '#DC6601' : '')}}>
                                            {sales.hasInstallation && sales.allInstallationsCompleted ? (<FaCheck size={20} className="me-1"/>) : (sales.hasInstallation && !sales.allInstallationsCompleted ? (<FaClock size={20} className="me-1"/>) : null)}
                                            {sales.latest_installation_date ? (
                                                <>
                                                    {formatDate(new Date(sales.latest_installation_date))}{' '}
                                                    {new Date(sales.latest_installation_date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                                                </>
                                            ) : ''}
                                        </td>
                                        <td style={{color: sales.hasService && sales.allServiceCompleted ? '#008000' : (sales.hasService && !sales.allServiceCompleted ? '#DC6601' : '#014c91')}}>
                                            {sales.hasService && sales.allServiceCompleted ? (<FaCheck size={20} className="me-1"/>) : (sales.hasService && !sales.allServiceCompleted ? (<FaClock size={20} className="me-1"/>) : null)}
                                            {sales.latest_service_date ? (
                                                <>
                                                    {formatDate(new Date(sales.latest_service_date))}{' '}
                                                    {new Date(sales.latest_service_date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                                                </>
                                            ) : ''}
                                            
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
                        <h1 className="mt-3"> <FaSearch size={50} className="me-2" />No Sales Found  </h1>
                    </CardBody>
                </Card>
            )}

            


        </div>
    );
};

export default SalesList;
