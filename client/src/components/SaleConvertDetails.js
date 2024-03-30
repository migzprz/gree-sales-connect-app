import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaBriefcase} from 'react-icons/fa';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import '../index.css';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAvailableTechnicians from '../hooks/useAvailableTechnicians';

const SaleConvertDetails = () => {
    
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const type = searchParams.get('type')
    const sales = searchParams.get('sales')

    const login_id = sessionStorage.getItem('login_id')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/doesQuotationContainOnlyService/${id}`);
                const res2 = await axios.get(`http://localhost:4000/api/quotationTotalPrice/${id}`);
                const containsOnlyService = res.data[0].is_only_service === 1;
                const hasService = res.data[0].has_service === 1;
                console.log(containsOnlyService)
                setServiceOnlyState(containsOnlyService);
                setHasService(hasService)
                setTotalPrice(res2.data[0].totalPrice)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        try {
            const fetchdata = async () => {
                const res = await axios.get(`http://localhost:4000/api/getModeOfPayments`)
                // const res2 = await axios.get(`http://localhost:4000/api/getTechnicians`)
                setMop(res.data)
                // setTechnicians(res2.data)
            }
            fetchdata()
        } catch (error) {
            console.error(error)
        }
    }, [])
    
    const [totalPrice, setTotalPrice] = useState(null)
    const [hasService, setHasService] = useState(false)
    const [serviceOnlyState, setServiceOnlyState] = useState(false)
    const [validated, setValidated] = useState(false);

    // const [technicians, setTechnicians] = useState([])
    const [inputDateTimeInstallation, setInputDateTimeInstallation] = useState(null)
    const [inputDateTimeService, setInputDateTimeService] = useState(null)
    const { technicians, mod } = useAvailableTechnicians(inputDateTimeInstallation)
    const { technicians: technicians2, mod: mod2} = useAvailableTechnicians(inputDateTimeService)


    const [mop, setMop] = useState([])
    const [payment, setPayments] = useState({
        amount: totalPrice
    })
    const [delivery, setDelivery] = useState({})
    const [installation, setInstallation] = useState({})
    const [services, setServices] = useState({})

    // Technician Availability for Installation
    useEffect(() => {
        console.log(installation.installationSDate, installation.installationSTime)
        if (installation.installationSDate && installation.installationSTime) {
            // Both date and time are present, update inputDateTime
            const newInputDateTime = installation.installationSDate + "T" + installation.installationSTime;
            setInputDateTimeInstallation(newInputDateTime);
        }
    }, [installation.installationSDate, installation.installationSTime])
    useEffect(() => {
        console.log(inputDateTimeInstallation)
    }, [inputDateTimeInstallation])

    // Technician Availability for Services
    useEffect(() => {
        console.log(services.serviceDate, services.serviceTime)
        if (services.serviceDate && services.serviceTime) {
            // Both date and time are present, update inputDateTime
            const newInputDateTime = services.serviceDate + "T" + services.serviceTime;
            setInputDateTimeService(newInputDateTime);
        }
    }, [services.serviceDate, services.serviceTime])
    useEffect(() => {
        console.log(inputDateTimeService)
    }, [inputDateTimeService])


    const handleChange = (e) => {
        const { name, value } = e.target;

        const pay = ['isInstallment', 'mop_id', 'amount', 'refNo']
        const del = ['isPickup', 'deliveryDate', 'deliveryTime']
        const ins = ['installationType', 'installationSDate', 'installationSTime', 'installationEDate', 'installationETime', 'installationTechnician']
        const ser = ['serviceDate', 'serviceTime', 'serviceTechnician']
        

        if (pay.includes(name)) {
            if (name === 'isInstallment') {
                if (value === '0') {
                    setPayments((prev) => ({
                        ...prev,
                        amount: String(totalPrice)
                    }));
                } else {
                    setPayments((prev) => ({
                        ...prev,
                        amount: String(totalPrice/2)
                    }));
                }
            }
            setPayments((prev) => ({
                ...prev,
                [name]: value
            }));
        }
        if (del.includes(name)) {
            setDelivery((prev) => ({
                ...prev,
                [name]: value
            }));
        }
        if (ins.includes(name)) {
            setInstallation((prev) => ({
                ...prev,
                [name]: value
            }));
        }
        if (ser.includes(name)) {
            setServices((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const handleSubmit = async (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      event.preventDefault();
      setValidated(true);
      
      if (form.checkValidity() === true) {
        try {
            const res = await axios.post(`http://localhost:4000/api/convertToSale/${type === 'add' ? 'add' : 'new'}`, { id, payment, delivery, installation, services, sales, login_id })
            console.log(res)
            navigate('/viewsales')
          } catch (error) {
            console.error(error)
          }
    }
    };

    const handleCancel = () => {
        navigate('/viewquotations')
    }

    useEffect(() => {
        console.log(payment)
    }, [payment])
    useEffect(() => {
        console.log(delivery)
    }, [delivery])
    useEffect(() => {
        console.log(installation)
    }, [installation])
    useEffect(() => {
        console.log(services)
    }, [services])

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Convert to Sale</h1>
            <h5>Provide information on the sale</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

        
            

        {/*Forms*/ }
        
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        
            <Row className="mt-3">
                            <Col lg="2">
                                <Form.Group controlId="paymentOption">
                                    <Form.Label>Payment Option</Form.Label>
                                    <div>
                                        <Form.Check
                                            type="radio"
                                            id="downPayment"
                                            label="Down Payment"
                                            name="isInstallment"
                                            value={1}
                                            onChange={handleChange}
                                            checked={payment.isInstallment === '1'}
                                            required
                                        />
                                        <Form.Check
                                            type="radio"
                                            id="fullPayment"
                                            label="Full Payment"
                                            name="isInstallment"
                                            value={0}
                                            onChange={handleChange}
                                            checked={payment.isInstallment === '0'}
                                            required
                                        />
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        Please select a payment option.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col lg="2">
                                    <Form.Group controlId="paymentMode">
                                        <Form.Label>Mode of Payment</Form.Label>
                                        <Form.Control as="select" name='mop_id' onChange={handleChange} required>
                                            <option value=''>Select</option>
                                            {mop.map((m, index) => (
                                                <option key={index} value={m.mop_id}>{m.name}</option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Please choose a mode of payment.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                            </Col>
                            
                            <Col lg="2">
                                    <Form.Group controlId="amount">
                                        <Form.Label>Amount</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text> ₱ </InputGroup.Text>
                                            <Form.Control   className="money" type="number" inputmode="numeric" min="0" name='amount' onChange={handleChange}
                                                            required onWheel={(e) => e.target.blur()} disabled={payment.isInstallment === '0'} defaultValue={payment.amount}/>
                                        </InputGroup>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide an amount.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                            </Col>

                            {payment.mop_id !== '1' ? (
                                <>
                                    <Col lg="2">
                                        <Form.Group controlId="paymentMode">
                                            <Form.Label>Reference Number</Form.Label>
                                            <Form.Control type="text" name='refNo'onChange={handleChange}/>
                                            <Form.Control.Feedback type="invalid">
                                                Please input reference number
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </>
                            ) : null}   
            </Row>
            {serviceOnlyState === false ? (
                <>
                    <Row className="mt-3">
                        <Col lg="2">
                            <Form.Group controlId="transportationMode">
                                <Form.Label>Mode of Transportation</Form.Label>
                                <div>
                                    <Form.Check
                                        type="radio"
                                        id="delivery"
                                        label="Delivery"
                                        name="isPickup"
                                        value={0}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="pickup"
                                        label="Pick Up"
                                        name="isPickup"
                                        value={1}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Form.Control.Feedback type="invalid">
                                    Please select a transportation mode.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col lg="2">
                            <Form.Group controlId="date">
                                <Form.Label>{delivery.isPickup === '1' ? 'Pickup ' : 'Delivery '} Date</Form.Label>
                                <Form.Control type="date" name='deliveryDate' onChange={handleChange} required/>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid date.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col lg="2">
                            <Form.Group controlId="time">
                                <Form.Label>{delivery.isPickup === '1' ? 'Pickup ' : 'Delivery '} Time</Form.Label>
                                <Form.Control type="time" name='deliveryTime' onChange={handleChange} required/>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid time.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col lg="2">
                            <Form.Group controlId="forInstallation">
                                <Form.Label>Installation Details</Form.Label>
                                <div>
                                    <Form.Check
                                        type="radio"
                                        id="install"
                                        label="One Day installation"
                                        name="installationType"
                                        value='1'
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="installMultiple"
                                        label="Multiple Days Installation"
                                        name="installationType"
                                        value='2'
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Form.Control.Feedback type="invalid">
                                    Please select a transportation mode.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col lg="2">
                            <Form.Group controlId="installstartdate">
                                <Form.Label>Installation Start Date</Form.Label>
                                <Form.Control type="date" name='installationSDate' onChange={handleChange} required/>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid date.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col lg="2">
                            <Form.Group controlId="installstarttime">
                                <Form.Label>Installation Start Time</Form.Label>
                                <Form.Control type="time" name='installationSTime' onChange={handleChange} required/>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid time.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        {!installation.installationType || installation.installationType === '1' ? (
                        <Col lg="2">
                                <Form.Group controlId="installationTechnician">
                                <Form.Label>Technician</Form.Label>
                                <Form.Control as="select" disabled={!installation.installationSDate || !installation.installationSTime} name='installationTechnician' onChange={handleChange} required>
                                    <option value=""> Select </option>
                                    {technicians.map((t, index) =>(
                                        <option key={index} value={t.technician_id}>{t.complete_name}</option>
                                    ))}
                                </Form.Control>
                                {technicians.length === 0 ? (<p style={{color: 'red'}}>No technicians are available</p>) : mod ? (<p>Some technicians are unavailable</p>) : null}
                            </Form.Group>
                        </Col>
                        ) : null}
                    </Row>
                   

                    <Row>
                        <Col lg="2"/>
                        {installation.installationType === '2' ? (
                            <>
                                <Col lg="2">
                                    <Form.Group controlId="installenddate">
                                        <Form.Label>Installation End Date</Form.Label>
                                        <Form.Control type="date" name='installationEDate' onChange={handleChange} required/>
                                        <Form.Control.Feedback type="invalid">
                                            Please choose a valid date.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col lg="2">
                                    <Form.Group controlId="installendtime">
                                        <Form.Label>Installation End Time</Form.Label>
                                        <Form.Control type="time" name='installationETime' onChange={handleChange} required/>
                                        <Form.Control.Feedback type="invalid">
                                            Please choose a valid time.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg="2">
                                    <Form.Group controlId="installationTechnician">
                                        <Form.Label>Technician</Form.Label>
                                        <Form.Control as="select" disabled={!installation.installationSDate || !installation.installationSTime} name='installationTechnician' onChange={handleChange} required>
                                            <option value=""> Select </option>
                                            {technicians.map((t, index) =>(
                                                <option key={index} value={t.technician_id}>{t.complete_name}</option>
                                            ))}
                                        </Form.Control>
                                        {technicians.length === 0 ? (<p style={{color: 'red'}}>No technicians are available</p>) : mod ? (<p>Some technicians are unavailable</p>) : null}
                                    </Form.Group>
                                </Col>
                            </>
                        ) : null}
                        

                        
                    </Row>
                </>
            ) : null}

            <Row className="mt-4">
                <Col lg="2"/>

                
                {hasService ? (
                    <>
                        <Col lg="2">
                            <Form.Group controlId="installstartdate">
                                <Form.Label>Service Date</Form.Label>
                                <Form.Control type="date" name='serviceDate' onChange={handleChange} required/>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid date.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col lg="2">
                            <Form.Group controlId="installstarttime">
                                <Form.Label>Service Time</Form.Label>
                                <Form.Control type="time" name='serviceTime' onChange={handleChange} required/>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid time.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col lg="2">
                            <Form.Group controlId="paymentMode">
                                <Form.Label>Technician</Form.Label>
                                <Form.Control as="select" name='serviceTechnician' onChange={handleChange} required>
                                    <option value=""> Select </option>
                                    {technicians2.map((t, index) =>(
                                        <option key={index} value={t.technician_id}>{t.complete_name}</option>
                                    ))}
                                </Form.Control>
                                {mod2 ? (<p>One or more technicians are unavailable with the given schedule</p>) : null}
                                <Form.Control.Feedback type="invalid">
                                    Please choose a mode of payment.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </>
                ) : null}

                
            </Row>

            <Row className="mt-5">
                <Col lg="2"/>

                <Col lg="2">
                    <button type='submit' className="btn w-100" style={{color: "white", backgroundColor: "#014c91"}}>
                    {React.createElement(FaBriefcase, { size: 18, style: { marginRight: '5px' } })}   Convert to Sale
                    </button>
                </Col>

                <Col lg="2">
                    <button onClick={(e) => { e.preventDefault(); handleCancel(); }} className="btn w-100" style={{color: "white", backgroundColor: "#6c757d"}}>
                    Cancel
                    </button>
                </Col>
            </Row>
    </Form>

    </div>
    );
};

export default SaleConvertDetails;
