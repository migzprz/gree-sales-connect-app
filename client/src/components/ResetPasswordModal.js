import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form,  InputGroup, Dropdown } from 'react-bootstrap';
import { FaSave, FaPlus} from 'react-icons/fa';
import axios from 'axios'

const ResetPasswordModal = ({id}) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
        setEditData({
        password: '',
        confirm: ''});
    };

    const [record, setRecord] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getUser/${id}`)
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
        // new user data
        password: '',
        confirm: ''
    })

    useEffect(() => {
        console.log(editData)
    }, [])

    const handleChange = (e) => {
        const { name, value} = e.target;
        setEditData(prevEditData => ({
            ...prevEditData,
            [name] : value
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
                const postReponse = await axios.patch(`http://localhost:4000/api/changePassword/${record.login_id}`, editData)
                console.log(postReponse)
                window.location.reload()
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error)
            }
        }
    }
    

    return (
        <div>
            <>
                <Dropdown.Item onClick={handleShowModal}>Reset Password</Dropdown.Item>
            </>
            

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>
        
                        <Row className="mt-1">
                            <Col lg="6">
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={editData.password} onChange={handleChange} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please input password
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg="6">
                                <Form.Group controlId="description">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="text" name="confirm" value={editData.confirm} pattern={editData.password} onChange={handleChange} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Password does not match
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                            <button className="btn" style={{color: "white", backgroundColor: "#014c91"}}>
                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Reset Password
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

export default ResetPasswordModal;
