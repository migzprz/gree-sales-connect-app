import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form,  InputGroup, Dropdown } from 'react-bootstrap';
import { FaSave, FaPlus} from 'react-icons/fa';
import axios from 'axios'

const EditProductModal = ({type, id}) => {
    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({})

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            if(type==='Window Type AC' || type==='Split Type AC'){
                try {
                    const response = await axios.get(`http://localhost:4000/api/getProduct/${id}`)
                    console.log(response.data)
                    setFormData(response.data[0])
                } catch (error) {
                    console.error('Error fetching data: ', error)
                }
            } else if(type==='Services'){
                try {
                    const response = await axios.get(`http://localhost:4000/api/getService/${id}`)
                    console.log(response.data)
                    setFormData(response.data[0])
                } catch (error) {
                    console.error('Error fetching data: ', error)
                }
            } else if(type==='AC Parts'){
                try {
                    const response = await axios.get(`http://localhost:4000/api/getPart/${id}`)
                    console.log(response.data)
                    setFormData(response.data[0])
                } catch (error) {
                    console.error('Error fetching data: ', error)
                }
            }
        
        }
        console.log('id', id)
        fetchData()
    }, [id])

    useEffect(() => {
        console.log(type)
    },[type])

    useEffect(() => {
        console.log(formData)
    },[formData])


    const handleChange = (e) => {
        const { name, value } = e.target;
        let newData = { ...formData, [name]: value };
        setFormData(newData);
    };


  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

    
        setValidated(true);
        if (form.checkValidity() && (type === 'Window Type AC' || type === 'Split Type AC')) {
            try {
                const postResponse = await axios.patch(`http://localhost:4000/api/changeProductState/${id}/0`);
                console.log(postResponse);
                const postResponse2 = await axios.post('http://localhost:4000/api/postProduct', formData);
                console.log(postResponse2);
                window.location.reload();
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error);
            }
        }
         else if (form.checkValidity() && type === 'Services') {
            try {
                const postResponse = await axios.patch(`http://localhost:4000/api/changeServiceState/${id}/0`);
                console.log(postResponse);
                const postResponse2 = await axios.post('http://localhost:4000/api/postService', formData);
                console.log(postResponse2);
                window.location.reload();
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error);
            }
        } else if (form.checkValidity() && type === 'Parts') {
            try {
                const postResponse = await axios.patch(`http://localhost:4000/api/changePartState/${id}/0`);
                console.log(postResponse);
                const postResponse2 = await axios.post('http://localhost:4000/api/postPart', formData);
                console.log(postResponse2);
                window.location.reload();
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error);
            }
        }
    };
    
      

    return (
        <div>

            <>
                <Dropdown.Item onClick={handleShowModal}>Edit Details</Dropdown.Item>
            </>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Edit Product/Service Details</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>

                        {/*Forms*/ }

                    {type === "Window Type AC" || type === "Split Type AC" ? (
                        <Row className="mt-2">
                        <Col lg="2">
                            <Form.Group controlId="inverter">
                                <Form.Label>Inverter Type</Form.Label>
                                <div>
                                    <Form.Check
                                        type="radio"
                                        id="yes"
                                        label="Yes"
                                        name="is_inverter"
                                        value="1"
                                        checked={formData.is_inverter === 1}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="no"
                                        label="No"
                                        name="is_inverter"
                                        value="0"
                                        checked={formData.is_inverter === 0}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Form.Control.Feedback type="invalid">
                                    Please select a transportation mode.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg="3">
                            <Form.Group controlId="unit_model">
                                <Form.Label>Unit Model</Form.Label>
                                <Form.Control type="text" name="unit_model" value={formData.unit_model} onChange={handleChange} required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide unit model.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg="3">
                            <Form.Group controlId="hp">
                                <Form.Label>Horse Power</Form.Label>
                                <Form.Control type="number" name="product_hp" inputmode="numeric" value={formData.product_hp} onChange={handleChange} required onWheel={(e) => e.target.blur()}/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide horse power.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg="4">
                            <Form.Group controlId="srp">
                                <Form.Label>SRP</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text> ₱ </InputGroup.Text>
                                    <Form.Control className="money" type="number" inputmode="numeric"  name="product_srp" min="0" value={formData.product_srp} onChange={handleChange} required onWheel={(e) => e.target.blur()}/>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        </Row>
                    ) : type === "AC Parts" ? (
                        <Row className="mt-2">
                                <Col lg="5">
                                    <Form.Group controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name='description' value={formData.description} onChange={handleChange} required/>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide description
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg="3">
                                    <Form.Group controlId="description">
                                        <Form.Label>Unit Model</Form.Label>
                                        <Form.Control type="text" name='name' value={formData.name} onChange={handleChange} required/>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide description
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg="4">
                                    <Form.Group controlId="srp">
                                        <Form.Label>SRP</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text> ₱ </InputGroup.Text>
                                            <Form.Control className="money" type="number" inputmode="numeric"  name="parts_srp" min="0" value={formData.parts_srp} onChange={handleChange} required onWheel={(e) => e.target.blur()}/>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                        </Row>
                    ) : type === "Services" ? (
                        <Row className="mt-2">
                                <Col lg="8">
                                    <Form.Group controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name='description' value={formData.description} onChange={handleChange} required/>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide description
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg="4">
                                    <Form.Group controlId="srp">
                                        <Form.Label>SRP</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text> ₱ </InputGroup.Text>
                                            <Form.Control className="money" type="number" inputmode="numeric"  name="service_srp" min="0" value={formData.service_srp} onChange={handleChange} required onWheel={(e) => e.target.blur()}/>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                        </Row>
                    ) : null}
                        

                        
       
                               
                    
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                            <button className="btn" style={{color: "white", backgroundColor: "#014c91"}}>
                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Save Product/Service
                            </button>

                            <button className="btn" onClick={(e) => { e.preventDefault(); handleCloseModal(); }} style={{color: "white", backgroundColor: "#6c757d"}}>
                            Cancel
                            </button>

                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default EditProductModal;
