import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEllipsisH, FaFilter, FaSort, FaSearch} from 'react-icons/fa';
import { Row, Col, Card, CardBody, Table, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../index.css';
import AddProductModal from './AddProductModal';
import AddUserModal from './AddUserModal';

const WarrantiesList = () => {

    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleEllipsisClick = (index) => {
        setActiveDropdown(index === activeDropdown ? null : index);
      };

      const renderDropdown = (index) => {
        if (index === activeDropdown) {
          return (
            <Dropdown.Menu style={{ position: 'absolute', right: '0', left: 'auto', top: '0px' }}>
              <Dropdown.Item>Edit User Details</Dropdown.Item>
              <Dropdown.Item>Reset Password</Dropdown.Item>
              <Dropdown.Item>Deactivate User</Dropdown.Item>
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
            <h1>Manage Warranties</h1>
            <h5>View and manage warranties</h5>
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
                                <th style={{color: '#014c91'}}>Warranty Claim #</th>
                                <th style={{color: '#014c91'}}>Sales Ref. #</th>
                                <th style={{color: '#014c91'}}>Client</th>
                                <th style={{color: '#014c91'}}>Company</th>
                                <th style={{color: '#014c91'}}>Contact Number</th>
                                <th style={{color: '#014c91'}}>Email Address</th>
                                <th style={{color: '#014c91'}}>Location</th>
                                <th style={{color: '#014c91'}}>Inspection Schedule</th>
                                <th style={{color: '#014c91'}}>Service Schedule</th>
                                <th style={{color: '#014c91'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotationList.map((quotation, index) => (
                                <React.Fragment key={quotation.id}>
                                    <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                        <td style={{color: '#014c91'}}>
                                            <Link to={`/viewwarrantydetails`} style={{ color: '#014c91'}}>{quotation.id}</Link>
                                        </td>
                                        <td style={{color: '#014c91'}}>{quotation.id}</td>
                                        <td style={{color: '#014c91'}}>{quotation.client}</td>
                                        <td style={{color: '#014c91'}}>{quotation.company}</td>
                                        <td style={{color: '#014c91'}}>{quotation.company}</td>
                                        <td style={{color: '#014c91'}}>{quotation.contactNumber}</td>
                                        <td style={{color: '#014c91'}}>{quotation.contactNumber}</td>
                                        <td style={{color: '#014c91'}}>Sales, Aftersales, and System Administration Modules</td>
                                        <td style={{color: '#014c91'}}>{quotation.status}</td>
                                        <td style={{ color: '#014c91' }}>
                                        <div style={{ position: 'relative' }}>
                                            <div style={{cursor: 'pointer'}} onClick={() => handleEllipsisClick(index)}>
                                                <FaEllipsisH size={20} />
                                                </div>
                                                <Dropdown show={index === activeDropdown} align="start">
                                    
                                                {renderDropdown(index)}
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

export default WarrantiesList;
