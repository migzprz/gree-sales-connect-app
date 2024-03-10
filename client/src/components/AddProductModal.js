import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form,  InputGroup } from 'react-bootstrap';
import { FaSave, FaPlus} from 'react-icons/fa';
import axios from 'axios'

const AddProductModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
    };

    const [formData, setFormData] = useState({
        // new product/service data
        unit_model: '',
        srp: '',
        product_hp:'',
        is_inverter:'',
        description:'',
        is_active: 1,
        type:''
    })

    useEffect(() => {
        console.log(formData)
    },[formData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newData = { ...formData, [name]: value };
    
        // Reset form data based on type
        if (name === 'type') {
            switch (value) {
                case 'window':
                case 'split':
                    newData = {
                        unit_model: '',
                        srp: '',
                        product_hp: '',
                        is_inverter: '',
                        description: '',
                        is_active: 1,
                        type: value
                    };
                    break;
                case 'part':
                    newData = {
                        unit_model: '',
                        srp: '',
                        product_hp: '',
                        is_inverter: '',
                        description: '',
                        is_active: 1,
                        type: value
                    };
                    break;
                case 'service':
                    newData = {
                        unit_model: '',
                        srp: '',
                        product_hp: '',
                        is_inverter: '',
                        description: '',
                        is_active: 1,
                        type: value
                    };
                    break;
                default:
                    break;
            }
        }
    
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
        if (form.checkValidity() && (formData.type === 'window' || formData.type === 'split')) {
            try {
                const postReponse = await axios.post('http://localhost:4000/api/postProduct', formData);
                console.log(postReponse);
                window.location.reload();
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error);
            }
        } else if (form.checkValidity() && formData.type === 'service') {
            try {
                const postReponse = await axios.post('http://localhost:4000/api/postService', formData);
                console.log(postReponse);
                window.location.reload();
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error);
            }
        } else if (form.checkValidity() && formData.type === 'part') {
            try {
                const postReponse = await axios.post('http://localhost:4000/api/postPart', formData);
                console.log(postReponse);
                window.location.reload();
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error);
            }
        }
    };
    
      

    return (
        <div>

            <button className="btn w-40" onClick={handleShowModal} style={{color: "white", backgroundColor: "#014c91"}}>
                {React.createElement(FaPlus, { size: 18, style: { marginRight: '5px' } })}   Add Product/Service
            </button>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Add New Product/Service</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>

                        {/*Forms*/ }
        
                        <Row className="mt-1">
                            <Col lg="5">
                                <Form.Group controlId="type">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" name="type" value={formData.type} onChange={handleChange} required>
                                        <option value=""> Select </option>
                                        <option value="window"> Window Type </option>
                                        <option value="split"> Split Type </option>
                                        <option value="part"> AC Parts </option>
                                        <option value="service"> Service </option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please select type.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        {formData.type === "window" || formData.type === "split" ? (
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
                                               checked={formData.is_inverter === "1"}
                                               onChange={handleChange}
                                               required
                                           />
                                           <Form.Check
                                               type="radio"
                                               id="no"
                                               label="No"
                                               name="is_inverter"
                                               value="0"
                                               checked={formData.is_inverter === "0"}
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
                                           <Form.Control className="money" type="number" inputmode="numeric"  name="srp" min="0" value={formData.srp} onChange={handleChange} required onWheel={(e) => e.target.blur()}/>
                                       </InputGroup>
                                   </Form.Group>
                               </Col>
                           </Row>
                        ) : formData.type === "part" ? (
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
                                        <Form.Control type="text" name='unit_model' value={formData.unit_model} onChange={handleChange} required/>
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
                                            <Form.Control className="money" type="number" inputmode="numeric"  name="srp" min="0" value={formData.srp} onChange={handleChange} required onWheel={(e) => e.target.blur()}/>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                        ) : formData.type === "service" ? (
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
                                            <Form.Control className="money" type="number" inputmode="numeric"  name="srp" min="0" value={formData.srp} onChange={handleChange} required onWheel={(e) => e.target.blur()}/>
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

                            <button className="btn" onClick={handleCloseModal} style={{color: "white", backgroundColor: "#6c757d"}}>
                            Cancel
                            </button>

                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default AddProductModal;
