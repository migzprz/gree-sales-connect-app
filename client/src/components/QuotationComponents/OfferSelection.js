import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave, FaEye, FaEyeSlash} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table, InputGroup} from 'react-bootstrap';
import '../../index.css';

const OfferSelection = ({offerList, onOfferSubmission}) => {
  const [hasItems, setHasItems] = useState(true);
  const [isFullView, setIsFullView] = useState(true);
  const [validated, setValidated] = useState(false);

  //Rendering Transition Logic for Alternating Views
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldRender(true);
    }, 250); // 0.03 seconds in milliseconds

    return () => clearTimeout(timeout);
  }, [isFullView]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        onOfferSubmission()
    }

    setValidated(true);
  };


  const [itemList, setItemList] = useState([
    {quantity:0, name:"1.5 HP Split Type Inverter", description:"XBY-1234", type: "window-type", price:60000, discPrice:45000},
    {quantity:0, name:"Product A", description:"XBY-1234", type: "window-type", price:60000, discPrice:45000},
    {quantity:0, name:"Product A", description:"XBY-1234", type: "window-type", price:60000, discPrice:45000},
    {quantity:0, name:"Product A", description:"XBY-1234", type: "window-type", price:60000, discPrice:45000}
]);


  return (
        <>     
            <Row>
                <Col>
                    <h5>Step 1. Choose products or services.</h5>
                    <h6>Please do not reload or go to the previous page.</h6>
                </Col>
                <Col className="d-flex align-items-end justify-content-end">
                    <div className="mt-auto">
                        <button className="btn" style={{ color: "white", backgroundColor: "#014c91" }} onClick={() => {setIsFullView(!isFullView)
                                                                                                                        setShouldRender(false)}}>
                            {isFullView ? (
                                <>
                                    {React.createElement(FaEyeSlash, { size: 18, style: { marginRight: '5px' } })}
                                    Hide Offerings
                                </>
                            ) : (
                                <>
                                    {React.createElement(FaEye, { size: 18, style: { marginRight: '5px' } })}
                                    View Offerings
                                </>
                            )}
                        </button>
                    </div>
                </Col>
                <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
            </Row>

            <Row>

                {/* Initial View Display */}
                {!hasItems ? (
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
                ):(
                    
                <>
                {/*Quotation Summary*/}
                    <Col lg={isFullView ? "7" : "12"} style={{ transition: 'all 0.2s ease' }}>
                        <div className="mt-3" style={{ padding: '6px', borderRadius: '10px', background: 'white', color: '#014c91', textAlign: 'center' }}>
                             <strong>Quotation Summary </strong>
                        </div>

                        <div style={{ marginTop:'6px', overflowY: 'auto', overflowX:'hidden', overflowY:'hidden' }}>

                            <Card style={{ borderRadius: '20px', marginTop: '20px', background: 'white', color: '#014c91'  }}>
                                <CardBody>
                                    <Form validated={validated} onSubmit={handleSubmit}>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th style={{color: '#014c91', width: '10%'}}>Quantity</th>
                                                    <th style={{color: '#014c91'}}>Description</th>
                                                    <th style={{color: '#014c91'}}>Unit Model</th>
                                                    <th style={{color: '#014c91'}}>SRP</th>
                                                    <th style={{color: '#014c91'}}>Discounted Price</th>
                                                    <th style={{color: '#014c91'}}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {itemList.map((item, index) => (
                                                <tr key={index} style={{ borderRadius: '20px', padding: '10px' }}>
                                                    <td style={{ color: '#014c91' }}>
                                                        <Form.Group controlId={`qty-${index}`}>
                                                            <Form.Control type="number" inputmode="numeric" min="1" required />
                                                        </Form.Group>
                                                    </td>
                                                    <td style={{ color: '#014c91' }}>{item.name}</td>
                                                    <td style={{ color: '#014c91' }}>{item.description}</td>
                                                    <td style={{ color: '#014c91' }}>
                                                        ₱ {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </td>
                                                    <td style={{ color: '#014c91' }}>
                                                        <Form.Group controlId={`discPrice-${index}`}>
                                                            <InputGroup>
                                                                <InputGroup.Text> ₱ </InputGroup.Text>
                                                                <Form.Control className="money" type="number" inputmode="numeric" min="0" required onWheel={(e) => e.target.blur()} />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </td>
                                                </tr>
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
                                    </Form>                
                                </CardBody>
                            </Card>

                        </div>
                    </Col>

                    {/*Offer List*/}
                    {isFullView && shouldRender && (
                    <Col lg="5" >

                    {/* Navigation Mechanism */}
                     <Row>
                        <Col lg="6">
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
                        <Col lg="6">
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

                    <Row>
                        {/*Search Bar*/ }
                        <Col lg="12">
                        <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                            backgroundColor: "#014c91", borderRadius: "10px",
                                                                            overflow: "hidden"}}>
                                <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>   
                                    <div style={{padding: "5px", color: 'white'}}>
                                        {React.createElement(FaSearch, { size: 20 })}
                                    </div>  
                                </div>
                                <input type="search" className="form-control" placeholder="Search"/>
                            </div>
                        </Col>
                    </Row>


                    <div style={{ maxHeight: '78vh', overflowY: 'auto', overflowX:'hidden' }}>
                        <Row>
                        {offerList.map((offer, index) => (
                            <Col className="mt-3" lg="4" key={index}>
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
                    )}
                    
                    </>
                )} 
                

            
            </Row>



    
    </>
  );
};

export default OfferSelection;
