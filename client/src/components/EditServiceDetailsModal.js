import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form,  Dropdown } from 'react-bootstrap';
import { FaEdit, FaCheck, FaSave} from 'react-icons/fa';
import axios from 'axios';
import useAvailableTechnicians from '../hooks/useAvailableTechnicians';

/**
 * 
 * @param {String} type -> what type of sales detail is being edited (delivery/pickup, installation, service)
 * @param {Boolean} is_completed -> if all associated records of a sales detail type are completed, renders checkmark otherwise the edit button
 * @param {*} data -> for installation, the end date
 * @param {Integer} id -> the quotation id of the associated record
 * @param {*} date -> the original date/ start date of the record. For parameter input in technician availability to exclude that specific date from the logic
 * @returns 
 */
const EditServiceDetailsModal = ({ type, is_completed, data, id, date }) => {
    // const [errorMessage, setErrorMessage] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [record, setRecord] = useState({})

    const [inputDateTime, setInputDateTime] = useState(null)
    const { technicians, mod } = useAvailableTechnicians(inputDateTime, date)

    useEffect(() => {
        console.log(record.date, record.time)
        if (record.date && record.time) {
            // Both date and time are present, update inputDateTime
            const newInputDateTime = record.date + "T" + record.time;
            setInputDateTime(newInputDateTime);
        }
    }, [record.date, record.time])
    
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


    const handleChange = (e) => {
        const { name, value } = e.target;

        setRecord({
            ...record,
            [name]: value,
          });
    };

    const [validated, setValidated] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      event.preventDefault();

      try {
        const res = await axios.patch(`http://localhost:4000/api/updateSalesDetail/${id}/${type}`, record)
        
        console.log(res)
      } catch (error) {
        console.error(error)
      }

        console.log('Trying to submit edit data: ', id, record)
        window.location.reload()

    };
      

    return (
        <div>

            {is_completed ? (
                <div style={{color: '#008000'}}>
                    {React.createElement(FaCheck, {size: 18})} 
                </div>
            ): (
                <div onClick={handleShowModal} style={{color: '#014c91', cursor: 'pointer'}}>
                    {React.createElement(FaEdit, {size: 18})} 
                </div>
            )}

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header style={{color: "white", backgroundColor: record.is_active ? "#8c1919" : "#014c91"}}>
                    <Modal.Title>{type==="delivery" ? "Edit Delivery Details" : type==="installation" ? "Edit Installation Details" : type==="pickup" ? "Edit Pick Up Details": "Edit Service Details"}</Modal.Title>
                </Modal.Header>

                <Form noValidate validated={validated} > {/** onSubmit={handleSubmit} **/}
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>
                                {type === "delivery" ? (
                                    <Row className="mt-3">
                                        <Col lg="6">
                                            <Form.Group controlId="date">
                                                <Form.Label>Delivery Date</Form.Label>
                                                <Form.Control type="date" name='date' onChange={handleChange} required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a valid date.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                        
                                        <Col lg="6">
                                            <Form.Group controlId="time">
                                                <Form.Label>Delivery Time</Form.Label>
                                                <Form.Control type="time" name='time' onChange={handleChange} required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a valid time.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                ): type === "installation" ? (
                                    <>
                                        <Row>
                                            <Col lg="6">
                                                <Form.Group controlId="installstartdate">
                                                    <Form.Label>Installation Start Date</Form.Label>
                                                    <Form.Control type="date" name='date' onChange={handleChange} required/>
                                                    <Form.Control.Feedback type="invalid">
                                                        Please choose a valid date.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col lg="6">
                                                <Form.Group controlId="installstarttime">
                                                    <Form.Label>Installation Start Time</Form.Label>
                                                    <Form.Control type="time" name='time' onChange={handleChange} required/>
                                                    <Form.Control.Feedback type="invalid">
                                                        Please choose a valid time.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        {data ? (
                                            <Row className="mt-2">
                                                <Col lg="6">
                                                    <Form.Group controlId="installstartdate">
                                                        <Form.Label>Installation End Date</Form.Label>
                                                        <Form.Control type="date" name='endDate' onChange={handleChange}/>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please choose a valid date.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>

                                                <Col lg="6">
                                                    <Form.Group controlId="installstarttime">
                                                        <Form.Label>Installation End Time</Form.Label>
                                                        <Form.Control type="time" name='endTime' onChange={handleChange}/>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please choose a valid time.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        ) : null}

                                        <Row className="mt-2">
                                            <Col lg="6">
                                                <Form.Group controlId="paymentMode">
                                                    <Form.Label>Technician</Form.Label>
                                                    <Form.Control as="select" name='technician_id' onChange={handleChange}>
                                                        <option value=""> Select </option>
                                                        {technicians.map((tech) => (
                                                            <option key={tech.technician_id} value={tech.technician_id}>{tech.complete_name}</option>
                                                        ))}
                                                    </Form.Control>
                                                    {mod ? (<p>Some technicians are unavailable</p>) : null}
                                                    <Form.Control.Feedback type="invalid">
                                                        Please choose a mode of payment.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </>
                                ): type === "pickup" ? (
                                    <Row>
                                        <Col lg="6">
                                            <Form.Group controlId="date">
                                                <Form.Label>Pick Up Date</Form.Label>
                                                <Form.Control type="date" name='date' onChange={handleChange} required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a valid date.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                        
                                        <Col lg="6">
                                            <Form.Group controlId="time">
                                                <Form.Label>Pick Up Time</Form.Label>
                                                <Form.Control type="time" name='time' onChange={handleChange} required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a valid time.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                ):(
                                    <>
                                        <Row>
                                            <Col lg="6">
                                                <Form.Group controlId="date">
                                                    <Form.Label>Service Date</Form.Label>
                                                    <Form.Control type="date" name='date' onChange={handleChange} required/>
                                                    <Form.Control.Feedback type="invalid">
                                                        Please choose a valid date.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                            
                                            <Col lg="6">
                                                <Form.Group controlId="time">
                                                    <Form.Label>Service Time</Form.Label>
                                                    <Form.Control type="time" name='time' onChange={handleChange} required/>
                                                    <Form.Control.Feedback type="invalid">
                                                        Please choose a valid time.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className="mt-2">
                                            <Col lg="6">
                                                <Form.Group controlId="paymentMode">
                                                    <Form.Label>Technician</Form.Label>
                                                    <Form.Control as="select" name='technician_id' onChange={handleChange} required>
                                                        <option value=""> Select </option>
                                                        {technicians.map((tech) => (
                                                            <option key={tech.technician_id} value={tech.technician_id}>{tech.complete_name}</option>
                                                        ))}
                                                    </Form.Control>
                                                    {mod ? (<p>Some technicians are unavailable</p>) : null}
                                                    <Form.Control.Feedback type="invalid">
                                                        Please choose a mode of payment.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                               
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>
                            

                            <button className="btn" style={{color: "white", backgroundColor: record.is_active ? "#8c1919" : "#014c91"}} onClick={handleSubmit}>
                                {type === "delivery" ? (
                                    <>
                                        {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Save Delivery Details
                                    </>
                                ): type === "installation" ? (
                                    <>
                                        {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Save Installation Details
                                    </>
                                ): type === "pickup" ? (
                                    <>
                                        {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Save Pick up Details
                                    </>
                                ):(
                                    <>
                                        {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Save Service Details
                                    </>
                                )}
                            </button>
                            {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
                            

                            <button className="btn" onClick={(e) => { e.preventDefault(); handleCloseModal(); }} style={{color: "white", backgroundColor: "#6c757d"}}>
                                Cancel
                            </button>

                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default EditServiceDetailsModal;
