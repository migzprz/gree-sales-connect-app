import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form,  Dropdown } from 'react-bootstrap';
import { FaEdit} from 'react-icons/fa';
import axios from 'axios'
import useAddressFilter from '../hooks/useAddressFilter';

const EditOcularModal = ({ id }) => {
    const [showModal, setShowModal] = useState(false);
    const [recordData, setRecordData] = useState({})
    const [editData, setEditData] = useState({})
    const [technicians, setTechnicians] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getOcular/${id}`)
                setRecordData(response.data[0])
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
            try {
                const technicianResponse = await axios.get('http://localhost:4000/api/getTechnicians/')
                setTechnicians(technicianResponse.data)
            } catch (error) {
                console.error('Error fetching technician data: ', error)
            }
        }
        fetchData()
    }, [id])
    useEffect(() => {
        console.log(recordData)
    }, [recordData])

    const { region, filteredProvince, filteredCity, filteredBarangay } = useAddressFilter(editData, setEditData)

    const clearData = () => {
        setEditData({})
        setRecordData({})
    }

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        clearData()
        setShowModal(false);
    };

    useEffect(() => {
        console.log('edited data: ', editData)
    }, [editData])

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
      
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({
          ...editData,
          [name]: value,
        });
    };

    return (
        <div>

            <Dropdown.Item onClick={handleShowModal}> Edit Ocular Details</Dropdown.Item>

                <Modal show={showModal} onHide={handleCloseModal} size="lg">
                    <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                        <Modal.Title>Edit Ocular Details</Modal.Title>
                    </Modal.Header>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>

                                <Row>
                                    <Col lg="3">
                                        <strong> Client Name: </strong> 
                                    </Col>
                                    <Col lg="3">
                                        {recordData.client_name}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Company Name: </strong>
                                    </Col>
                                    <Col lg="3">
                                        {recordData.company_name}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> TIN ID: </strong> 
                                    </Col>
                                    <Col lg="3">
                                        {recordData.tin}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Contact Number: </strong>
                                    </Col>
                                    <Col lg="3">
                                        {recordData.client_number}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Email Address: </strong> 
                                    </Col>
                                    <Col lg="3">
                                        {recordData.email}
                                    </Col>
                                </Row>
                
                                <Row className="mt-3">
                                    <Col lg="4">
                                        <Form.Group controlId="unitNo">
                                            <Form.Label>Unit No.</Form.Label>
                                            <Form.Control type="text" placeholder={recordData.addr_bldg_no} name='addr_bldg_no' onChange={handleChange} required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid Unit No.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="4">
                                        <Form.Group controlId="street">
                                            <Form.Label>Street</Form.Label>
                                            <Form.Control type="text"  placeholder={recordData.addr_street_name} name='addr_street_name' required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid Street Name.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="3">
                                        <Form.Group controlId="zipcode">
                                            <Form.Label>ZIP Code</Form.Label>
                                            <Form.Control pattern="[0-9]{4}" placeholder={recordData.zipcode} type="text" required/>
                                            <Form.Control.Feedback type="invalid" required>
                                                Please provide a valid ZIP Code.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col lg="3">
                                        <Form.Group controlId="region">
                                            <Form.Label>Region</Form.Label>
                                            <Form.Control as="select" onChange={handleChange} name='addr_region_id' required>
                                                <option value="">Select</option>
                                                {region.map((reg) => (
                                                    <option key={reg.region_id} value={reg.region_id}>{reg.description}</option>
                                                ))}
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a region.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="3">
                                        <Form.Group controlId="province">
                                            <Form.Label>Province</Form.Label>
                                            <Form.Control as="select" onChange={handleChange} name='addr_province_id' required>
                                                <option value="">Select</option>
                                                {filteredProvince.map((pro) => (
                                                    <option key={pro.province_id} value={pro.province_id}>{pro.name}</option>
                                                ))}
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a province.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="3">
                                        <Form.Group controlId="city">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control as="select" onChange={handleChange} name='addr_municipality_id'required>
                                                <option value="">Select</option>
                                                {filteredCity.map((cit) => (
                                                    <option key={cit.municipality_id} value={cit.municipality_id}>{cit.name}</option>
                                                ))}
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a city.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="3">
                                        <Form.Group controlId="barangay">
                                            <Form.Label>Barangay</Form.Label>
                                            <Form.Control as="select" onChange={handleChange} name='addr_barangay_id' required>
                                                <option value="">Select</option>
                                                {filteredBarangay.map((bar) => (
                                                    <option key={bar.barangay_id} value={bar.barangay_id}>{bar.name}</option>
                                                ))}
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a barangay.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col lg="3">
                                        <Form.Group controlId="date">
                                            <Form.Label>Ocular Date</Form.Label>
                                            <Form.Control type="date" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a valid date.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="3">
                                        <Form.Group controlId="time">
                                            <Form.Label>Ocular Time</Form.Label>
                                            <Form.Control type="time" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a valid time.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="3">
                                        <Form.Group controlId="technician">
                                            <Form.Label>Assigned Technician</Form.Label>
                                            <Form.Control as="select" onChange={handleChange} name='technician_id' required>
                                                <option value="">Select</option>
                                                {technicians.map((tec, index) => (
                                                    <option key={index} value={tec.technician_id}>{tec.complete_name}</option>
                                                ))}
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a technician.
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                    </Col>
                                </Row>
                    
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>

                            <button className="btn" style={{color: "white", backgroundColor: "#014c91"}}>
                            {React.createElement(FaEdit, { size: 18, style: { marginRight: '5px' } })} Edit
                            </button>

                            <button className="btn" onClick={handleCloseModal} style={{color: "white", backgroundColor: "#6c757d"}}>
                            Cancel
                            </button>

                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default EditOcularModal;
