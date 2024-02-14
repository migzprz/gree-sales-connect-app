import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaCalendarDay} from 'react-icons/fa';
import { Row, Col, Form } from 'react-bootstrap';
import '../index.css';
import ReturningClientModal from './ReturningClientModal';
import axios from 'axios';

const SetOcularForm = () => {
    const [location, setLocation] = useState({})
    const [clients, setClients] = useState({})
    const [storedLocations, setStoredLocations] = useState({})
    const [companies, setCompanies] = useState({})

    // filter data for address dropdown
    const [filteredRegion, setFilteredRegion] = useState({})
    const [filteredProvince, setFilteredProvince] = useState({})
    const [filteredCity, setFilteredCity] = useState({})
    const [filteredBarangay, setFilteredBarangay] = useState({})


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
        company_id: null,

        // location data
        bldg_no: '',
        street_name: '',
        barangay: null,
        city: null,
        province: null,
        region: null,
        zipcode: '',

        // ocular data (transform date and time into datetime)
        date: null,
        time: null,
        technician: null


        // TODO: on submit, merge date and time to one datetime format and check for existing record

    })

    // fetch location data and stored client and location data for quick fillup feature
    const fetchData = async () => {
        try {
            const locFormsResponse = await axios.get('http://localhost:4000/api/getLocationsForAddressInForms/')
            const locStoredResponse = await axios.get('http://localhost:4000/api/getStoredLocations/')
            const clientResponse = await axios.get('http://localhost:4000/api/getClients/')
            const companyResponse = await axios.get('http://localhost:4000/api/getCompanies/')
            setLocation(locFormsResponse.data)
            setStoredLocations(locStoredResponse.data)
            setClients(clientResponse.data)
            setCompanies(companyResponse.data)
        } catch (error) {
            console.error('Error fetching data: ', error)
        }
    }
    useEffect(() => {
        fetchData()
    },[])
    useEffect(() => {
        console.log(location)
    },[location])
    useEffect(() => {
        console.log(storedLocations)
    },[storedLocations])
    useEffect(() => {
        console.log(clients)
    },[clients])
    useEffect(() => {
        console.log(companies)
    },[companies])

    // handles address dropdown filtering
    // useEffect(() => {
    //     const filteredData = location.province.filter(item => item.region_id === formData.region);
    //     setFilteredProvince

    // }, [formData.region])


    const handleOptionClick = (option) => {
        setActiveOption(option);
        setIsNew(option === 'newClient');
    };

    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);

      try {
        const postReponse = await axios.post('http://localhost:4000/api/postOcular/')
        console.log(postReponse)
      } catch (error) {
        console.error('Error: Problem encountered when posting data', error)
      }


    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
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

                {!isNew && <ReturningClientModal />}

        {/*Forms*/ }
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mt-3">
            <Col lg="3">
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" disabled={!isNew} onChange={handleChange} required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide first name.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" disabled={!isNew} onChange={handleChange} required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide last name.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col className="ms-5" lg="4">
                 <Form.Group controlId="companyName">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" disabled={!isNew} onChange={handleChange} placeholder="optional"/>
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
                    <Form.Control type="text" pattern="[0-9]{11}" placeholder="e.g. 09123456789" disabled={!isNew} onChange={handleChange} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Contact No.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" disabled={!isNew} onChange={handleChange} required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Email
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col className="ms-5"  lg="4">
                 <Form.Group controlId="tin">
                    <Form.Label>Company TIN ID</Form.Label>
                    <Form.Control type="text" pattern="[0-9]*" disabled={!isNew} placeholder="optional" onChange={handleChange}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid TIN
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>

        <Row className="mt-3">
            <Col lg="4">
                <Form.Group controlId="bldg_no">
                    <Form.Label>Unit No.</Form.Label>
                    <Form.Control type="text" onChange={handleChange} required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Unit No.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="4">
                <Form.Group controlId="street_name">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" onChange={handleChange} required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Street Name.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="barangay">
                    <Form.Label>Barangay</Form.Label>
                    <Form.Control as="select" onChange={handleChange} required>
                        <option value=""> Select </option>
                        <option value="1"> One </option>
                        <option value="2"> Two </option>
                        <option value="3"> Three </option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please choose a barangay.
                    </Form.Control.Feedback>
                 </Form.Group>
            </Col>
        </Row>

        <Row className="mt-2">
             <Col lg="3">
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control as="select" onChange={handleChange} required>
                        <option value=""> Select </option>
                        <option value="1"> One </option>
                        <option value="2"> Two </option>
                        <option value="3"> Three </option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please choose a city.
                    </Form.Control.Feedback>
                 </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="province">
                    <Form.Label>Province</Form.Label>
                    <Form.Control as="select" onChange={handleChange} required>
                        <option value=""> Select </option>
                        <option value="1"> One </option>
                        <option value="2"> Two </option>
                        <option value="3"> Three </option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please choose a province.
                    </Form.Control.Feedback>
                 </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="region">
                    <Form.Label>Region</Form.Label>
                    <Form.Control as="select" onChange={handleChange} required>
                        <option value=""> Select </option>
                        <option value="1"> One </option>
                        <option value="2"> Two </option>
                        <option value="3"> Three </option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please choose a region.
                    </Form.Control.Feedback>
                 </Form.Group>
            </Col>
            <Col lg="2">
                <Form.Group controlId="zipcode">
                    <Form.Label>ZIP Code</Form.Label>
                    <Form.Control pattern="[0-9]{4}" type="text" onChange={handleChange} required/>
                    <Form.Control.Feedback type="invalid" required>
                        Please provide a valid ZIP Code.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>

        <Row className="mt-2">
             <Col lg="3">
                <Form.Group controlId="date">
                    <Form.Label>Ocular Date</Form.Label>
                    <Form.Control type="date" onChange={handleChange} required/>
                    <Form.Control.Feedback type="invalid">
                        Please choose a valid date.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="time">
                    <Form.Label>Ocular Time</Form.Label>
                    <Form.Control type="time" onChange={handleChange} required/>
                    <Form.Control.Feedback type="invalid">
                        Please choose a valid time.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="technician">
                    <Form.Label>Assigned Technician</Form.Label>
                    <Form.Control as="select" onChange={handleChange} required>
                        <option value=""> Select </option>
                        <option value="1"> One </option>
                        <option value="2"> Two </option>
                        <option value="3"> Three </option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please choose a technician.
                    </Form.Control.Feedback>
                 </Form.Group>

            </Col>
        </Row>

        <Row className="mt-5">
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
