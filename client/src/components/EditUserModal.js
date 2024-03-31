import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form,  InputGroup, Dropdown } from 'react-bootstrap';
import { FaSave, FaPlus} from 'react-icons/fa';
import axios from 'axios'

const EditUserModal = ({id}) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
        setEditData({
            // new user data
            first_name: '',
            last_name: '',
            role: '',
            username: '',
            aftersales_access: record.aftersales_access,
            sales_access: record.sales_access,
            exec_access: record.exec_access,
            sysad_access: record.sysad_access,
        });
    };

    const [record, setRecord] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getSystemUser/${id}`)
                console.log(response.data)
                setRecord(response.data[0])
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        console.log('id', id)
        fetchData()
    }, [id])

    useEffect(() => {
        setEditData(prevState => ({
            ...prevState,
            aftersales_access: record.aftersales_access,
            sales_access: record.sales_access,
            exec_access: record.exec_access,
            sysad_access: record.sysad_access,
        }));
    }, [record]);
    
    

    const [editData, setEditData] = useState({
        // new user data
        first_name: '',
        last_name: '',
        role: '',
        username: '',
        aftersales_access: record.aftersales_access,
        sales_access: record.sales_access,
        exec_access: record.exec_access,
        sysad_access: record.sysad_access,
    })

    useEffect(() => {
        console.log(editData)
    }, [])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditData(prevEditData => ({
            ...prevEditData,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
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
                const postReponse = await axios.patch(`http://localhost:4000/api/updateUserDetails/${record.login_id}`, editData)
                console.log(postReponse)
                window.location.reload()
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error)
            }
        }

        
      };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setEditData((prevEditData) => ({
            ...prevEditData,
            [name]: checked ? 1 : 0,
        }));
    };
      

    return (
        <div>
            <>
                <Dropdown.Item onClick={handleShowModal}>Edit User Details</Dropdown.Item>
            </>
            

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Update Employee Details</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>

                        {/*Forms*/ }
        
                        <Row className="mt-1">
                            <Col lg="4">
                                <Form.Group controlId="role">
                                    <Form.Label>Employee Role</Form.Label>
                                    <Form.Control as="select" name="role" defaultValue={record.role} onChange={handleChange}>
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
                                    <Form.Control type="text" name="first_name" placeholder={record.first_name} onChange={handleChange}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide first name
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="4">
                                <Form.Group controlId="description">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="last_name" placeholder={record.last_name} onChange={handleChange}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide last name
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
                                            checked={editData.sales_access}
                                            required={record.aftersales_access === 0 && record.exec_access === 0 && record.sysad_access === 0 }
                                            isInvalid={validated && !record.sales_access}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            id="aftersales"
                                            label="Aftersales Module"
                                            name="aftersales_access"
                                            onChange={handleCheckboxChange}
                                            checked={editData.aftersales_access}
                                            required={record.sales_access === 0 && record.exec_access === 0 && record.sysad_access === 0 }
                                            isInvalid={validated && !record.aftersales_access}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            id="executive"
                                            label="Executive Module"
                                            name="exec_access"
                                            onChange={handleCheckboxChange}
                                            checked={editData.exec_access}
                                            required={record.sales_access === 0 && record.aftersales_access === 0 && record.sysad_access === 0 }
                                            isInvalid={validated && !record.exec_access}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            id="admin"
                                            label="System Administrator Module"
                                            name="sysad_access"
                                            onChange={handleCheckboxChange}
                                            checked={editData.sysad_access}
                                            required={record.sales_access === 0 && record.exec_access === 0 && record.aftersales_access === 0 }
                                            isInvalid={validated && !record.sysad_access}
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

export default EditUserModal;
