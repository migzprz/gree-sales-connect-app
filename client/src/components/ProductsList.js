import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEllipsisH, FaFilter, FaSort, FaSearch} from 'react-icons/fa';
import { Row, Col, Card, CardBody, Table, Dropdown, Pagination} from 'react-bootstrap';
import '../index.css';
import AddProductModal from './AddProductModal';
import axios from 'axios'
import EditProductModal from './EditProductModal';
import RemoveProductModal from './RemoveProductModal';

const ProductsList = () => {

    const [activeDropdown, setActiveDropdown] = useState(null);
    const [productData, setProductData] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [typeFilterOption, setTypeFilterOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getAllProducts/')
                setProductData(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    },[])

    useEffect(() => {
        console.log(productData)
    },[productData])

    //Ellipsis Functions
    const handleEllipsisClick = (index) => {
        setActiveDropdown(index === activeDropdown ? null : index);
    };
    const renderDropdown = (index, id, type) => {
        if (index === activeDropdown) {
            return (
                <Dropdown.Menu style={{ position: 'absolute', right: '0', left: 'auto', top: '0px' }}>
                    <EditProductModal id={id} type={type}/>
                    <RemoveProductModal id={id} type={type}/>
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

    let sortedProducts = [...productData];
    if (sortOption === 'description-asc') {
        sortedProducts.sort((a, b) => a.description.localeCompare(b.description));
    } else if (sortOption === 'description-desc') {
        sortedProducts.sort((a, b) => b.description.localeCompare(a.description));
    } else if (sortOption === 'unitm-asc') {
        sortedProducts.sort((a, b) => a.unit_model.localeCompare(b.unit_model));
    } else if (sortOption === 'unitm-desc') {
        sortedProducts.sort((a, b) => b.unit_model.localeCompare(a.unit_model));
    } else if (sortOption === 'srp-asc') {
        sortedProducts.sort((a, b) => parseFloat(a.srp) - parseFloat(b.srp));
    } else if (sortOption === 'srp-desc') {
        sortedProducts.sort((a, b) => parseFloat(b.srp) - parseFloat(a.srp));
    }

    const filteredProducts = sortedProducts.filter(product => (
        (typeFilterOption === '' || product.type.toString() === typeFilterOption) &&
        (product.unit_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    ));
    
    //Price Conversion Function
    const formatNumber = (number) => {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    //Pagination Functionality
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Change this number as needed
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil( filteredProducts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
     
    

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Manage Products and Services</h1>
            <h5>View and manage all products and services</h5>
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
                            <option value="description-asc">Sort by Description (A-Z)</option>
                            <option value="description-desc">Sort by Description (Z-A)</option>
                            <option value="unitm-asc">Sort by Unit Model (A-Z)</option>
                            <option value="unitm-desc">Sort by Unit Model (Z-A)</option>
                            <option value="srp-asc">Sort by Price (A-Z)</option>
                            <option value="srp-desc">Sort by Price (Z-A)</option>
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
                        <select className="form-select" value={typeFilterOption} onChange={(e) => {setTypeFilterOption(e.target.value); setCurrentPage(1);}}>
                            <option value="">All Types</option>
                            <option value="Window Type AC">Window Type AC</option>
                            <option value="Split Type AC">Split Type AC</option>
                            <option value="AC Parts">AC Parts</option>
                            <option value="Services">Services</option>
                        </select>
                    </div>
                </Col>
            </Row>

        
            {filteredProducts.length > 0 ? (
            <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
                <CardBody>
                    <Table>
                         <thead>
                            <tr>
                                <th style={{color: '#014c91'}}>Description</th>
                                <th style={{color: '#014c91'}}>Unit Model</th>
                                <th style={{color: '#014c91'}}>Type</th>
                                <th style={{color: '#014c91'}}>SRP</th>
                                <th style={{color: '#014c91'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((product, index) => (
                                <React.Fragment key={index}>
                                    <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                        <td style={{color: '#014c91'}}>{product.description}</td>
                                        <td style={{color: '#014c91'}}>{product.unit_model}</td>
                                        <td style={{color: '#014c91'}}>{product.type}</td>
                                        <td style={{color: '#014c91'}}>₱ {formatNumber(product.srp)}</td>
                                        <td style={{ color: '#014c91' }}>
                                            <div style={{ position: 'relative' }}>
                                                <div style={{cursor: 'pointer'}} onClick={() => handleEllipsisClick(index)}>
                                                    <FaEllipsisH size={20} />
                                                </div>
                                                <Dropdown show={index === activeDropdown} align="start">
                                                    {renderDropdown(index, product.id, product.type)}
                                                </Dropdown>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>

                    <Row className="mt-3">
                        <Col>
                            <AddProductModal/>
                        </Col>
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
                        <h1 className="mt-3"> <FaSearch size={50} className="me-2" />No Products/Services Found  </h1>
                        <Row className="mt-3">
                            <Col>
                                <AddProductModal/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            )}
           

            


        </div>
    );
};

export default ProductsList;
