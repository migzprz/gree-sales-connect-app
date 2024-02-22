import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave, FaEye, FaEyeSlash, FaTrash} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table, InputGroup} from 'react-bootstrap';
import '../../index.css';

const OfferSelection = ({offerList, onOfferSubmission}) => {
  const [hasItems, setHasItems] = useState(false);
  const [isFullView, setIsFullView] = useState(true);
  const [validated, setValidated] = useState(false);



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




const [itemList, setItemList] = useState([]);
const [itemListTotals, setItemListTotals] = useState([]);

  //Rendering Transition Logic for Alternating Views
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldRender(true);
    }, 250); // 0.03 seconds in milliseconds

    return () => clearTimeout(timeout);
  }, [isFullView, itemList]);

const handleItemListChange = (event, index, property) => {
    const { value } = event.target;

    setItemList(prevItemList => {
        const updatedItemList = [...prevItemList];
        updatedItemList[index][property] = value;
        return updatedItemList;
    });
};

const handleRemoveFromItemList = (index) => {
    setItemList(prevItemList => {
        const updatedItemList = [...prevItemList];
        updatedItemList.splice(index, 1); // Remove the item at the specified index
        return updatedItemList;
    });
};

console.log(itemList)

const handleAddToItemList = (offer) => {
    // Create a new object with the offer's properties and add additional fields
    const newItem = {
      ...offer,
      quantity: 1,
      discPrice: offer.product_srp // Set discPrice to be the same as price initially
    };
    // Add the new item to the itemList
    setItemList(prevItemList => [...prevItemList, newItem]);
  };

  // Function to calculate totals
  const calculateTotals = () => {
    let subtotal = 0;
    let total = 0;
    let totalDisc = 0;
  
    // Calculate subtotal and total
    itemList.forEach(item => {
      subtotal += parseFloat(item.product_srp) * item.quantity;
      total += parseFloat(item.discPrice) * item.quantity;
    });
  
    // Calculate total discount
    totalDisc = total - subtotal;
  
    // Update itemListTotals state
    setItemListTotals({
      subtotal: subtotal,
      total: total,
      totalDisc: totalDisc
    });
  };
  
  

  // Calculate totals when itemList changes
  useEffect(() => {
    calculateTotals();
  }, [itemList]);

  const formatNumber = (number) => {
    return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  

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

                {/* Navigation Mechanism */}
                {itemList.length == 0 && (
                    <Row>
                        <Col lg="4">
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

                    )}

            <Row>

                {/* Initial View Display */}
                {itemList.length == 0 ? (
                    
                    <Col lg="12">
                        <Row>
                        {offerList.map((offer, index) => (
                            <Col className="mt-3" lg="2" key={index}>
                            <Card style={{ height: '100%',cursor: 'pointer', padding: '20px', background: 'white', color: '#014c91' }} onClick={() => handleAddToItemList(offer)}>
                                <Card.Title>{offer.display}</Card.Title>
                                <Card.Text>
                                {offer.unit_model} <br />
                                <strong>₱ {formatNumber(offer.product_srp)}  </strong><br />
                                {offer.product_type.toUpperCase()}
                                </Card.Text>
                            </Card>
                            </Col>
                        ))}
                        </Row>
                  </Col>
                ):(
                    
                <>
                {/*Quotation Summary*/}
                     <Col lg={isFullView ? "7" : "12"} style={!isFullView ? { transition: 'all 0.2s ease' } : {}}>
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
                                                    <th style={{color: '#014c91', width: '5%'}}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {itemList.map((item, index) => (
                                                    <tr key={index} style={{ borderRadius: '20px', padding: '10px' }}>
                                                    <td style={{ color: '#014c91' }}>
                                                        <Form.Group controlId={`qty-${index}`}>
                                                            <Form.Control   type="number" inputmode="numeric" min="1" required
                                                                            value={item.quantity} onChange={(e) => handleItemListChange(e, index, 'quantity')} />
                                                        </Form.Group>
                                                    </td>
                                                    <td style={{ color: '#014c91' }}>{item.display}</td>
                                                    <td style={{ color: '#014c91' }}>{item.unit_model}</td>
                                                    <td style={{ color: '#014c91' }}>
                                                        ₱ {formatNumber(item.product_srp)}
                                                    </td>
                                                    <td style={{ color: '#014c91' }}>
                                                        <Form.Group controlId={`discPrice-${index}`}>
                                                            <InputGroup>
                                                                <InputGroup.Text> ₱ </InputGroup.Text>
                                                                <Form.Control   className="money" type="number" inputmode="numeric" min="0" 
                                                                                required onWheel={(e) => e.target.blur()} value={item.discPrice}
                                                                                onChange={(e) => handleItemListChange(e, index, 'discPrice')} />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </td>
                                                    <td style={{ color: '#014c91' }}>
                                                        {React.createElement(FaTrash, { 
                                                            size: 18, 
                                                            style: { marginTop: '6px', cursor: 'pointer' }, 
                                                            onClick: () => handleRemoveFromItemList(index) // Attach onClick event handler
                                                        })}
                                                    </td>
                                                </tr>
                                            
                                            ))}

                                            </tbody>
                                        </Table>

                                        {/*Total*/}
                                        <div style={{ padding: '10px', borderRadius: '10px', marginTop: '20px', background: '#E5EDF4', color: '#014c91'  }}>
                                            <Table>
                                                <tbody style={{ border: 'none'}} >
                                                        <tr >
                                                            <td style={{width: '9.5%', border: 'none', background: '#E5EDF4', color: '#014c91' }}> Subtotal </td>
                                                            <td style={{border: 'none', background: '#E5EDF4', color: '#014c91' }}> ₱ {formatNumber(itemListTotals.subtotal)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{border: 'none', background: '#E5EDF4', color: '#014c91' }}> Total Discount </td>
                                                            <td style={{border: 'none', background: '#E5EDF4', color: '#014c91' }}> (₱ {formatNumber(itemListTotals.totalDisc)})</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{border: 'none', background: '#E5EDF4', color: '#014c91' }}> <strong> Total </strong> </td>
                                                            <td style={{border: 'none', background: '#E5EDF4', color: '#014c91' }}><strong> ₱ {formatNumber(itemListTotals.total)}</strong></td>
                                                        </tr>
                                                </tbody>
                                            </Table>
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
                            <Card style={{ height: '100%',cursor: 'pointer', padding: '20px', background: 'white', color: '#014c91' }} onClick={() => handleAddToItemList(offer)}>
                                <Card.Title>{offer.display}</Card.Title>
                                <Card.Text>
                                {offer.unit_model} <br />
                                <strong>₱ {formatNumber(offer.product_srp)}  </strong><br />
                                {offer.product_type.toUpperCase()}
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
