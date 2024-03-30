import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form,  InputGroup, Dropdown, NavItem } from 'react-bootstrap';
import { FaEdit, FaSave}  from 'react-icons/fa';
import axios from 'axios'

const EditClientDetailsModal = ({id}) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
        setEditData({
            firstName: '',
            lastName: '',
            contactNumber: '',
            email: '',
            companyName: '',
            tin: ''
        });
    };

    const [record, setRecord] = useState({})


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getClient/${id}`)
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

    const [editCompanyData, setEditCompanyData] = useState({
        company_name: '',
        tin: ''
    })

    useEffect(() => {
        console.log(editData)
    }, [editData])

    useEffect(() => {
        console.log(editData)
    }, [editData])

    const handleChange = (e) => {
        const { name, value} = e.target;
        setEditData(prevEditData => ({
            ...prevEditData,
            [name]: value
        }));
    };

    const handleCompanyChange = (e) => {
        const { name, value} = e.target;
        setEditCompanyData(prevEditCompanyData => ({
            ...prevEditCompanyData,
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
            if(editCompanyData.company_name !== '' || editCompanyData.tin !== ''){
                try {
                    const postReponse2 = await axios.patch(`http://localhost:4000/api/updateCompany/${record.company_id}`, editCompanyData)
                    console.log(postReponse2)
                    window.location.reload()
                } catch (error) {
                    console.error('Error: Problem encountered when posting data', error)
                }
            }
            if(editData.first_name !== '' || editData.last_name !== '' || editData.contact_number !== '' || editData.email !== ''){
                try {
                    const postReponse = await axios.patch(`http://localhost:4000/api/updateContactPerson/${record.contact_person_id}`, editData)
                    console.log(postReponse)
                    window.location.reload()
                } catch (error) {
                    console.error('Error: Problem encountered when posting data', error)
                }
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
            <div onClick={handleShowModal} style={{color: "white", color: '#014c91', cursor: 'pointer'}}>
                {React.createElement(FaEdit, {size: 18})} 
            </div>
            

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Update Client Details</Modal.Title>
                </Modal.Header>
                
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>
                        <Row className="mt-3">
                            <Col lg={record.company_name ? "4" : "6"}>
                                <Form.Group controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" value={editData.first_name} placeholder={record.first_name} onChange={handleChange} name='first_name' />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide first name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg={record.company_name ? "4" : "6"}>
                                <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" value={editData.last_name  } placeholder={record.last_name}  onChange={handleChange} name='last_name' />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide last name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            {record.company_name &&
                            <Col lg="4">
                                <Form.Group controlId="companyName">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control type="text" value={editCompanyData.company_name} placeholder={record.company_name} onChange={handleCompanyChange} name='company_name'  />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid company.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col> }
                        </Row>

                        <Row className="mt-2">
                            <Col lg={record.tin ? "4" : "6"}>
                                <Form.Group controlId="contactNumber">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control type="text" pattern="[0-9]{11}" placeholder={record.contact_number}  value={editData.contact_number } onChange={handleChange} name='contact_number'  />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Contact No.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg={record.tin ? "4" : "6"}>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={editData.email } onChange={handleChange} placeholder={record.email} name='email' />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Email
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            {record.tin &&
                            <Col lg="4">
                                <Form.Group controlId="tin">
                                    <Form.Label>Company TIN ID</Form.Label>
                                    <Form.Control type="text" pattern="[0-9]{9,12}" value={editCompanyData.tin } placeholder={record.tin} name='tin' onChange={handleCompanyChange} />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid TIN
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            }
                        </Row>
                        </Modal.Body>

                        <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                            <button className="btn" style={{color: "white", backgroundColor: "#014c91"}}>
                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Save Client Details
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

export default EditClientDetailsModal;
