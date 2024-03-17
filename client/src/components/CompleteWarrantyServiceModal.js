import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form,  Dropdown } from 'react-bootstrap';
import { FaTrash, FaCheck} from 'react-icons/fa';
import axios from 'axios';

const CompleteWarrantyServiceModal = ({ service_id, id, type }) => {
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
        for_service: 0,
        is_completed: 0,
        warranty_id: parseInt(id, 10),
        time: null,
        dateonly: null,
        technician_id: '',
        service_id: service_id
    })

    useEffect(() => {
        console.log(formData)
    },[formData])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (name === 'for_service') {
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
            date: formData.dateonly + "T" + formData.time 
        };

        setValidated(true);
        if (form.checkValidity()){
            if (data.for_service && type === "inspection") {
                try {
                    const patchResponse = await axios.patch(`http://localhost:4000/api/changeWarrantyInspectionState/${service_id}/1`)
                    console.log(patchResponse)
                    const postReponse = await axios.post(`http://localhost:4000/api/postWarrantyInspection`, {data})
                    console.log(postReponse)
                    
                    window.location.reload()
                } catch (error) {
                    console.error('Error: Problem encountered when posting data', error)
                }
            } else if (!data.for_service && type === "inspection") {
                try {
                    const patchResponse = await axios.patch(`http://localhost:4000/api/changeWarrantyInspectionState/${service_id}/1`)
                    console.log(patchResponse)
                    
                    window.location.reload()
                } catch (error) {
                    console.error('Error: Problem encountered when posting data', error)
                }
            } else  if (data.for_service && type === "service") {
                try {
                    const patchResponse = await axios.patch(`http://localhost:4000/api/changeWarrantyServiceState/${service_id}/1`)
                    console.log(patchResponse)
                    const postReponse = await axios.post(`http://localhost:4000/api/postWarrantyService`, {data})
                    console.log(postReponse)
                    
                    window.location.reload()
                } catch (error) {
                    console.error('Error: Problem encountered when posting data', error)
                }
            } else if (!data.for_service && type === "service") {
                try {
                    const patchResponse = await axios.patch(`http://localhost:4000/api/changeWarrantyServiceState/${service_id}/1`)
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
            <button className="btn w-40" onClick={handleShowModal} style={{color: "white", backgroundColor: "#014c91"}}>
                {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })} 
                {type === "inspection" ? (
                    "Complete Inspection"
                ) : (
                    "Complete Service"
                )}
            </button>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: record.is_active ? "#8c1919" : "#014c91"}}>
                    <Modal.Title>{type==="inspection" ? "Complete Inspection" : "Complete Service"}</Modal.Title>
                </Modal.Header>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>
                              

                                    <Row className="mt-3">
                                        <Col lg="12">
                                            <Form.Group controlId="paymentOption">
                                            {type === "inspection" ? (
                                                <Form.Label>Will there be a follow-up inspection?</Form.Label>
                                            ) : (
                                                <Form.Label>Will there be a follow-up service?</Form.Label>
                                            )}
                                                
                                                <div>
                                                    <Form.Check
                                                        type="radio"
                                                        id="downPayment"
                                                        label="Yes"
                                                        name="for_service"
                                                        value={1}
                                                        onChange={handleChange}
                                                        checked={formData.for_service === 1}
                                                        required
                                                    />
                                                    <Form.Check
                                                        type="radio"
                                                        id="fullPayment"
                                                        label="No"
                                                        name="for_service"
                                                        value={0}
                                                        onChange={handleChange}
                                                        checked={formData.for_service === 0}
                                                        required
                                                    />
                                                </div>
                                                <Form.Control.Feedback type="invalid">
                                                    Please select an option.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col> 
                                    </Row>
                                    {formData.for_service ? (
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
                                                    <option value="1"> Zara </option>
                                                    <option value="2"> Split Type </option>
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please select technician.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    ):null}
                               
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>
                            

                            <button className="btn" style={{color: "white", backgroundColor: record.is_active ? "#8c1919" : "#014c91"}}>
                                {type === "inspection" ? (
                                    <>
                                        {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })} Complete Inspection
                                    </>
                                ): (
                                    <>
                                        {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })} Complete Service
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

export default CompleteWarrantyServiceModal;
