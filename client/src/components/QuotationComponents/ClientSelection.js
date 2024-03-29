import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaCheck} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table } from 'react-bootstrap';
import ReturningClientModal from '../ReturningClientModal';
import useAddressFilter from '../../hooks/useAddressFilter';

const ClientSelection = ({ onClientSubmission }) => {

    const [isNew, setIsNew] = useState(true);
    const [activeOption, setActiveOption] = useState('newClient');
    const [clientData, setClientData] = useState({})
    const [errorMessage, setErrorMessage] = useState('');

    const { region, filteredProvince, filteredCity, filteredBarangay, province, city, barangay } = useAddressFilter(clientData, setClientData)

    useEffect(() => {
        console.log('client data for quotations: ', clientData)
    }, [clientData])


    const handleOptionClick = (option) => {
        setActiveOption(option);
        if (option === 'newClient') {
            setClientData({
                firstName: '',
                lastName: '',
                companyName: '',
                contactNumber: '',
                email: '',
                tin: '',
                addr_region_id: '',
                addr_province_id: '',
                addr_municipality_id: '',
                addr_barangay_id: '',
                bldg_no: '',
                street_name: '',
                zipcode: ''
            });
            setIsNew(true);
        } else {
            setClientData({
                firstName: '',
                lastName: '',
                companyName: '',
                contactNumber: '',
                email: '',
                tin: '',
                addr_region_id: '',
                addr_province_id: '',
                addr_municipality_id: '',
                addr_barangay_id: '',
                bldg_no: '',
                street_name: '',
                zipcode: ''
            });
            setIsNew(false);
        }
    };
    
    
    

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      setErrorMessage('')
      setValidated(true);
    if (form.checkValidity()) {
        if (!clientData.returningClientFirstName && !isNew) {
            setErrorMessage("*Please select a returning client");
            setValidated(false);
        } else {
            onClientSubmission(clientData)
        }
        
        }
    
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData({
          ...clientData,
          [name]: value,
        });
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

            {!isNew && <ReturningClientModal formData={clientData} setFormData={setClientData} />}

            {/*Forms*/ }
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mt-3">
                    <Col lg="3">
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" disabled={!isNew} value={clientData.returningClientFirstName || clientData.firstName } onChange={handleChange} name='firstName' required/>
                            <Form.Control.Feedback type="invalid">
                                Please provide first name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg="3">
                        <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" disabled={!isNew} value={clientData.returningClientLastName ||  clientData.lastName  } onChange={handleChange} name='lastName' required/>
                            <Form.Control.Feedback type="invalid">
                                Please provide last name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg="3">
                        <Form.Group controlId="companyName">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type="text" disabled={!isNew} value={clientData.returningClientCompanyName || clientData.companyName }onChange={handleChange} name='companyName' placeholder="optional"/>
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
                            <Form.Control type="text" pattern="[0-9]{11}" placeholder="e.g. 09123456789" disabled={!isNew} value={clientData.returningClientContactNumber || clientData.contactNumber } onChange={handleChange} name='contactNumber' required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Contact No.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg="3">
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" disabled={!isNew} value={clientData.returningClientEmail || clientData.email} onChange={handleChange} name='email' required/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Email
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg="3">
                        <Form.Group controlId="tin">
                            <Form.Label>Company TIN ID</Form.Label>
                            <Form.Control type="text" disabled={!isNew} value={clientData.returningClientCompanyTin || clientData.tin } placeholder="optional" name='tin' onChange={handleChange}/>
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
                            <Form.Control type="text" onChange={handleChange} value={clientData.bldg_no}   name='bldg_no' required/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Unit No.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg="3">
                        <Form.Group controlId="street_name">
                            <Form.Label>Street</Form.Label>
                            <Form.Control type="text" onChange={handleChange} value={clientData.street_name}  name='street_name' required/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Street Name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    
                    <Col lg="3">
                        <Form.Group controlId="zipcode">
                            <Form.Label>ZIP Code</Form.Label>
                            <Form.Control pattern="[0-9]{4}" type="text" onChange={handleChange} value={clientData.zipcode} name='zipcode' required/>
                            <Form.Control.Feedback type="invalid" required>
                                Please provide a valid ZIP Code.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                {/** TODO: Add disabled field */}
                <Row className="mt-2 mb-5">
                    <Col lg="3">
                        <Form.Group controlId="region">
                            <Form.Label>Region</Form.Label>
                            <Form.Control as="select" onChange={handleChange} value={clientData.addr_region_id} name='addr_region_id' required>
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
                            <Form.Control as="select" onChange={handleChange} disabled={clientData.addr_region_id === ''} value={clientData.addr_province_id} name='addr_province_id'  required>
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
                            <Form.Control as="select" onChange={handleChange} disabled={clientData.addr_province_id === ''} value={clientData.addr_municipality_id} name='addr_municipality_id'  required>
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
                            <Form.Control as="select" onChange={handleChange} disabled={clientData.addr_municipality_id === ''} value={clientData.addr_barangay_id} name='addr_barangay_id' required>
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

                {errorMessage ? 
                <Row className="mb-1">
                    <Col lg="3" className="text-center">
                        <span style={{ color: "#FF0000" }}> {errorMessage} </span> 
                    </Col>
                </Row> 
            : null}
                
            

        <Row >
            <Col lg="3">
                <button className="btn w-100" style={{color: "white", backgroundColor: "#014c91"}}>
                {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })}   Confirm Client
                </button>
            </Col>
        </Row>
        </Form>

    </>
  );
};

export default ClientSelection;
