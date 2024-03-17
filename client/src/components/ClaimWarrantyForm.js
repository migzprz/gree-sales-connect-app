import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaSearch, FaCheck} from 'react-icons/fa';
import { Row, Col, Card, CardBody, CardHeader, Table, Form, InputGroup } from 'react-bootstrap';
import '../index.css';
import axios from 'axios';

const ClaimWarrantyForm= () => {

    const { id } = useParams();
    const [warrantySearchData, setWarrantySearchData] = useState([]);
    const [validated, setValidated] = useState(false);

useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getWarrantySearchDetails/${id}`)
                // Add quantity field to warrantySearchData
                const dataWithQuantity = response.data.map(item => ({ ...item, quantity: 0 }));
                setWarrantySearchData(dataWithQuantity);
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    },[id])



    const [formData, setFormData] = useState({
        // new user data
        is_completed: 0,
        quotation_id: id,
        login_id: 1,
        for_inspection: 1,
        inspection_dateonly: '',
        inspection_time: '',
        service_dateonly: '',
        service_time: '',
        service_technician_id: '',
        inspection_technician_id: '',
        claimed_units: []
    })

    useEffect(() => {
        console.log(formData)
    },[formData])

    useEffect(() => {
        console.log(warrantySearchData)
    },[warrantySearchData])
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
       
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        }));

      

    };

    const handleChangeWarrantySearchData = (e, index) => {
        const { name, value } = e.target;
    
        if (name === 'quantity') {
            const newValue = parseInt(value);
            const maxQty = warrantySearchData[index].totalqty;
    
            if (newValue > maxQty) {
                // If the new value exceeds the max quantity, revert back to the max quantity
                const newWarrantySearchData = warrantySearchData.map((item, idx) => {
                    if (idx === index) {
                        return { ...item, quantity: maxQty };
                    }
                    return item;
                });
                setWarrantySearchData(newWarrantySearchData);
            } else {
                // Update the quantity in the warrantySearchData
                const newWarrantySearchData = warrantySearchData.map((item, idx) => {
                    if (idx === index) {
                        return { ...item, quantity: newValue };
                    }
                    return item;
                });
                setWarrantySearchData(newWarrantySearchData);
    
                // Update the claimed_units in formData
                const claimedUnits = newWarrantySearchData.reduce((acc, item) => {
                    if (item.quantity > 0) {
                        const existingUnit = acc.find(unit => unit.quotation_items_id === item.quotation_items_id);
                        if (!existingUnit) {
                            acc.push({ product_id: item.product_id, quantity: item.quantity, issue: item.issue, quotation_items_id: item.quotation_items_id });
                        } else {
                            existingUnit.quantity = item.quantity;
                            existingUnit.issue = item.issue;
                            existingUnit.product_id = item.product_id;
                        }
                    }
                    return acc;
                }, []);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    claimed_units: claimedUnits
                }));
            }
        } else if (name === 'issue') {
            const newWarrantySearchData = warrantySearchData.map((item, idx) => {
                if (idx === index) {
                    return { ...item, issue: value };
                }
                return item;
            });
            setWarrantySearchData(newWarrantySearchData);
    
            // Update the claimed_units in formData
            const claimedUnits = newWarrantySearchData.reduce((acc, item) => {
                if (item.quantity > 0) {
                    const existingUnit = acc.find(unit => unit.quotation_items_id === item.quotation_items_id);
                    if (!existingUnit) {
                        acc.push({ product_id: item.product_id, quantity: item.quantity, issue: item.issue, quotation_items_id: item.quotation_items_id });
                    } else {
                        existingUnit.quantity = item.quantity;
                        existingUnit.issue = item.issue;
                        existingUnit.product_id = item.product_id;
                    }
                }
                return acc;
            }, []);
            setFormData(prevFormData => ({
                ...prevFormData,
                claimed_units: claimedUnits
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }


        const data = {
            ...formData,
            inspection_date: forInspection ? formData.inspection_dateonly + "T" + formData.inspection_time : null,
            service_date: formData.service_dateonly + "T" + formData.service_time
        };
        
    
        setValidated(true);
        if (form.checkValidity()) {
            try {
                const postReponse = await axios.post('http://localhost:4000/api/postWarranty', {data})
                console.log(postReponse)
                window.location.reload()
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error)
            }
        }
      };
    
    
    
    
    
    

    



    const [forInspection, setForInspection] = useState(true);

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Validate Warranty Claim</h1>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            Sale Ref.: <strong> {warrantySearchData.length > 0 && warrantySearchData[0] && warrantySearchData[0].sales_id}</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Client: <strong>{warrantySearchData.length > 0 && warrantySearchData[0] && warrantySearchData[0].client_name}</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Company: <strong> {warrantySearchData.length > 0 && warrantySearchData[0] && warrantySearchData[0].company_name}</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Contact Number: <strong> {warrantySearchData.length > 0 && warrantySearchData[0] && warrantySearchData[0].client_number}</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Email Address: <strong> {warrantySearchData.length > 0 && warrantySearchData[0] && warrantySearchData[0].email}</strong>
                        </Col>
                    </Row>

                </Col>
            </Row>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mt-1">
                        <Col lg="2">
                            <Form.Group controlId="inverter">
                                <Form.Label>For Inspection</Form.Label>
                                <div>
                                    <Form.Check
                                        type="radio"
                                        id="yes"
                                        label="Yes"
                                        name="inverter"
                                        checked={forInspection}
                                        onChange={() => setForInspection(true)}
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="no"
                                        label="No"
                                        name="inverter"
                                        checked={!forInspection}
                                        // TODO: set formdata values related to technician to blank if turned no
                                        onChange={() => {setForInspection(false)}}
                                        required
                                    />

                                </div>
                                <Form.Control.Feedback type="invalid">
                                    Please select a transportation mode.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    {forInspection && ( 
                        <Row className="mt-1">
                            <Col lg="3">
                                <Form.Group controlId="description">
                                    <Form.Label>Inspection Date</Form.Label>
                                    <Form.Control type="date" name="inspection_dateonly" value={formData.inspection_dateonly} onChange={handleChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide inspection date
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="3">
                                <Form.Group controlId="description">
                                    <Form.Label>Inspection Time</Form.Label>
                                    <Form.Control type="time"  name="inspection_time" value={formData.inspection_time} onChange={handleChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide inspection time
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="3">
                                <Form.Group controlId="type">
                                    <Form.Label>Assigned Technician</Form.Label>
                                    <Form.Control as="select" name="inspection_technician_id" value={formData.inspection_technician_id} onChange={handleChange} required>
                                        <option value=""> Select </option>
                                        <option value="1"> Zara </option>
                                        <option value="2"> Split Type </option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please select technician.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    )}

                    <Row className="mt-2">
                            <Col lg="3">
                                <Form.Group controlId="description">
                                    <Form.Label>Service Date</Form.Label>
                                    <Form.Control type="date" name="service_dateonly" value={formData.service_dateonly} onChange={handleChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide service date
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="3">
                                <Form.Group controlId="description">
                                    <Form.Label>Service Time</Form.Label>
                                    <Form.Control type="time" name="service_time" value={formData.service_time} onChange={handleChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide service time
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="3">
                                <Form.Group controlId="type">
                                    <Form.Label>Assigned Technician</Form.Label>
                                    <Form.Control as="select" name="service_technician_id" value={formData.service_technician_id} onChange={handleChange} required>
                                        <option value=""> Select </option>
                                        <option value="1"> Zara </option>
                                        <option value="2"> Split Type </option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please select technician.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                    </Row>
                    
                    <Row  className="mt-4">
                        <Col lg="9">
                            <strong>Ordered Units </strong> (Select units that have an issue)
                            <Card style={{ borderRadius: '20px'}}>
                                <CardBody>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th style={{color: '#014c91', width: "14%"}}>Qty.</th>
                                                <th style={{color: '#014c91'}}>Max Qty.</th>
                                                <th style={{color: '#014c91'}}>Description</th>
                                                <th style={{color: '#014c91'}}>Model</th>
                                                <th style={{color: '#014c91', width: "30%"}}>Issue</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {warrantySearchData.map((item, index) => (
                                                <React.Fragment key={item.id}>
                                                    <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                        <td style={{ color: '#014c91' }}>
                                                            <Form.Group controlId={`qty-${index}`}>
                                                                <Form.Control
                                                                    type="number"
                                                                    inputmode="numeric"
                                                                    min="0"
                                                                    max={item.totalqty}
                                                                    name="quantity"
                                                                    value={item.quantity}
                                                                    onChange={(e) => handleChangeWarrantySearchData(e, index)}
                                                                    required
                                                                />
                                                            </Form.Group>
                                                        </td>
                                                        <td style={{color: '#014c91'}}> {item.totalqty} </td>
                                                        <td style={{color: '#014c91'}}>{item.description}</td>
                                                        <td style={{color: '#014c91'}}>{item.unit_model}</td>
                                                        <td style={{color: '#014c91'}}>
                                                        {formData.claimed_units.some(unit => unit.quotation_items_id === item.quotation_items_id) && (
                                                            <Form.Group controlId={`issue-${index}`}>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="issue"
                                                                    value={item.issue}
                                                                    onChange={(e) => handleChangeWarrantySearchData(e, index, 'issue')}
                                                                    required
                                                                />
                                                            </Form.Group>
                                                        )}
                                                        </td>
                                                    </tr>
                                                
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col lg="2">
                            <button className="btn w-100" style={{color: "white", backgroundColor: "#014c91"}}>
                            {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })}  Claim Warranty
                            </button>
                        </Col>

                    </Row>
                </Form>

            
            
            




        </div>
    );
};

export default ClaimWarrantyForm;
