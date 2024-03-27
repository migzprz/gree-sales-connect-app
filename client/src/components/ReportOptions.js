import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaDownload, FaCheck} from 'react-icons/fa';
import { Row, Col, Form, CardBody } from 'react-bootstrap';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReportOptions = () => {
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [reportOption, setReportOption] = useState({
        report_type: '',
        start_date: null,
        end_date: null
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log(reportOption)
    }, [reportOption]);


    const handleChange = (event) => {
        const { id, value } = event.target;
        if (id === 'startdate') {
            setReportOption(prevState => ({
                ...prevState,
                start_date: value
            }));
        } else if (id === 'enddate') {
            setReportOption(prevState => ({
                ...prevState,
                end_date: value
            }));
        } else {
            setReportOption(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(null);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            
            const { start_date, end_date } = reportOption;
            const [syear, smonth, sday] = start_date.split('-');
            const [eyear, emonth, eday] = end_date.split('-');
            try {

                if(reportOption.report_type === '1'){
                    const response = await axios.get(`http://localhost:4000/api/getReportSalesTotal/${syear}/${smonth}/${sday}/${eyear}/${emonth}/${eday}`);

                    if (new Date(start_date) > new Date(end_date)) {
                        setErrorMessage("*Invalid Date Range");
                        setValidated(false);
                    } else if (response.data[0].total === null) {
                        setErrorMessage('*Insufficient Data');
                        setValidated(false);
                    } else {
                        navigate(`/viewreport/${reportOption.report_type}/${syear}/${smonth}/${sday}/${eyear}/${emonth}/${eday}`);
                    }
                } else if(reportOption.report_type === '3'){
                    const response = await axios.get(`http://localhost:4000/api/getQuotationConversionReport/${syear}/${smonth}/${sday}/${eyear}/${emonth}/${eday}`);

                    if (new Date(start_date) > new Date(end_date)) {
                        setErrorMessage("*Invalid Date Range");
                        setValidated(false);
                    } else if (response.data.length === 0) {
                        setErrorMessage('*Insufficient Data');
                        setValidated(false);
                    } else {
                        navigate(`/viewreport/${reportOption.report_type}/${syear}/${smonth}/${sday}/${eyear}/${emonth}/${eday}`);
                    }
                } else if(reportOption.report_type === '4'){
                    const response = await axios.get(`http://localhost:4000/api/getWarrantyClaimsReport/${syear}/${smonth}/${sday}/${eyear}/${emonth}/${eday}`);

                    if (new Date(start_date) > new Date(end_date)) {
                        setErrorMessage("*Invalid Date Range");
                        setValidated(false);
                    } else if (response.data.length === 0) {
                        setErrorMessage('*Insufficient Data');
                        setValidated(false);
                    } else {
                        navigate(`/viewreport/${reportOption.report_type}/${syear}/${smonth}/${sday}/${eyear}/${emonth}/${eday}`);
                    }
                } else if(reportOption.report_type === '5'){
                    const response = await axios.get(`http://localhost:4000/api/getProfitStatement/${syear}/${smonth}/${sday}/${eyear}/${emonth}/${eday}`);

                    if (new Date(start_date) > new Date(end_date)) {
                        setErrorMessage("*Invalid Date Range");
                        setValidated(false);
                    } else if (response.data.length === 0 || response.data.some(item => item.type >= 1 && item.type <= 4 && item.type >= 5 && item.type <= 6)) {
                        setErrorMessage('*Insufficient Data');
                        setValidated(false);
                    }
                     else {
                        navigate(`/viewreport/${reportOption.report_type}/${syear}/${smonth}/${sday}/${eyear}/${emonth}/${eday}`);
                    }
                }
                
            } catch (error) {
                console.error('Error fetching report:', error);
                setErrorMessage('An error occurred while fetching the report.');
            }
        }
    };

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Generate Report</h1>
            <h5>Choose a report to generate</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

        <Row>

            {/*Forms*/ }
            <Col lg="6">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mt-3">
                    <Col lg="12">
                        <Form.Group controlId="report_type">
                            <Form.Label>Report Type</Form.Label>
                            <Form.Control as="select" required onChange={handleChange}>
                                <option value=""> Select </option>
                                <option value="1"> Sales Report</option>
                                <option value="3"> Quotation Conversion Status Report </option>
                                <option value="4"> Warranty Claims Report </option>
                                <option value="5"> Profit and Loss Statement </option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please choose a report type.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3 mb-3">
                    <Col lg="6">
                        <Form.Group controlId="startdate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" required onChange={handleChange}/>
                            <Form.Control.Feedback type="invalid">
                                Please choose a valid date.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg="6">
                        <Form.Group controlId="enddate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" required onChange={handleChange}/>
                            <Form.Control.Feedback type="invalid">
                                Please choose a valid date.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

            {errorMessage ? 
                <Row className="mt-2">
                    <Col lg="6"/>
                    <Col lg="6" className="text-center">
                        <span style={{ color: "#FF0000" }}> {errorMessage} </span> 
                    </Col>
                </Row> 
            : null}



                <Row className="mt-1" >
                    <Col lg="6"/>
                    <Col lg="6">
                        <button className="btn w-100" style={{color: "white", backgroundColor: "#014c91"}}>
                            {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })}  Generate Report
                        </button>
                    </Col>
                </Row>
                </Form>
            </Col>

            
            
        </Row>
        



       
        

        
           


        </div>
    );
};

export default ReportOptions;
