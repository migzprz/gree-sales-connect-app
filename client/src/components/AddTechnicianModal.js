import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form,  InputGroup } from 'react-bootstrap';
import { FaSave, FaPlus} from 'react-icons/fa';
import axios from 'axios'

const AddTechnicianModal = () => {
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
            email:'',
            contact_number:'',
            date_added: new Date().toISOString().slice(0, 19).replace('T', ' '),
            is_active: 1
        })
    };

    const [formData, setFormData] = useState({
        // new user data
        first_name: '',
        last_name: '',
        email:'',
        contact_number:'',
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
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
        if (form.checkValidity()) {
            try {
                const postReponse = await axios.post('http://localhost:4000/api/postTechnician', formData)
                console.log(postReponse)
                window.location.reload()
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error)
            }
        }
      };
      

    return (
        <div>

            <button className="btn w-40" onClick={handleShowModal} style={{color: "white", backgroundColor: "#014c91"}}>
                {React.createElement(FaPlus, { size: 18, style: { marginRight: '5px' } })}   Add Technician
            </button>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Add New Technician</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>

                        {/*Forms*/ }
        
                        <Row className="mt-1">
                            <Col lg="6">
                                <Form.Group controlId="first_name">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide first name
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="6">
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
                            <Col lg="6">
                                <Form.Group controlId="description">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide email
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="6">
                                <Form.Group controlId="description">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control type="text" pattern="[0-9]{11}" name="contact_number" value={formData.contact_number} onChange={handleChange} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide valid contact number
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

export default AddTechnicianModal;
