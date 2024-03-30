import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form,  InputGroup, Dropdown } from 'react-bootstrap';
import { FaHouseUser, FaSave}  from 'react-icons/fa';
import axios from 'axios'

const TransferCompanyModal = ({contact_person_id}) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
        setEditData({
            company_name: '',
            tin: ''
        });
    };

    const [record, setRecord] = useState({})
    

    const [editData, setEditData] = useState({
        companyName: '',
        tin: ''
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
                const postReponse = await axios.post(`http://localhost:4000/api/transferClientCompany/${contact_person_id}`, editData)
                console.log(postReponse)
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
            <div onClick={handleShowModal} style={{color: "white", color: '#014c91', cursor: 'pointer'}}>
                {React.createElement(FaHouseUser, {size: 18})} 
            </div>
            

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Change Client's Company</Modal.Title>
                </Modal.Header>
                
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>
                            <Row className="mt-3">
                                <Col lg="6">
                                    <Form.Group controlId="companyName">
                                        <Form.Label>New Company Name</Form.Label>
                                        <Form.Control type="text" value={editData.company_name} onChange={handleChange} name='company_name' required/>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid company.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg="6">
                                    <Form.Group controlId="tin">
                                        <Form.Label>New Company TIN ID</Form.Label>
                                        <Form.Control type="text" pattern="[0-9]{9,12}" value={editData.tin } name='tin' onChange={handleChange} required/>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid TIN
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                        </Modal.Body>

                        <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                            <button className="btn" style={{color: "white", backgroundColor: "#014c91"}}>
                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Change Client Company
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

export default TransferCompanyModal;
