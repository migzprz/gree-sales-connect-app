import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form,  InputGroup, Dropdown } from 'react-bootstrap';
import { FaSave, FaPlus} from 'react-icons/fa';
import axios from 'axios'

const EditTechnicianModal = ({id}) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
        setEditData({
            first_name: '',
            last_name: '',
            contact_number: '',
            email: ''
        });
    };

    const [record, setRecord] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getTechnician/${id}`)
                console.log(response.data)
                setRecord(response.data[0])
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        console.log('id', id)
        fetchData()
    }, [id])
    

    const [editData, setEditData] = useState({
        first_name: '',
        last_name: '',
        contact_number: '',
        email: ''
    })

    useEffect(() => {
        console.log(editData)
    }, [])

    const handleChange = (e) => {
        const { name, value} = e.target;
        setEditData(prevEditData => ({
            ...prevEditData,
            [name]: value
        }));
    };



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
                const postReponse = await axios.patch(`http://localhost:4000/api/updateTechnicianDetails/${record.technician_id}`, editData)
                console.log(postReponse)
                window.location.reload()
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error)
            }
        }
    };

    function isEmpty(obj) {
        for (let key in obj) {
            if (obj[key] !== "") {
                return false;
            }
        }
        return true;
    }
    


    return (
        <div>
            <>
                <Dropdown.Item onClick={handleShowModal}>Edit Technician Details</Dropdown.Item>
            </>
            

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Update Technician Details</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>

                        {/*Forms*/ }


                        <Row className="mt-1">
                            <Col lg="6">
                                <Form.Group controlId="first_name">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="first_name"
                                        placeholder={record.first_name}
                                        onChange={handleChange}
                                        required={isEmpty(editData)}
                                    />
                                    <Form.Control.Feedback type="invalid">No edited fields detected.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="6">
                                <Form.Group controlId="last_name">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="last_name"
                                        placeholder={record.last_name}
                                        onChange={handleChange}
                                        required={isEmpty(editData)}
                                    />
                                    <Form.Control.Feedback type="invalid">No edited fields detected.</Form.Control.Feedback>
                                </Form.Group>
                                
                            </Col>
                        </Row>

                        <Row className="mt-1">
                            <Col lg="6">
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder={record.email}
                                        onChange={handleChange}
                                        required={isEmpty(editData)}
                                    />
                                    <Form.Control.Feedback type="invalid">No edited fields detected.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="6">
                                <Form.Group controlId="contact_number">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="contact_number"
                                        placeholder={record.contact_number}
                                        onChange={handleChange}
                                        required={isEmpty(editData)}
                                    />
                                    <Form.Control.Feedback type="invalid">No edited fields detected.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>


                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                            <button className="btn" style={{color: "white", backgroundColor: "#014c91"}}>
                                {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Update Technician
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

export default EditTechnicianModal;
