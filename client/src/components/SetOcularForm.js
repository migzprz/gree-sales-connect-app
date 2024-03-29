import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaCalendarDay} from 'react-icons/fa';
import { Row, Col, Form } from 'react-bootstrap';
import '../index.css';
import ReturningClientModal from './ReturningClientModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAddressFilter from '../hooks/useAddressFilter'
import useAvailableTechnicians from '../hooks/useAvailableTechnicians';

const SetOcularForm = () => {

    const navigate = useNavigate()

    const [clients, setClients] = useState({})
    const [storedLocations, setStoredLocations] = useState({})
    const [companies, setCompanies] = useState({})
    

    // const [technicians, setTechnicians] = useState([])
    const [inputDateTime, setInputDateTime] = useState(null)
    const { technicians, mod } = useAvailableTechnicians(inputDateTime)

    const [errorMessage, setErrorMessage] = useState('');

    const [isNew, setIsNew] = useState(true);
    const [activeOption, setActiveOption] = useState('newClient');
    const [formData, setFormData] = useState({
        // client and company data (NEW)
        firstName: '',
        lastName: '',
        companyName: '',
        contactNumber: '',
        email: '',
        tin: '',

        // client and company data (OLD)
        // on submit, check if the input values match existing records and update fields
        client_id: null,

        // location data
        bldg_no: '',
        street_name: '',
        addr_barangay_id: null,
        addr_municipality_id: null,
        addr_province_id: null,
        addr_region_id: null,
        zipcode: '',

        // ocular data (transform date and time into datetime)
        date: null,
        time: null,
        technician: null,
        login_id: 1,

    })
    useEffect(() => {
        console.log('form data: ', formData)
    }, [formData])

    useEffect(() => {
        console.log(formData.date, formData.time)
        if (formData.date && formData.time) {
            // Both date and time are present, update inputDateTime
            const newInputDateTime = formData.date + "T" + formData.time;
            setInputDateTime(newInputDateTime);
        }
    }, [formData.date, formData.time])
    useEffect(() => {
        console.log(inputDateTime)
    }, [inputDateTime])


    const { region, filteredProvince, filteredCity, filteredBarangay } = useAddressFilter(formData, setFormData)

    // fetch location data and stored client and location data for quick fillup feature
    const fetchData = async () => {
        try {
            const locStoredResponse = await axios.get('http://localhost:4000/api/getStoredLocations/')
            setStoredLocations(locStoredResponse.data)
        } catch (error) {
            console.error('Error fetching stored location data: ', error)
        }
        
        try {
            const clientResponse = await axios.get('http://localhost:4000/api/getContactPerson/')
            setClients(clientResponse.data)
        } catch (error) {
            console.error('Error fetching client data: ', error)
        }
        
        try {
            const companyResponse = await axios.get('http://localhost:4000/api/getCompanies/')
            setCompanies(companyResponse.data)
        } catch (error) {
            console.error('Error fetching company data: ', error)
        }

        // try {
        //     const technicianResponse = await axios.get('http://localhost:4000/api/getTechnicians/')
        //     setTechnicians(technicianResponse.data)
        // } catch (error) {
        //     console.error('Error fetching technician data: ', error)
        // }
    }
    useEffect(() => {
        fetchData()
    },[])
    useEffect(() => {
        console.log('stored locations data: ',storedLocations)
    },[storedLocations])
    useEffect(() => {
        console.log('contact person data: ',clients)
    },[clients])
    useEffect(() => {
        console.log('companies data: ',companies)
    },[companies])
    useEffect(() => {
        console.log('technician data: ',technicians)
    },[technicians])
    

    const handleOptionClick = (option) => {
        setActiveOption(option);
        if (option === 'newClient') {
            setFormData({
                firstName: '',
                lastName: '',
                companyName: '',
                contactNumber: '',
                email: '',
                tin: ''
            });
            setIsNew(true);
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                companyName: '',
                contactNumber: '',
                email: '',
                tin: ''
            });
            setIsNew(false);
        }
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
      

      // add ocular_date by concat date and time
      const data = {
        ...formData,
        ocular_date: formData.date+"T"+formData.time
      }

      console.log(data)
      setValidated(true);
      if (form.checkValidity()) {
        try {
            if (formData.client_id === null && !isNew) {
                setErrorMessage("*Please select a returning client");
                setValidated(false);
            } else {
                const postReponse = await axios.post('http://localhost:4000/api/postOcular/1', data)
                console.log(postReponse)
                navigate('/viewoculars')
            }
            
        } catch (error) {
            console.error('Error: Problem encountered when posting data', error)
        }
     }


    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Set New Ocular Schedule</h1>
            <h5>Schedule an ocular</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

        
            <div style={{ marginBottom: '20px', display: 'flex', marginTop: '20px' }}>
                    <h5
                        style={{
                            textDecoration: activeOption === 'newClient' ? 'underline' : 'none',
                            color: activeOption === 'newClient' ? '#014c91' : '#6c757d',
                            cursor: 'pointer',
                            marginRight: '20px'
                        }}
                        onClick={() => handleOptionClick('newClient')}
                    >
                        New Client
                    </h5>
                    <h5
                        style={{
                            textDecoration: activeOption === 'returningClient' ? 'underline' : 'none',
                            color: activeOption === 'returningClient' ? '#014c91' : '#6c757d',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleOptionClick('returningClient')}
                    >
                        Returning Client
                    </h5>
                </div>

                {!isNew && <ReturningClientModal formData={formData} setFormData={setFormData} />}

        {/*Forms*/ }
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mt-3">
            <Col lg="3">
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" disabled={!isNew} value={formData.returningClientFirstName || formData.firstName } onChange={handleChange} name='firstName' required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide first name.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" disabled={!isNew} value={formData.returningClientLastName || formData.lastName  } onChange={handleChange} name='lastName' required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide last name.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="3">
                 <Form.Group controlId="companyName">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" disabled={!isNew} value={formData.returningClientCompanyName || formData.companyName }onChange={handleChange} name='companyName' placeholder="optional"/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid company.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>

        <Row className="mt-2">
            <Col lg="3">
                <Form.Group controlId="contactNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="text" pattern="[0-9]{11}" placeholder="e.g. 09123456789" disabled={!isNew} value={formData.returningClientContactNumber || formData.contactNumber } onChange={handleChange} name='contactNumber' required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Contact No.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" disabled={!isNew} value={formData.returningClientEmail || formData.email } onChange={handleChange} name='email' required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Email
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="3">
                 <Form.Group controlId="tin">
                    <Form.Label>Company TIN ID</Form.Label>
                    <Form.Control type="text" pattern="[0-9]{9,12}" disabled={!isNew} value={formData.returningClientCompanyTin || formData.tin } placeholder="optional" name='tin' onChange={handleChange}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid TIN
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>

        <Row className="mt-3">
            <Col lg="3">
                <Form.Group controlId="bldg_no">
                    <Form.Label>Unit No.</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name='bldg_no' required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Unit No.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="street_name">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name='street_name' required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Street Name.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            
            <Col lg="3">
                <Form.Group controlId="zipcode">
                    <Form.Label>ZIP Code</Form.Label>
                    <Form.Control pattern="[0-9]{4}" type="text" onChange={handleChange} name='zipcode' required/>
                    <Form.Control.Feedback type="invalid" required>
                        Please provide a valid ZIP Code.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>

        {/** TODO: Add disabled field */}
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
            <Col lg="2">
                <Form.Group controlId="province">
                    <Form.Label>Province</Form.Label>
                    <Form.Control disabled={!formData.addr_region_id} as="select" onChange={handleChange} name='addr_province_id'  required>
                        <option value=""> Select </option>
                        {filteredProvince.map((prov) => (
                            <option key={prov.province_id} value={prov.province_id}>{prov.name}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please choose a province.
                    </Form.Control.Feedback>
                 </Form.Group>
            </Col>
            <Col lg="2">
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control disabled={!formData.addr_province_id} as="select" onChange={handleChange} name='addr_municipality_id'  required>
                        <option value=""> Select </option>
                        {filteredCity.map((cit) => (
                            <option key={cit.municipality_id} value={cit.municipality_id}>{cit.name}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please choose a city.
                    </Form.Control.Feedback>
                 </Form.Group>
            </Col>
            <Col lg="2">
                <Form.Group controlId="barangay">
                    <Form.Label>Barangay</Form.Label>
                    <Form.Control disabled={!formData.addr_municipality_id} as="select" onChange={handleChange} name='addr_barangay_id' required>
                        <option value=""> Select </option>
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

        <Row className="mt-2 mb-5">
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
                    <Form.Control type="time" onChange={handleChange} name='time' required/>
                    <Form.Control.Feedback type="invalid">
                        Please choose a valid time.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="technician">
                    <Form.Label>Assigned Technician</Form.Label>
                    <Form.Control disabled={!formData.date || !formData.time} as="select" onChange={handleChange} name='technician' required>
                        <option value="">Select</option>
                        {technicians.map((tech) => (
                            <option key={tech.technician_id} value={tech.technician_id}>{tech.complete_name}</option>
                        ))}
                    </Form.Control>
                    {technicians.length === 0 ? (<p style={{color: 'red'}}>No technicians are available</p>) : mod ? (<p>Some technicians are unavailable</p>) : null}
                    <Form.Control.Feedback type="invalid">
                        Please choose a technician.
                    </Form.Control.Feedback>
                 </Form.Group>

            </Col>
        </Row>

        {errorMessage ? 
                <Row className="mb-1">
                    <Col lg="3" className="text-center">
                        <span style={{ color: "#FF0000" }}> {errorMessage} </span> 
                    </Col>
                </Row> 
            : null}

        <Row>
            <Col lg="3">
                <button className="btn w-100" style={{color: "white", backgroundColor: "#014c91"}}>
                {React.createElement(FaCalendarDay, { size: 18, style: { marginRight: '5px' } })}   Schedule New Ocular
                 </button>
            </Col>
        </Row>
    </Form>


       
        

        
           


        </div>
    );
};

export default SetOcularForm;
