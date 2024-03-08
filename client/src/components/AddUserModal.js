import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form,  InputGroup } from 'react-bootstrap';
import { FaSave, FaPlus} from 'react-icons/fa';
import axios from 'axios'

const AddUserModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
        setFormData({
            // new user data
            first_name: '',
            last_name: '',
            password: '',
            role: '',
            username: '',
            aftersales_access: 0,
            sales_access: 0,
            exec_access: 0,
            sysad_access: 0,
            date_added: new Date().toISOString().slice(0, 19).replace('T', ' '),
            is_active: 1
        })
    };

    const [formData, setFormData] = useState({
        // new user data
        first_name: '',
        last_name: '',
        password: '',
        role: '',
        username: '',
        aftersales_access: 0,
        sales_access: 0,
        exec_access: 0,
        sysad_access: 0,
        date_added: new Date().toISOString().slice(0, 19).replace('T', ' '),
        is_active: 1
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        }));
    };

    useEffect(() => {
        console.log(formData)
    },[formData])

    const [validated, setValidated] = useState(false);


    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
        if (form.checkValidity()) {
            try {
                const postReponse = await axios.post('http://localhost:4000/api/postSystemUser', formData)
                console.log(postReponse)
                window.location.reload()
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error)
            }
        }
      };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: checked ? 1 : 0,
        }));
    };
      

    return (
        <div>

            <button className="btn w-40" onClick={handleShowModal} style={{color: "white", backgroundColor: "#014c91"}}>
                {React.createElement(FaPlus, { size: 18, style: { marginRight: '5px' } })}   Add Employee
            </button>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Add New Employee</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>

                        {/*Forms*/ }
        
                        <Row className="mt-1">
                            <Col lg="4">
                                <Form.Group controlId="role">
                                    <Form.Label>Employee Role</Form.Label>
                                    <Form.Control as="select" name="role" value={formData.role} onChange={handleChange} required>
                                        <option value=""> Select </option>
                                        <option value="Salesperson"> Salesperson</option>
                                        <option value="Aftersales Staff"> Aftersales Staff </option>
                                        <option value="Executive"> Executive</option>
                                        <option value="System Administrator"> System Administrator </option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please select role.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="4">
                                <Form.Group controlId="first_name">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide first name
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="4">
                                <Form.Group controlId="description">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide last name
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                           
                        </Row>

                        <Row className="mt-1">
                            <Col lg="4">
                                <Form.Group controlId="description">
                                    <Form.Label>User ID</Form.Label>
                                    <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide user ID
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="4">
                                <Form.Group controlId="description">
                                    <Form.Label>Default Password</Form.Label>
                                    <Form.Control type="text" name="password" value={formData.password} onChange={handleChange} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide default password
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                           
                        </Row>



                        <Row className="mt-5">
                            <Col >
                                <Form.Group controlId="modules">
                                    <Form.Label>System Access Level</Form.Label>
                                    <div>
                                        <Form.Check
                                            type="checkbox"
                                            id="sales"
                                            label="Sales Module"
                                            name="sales_access"
                                            onChange={handleCheckboxChange}
                                            required={formData.aftersales_access === 0 && formData.exec_access === 0 && formData.sysad_access === 0 }
                                            isInvalid={validated && !formData.sales_access}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            id="aftersales"
                                            label="Aftersales Module"
                                            name="aftersales_access"
                                            onChange={handleCheckboxChange}
                                            required={formData.sales_access === 0 && formData.exec_access === 0 && formData.sysad_access === 0 }
                                            isInvalid={validated && !formData.aftersales_access}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            id="executive"
                                            label="Executive Module"
                                            name="exec_access"
                                            onChange={handleCheckboxChange}
                                            required={formData.sales_access === 0 && formData.aftersales_access === 0 && formData.sysad_access === 0 }
                                            isInvalid={validated && !formData.exec_access}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            id="admin"
                                            label="System Administrator Module"
                                            name="sysad_access"
                                            onChange={handleCheckboxChange}
                                            required={formData.sales_access === 0 && formData.exec_access === 0 && formData.aftersales_access === 0 }
                                            isInvalid={validated && !formData.sysad_access}
                                        />
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        Please select at least one module.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>


       
                               
                    
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                            <button className="btn" style={{color: "white", backgroundColor: "#014c91"}}>
                                {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Save Employee
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

export default AddUserModal;
