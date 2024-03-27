import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form,  InputGroup } from 'react-bootstrap';
import { FaSave, FaPlus} from 'react-icons/fa';
import axios from 'axios';

const AddPaymentModal = ({ id, max}) => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => { setShowModal(true) };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const [formData, setFormData] = useState({
        mop_id: null,
        amount: null,
        refNo: null
    })
    useEffect(() => {
        console.log(formData)
    }, [formData])

    const [validated, setValidated] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        if (form.checkValidity() === true) {
            try {
                const data = {
                    ...formData, id: id
                }
                const res = await axios.post(`http://localhost:4000/api/newPayment/${id}`, data)
                console.log(res)
                window.location.reload()
            } catch (error) {
                console.error(error)
            }
        }
        

        setValidated(true);
    };

    const [mop, setMop] = useState([])
    useEffect(() => {
        try {
            const fetchdata = async () => {
                const res = await axios.get(`http://localhost:4000/api/getModeOfPayments`)
                setMop(res.data)
            }
            fetchdata()
        } catch (error) {
            console.error(error)
        }
    }, [])
      
    
    return (
        <div>

            <button className="btn w-40" onClick={handleShowModal} style={{color: "white", backgroundColor: "#014c91"}}>
                {React.createElement(FaPlus, { size: 18, style: { marginRight: '5px' } })}   Add Payment
            </button>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Add Payment</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>

                        {/*Forms*/ }
                        <Row className="mt-3">

                            <Col lg="4">
                                    <Form.Group controlId="paymentMode">
                                        <Form.Label>Mode of Payment</Form.Label>
                                        <Form.Control as="select" name='mop_id' onChange={handleChange} required>
                                            <option value=""> Select </option>
                                            {mop.map((m, i) => (
                                                <option key={i} value={m.mop_id}>{m.name}</option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Please choose a mode of payment.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                            </Col>
                            
                            <Col lg="4">
                                        <Form.Group controlId="amount">
                                        <Form.Label>Amount</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text> ₱ </InputGroup.Text>
                                            <Form.Control   className="money" type="number" inputMode="numeric" min="0" max={max}
                                                            required onWheel={(e) => e.target.blur()} name='amount' onChange={handleChange} />
                                        </InputGroup>
                                        <Form.Control.Feedback type="invalid">
                                            Invalid Amount
                                        </Form.Control.Feedback>
                                    </Form.Group>
                            </Col>

                            <Col lg="4">
                                    {formData.mop_id !== '1' ? (
                                        <>
                                            <Form.Group controlId="paymentMode">
                                                <Form.Label>Reference Number</Form.Label>
                                                <Form.Control type="text" name='refNo' onChange={handleChange} required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Please input reference number
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </>
                                    ) : null}
                            </Col>   
                        </Row>

       
                               
                    
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                            <button className="btn" style={{color: "white", backgroundColor: "#014c91"}}>
                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })} Save Payment
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

export default AddPaymentModal;
