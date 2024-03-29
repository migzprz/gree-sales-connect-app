import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form,  Dropdown } from 'react-bootstrap';
import { FaEdit} from 'react-icons/fa';
import axios from 'axios'
import useAddressFilter from '../hooks/useAddressFilter';
import useOcularById from '../hooks/useOcularById';
import useAvailableTechnicians from '../hooks/useAvailableTechnicians';

const EditOcularModal = ({ id, date, onClose }) => {
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState({})
    //const [technicians, setTechnicians] = useState([])
    const [defaultTime, setDefaultTime] = useState('')
    //const [isRequired, setIsRequired] = useState(false)

    const [isChanged, setIsChanged] = useState(false)
    const { record, setRecord } = useOcularById(id)
    const { region, filteredProvince, filteredCity, filteredBarangay, province, city, barangay } = useAddressFilter(editData, setEditData)

    useEffect(() => {
        const time = new Date(record.ocular_date).toLocaleTimeString().split(':')
        let x
        Number(time[0]) < 9 ? x = '0'+time[0] : x = time[0]
        const t = x + ':' + time[1]
        setDefaultTime(t)
    },[record])

    useEffect(() => {
        console.log('edited data: ', defaultTime)
    }, [defaultTime])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const technicianResponse = await axios.get('http://localhost:4000/api/getTechnicians/')

    //             // arrange technician by name under record first
    //             const data = technicianResponse.data
    //             const technician = [
    //                 ...data.filter((tech) => tech.technician_id === record.technician_id),
    //                 ...data.filter((tech) => tech.technician_id !== record.technician_id)
    //             ]
    //             setTechnicians(technician)
    //         } catch (error) {
    //             console.error('Error fetching technician data: ', error)
    //         }
    //     }
    //     fetchData()
    // }, [id, record])

    // useEffect(() => {
    //     console.log(technicians)
    // }, [technicians])


    const [inputDateTime, setInputDateTime] = useState(null)
    const { technicians, mod } = useAvailableTechnicians(inputDateTime)

    useEffect(() => {
        console.log(editData.date, editData.time)
        if (editData.date && editData.time) {
            // Both date and time are present, update inputDateTime
            const newInputDateTime = editData.date + "T" + editData.time;
            setInputDateTime(newInputDateTime);
        }
    }, [editData.date, editData.time])

    const clearData = () => {
        setEditData({})
        setRecord({})
    }

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        clearData()
        setShowModal(false);
        onClose();
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
        if (form.checkValidity()) {
            try {
                var output = editData
                // add ocular_date to editData
                if (output.date && output.time) {
                    console.log('case 1 reached')
                    output = {
                        ...output,
                        ocular_date: editData.date+'T'+editData.time,
                        date: '',
                        time: '',
                    }
                }
                else if ((!output.date && output.time) || (output.date && !output.time)){
                    console.log('case 2 reached')
                    output = {
                        ...output,
                        ocular_date: (editData.date ? editData.date : record.ocular_date.split('T')[0]) + (editData.time ? 'T'+editData.time : 'T'+record.ocular_date.split('T')[1]),
                        date: '',
                        time: '',
                    }
                }

                console.log('record vs edit: ', record, output)
                const updateResponse = axios.patch(`http://localhost:4000/api/editOcularById/${id}`, output) 
                console.log(updateResponse)
                setShowModal(false)  
            } catch (error) {
                console.log(error)
            }
        }
    };
      
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'date') {
            const d = new Date(record.ocular_date).toISOString().split('T')[0]
            console.log(name, value, d)
            if (d === value) {
                setEditData({
                    ...editData,
                    date: ''
                })
                return
            }
        }

        if (name === 'time') {
            const time = new Date(record.ocular_date).toLocaleTimeString().split(':')
            const t = time[0] + ':' + time[1]
            const v = value.charAt(0) === '0' ? value.substring(1) : value
            console.log(name, v, t)
            if (t === v) {
                setEditData({
                    ...editData,
                    time: ''
                })
                return
            }
        }

            // Reset province, city, and barangay when region changes
        if (name === 'addr_region_id') {
            setEditData({
                ...editData,
                addr_province_id: '',
                addr_municipality_id: '',
                addr_barangay_id: ''
            });
            setIsChanged(true)
        } 
        // Reset city and barangay when province changes
        else if (name === 'addr_province_id') {
            setEditData({
                ...editData,
                addr_municipality_id: '',
                addr_barangay_id: ''
            });
        } 
        // Reset barangay when city changes
        else if (name === 'addr_municipality_id') {
            setEditData({
                ...editData,
                addr_barangay_id: ''
            });
        }

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
                                        {record.client_name}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Company Name: </strong>
                                    </Col>
                                    <Col lg="3">
                                        {record.companyName}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> TIN ID: </strong> 
                                    </Col>
                                    <Col lg="3">
                                        {record.tin}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Contact Number: </strong>
                                    </Col>
                                    <Col lg="3">
                                        {record.contactNumber}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="3">
                                        <strong> Email Address: </strong> 
                                    </Col>
                                    <Col lg="3">
                                        {record.email}
                                    </Col>
                                </Row>


                                
                                    <Row className="mt-3">
                                        <Col lg="4">
                                            <Form.Group controlId="unitNo">
                                                <Form.Label>Unit No.</Form.Label>
                                                <Form.Control type="text" placeholder={record ? record.addr_bldg_no : ''} name='addr_bldg_no' onChange={handleChange} />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid Unit No.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4">
                                            <Form.Group controlId="street">
                                                <Form.Label>Street</Form.Label>
                                                <Form.Control type="text"  placeholder={record ? record.addr_street_name : ''} name='addr_street_name' onChange={handleChange} />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid Street Name.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="3">
                                            <Form.Group controlId="zipcode">
                                                <Form.Label>ZIP Code</Form.Label>
                                                <Form.Control pattern="[0-9]{4}" placeholder={record ? record.zipcode : ''} type="text" name='zipcode' onChange={handleChange} />
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
                                                <Form.Control as="select" onChange={handleChange} name='addr_region_id'>
                                                    {region.filter((reg) => reg.region_id === record.addr_region_id).map((reg) => (
                                                        <option value=''>{reg.description + ' (DEFAULT)'}</option>
                                                    ))}
                                                    {region.map((reg, index) => (
                                                        <option key={index} value={reg.region_id}>{reg.description}</option>
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
                                                <Form.Control as="select" onChange={handleChange} name='addr_province_id' disabled={!(editData.addr_region_id !== '' && isChanged)} required={editData.addr_region_id !== '' && isChanged}>
                                                    {filteredProvince.length === 0 && province.filter((pro) => pro.province_id === record.addr_province_id).map((pro) => (
                                                        <option value=''>{pro.name}</option>
                                                    ))}
                                                    {(editData.addr_region_id) && (<option value=''>Select</option>)}
                                                    {filteredProvince.map((pro, index) => (
                                                        <option key={index} value={pro.province_id}>{pro.name}</option>
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
                                                <Form.Control as="select" onChange={handleChange} name='addr_municipality_id' disabled={(!(editData.addr_region_id !== '' && isChanged)) || editData.addr_province_id === '' } required={editData.addr_region_id !== '' && isChanged}>
                                                    {filteredCity.length === 0 && !editData.addr_region_id && city.filter((cit) => cit.municipality_id === record.addr_municipality_id).map((cit) => (
                                                        <option value=''>{cit.name}</option>
                                                    ))}
                                                    {(editData.addr_region_id) && (<option value=''>Select</option>)}
                                                    {filteredCity.map((cit, index) => (
                                                        <option key={index} value={cit.municipality_id}>{cit.name}</option>
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
                                                <Form.Control as="select" onChange={handleChange} name='addr_barangay_id' disabled={(!(editData.addr_region_id !== '' && isChanged)) || editData.addr_municipality_id === '' } required={editData.addr_region_id !== '' && isChanged}>
                                                    {filteredBarangay.length === 0 && !editData.addr_region_id && barangay.filter((bar) => bar.barangay_id === record.addr_barangay_id).map((bar) => (
                                                        <option value=''>{bar.name}</option>
                                                    ))}
                                                    {(editData.addr_region_id) && (<option value=''>Select</option>)}
                                                    {filteredBarangay.map((bar, index) => (
                                                        <option key={index} value={bar.barangay_id}>{bar.name}</option>
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
                                                <Form.Control type="date" onChange={handleChange} name='date' required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a valid date.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="3">
                                            <Form.Group controlId="time">
                                                <Form.Label>Ocular Time</Form.Label>
                                                <Form.Control type="time" onChange={handleChange} name='time'  required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a valid time.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="3">
                                            <Form.Group controlId="technician">
                                                <Form.Label>Assigned Technician</Form.Label>
                                                <Form.Control as="select" onChange={handleChange} name='technician_id' required>
                                                    <option value=''>Select</option>
                                                    {technicians.map((tec, index) => (
                                                        <option key={index} value={tec.technician_id}>{tec.complete_name}</option>
                                                    ))}
                                                </Form.Control>
                                                {mod ? (<p>Some technicians are unavailable</p>) : null}
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

                            <button className="btn" onClick={(e) => { e.preventDefault(); handleCloseModal(); }} style={{color: "white", backgroundColor: "#6c757d"}}>
                            Cancel
                            </button>

                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default EditOcularModal;
