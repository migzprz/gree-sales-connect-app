import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form} from 'react-bootstrap';
import { FaSave, FaPlus, FaTrash} from 'react-icons/fa';
import axios from 'axios'

const AddWarrantyPartModal = ({id}) => {
    const [showModal, setShowModal] = useState(false);
    const [partsData, setPartsData] = useState([]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
        setFormData([ { part: null, quantity: '' } ]);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getParts/')
                setPartsData(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    },[])

    useEffect(() => {
        console.log(partsData)
    },[partsData])


    const [formData, setFormData] = useState([{ part: null, quantity: '' }])

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedFormData = [...formData];
        updatedFormData[index] = { ...updatedFormData[index], [name]: parseInt(value) || '' };
        setFormData(updatedFormData);
    };
    

    const handleAddRow = () => {
        setFormData([...formData, { part: '', quantity: '' }]);
    };

    const handleRemoveRow = (index) => {
        const updatedFormData = [...formData];
        updatedFormData.splice(index, 1);
    
        // Check if there are any rows left, if not, set formData to an array with one empty object
        if (updatedFormData.length === 0) {
            handleCloseModal()
            setFormData([ { part: '', quantity: '' } ]);
        } else {
            setFormData(updatedFormData);
        }
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
                const postData = formData.map(({ part, quantity }) => ({ part, quantity }));
                const postResponse = await axios.post(`http://localhost:4000/api/postWarrantyParts/${id}`, { data: postData });
                console.log(postResponse);
                window.location.reload()
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error);
            }
        }
    };
    

    return (
        <div>

            <button className="btn w-40" onClick={handleShowModal} style={{color: "white", backgroundColor: "#014c91"}}>
                {React.createElement(FaPlus, { size: 18, style: { marginRight: '5px' } })}   Record a Requested Part
            </button>

            <Modal show={showModal} onHide={handleCloseModal} >
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Record Requested Part</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>

                        <Row className="mt-1">
                            <Col lg="7">
                                Requested Part
                            </Col>
                            <Col lg="4">
                                Quantity
                            </Col>
                        </Row>
                        {formData && formData.map((data, index) => (
                            <Row key={index} className="mt-1">
                                <Col lg="7">
                                    <Form.Group controlId="part">
                                        <Form.Control as="select" name="part" value={data.part} onChange={(e) => handleChange(index, e)} required>
                                            <option value=""> Select </option>
                                            {partsData.map((part) => (
                                                <option key={part.parts_id} value={part.parts_id}>{part.description} ({part.name})</option> 
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Please choose a part.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg="4">
                                    <Form.Group controlId="quantity">
                                        <Form.Control type="number" name="quantity" value={data.quantity} onChange={(e) => handleChange(index, e)} required/>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide quantity.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg="1">
                                    {React.createElement(FaTrash, { size: 18, onClick: () => handleRemoveRow(index), style: { cursor: 'pointer', marginRight: '5px', marginTop: '10px' } })}  
                                </Col>
                            </Row>
                        ))}


                        <Row className="mt-3">
                            <Col lg="7">
                                <button className="btn w-100" onClick={(e) => { e.preventDefault(); handleAddRow(); }}  style={{color: "white", backgroundColor: "#014c91"}}>
                                    {React.createElement(FaPlus, { size: 18, style: { marginRight: '5px' } })} Add a Part
                                </button>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                            <button className="btn" style={{color: "white", backgroundColor: "#014c91"}}>
                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Record Requested Part
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

export default AddWarrantyPartModal;
