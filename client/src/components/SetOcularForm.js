import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaCalendarDay} from 'react-icons/fa';
import { Row, Col, Form, CardBody } from 'react-bootstrap';
import '../index.css';
import ExistingClientModal from './ExistingClientModal';

const SetOcularForm = () => {

    const [isNew, setIsNew] = useState(true);

    const [activeOption, setActiveOption] = useState('newClient');

    const handleOptionClick = (option) => {
        setActiveOption(option);
        setIsNew(option === 'newClient');
    };

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
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
                            color: activeOption === 'newClient' ? '#014c91' : 'lightgrey',
                            cursor: 'pointer',
                            marginRight: '20px'
                        }}
                        onClick={() => handleOptionClick('newClient')}
                    >
                        New Client
                    </h5>
                    <h5
                        style={{
                            textDecoration: activeOption === 'existingClient' ? 'underline' : 'none',
                            color: activeOption === 'existingClient' ? '#014c91' : 'lightgrey',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleOptionClick('existingClient')}
                    >
                        Existing Client
                    </h5>
                </div>

                {!isNew && <ExistingClientModal />}

        {/*Forms*/ }
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mt-3">
            <Col lg="3">
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" disabled={!isNew} required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide first name.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" disabled={!isNew} required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide last name.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="5">
                 <Form.Group controlId="companyName">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" disabled={!isNew}  placeholder="optional"/>
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
                    <Form.Control type="text" pattern="[0-9]{11}" placeholder="e.g. 09123456789" disabled={!isNew} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Contact No.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" disabled={!isNew} required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Email
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="5">
                 <Form.Group controlId="tin">
                    <Form.Label>TIN ID</Form.Label>
                    <Form.Control type="text" pattern="[0-9]*" disabled={!isNew} placeholder="optional"/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid TIN
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>

        <Row className="mt-3">
            <Col lg="4">
                <Form.Group controlId="unitNo">
                    <Form.Label>Unit No.</Form.Label>
                    <Form.Control type="text" required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Unit No.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="4">
                <Form.Group controlId="street">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Street Name.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col lg="3">
                <Form.Group controlId="barangay">
                    <Form.Label>Barangay</Form.Label>
                    <Form.Control as="select" required>
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
                    <Form.Control as="select" required>
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
                    <Form.Control as="select" required>
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
                    <Form.Control as="select" required>
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
                <Form.Group controlId="companyName">
                    <Form.Label>ZIP Code</Form.Label>
                    <Form.Control pattern="[0-9]{4}" type="text" required/>
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
                    <Form.Control as="select" required>
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
