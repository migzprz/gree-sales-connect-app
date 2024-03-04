import ReturningClientModal from "../ReturningClientModal";
import { useState, useEffect } from "react";
import axios from "axios";
import useAddressFilter from "../../hooks/useAddressFilter";
import { Form, Row, Col } from "react-bootstrap";

/**
 * 
 * @param {*} param0 
 * @returns a form component that allows users to input basic information such as the client and location information
 * note: form component does not have a handleSubmit function, define it in the parent component it is being used in
 */
export default function FormComponent({ formData, setFormData, handleChange, validated, handleSubmit }) {

    const [isNew, setIsNew] = useState(true);
    const [activeOption, setActiveOption] = useState('newClient');
    const [clients, setClients] = useState({})
    const [storedLocations, setStoredLocations] = useState({})
    const [companies, setCompanies] = useState({})


    const { region, filteredProvince, filteredCity, filteredBarangay, province, city, barangay } = useAddressFilter(formData, setFormData)


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

    const handleOptionClick = (option) => {
        setActiveOption(option);
        setIsNew(option === 'newClient');

        const {
            client_id,
            returningClientCompanyName,
            returningClientCompanyTin,
            returningClientContactNumber,
            returningClientEmail,
            returningClientFirstName,
            returningClientLastName,
            ...updatedFormData
        } = formData;
        
        setFormData(updatedFormData);
    };

    return (
        <>
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
                            <Form.Control type="text" disabled={!isNew} value={formData.returningClientFirstName || null } onChange={handleChange} name='firstName' required/>
                            <Form.Control.Feedback type="invalid">
                                Please provide first name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg="3">
                        <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" disabled={!isNew} value={formData.returningClientLastName || null } onChange={handleChange} name='lastName' required/>
                            <Form.Control.Feedback type="invalid">
                                Please provide last name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col className="ms-5" lg="4">
                        <Form.Group controlId="companyName">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type="text" disabled={!isNew} value={formData.returningClientCompanyName || null }onChange={handleChange} name='companyName' placeholder="optional"/>
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
                            <Form.Control type="text" pattern="[0-9]{11}" placeholder="e.g. 09123456789" disabled={!isNew} value={formData.returningClientContactNumber || null } onChange={handleChange} name='contactNumber' required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Contact No.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg="3">
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" disabled={!isNew} value={formData.returningClientEmail || null } onChange={handleChange} name='email' required/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Email
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col className="ms-5"  lg="4">
                        <Form.Group controlId="tin">
                            <Form.Label>Company TIN ID</Form.Label>
                            <Form.Control type="text" disabled={!isNew} value={formData.returningClientCompanyTin || null } placeholder="optional" name='tin' onChange={handleChange}/>
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
                            <Form.Control type="text" onChange={handleChange} name='bldg_no' required/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Unit No.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg="4">
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
                    <Col lg="3">
                        <Form.Group controlId="province">
                            <Form.Label>Province</Form.Label>
                            <Form.Control as="select" onChange={handleChange} name='addr_province_id'  required>
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
                    <Col lg="3">
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control as="select" onChange={handleChange} name='addr_municipality_id'  required>
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
                    <Col lg="3">
                        <Form.Group controlId="barangay">
                            <Form.Label>Barangay</Form.Label>
                            <Form.Control as="select" onChange={handleChange} name='addr_barangay_id' required>
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
            </Form>
        </>
    )
}