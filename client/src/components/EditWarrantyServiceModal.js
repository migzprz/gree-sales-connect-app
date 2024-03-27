import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form,  Dropdown } from 'react-bootstrap';
import { FaEdit, FaCheck, FaSave} from 'react-icons/fa';
import axios from 'axios';
import useAvailableTechnicians from '../hooks/useAvailableTechnicians';

const EditWarrantyServiceModal = ({ service_id, id, type, is_completed, date }) => {
    const [showModal, setShowModal] = useState(false);
    const [record, setRecord] = useState({})

    
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

   

    const [formData, setFormData] = useState({
        time: null,
        dateonly: null,
        technician_id: ''
    })

    useEffect(() => {
        console.log(formData)
    },[formData])

    const [inputDateTime, setInputDateTime] = useState(null)
    const { technicians, mod } = useAvailableTechnicians(inputDateTime, date)

    useEffect(() => {
        console.log(formData.dateonly, formData.time)
        if (formData.dateonly && formData.time) {
            // Both date and time are present, update inputDateTime
            const newInputDateTime = formData.dateonly + "T" + formData.time;
            setInputDateTime(newInputDateTime);
        }
    }, [formData.dateonly, formData.time])


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (name === 'technician_id') {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: type === 'checkbox' ? (checked ? 1 : 0) : parseInt(value, 10)
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
            }));
        }
    };

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        const data = {
            ...formData,
            date: formData.dateonly + "T" + formData.time,
            service_id: service_id
        };
        console.log(data)
        setValidated(true);
        if (form.checkValidity()){
            if (type === "inspection") {
                try {
                    const patchResponse = await axios.patch(`http://localhost:4000/api/updateInspection`, data)
                    console.log(patchResponse)
                    
                    window.location.reload()
                } catch (error) {
                    console.error('Error: Problem encountered when posting data', error)
                }
            } else  if (type === "service") {
                try {
                    const patchResponse = await axios.patch(`http://localhost:4000/api/updateService`, data)
                    console.log(patchResponse)
                    
                    window.location.reload()
                } catch (error) {
                    console.error('Error: Problem encountered when posting data', error)
                }
            } 
        }

       
    };
    
      

    return (
        <div>

            {is_completed?(
                <div style={{color: '#008000'}}>
                    {React.createElement(FaCheck, {size: 18})} 
                </div>
            ): (
                <div onClick={handleShowModal} style={{color: '#014c91', cursor: 'pointer'}}>
                    {React.createElement(FaEdit, {size: 18})} 
                </div>
            )}

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: record.is_active ? "#8c1919" : "#014c91"}}>
                    <Modal.Title>{type==="inspection" ? "Edit Inspection Details" : "Edit Service Details"}</Modal.Title>
                </Modal.Header>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>
                              

                            <Row className="mt-1">
                                <Col lg="4">
                                    <Form.Group controlId="description">
                                        {type === "inspection" ? (
                                            <Form.Label>Inspection Date</Form.Label>
                                        ) : (
                                            <Form.Label>Service Date</Form.Label>
                                        )}
                                        <Form.Control type="date" name="dateonly" value={formData.dateonly} onChange={handleChange} required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide date
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg="4">
                                    <Form.Group controlId="description">
                                        {type === "inspection" ? (
                                            <Form.Label>Inspection Time</Form.Label>
                                        ) : (
                                            <Form.Label>Service Time</Form.Label>
                                        )}
                                        <Form.Control type="time"  name="time" value={formData.time} onChange={handleChange} required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide time
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg="4">
                                    <Form.Group controlId="type">
                                        <Form.Label>Assigned Technician</Form.Label>
                                        <Form.Control as="select" name="technician_id" value={formData.technician_id} onChange={handleChange} required>
                                            <option value=""> Select </option>
                                            {technicians.map((tech) => (
                                                <option key={tech.technician_id} value={tech.technician_id}>{tech.complete_name}</option>
                                            ))}
                                        </Form.Control>
                                        {mod ? (<p>Some technicians are unavailable</p>) : null}
                                        <Form.Control.Feedback type="invalid">
                                            Please select technician.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                               
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>
                            

                            <button className="btn" style={{color: "white", backgroundColor: record.is_active ? "#8c1919" : "#014c91"}}>
                                {type === "inspection" ? (
                                    <>
                                        {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Edit Inspection
                                    </>
                                ): (
                                    <>
                                        {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Edit Service
                                    </>
                                )}
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

export default EditWarrantyServiceModal;
