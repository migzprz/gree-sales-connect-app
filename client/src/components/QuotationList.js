import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEllipsisH, FaFilter, FaSort, FaSearch} from 'react-icons/fa';
import { Row, Col, Card, CardBody, Table, Dropdown, Pagination} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../index.css';
import axios from 'axios';
import CancelQuotationModal from './CancelQuotationModal';
import LoadingScreen from './LoadingScreen';


const QuotationList = () => {

    const [loading, setLoading] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [quotations, setQuotations] = useState([])
    const [sortOption, setSortOption] = useState('');
    const [filterOption, setFilterOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getQuotations/')
                setQuotations(response.data)

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    }, [])

    const checkExpiry = async (list) => {
        list.forEach(async data => {
            const currDate = new Date()
            const dateCreated = new Date(data.date_created)
            dateCreated.setDate(dateCreated.getDate() + 7);

            if (currDate >= dateCreated && data.is_cancelled === 0) {
                console.log('quotation record ', String(data.quotation_id).padStart(4, '0'), ' expired. Patching database' )
                try {
                    const res = await axios.patch(`http://localhost:4000/api/cancelQuotation/${data.quotation_id}`)
                } catch (error) {
                    console.log(error)
                }
            } else { console.log('record has not expired' ) }
        });
        window.location.reload()

        // TODO: add feature to only run this function once a day
    }
    //Ellipsis Functions
    const handleEllipsisClick = (index) => {
        setActiveDropdown(index === activeDropdown ? null : index);
    };

    const renderDropdown = (index, id) => {
        if (index === activeDropdown) {
            return (
            <Dropdown.Menu style={{ position: 'absolute', right: '0', left: 'auto', top: '0px' }}>
                <Dropdown.Item><Link to={`/generatequotation?id=${id}&type=edit`} style={{ color: 'black', textDecoration: 'none' }}>Edit Quotation</Link></Dropdown.Item>
                <Dropdown.Item><Link to={`/generateinvoice?id=${id}`} style={{ color: 'black', textDecoration: 'none' }}>Convert To Sale</Link></Dropdown.Item>
                <CancelQuotationModal id={id}/>
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

    let sortedQuotations = [...quotations];
    if (sortOption === 'date-asc') {
        sortedQuotations.sort((a, b) => new Date(a.date_created) - new Date(b.date_created));
    } else if (sortOption === 'date-desc') {
        sortedQuotations.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
    } else if (sortOption === 'client-asc') {
        sortedQuotations.sort((a, b) => a.client_name.localeCompare(b.client_name));
    } else if (sortOption === 'client-desc') {
        sortedQuotations.sort((a, b) => b.client_name.localeCompare(a.client_name));
    } else if (sortOption === 'company-asc') {
        sortedQuotations.sort((a, b) => a.company_name.localeCompare(b.company_name));
    } else if (sortOption === 'company-desc') {
        sortedQuotations.sort((a, b) => b.company_name.localeCompare(a.company_name));
    }

    const filteredQuotations = sortedQuotations.filter(quotation => (
        (filterOption === '' || quotation.is_cancelled.toString() === filterOption) &&
        (quotation.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.client_number.toLowerCase().includes(searchTerm.toLowerCase()) )
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

    //Amount Conversion Function
    const formatNumber = (number) => {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

     //Pagination Functionality
     const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage, setItemsPerPage] = useState(10); // Change this number as needed
     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentItems = filteredQuotations.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil( filteredQuotations.length / itemsPerPage);
 
     const handlePageChange = (pageNumber) => {
         setCurrentPage(pageNumber);
     };
      

    return (
        <>
            {loading ? 
            <LoadingScreen/> :
                <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
                    <h1>Manage Quotations</h1>
                    <h5>Manage all generated quotations</h5>
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
                                    <option value="">All Status</option>
                                    <option value="0">Active</option>
                                    <option value="1">Expired</option>
                                    
                                </select>

                            </div>
                        </Col>
                    </Row>

                
                    {filteredQuotations.length > 0 ? (
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
                                        <th style={{color: '#014c91'}}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((quotation, index) => (
                                        <React.Fragment key={quotation.quotation_id}>
                                            <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                <td ><Link to={`/generatequotation/${quotation.quotation_id}?type=view`} style={{color: '#014c91'}}>#{String(quotation.quotation_id).padStart(4, '0')}</Link></td>
                                                <td style={{color: '#014c91'}}>{quotation.client_name}</td>
                                                <td style={{color: '#014c91'}}>{quotation.company_name ?? '--'}</td>
                                                <td style={{color: '#014c91'}}>{quotation.client_number}</td>
                                                <td style={{color: '#014c91'}}>{formatDate(quotation.date_created)} {new Date(quotation.date_created).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                                                <td style={{color: '#014c91'}}>₱ {formatNumber(quotation.totalPrice)}</td>
                                                <td style={{ color: '#014c91' }}>
                                                    {quotation.is_cancelled === 0 ? (
                                                        <div style={{ position: 'relative' }}>
                                                            <div style={{cursor: 'pointer'}} onClick={() => handleEllipsisClick(index)}>
                                                                <FaEllipsisH size={20} />
                                                            </div>
                                                            <Dropdown show={index === activeDropdown} align="start">
                                                                {renderDropdown(index, quotation.quotation_id)}
                                                            </Dropdown>
                                                        </div>
                                                    ) : null}
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
                                <h1 className="mt-3"> <FaSearch size={50} className="me-2" />No Quotations Found  </h1>
                            </CardBody>
                        </Card>
                    )}

                </div>
            }
         </>
    );
};

export default QuotationList;
