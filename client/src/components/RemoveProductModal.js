import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form,  Dropdown } from 'react-bootstrap';
import { FaTrash, FaCheck} from 'react-icons/fa';
import axios from 'axios';

const RemoveProductModal = ({ id, type }) => {
    const [showModal, setShowModal] = useState(false);
    const [record, setRecord] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            if(type==='Window Type AC' || type==='Split Type AC'){
                try {
                    const response = await axios.get(`http://localhost:4000/api/getProduct/${id}`)
                    console.log(response.data)
                    setRecord(response.data[0])
                } catch (error) {
                    console.error('Error fetching data: ', error)
                }
            } else if(type==='Services'){
                try {
                    const response = await axios.get(`http://localhost:4000/api/getService/${id}`)
                    console.log(response.data)
                    setRecord(response.data[0])
                } catch (error) {
                    console.error('Error fetching data: ', error)
                }
            } else if(type==='AC Parts'){
                try {
                    const response = await axios.get(`http://localhost:4000/api/getPart/${id}`)
                    console.log(response.data)
                    setRecord(response.data[0])
                } catch (error) {
                    console.error('Error fetching data: ', error)
                }
            }
        
        }
        console.log('id', id)
        fetchData()
    }, [id])


    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
    };

    useEffect(() => {
        console.log(record)
    }, [record])


    const [validated, setValidated] = useState(false);

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
                window.location.reload();
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error);
            }
        }
         else if (form.checkValidity() && type === 'Services') {
            try {
                const postResponse = await axios.patch(`http://localhost:4000/api/changeServiceState/${id}/0`);
                console.log(postResponse);
                window.location.reload();
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error);
            }
        } else if (form.checkValidity() && type === 'AC Parts') {
            try {
                const postResponse = await axios.patch(`http://localhost:4000/api/changePartState/${id}/0`);
                console.log(postResponse);
                window.location.reload();
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error);
            }
        }
    };
      

    return (
        <div>
        
            <Dropdown.Item onClick={handleShowModal}>Remove Product/Service</Dropdown.Item>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#8c1919"}}>
                    <Modal.Title>Remove Product/Service</Modal.Title>
                </Modal.Header>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>
                                
                                <Row>
                                    <Col>
                                    Are you sure you want to <strong> remove </strong> the product/service with the following details?
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col lg="3">
                                        <strong> Description: </strong> 
                                    </Col>
                                    <Col>
                                        {record.description}
                                    </Col>
                                </Row>

                                
                                <Row>
                                    <Col lg="3">
                                        <strong> Unit Model </strong>
                                    </Col>
                                    <Col>
                                        {type === 'Window Type AC' || type === 'Split Type AC' ? record.unit_model :
                                        type === 'AC Parts' ? record.name :
                                        type === 'Services' ? "-" :
                                        null}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Type: </strong> 
                                    </Col>
                                    <Col>
                                        {type}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> SRP </strong>
                                    </Col>
                                    <Col>
                                        {type === 'Window Type AC' || type === 'Split Type AC' ? record.product_srp :
                                        type === 'AC Parts' ? record.parts_srp :
                                        type === 'Services' ? record.service_srp :
                                        null}
                                    </Col>
                                </Row>
                               
                               
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>
                            

                            <button className="btn" style={{color: "white", backgroundColor: "#8c1919" }} onClick={handleSubmit}>
                                {React.createElement(FaTrash, { size: 18, style: { marginRight: '5px' } })} Remove Product/Service
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

export default RemoveProductModal;
