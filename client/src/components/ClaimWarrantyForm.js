import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaSearch, FaCheck, FaPlus} from 'react-icons/fa';
import { Row, Col, Card, CardBody, CardHeader, Table, Form, InputGroup } from 'react-bootstrap';
import '../index.css';
import axios from 'axios';

const ClaimWarrantyForm= () => {

    const navigate = useNavigate()
    const { id } = useParams();
    const [warrantySearchData, setWarrantySearchData] = useState([]);
    const [validated, setValidated] = useState(false);

    
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
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getWarrantySearchDetails/${id}`);
                const response2 = await axios.get('http://localhost:4000/api/getDeductableUnits/')

                const remainingQuantities = {}; // Map to track remaining quantities for each key
                response2.data.forEach((data2Item) => {
                    const key = `${data2Item.quotation_id}-${data2Item.unit_id}`;
                    if (!remainingQuantities[key]) {
                        remainingQuantities[key] = 0;
                    }
                    remainingQuantities[key] += data2Item.qty_claimed;
                });
    
                const updatedData = response.data.map((dataItem) => {
                    const key = `${dataItem.quotation_id}-${dataItem.product_id}`;
                    const remainingQty = remainingQuantities[key] || 0;
                    if (remainingQty > 0) {
                        dataItem.totalqty -= remainingQty;
                        remainingQuantities[key] = Math.max(0, remainingQty - dataItem.totalqty); // Ensure remaining quantity is not negative
                    }
                    return dataItem;
                }).filter((dataItem) => dataItem.totalqty > 0); // Filter out items with totalqty <= 0
                
                setWarrantySearchData(updatedData);
    
                // Populate claimedUnits array in formData
                const claimedUnits = [];
                response.data.forEach(item => {
                    const { totalqty, product_id, unit_model, description } = item;
                    for (let i = 0; i < parseInt(totalqty); i++) {
                        claimedUnits.push({ product_id, unit_model, description, issue: '', for_claiming: 0 });
                    }
                });
    
                setFormData(prevState => ({
                    ...prevState,
                    claimed_units: claimedUnits
                }));
                
                
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, [id]);
    


    useEffect(() => {
        console.log(formData)
    },[formData])

    useEffect(() => {
        console.log(warrantySearchData)
    },[warrantySearchData])
    

    const handleChange = (e, index, key) => {
        const { value, type, checked, name } = e.target;
    
        if (name === 'for_inspection') {
            setFormData(prevFormData => ({
                ...prevFormData,
                for_inspection: checked ? 1 : 0
            }));
        } else {
            const newClaimedUnits = [...formData.claimed_units];
            if (key === 'for_claiming') {
                newClaimedUnits[index][key] = checked ? 1 : 0;
            } else {
                newClaimedUnits[index][key] = type === 'checkbox' ? (checked ? 1 : 0) : value;
                if (key === 'unit') {
                    newClaimedUnits[index].product_id = parseInt(value); // Assuming product_id is an integer
                }
            }
    
            setFormData(prevFormData => ({
                ...prevFormData,
                claimed_units: newClaimedUnits
            }));
        }
    };
    
    const handleChangeDate = (e, type) => {
        const { value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [type]: value
        }));
    };
    
    const handleChangeTime = (e, type) => {
        const { value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [type]: value
        }));
    };
    
    const handleChangeTechnician = (e, type) => {
        const { value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [type]: value
        }));
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
                navigate('/viewwarranties')
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
                                    <Form.Control type="date" name="inspection_dateonly" value={formData.inspection_dateonly} onChange={(e) => handleChangeDate(e, 'inspection_dateonly')} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide inspection date
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="3">
                                <Form.Group controlId="description">
                                    <Form.Label>Inspection Time</Form.Label>
                                    <Form.Control type="time"  name="inspection_time" value={formData.inspection_time} onChange={(e) => handleChangeTime(e, 'inspection_time')} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide inspection time
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="3">
                                <Form.Group controlId="type">
                                    <Form.Label>Assigned Technician</Form.Label>
                                    <Form.Control as="select" name="inspection_technician_id" value={formData.inspection_technician_id} onChange={(e) => handleChangeTechnician(e, 'inspection_technician_id')} required>
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
                                <Form.Control type="date" name="service_dateonly" value={formData.service_dateonly} onChange={(e) => handleChangeDate(e, 'service_dateonly')} required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide service date
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg="3">
                            <Form.Group controlId="description">
                                <Form.Label>Service Time</Form.Label>
                                <Form.Control type="time" name="service_time" value={formData.service_time} onChange={(e) => handleChangeTime(e, 'service_time')} required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide service time
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg="3">
                            <Form.Group controlId="type">
                                <Form.Label>Assigned Technician</Form.Label>
                                <Form.Control as="select" name="service_technician_id" value={formData.service_technician_id} onChange={(e) => handleChangeTechnician(e, 'service_technician_id')} required>
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
                                                <th style={{color: '#014c91', width: '5%'}}>Claim</th>
                                                <th style={{color: '#014c91'}}>Unit</th>
                                                <th style={{color: '#014c91', width: "40%"}}>Issue</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {formData.claimed_units.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                    <td style={{color: '#014c91'}}>
                                                        <Form.Check
                                                        type="checkbox"
                                                        checked={item.for_claiming === 1}
                                                        onChange={(e) => handleChange(e, index, 'for_claiming')}
                                                        required={formData.claimed_units.every(unit => unit.for_claiming === 0)}
                                                    />


                                                    </td>
                                                    <td style={{color: '#014c91'}}>
                                                        {item.description} ({item.unit_model})
                                                    </td>
                                                    <td style={{color: '#014c91'}}>
                                                        {item.for_claiming ? 
                                                        <Form.Group controlId="role">
                                                            <Form.Control as="select" name="issue" value={item.issue} onChange={(e) => handleChange(e, index, 'issue')} required>
                                                                <option value=""> Select </option>
                                                                <option value="Overheating Unit"> Overheating Unit</option>
                                                                <option value="Inadequate Cooling"> Inadequate Cooling </option>
                                                                <option value="Water Leaks"> Water Leaks</option>
                                                                <option value="Strange Noises"> Strange Noises </option>
                                                                <option value="Fan Malfunctions"> Fan Malfunctions </option>
                                                                <option value="Strange Noises"> Strange Noises </option>
                                                                <option value="Others"> Others </option>
                                                            </Form.Control>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please select an issue.
                                                            </Form.Control.Feedback>
                                                        </Form.Group> : null }
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
