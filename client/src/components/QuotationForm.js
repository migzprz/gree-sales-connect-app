import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table } from 'react-bootstrap';
import '../index.css';

const QuotationForm = () => {
  const [hasItems, setHasItems] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

// Sample data for different products and services
const offerList = [
    {
      name: 'Product 1',
      code: 'ABC-12334',
      price: 'Php 65,000.00',
      type: 'Split-type',
    },
    {
      name: 'Product 2',
      code: 'DEF-56789',
      price: 'Php 45,000.00',
      type: 'Window-type',
    },
    {
      name: 'Service 1',
      code: 'SRV-98765',
      price: 'Php 10,000.00',
      type: 'Service',
    },
    {
      name: 'Part 1',
      code: 'PART-12345',
      price: 'Php 5,000.00',
      type: 'Parts',
    },
    // Add more products or services as needed
    {
      name: 'Product 3',
      code: 'GHI-54321',
      price: 'Php 75,000.00',
      type: 'Split-type',
    },
    {
      name: 'Product 4',
      code: 'JKL-67890',
      price: 'Php 55,000.00',
      type: 'Window-type',
    },
    {
      name: 'Service 2',
      code: 'SRV-54321',
      price: 'Php 15,000.00',
      type: 'Service',
    },
    {
      name: 'Part 2',
      code: 'PART-67890',
      price: 'Php 8,000.00',
      type: 'Parts',
    },
    {
      name: 'Product 5',
      code: 'MNO-98765',
      price: 'Php 70,000.00',
      type: 'Split-type',
    },
    {
      name: 'Product 6',
      code: 'PQR-54321',
      price: 'Php 50,000.00',
      type: 'Window-type',
    },
    {
      name: 'Service 3',
      code: 'SRV-34567',
      price: 'Php 12,000.00',
      type: 'Service',
    },
    {
      name: 'Part 3',
      code: 'PART-87654',
      price: 'Php 7,000.00',
      type: 'Parts',
    },
    {
      name: 'Product 7',
      code: 'STU-12345',
      price: 'Php 80,000.00',
      type: 'Split-type',
    },
    {
      name: 'Product 8',
      code: 'VWX-67890',
      price: 'Php 60,000.00',
      type: 'Window-type',
    },
    {
      name: 'Service 4',
      code: 'SRV-87654',
      price: 'Php 18,000.00',
      type: 'Service',
    },
    {
      name: 'Part 4',
      code: 'PART-23456',
      price: 'Php 9,000.00',
      type: 'Parts',
    },
    {
      name: 'Product 9',
      code: 'YZA-98765',
      price: 'Php 90,000.00',
      type: 'Split-type',
    },
    {
      name: 'Product 10',
      code: 'BCD-54321',
      price: 'Php 70,000.00',
      type: 'Window-type',
    },
    {
      name: 'Service 5',
      code: 'SRV-56789',
      price: 'Php 20,000.00',
      type: 'Service',
    },
    {
      name: 'Part 5',
      code: 'PART-65432',
      price: 'Php 12,000.00',
      type: 'Parts',
    },
  ];

const itemList = [
    {quantity:0, name:"Product A", description:"XBY-1234", type: "window-type", price:60000, discPrice:45000},
    {quantity:0, name:"Product A", description:"XBY-1234", type: "window-type", price:60000, discPrice:45000},
    {quantity:0, name:"Product A", description:"XBY-1234", type: "window-type", price:60000, discPrice:45000},
    {quantity:0, name:"Product A", description:"XBY-1234", type: "window-type", price:60000, discPrice:45000}
]
  

  return (
    <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91' }}>
      <h1>Generate a New Quotation</h1>
      <h5>Select products or services for quotations</h5>
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
                            <option value="">Sort by Name (A-Z)</option>
                            <option value="1">Sort by Name (Z-A)</option>
                            <option value="2">Sort by Price (A-Z)</option>
                            <option value="3">Sort by Price (Z-A)</option>
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
                            <option value="">All Products/Services</option>
                            <option value="0">Window-type Products</option>
                            <option value="1">Split-type Products</option>
                            <option value="2">Product Parts</option>
                            <option value="3">Services</option>
                        </select>
                    </div>
                </Col>
            </Row>

            {/* Product Information Boxes */}
            <Row>
                {hasItems ? (
                    <Col lg="12">
                    <Row>
                        {offerList.map((offer, index) => (
                        <Col className="mt-3" lg="2" key={index}>
                            <Card style={{ cursor: 'pointer', padding: '20px', background: 'white', color: '#014c91' }}>
                            <Card.Title>{offer.name}</Card.Title>
                            <Card.Text>
                                {offer.code} <br />
                                {offer.price} <br />
                                {offer.type}
                            </Card.Text>
                            </Card>
                        </Col>
                        ))}
                    </Row>
                    </Col>
                ) : (
                    <>
                    <Col lg="4">
                        <div style={{ maxHeight: '78vh', overflowY: 'auto', overflowX:'hidden' }}>
                            <Row>
                            {offerList.map((offer, index) => (
                                <Col className="mt-3" lg="6" key={index}>
                                <Card style={{ cursor: 'pointer', padding: '20px', background: 'white', color: '#014c91' }}>
                                    <Card.Title>{offer.name}</Card.Title>
                                    <Card.Text>
                                    {offer.code} <br />
                                    {offer.price} <br />
                                    {offer.type}
                                    </Card.Text>
                                </Card>
                                </Col>
                            ))}
                            </Row>
                        </div>
                    </Col>
                    
                    {/*Calculation Table of Quotation*/}
                    <Col lg="8">
                        <div style={{ maxHeight: '78vh', overflowY: 'auto', overflowX:'hidden' }}>

                            <Card style={{ borderRadius: '20px', marginTop: '20px', background: 'white', color: '#014c91'  }}>
                                <CardBody>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th style={{color: '#014c91'}}>Quantity</th>
                                                <th style={{color: '#014c91'}}>Description</th>
                                                <th style={{color: '#014c91'}}>Unit Model</th>
                                                <th style={{color: '#014c91'}}>SRP</th>
                                                <th style={{color: '#014c91'}}>Discounted Price</th>
                                                <th style={{color: '#014c91'}}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {itemList.map((item, index) => (
                                                <React.Fragment>
                                                    <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                        <td style={{color: '#014c91'}}>{item.quantity}</td>
                                                        <td style={{color: '#014c91'}}>{item.name}</td>
                                                        <td style={{color: '#014c91'}}>{item.description}</td>
                                                        <td style={{color: '#014c91'}}>Php {item.price}</td>
                                                        <td style={{color: '#014c91'}}>Php {item.discPrice}</td>
                                                        
                                                    </tr>
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </Table>

                                    {/*Total*/}
                                    <div style={{ padding: '10px', borderRadius: '10px', marginTop: '20px', background: '#E5EDF4', color: '#014c91'  }}>
                                        <Row >
                                            <Col lg="2">
                                                Subtotal
                                            </Col>
                                            <Col lg="3">
                                                Php 500,000 
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col lg="2">
                                                Total Discount
                                            </Col>
                                            <Col lg="3">
                                                (Php 20,000) 
                                            </Col>
                                        </Row>
                                        <Row className="mt-2" >
                                            <Col lg="2">
                                                <strong> Total </strong>
                                            </Col>
                                            <Col lg="3">
                                                <strong>Php 480,000 </strong>
                                            </Col>
                                        </Row>
                                    </div>

                                    <Row className="mt-4">
                                        <Col lg="12" className="d-flex justify-content-end">
                                            <button className="btn" style={{ color: "white", backgroundColor: "#014c91" }}>
                                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Save Quotation
                                            </button>
                                        </Col>
                                    </Row>

                                </CardBody>
                            </Card>

                        </div>

                       
                    </Col>
                    </>
                )}
            </Row>



    
    </div>
  );
};

export default QuotationForm;
