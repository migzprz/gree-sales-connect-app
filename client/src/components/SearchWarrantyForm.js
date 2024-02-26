import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaSearch, FaSort, FaFilter, FaCheck, FaClock, FaChevronRight } from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table, Dropdown } from 'react-bootstrap';
import '../index.css';
import { Link } from 'react-router-dom';

const SearchWarrantyForm = () => {

    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleEllipsisClick = (index) => {
        setActiveDropdown(index === activeDropdown ? null : index);
      };

      const renderDropdown = (index) => {
        if (index === activeDropdown) {
          return (
            <Dropdown.Menu style={{ position: 'absolute', right: '0', left: 'auto', top: '0px' }}>
              <Dropdown.Item>Convert to Sale</Dropdown.Item>
              <Dropdown.Item>Cancel Quotation</Dropdown.Item>
            </Dropdown.Menu>
          );
        }
        return null;
      };
      


    const quotationList = [
        {
            id: 1,
            client: 'Client 1',
            company: 'Company 1',
            contactNumber: '0165189598',
            dateGenerated: '2024-01-15',
            totalPrice: 20000,
            status: 'Active'
        },
        {
            id: 1,
            client: 'Client 1',
            company: 'Company 1',
            contactNumber: '0165189598',
            dateGenerated: '2024-01-15',
            totalPrice: 20000,
            status: 'Active'
        },
        {
            id: 1,
            client: 'Client 1',
            company: 'Company 1',
            contactNumber: '0165189598',
            dateGenerated: '2024-01-15',
            totalPrice: 20000,
            status: 'Active'
        },
        {
            id: 1,
            client: 'Client 1',
            company: 'Company 1',
            contactNumber: '0165189598',
            dateGenerated: '2024-01-15',
            totalPrice: 20000,
            status: 'Active'
        },
        // Add more ocular objects as needed
    ];

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Validate Warranty Claim</h1>
            <h5>Create a warranty claim by searching for an existing sale</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

        
           {/*Navigation Forms*/ }
           <Row>
                {/*Search Bar*/ }
                <Col lg="3">
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
                <Col lg="3">
                    <button className="btn mt-3 w-100" style={{color: "white", backgroundColor: "#014c91"}}>
                        Advanced Search
                    </button>
                </Col>
                <Col lg="3">
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
                <Col lg="3">
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

            <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
                <CardBody>
                    <Table>
                         <thead>
                            <tr>
                                <th style={{color: '#014c91'}}>Sale Ref. #</th>
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
                            {quotationList.map((quotation, index) => (
                                <React.Fragment key={quotation.id}>
                                    <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                        <td style={{color: '#014c91'}}>{quotation.client}</td>
                                        <td style={{color: '#014c91'}}>{quotation.company}</td>
                                        <td style={{color: '#014c91'}}>{quotation.contactNumber}</td>
                                        <td style={{color: '#014c91'}}>{quotation.dateGenerated}</td>
                                        <td style={{color: '#008000'}}><FaCheck size={20}/> {quotation.dateGenerated}</td>
                                        <td style={{color: '#DC6601'}}><FaClock size={20}/> {quotation.dateGenerated}</td>
                                        <td style={{color: '#014c91'}}><FaClock size={20}/> {quotation.dateGenerated}</td>
                                        <td style={{color: '#014c91'}}>
                                            <button className="btn w-60" style={{color: "white", backgroundColor: "#014c91"}}>
                                                Claim Warranty
                                            </button>
                                        </td>
                                        <td style={{color: '#014c91'}}> <FaChevronRight size={20} /> </td>
                                       
                                        
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

export default SearchWarrantyForm;