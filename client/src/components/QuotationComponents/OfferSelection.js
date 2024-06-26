import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave, FaEye, FaEyeSlash, FaTrash} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table, InputGroup} from 'react-bootstrap';
import '../../index.css';
import axios from 'axios';

const OfferSelection = ({offerList, onOfferSubmission, type, id }) => {
    const [hasItems, setHasItems] = useState(false);
    const [isFullView, setIsFullView] = useState(true);
    const [filteredOffers, setFilteredOffers] = useState(null);
    const [validated, setValidated] = useState(false);
    const [itemList, setItemList] = useState([]);
    const [itemListTotals, setItemListTotals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        if (type === 'edit') {
            const fetchData = async () => {
              try {
                  const res = (await axios.get(`http://localhost:4000/api/getQuotationDetailsById/${id}`)).data
                  console.log(res.quotation)
                  setItemList(res.quotation)
              } catch (error) {
                  console.log(error)
              }
          }
          fetchData()
        }
    }, [type])
    useEffect(() => {
        console.log(itemList)
    }, [itemList])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        } else {

            // remove all other properties except: product_id, discounted_price, quantity
            // pass updated data into function
            
            onOfferSubmission(itemList)
        }

        setValidated(true);
    };

    
    const [filterOption, setFilterOption] = useState('');

    useEffect(() => {
        console.log(filterOption)
    }, [filterOption])


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
            updatedItemList[index]['totalPrice'] = updatedItemList[index]['discPrice'] * updatedItemList[index]['quantity']
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

    // console.log(itemList)

    const handleAddToItemList = (offer) => {

        // handle different offering types
        const unit_srp = offer.unit + '_srp'

        // Create a new object with the offer's properties and add additional fields
        const newItem = {
        ...offer,
        quantity: 1,
        discPrice: offer[unit_srp], // Set discPrice to be the same as price initially
        totalPrice: offer[unit_srp]
        };

        console.log(newItem)

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
        // handle different offering types
        const unit_srp = item.unit + '_srp'
        const val = item[unit_srp] || item['srp']
        subtotal += parseFloat(val) * item.quantity;
        total += parseFloat(item.discPrice) * item.quantity;
        });
    
        // Calculate total discount
        if ((total - subtotal) === 0) {
            totalDisc = total - subtotal;
        } else {
            totalDisc = (total - subtotal)*-1;
        }
        
    
        console.log(subtotal, total, totalDisc)

        // Update itemListTotals state
        setItemListTotals({
        subtotal: subtotal,
        total: total,
        totalDisc: totalDisc
        });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };


    
    useEffect(() => {
        if (typeof offerList === 'object' && offerList !== null) {
            const filteredOffers = {
                products: [],
                services: [],
                parts: []
            };
    
            // Iterate over each property of offerList
            for (const key in offerList) {
                // Check if the property is an array and filter based on its fields
                if (Array.isArray(offerList[key])) {
                    offerList[key].forEach(offer => {
                        let matches = false;
                        if (key === 'products') {
                            matches = offer.display.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                      offer.unit_model.toLowerCase().includes(searchTerm.toLowerCase());
                        } else if (key === 'services') {
                            matches = offer.description.toLowerCase().includes(searchTerm.toLowerCase());
                        } else if (key === 'parts') {
                            matches = offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                      offer.name.toLowerCase().includes(searchTerm.toLowerCase());
                        }
                        if (matches) {
                            filteredOffers[key].push(offer);
                        }
                    });
                }
            }
            setFilteredOffers(filteredOffers);
        } else {
            console.error("offerList is not an object or is null.");
        }
    }, [offerList, searchTerm]);
    

    

    useEffect(() => {
        console.log(filteredOffers)
      }, [offerList, filteredOffers])

    

  
  

    // Calculate totals when itemList changes
    useEffect(() => {
        calculateTotals();
    }, [itemList]);

    const formatNumber = (number) => {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    const formatItemList = (item) => {

        // handle different offering types
        const unit_srp = item.unit + '_srp'
        const val = item[unit_srp] ||  item['srp']
        return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
  

  return (
        <>     
            <Row>
                <Col>
                    <h5>Step 1. Choose products or services.</h5>
                    <h6>Please do not reload or go to the previous page.</h6>
                </Col>
                <Col className="d-flex align-items-end justify-content-end">
                    {itemList.length > 0 &&
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
                    }
                </Col>
                <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
            </Row>

                {/* Navigation Mechanism */}
                {itemList.length === 0 && (
                    <Row>
                        <Col lg="6">
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
                                <select className="form-select" value={filterOption} onChange={(e) => {setFilterOption(e.target.value)}}>
                                    <option value="">All Offerings</option>
                                    <option value="products">Products Only</option>
                                    <option value="parts">AC Parts Only</option>
                                    <option value="services">Services Only</option>
                                    
                                </select>

                            </div>
                        </Col>
                    </Row>

                    )}

            <Row>

                {/* Initial View Display */}
                {itemList.length === 0 ? (
                    
                    <Col lg="12">
                        <Row>
                        {filteredOffers &&
                        <>  
                            {(filterOption === 'products' || filterOption === '') &&
                                <>
                                    {(filteredOffers.products).map((offer, index) => (
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
                                </>
                            }
                            {(filterOption === 'services' || filterOption === '') &&
                                <>
                                    {(filteredOffers.services).map((offer, index) => (
                                        <Col className="mt-3" lg="2" key={index}>
                                        <Card style={{ height: '100%',cursor: 'pointer', padding: '20px', background: 'white', color: '#014c91' }} onClick={() => handleAddToItemList(offer)}>
                                            <Card.Title>{offer.description}</Card.Title>
                                            <Card.Text>
                                            --- <br />
                                            <strong>₱ {formatNumber(offer.service_srp)}  </strong><br />
                                            {offer.unit.toUpperCase()}
                                            </Card.Text>
                                        </Card>
                                        </Col>
                                    ))}
                                </>
                            }
                            {(filterOption === 'parts' || filterOption === '') &&
                                <>
                                    {(filteredOffers.parts).map((offer, index) => (
                                        <Col className="mt-3" lg="2" key={index}>
                                        <Card style={{ height: '100%',cursor: 'pointer', padding: '20px', background: 'white', color: '#014c91' }} onClick={() => handleAddToItemList(offer)}>
                                            <Card.Title>{offer.description}</Card.Title>
                                            <Card.Text>
                                            {offer.name} <br />
                                            <strong>₱ {formatNumber(offer.parts_srp)}  </strong><br />
                                            {offer.unit.toUpperCase()}
                                            </Card.Text>
                                        </Card>
                                        </Col>
                                    ))}
                                </>
                            }
                        </>}

                          

                        </Row>
                        {filteredOffers &&
                            <>
                                {filteredOffers.products.length === 0 && filteredOffers.services.length === 0 && filteredOffers.parts.length === 0 && 
                                <Card style={{ borderRadius: '20px', marginTop: '20px', textAlign: 'center' }}>
                                    <CardBody style={{ padding:'100px', color: '#014c91'}}>
                                        <h1 className="mt-3"> <FaSearch size={50} className="me-2" />No Offerings Found  </h1>
                                    </CardBody>
                                </Card>
                                }
                            </>
                        }
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
                                                    <th style={{color: '#014c91', width: '20%'}}>Description</th>
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
                                                            <Form.Control   type="number" inputMode="numeric" min="1" required
                                                                            value={item.quantity} onChange={(e) => handleItemListChange(e, index, 'quantity')} />
                                                        </Form.Group>
                                                    </td>
                                                    <td style={{ color: '#014c91' }}>{item.display || item.description || item.article}</td>
                                                    <td style={{ color: '#014c91' }}>{item.unit_model || item.name}</td>
                                                    <td style={{ color: '#014c91' }}>
                                                        ₱ {formatItemList(item)}
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
                                {React.createElement(FaSearch, { size: 20 })}
                            </div>
                        </div>
                        <input type="search" className="form-control" placeholder="Search" value={searchTerm} onChange={handleSearch}/>
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
                                <select className="form-select" value={filterOption} onChange={(e) => {setFilterOption(e.target.value)}}>
                                    <option value="">All Offerings</option>
                                    <option value="products">Products Only</option>
                                    <option value="parts">AC Parts Only</option>
                                    <option value="services">Services Only</option>
                                    
                                </select>

                            </div>
                        </Col>
                    </Row>

                    <div style={{ maxHeight: '78vh', overflowY: 'auto', overflowX:'hidden' }}>
                        <Row>
                            <Col lg="12">
                                <Row>
                                {filteredOffers &&
                                <>  
                                    {(filterOption === 'products' || filterOption === '') &&
                                        <>
                                            {(filteredOffers.products).map((offer, index) => (
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
                                        </>
                                    }
                                    {(filterOption === 'services' || filterOption === '') &&
                                        <>
                                            {(filteredOffers.services).map((offer, index) => (
                                                <Col className="mt-3" lg="4" key={index}>
                                                <Card style={{ height: '100%',cursor: 'pointer', padding: '20px', background: 'white', color: '#014c91' }} onClick={() => handleAddToItemList(offer)}>
                                                    <Card.Title>{offer.description}</Card.Title>
                                                    <Card.Text>
                                                    --- <br />
                                                    <strong>₱ {formatNumber(offer.service_srp)}  </strong><br />
                                                    {offer.unit.toUpperCase()}
                                                    </Card.Text>
                                                </Card>
                                                </Col>
                                            ))}
                                        </>
                                    }
                                    {(filterOption === 'parts' || filterOption === '') &&
                                        <>
                                            {(filteredOffers.parts).map((offer, index) => (
                                                <Col className="mt-3" lg="4" key={index}>
                                                <Card style={{ height: '100%',cursor: 'pointer', padding: '20px', background: 'white', color: '#014c91' }} onClick={() => handleAddToItemList(offer)}>
                                                    <Card.Title>{offer.description}</Card.Title>
                                                    <Card.Text>
                                                    {offer.name} <br />
                                                    <strong>₱ {formatNumber(offer.parts_srp)}  </strong><br />
                                                    {offer.unit.toUpperCase()}
                                                    </Card.Text>
                                                </Card>
                                                </Col>
                                            ))}
                                        </>
                                    }
                                </>}

                                

                                </Row>
                                {filteredOffers &&
                                    <>
                                        {filteredOffers.products.length === 0 && filteredOffers.services.length === 0 && filteredOffers.parts.length === 0 && 
                                        <Card style={{ borderRadius: '20px', marginTop: '20px', textAlign: 'center' }}>
                                            <CardBody style={{ padding:'100px', color: '#014c91'}}>
                                                <h1 className="mt-3"> <FaSearch size={50} className="me-2" />No Offerings Found  </h1>
                                            </CardBody>
                                        </Card>
                                        }
                                    </>
                                }
                            </Col>
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
