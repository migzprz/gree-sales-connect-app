import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaDownload, FaEye } from 'react-icons/fa';
import { Row, Col, Card, Table } from 'react-bootstrap';
import '../index.css';
import PreviewReport from './Reports/SalesReport';
import logo from '../assets/gree_documentlogo.png';
import Spinner from 'react-bootstrap/Spinner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import useAddressString from '../hooks/useAddressString';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from "react-icons/md";

const PreviewQuotation = ({ client, offers, terms, POST, type }) => {

    const navigate = useNavigate()

    const [validated, setValidated] = useState(false);
    const [preview, setPreview] = useState(false);
    const [loader, setLoader] = useState(false);
    const [totalSum, setTotalSum] = useState(null)
    const [checkDl, setCheckDl] = useState(true)

    const downloadPDF = () => {
      const capture1 = document.querySelector('.quotation-file');
      const capture2 = document.querySelector('.terms-file');
    
      setLoader(true);
    
      Promise.all([
        html2canvas(capture1, { scale: 2 }),
        html2canvas(capture2, { scale: 2 })
      ]).then((canvases) => {
        const imgData1 = canvases[0].toDataURL('image/png');
        const imgData2 = canvases[1].toDataURL('image/png');
    
        const doc = new jsPDF('p', 'in', 'letter');
        const imgWidth = 8.5;
        const imgHeight = 11;
    
        doc.addImage(imgData1, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.addPage();
        doc.addImage(imgData2, 'PNG', 0, 0, imgWidth, imgHeight);
    
        setLoader(false);
        doc.save('quotation.pdf');
      });
    };

    const handleSubmit = () => {
        if (checkDl) { downloadPDF() }
        if (type !== 'view') { POST() }
    }

    const handleCheckboxChange = () => {
        setCheckDl((prev) => (!prev))
    }

    const handleBack = () => {
        navigate(-1)
    }

    
    // Get price sum of all products selected
    useEffect(() => {
        var total = 0
        offers.forEach((item) => {
            console.log(item.quantity, item.discPrice)
            total += Number(item.quantity)*item.discPrice
            console.log(total)
        })
        setTotalSum(total)
    }, [offers])
    useEffect(() => {
        console.log('Total Price: ', totalSum)
    }, [totalSum])

    //Amount Conversion Function
    const formatNumber = (number) => {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    
    
    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Preview Generated Quotation</h1>
            <h5>View or download generated quotation and terms & conditions</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

            <Card className="quotation-file" style={{ width: '8.5in', height: '11in', padding: '0.5in' }}>
            <Row>
                <Col style={{ textAlign: 'right' }}>
                    <h1 className="me-2" style={{ fontFamily: 'Cambria', color: '#0070c0', fontSize: '3em', fontWeight: 'bold' }}>PRICE QUOTATION</h1>
                </Col>
            </Row>
            <Row style={{ margin: '-0.1in 0' }}>
                <img src={logo} style={{ width: '70%', height: 'auto', opacity: '1', padding: '0' }} alt="Banner" />
            </Row>
                <Table style={{ fontSize:"13px", borderCollapse: 'collapse', width: '100%', border: 'none' }}>
                    <tbody>
                        <tr>
                            <td colSpan="7" style={{ padding: '0', border: 'none'}}>Address</td> 
                        </tr>
                        <tr>
                            <td style={{ padding: '0', border: 'none'}}><strong>Tel: </strong></td> 
                            <td colSpan="77" style={{ padding: '0', border: 'none'}}>(02) 8367 8677</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="4" style={{ padding: '0', border: 'none' }}>(02) 8367 8677 (02) 8367 8677</td>
                            <td style={{ padding: '0', border: 'none', textAlign: 'right' }}><strong>Requested by:</strong></td>
                            <td style={{ padding: '0', border: 'none', textAlign: 'center'  }}>Ms. Jheng Co</td>
                        </tr>
                        <tr>
                            <td colSpan="5" style={{ padding: '0', border: 'none'}}><strong>Office Mobile no.:</strong> 09369573408 , 09688617147</td>
                            <td style={{ padding: '0', border: 'none', textAlign: 'right' }}><strong>Date:</strong></td>
                            <td style={{ padding: '0', border: 'none', textAlign: 'center'  }}>19-Aug-2023</td>
                        </tr>
                        <tr>
                            <td colSpan="5" style={{ padding: '0', border: 'none'}}><strong>Email:</strong> cfhiairconsolutions@gmail.com</td>
                            <td style={{ padding: '0', border: 'none'}}/>
                            <td style={{ color:"red", padding: '0', border: 'none', textAlign: 'center'}}><strong>BUYER'S COPY</strong></td>
                        </tr>  
                        <tr>
                            <td colSpan="7" style={{ padding: '0', border: 'none', color: 'white', background: '#082464'}}><strong>{'\u00A0'} BILL TO</strong></td>
                        </tr>
                        {client ? (
                            <>
                                <tr>
                                    <td colSpan="7" style={{ padding: '0', border: 'none'}}>Name: {client.client_name || client.returningClientFirstName ? client.returningClientFirstName + ' ' + client.returningClientLastName : client.firstName + ' ' + client.lastName}</td> 
                                </tr>
                                <tr>
                                    <td colSpan="7" style={{ padding: '0', border: 'none'}}>Company Name/Buidling: {client.company_name || client.returningClientCompanyName ? client.returningClientCompanyName : client.companyName}</td> 
                                </tr>
                                <tr>
                                    <td colSpan="7" style={{ padding: '0', border: 'none'}}>Street Address: {client.site_address ? client.site_address : ''}</td> 
                                </tr>
                                <tr>
                                    <td colSpan="7" style={{ padding: '0', border: 'none'}}>Delivery Address: {client.site_address ? client.site_address : ''}</td> 
                                </tr>
                                <tr>
                                    <td colSpan="7" style={{ padding: '0', border: 'none'}}>Phone: {client.contact_number || client.returningClientContactNumber ? client.returningClientContactNumber : client.contactNumber}</td> 
                                </tr>
                            </>
                        ): null}
                        <tr>
                            <td style={{ padding: '0', border: '1px solid white', color: 'white', background: '#082464', textAlign: 'center', verticalAlign: 'middle'}}>QTY</td> 
                            <td colSpan="2" style={{ padding: '0', border: '1px solid white', color: 'white', background: '#082464', textAlign: 'center', verticalAlign: 'middle'}}>DESCRIPTION</td>
                            <td style={{ padding: '0', border: '1px solid white', color: 'white', background: '#082464', textAlign: 'center', verticalAlign: 'middle'}}>UNIT MODEL</td>
                            <td style={{ padding: '0', border: '1px solid white', color: 'white', background: '#082464', textAlign: 'center', verticalAlign: 'middle'}}>SRP</td>
                            <td style={{ padding: '0', border: '1px solid white', color: 'white', background: '#082464', textAlign: 'center', verticalAlign: 'middle'}}>DISCOUNTED PRICE</td>
                            <td style={{ padding: '0', border: '1px solid white', color: 'white', background: '#082464', textAlign: 'center', verticalAlign: 'middle'}}>LINE TOTAL</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0', border: 'none', width: '5%'}}/>
                            <td style={{ padding: '0', border: 'none', width: '10%'}}/>
                            <td style={{ padding: '0', border: 'none', width: '25%'}}/>
                            <td style={{ padding: '0', border: 'none', width: '15%'}}/>
                            <td style={{ padding: '0', border: 'none', width: '15%'}}/>
                            <td style={{ padding: '0', border: 'none', width: '15%'}}/>
                            <td style={{ padding: '0', border: 'none', width: '15%'}}/>
                        </tr>

                        {/* Quotation items */}
                        {offers.map((item, index) => (
                            <tr key={index}>
                                <td style={{ padding: '0', border: '1px solid black', textAlign: 'center' }}>{item.quantity}</td>
                                <td colSpan="2" style={{ padding: '0', border: '1px solid black', textAlign: 'center' }}>{item.display || item.description || item.article}</td>
                                <td style={{ padding: '0', border: '1px solid black', textAlign: 'center' }}>{item.unit_model || item.name || '--'}</td>
                                <td style={{ padding: '0', border: '1px solid black', textAlign: 'center' }}>{(item.srp || item.product_srp || item.service_srp || item.parts_srp) ? formatNumber(item.srp || item.product_srp || item.service_srp || item.parts_srp) : '0.00'}</td>
                                <td style={{ padding: '0', border: '1px solid black', textAlign: 'center' }}>{item.discPrice ? formatNumber(item.discPrice) : '0.00'}</td>
                                <td style={{ padding: '0', border: '1px solid black', textAlign: 'right' }}>
                                    <span style={{ float: 'left', marginLeft: '5px' }}>₱</span> 
                                    <span style={{ marginRight: '5px' }}>{(item.quantity && item.discPrice) ? formatNumber(Number(item.quantity) * item.discPrice) : '0.00'}</span>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="5" style={{ padding: '0', border: 'none' }}/>
                            <td style={{ padding: '0', border: 'none', textAlign: 'right' }}>SUBTOTAL:</td>
                            <td style={{ padding: '0', border: 'none', borderBottom: '2px solid black', textAlign: 'right' }}>
                                <span style={{ float: 'left', marginLeft: '5px' }}>₱</span> 
                                <span style={{ marginRight: '5px' }}>{totalSum ? formatNumber(totalSum) : '0.00'}</span>
                            </td>
                        </tr>

                        <tr style={{ height: '10px' }}>
                            <td style={{ padding: '0', border: 'none', height: '10px', lineHeight: '10px' }}></td>
                        </tr>

                        <tr style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="2" style={{ padding: '0', border: '1px solid black', textAlign: 'center', color: 'red' }}>TOTAL AMOUNT:</td>
                            <td colSpan="2" style={{ padding: '0', border: '1px solid black', background:'#ffc404', textAlign: 'right' }}>
                                <span style={{ float: 'left', marginLeft: '5px' }}>₱</span> 
                                <span style={{ marginRight: '5px' }}>{totalSum ? formatNumber(totalSum) : '0.00'}</span>
                            </td>
                        </tr>

                        <tr style={{ height: '10px'}}>
                            <td style={{ padding: '0', border: 'none', height: '10px', lineHeight: '10px' }}></td>
                        </tr>

                        <tr>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="4" style={{ padding: '0', border: '1px solid black', background: 'lightgrey', fontWeight: 'bold'  }}>Other Comments or Special Instructions</td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="4" style={{ padding: '0', border: '1px solid black'}}>
                              <span>1. TERMS OF PAYMENT: </span>
                              <span style={{color: 'red'}}>50% DOWNPAYMENT AND 50% UPON DELIVERY </span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="4" style={{ padding: '0', border: '1px solid black', color: 'red'}}> FREE INSTALLATION </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="4" style={{ padding: '0', border: '1px solid black'}}>2. All deposits are non-refundable </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="4" style={{ padding: '0', border: '1px solid black'}}>3. Orders and deposits will be forfeited if the product(s) has not been claimed after 7 working days </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="4" style={{ padding: '0', border: '1px solid black', background: 'lightgrey', fontWeight: 'bold'  }}>For Check Payments, please make the check payable to</td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="4" style={{ padding: '0', border: '1px solid black', textAlign: 'center'}}><strong>"Co Feng Huang Inc." </strong></td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="4" style={{ padding: '0', border: '1px solid black', background: 'lightgrey', fontWeight: 'bold'  }}>Transfer/Send the amount to the business acount below.</td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="4" style={{ padding: '0', border: '1px solid black'}}><strong> Receiver:</strong> Co Feng Huang Inc.</td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="4" style={{ padding: '0', border: '1px solid black'}}><strong>Bank:</strong>BDO</td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="4" style={{ padding: '0', border: '1px solid black'}}><strong> Account number:</strong> 001050258167</td>
                        </tr>

                        <tr style={{ height: '10px'}}>
                            <td style={{ padding: '0', border: 'none', height: '10px', lineHeight: '10px' }}></td>
                        </tr>

                        <tr>
                            <td colSpan="4" style={{ padding: '0', border: 'none'}}><strong> Conforme:</strong></td>
                            <td colSpan="3" style={{ padding: '0', border: 'none'}}><strong> Approved by:</strong></td>
                        </tr>

                        <tr style={{ height: '30px'}}>
                            <td style={{ padding: '0', border: 'none', height: '10px', lineHeight: '10px' }}></td>
                        </tr>

                        <tr>
                            <td colSpan="3" style={{ padding: '0', border: 'none', textAlign:'center', borderTop: '1px solid black'}}>Signature over printed name</td>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="2" style={{ padding: '0', border: 'none', textAlign: 'center', borderTop: '1px solid black'}}>President</td>
                        </tr>
                        




                    </tbody>
                </Table>

            </Card>

            <Card className="mt-3 terms-file" style={{ width: '8.5in', height: '11in', padding: '0.5in' }}>
            <Row>
                <Col style={{ textAlign: 'right' }}>
                    <h1 className="me-2" style={{ fontFamily: 'Cambria', color: '#0070c0', fontSize: '3em', fontWeight: 'bold' }}>TERMS AND CONDITIONS</h1>
                </Col>
            </Row>
            <Row style={{ margin: '-0.1in 0' }}>
                <img src={logo} style={{ width: '70%', height: 'auto', opacity: '1', padding: '0' }} alt="Banner" />
            </Row>
                <Table style={{ fontSize:"13px", borderCollapse: 'collapse', width: '100%', border: 'none' }}>
                    <tbody>
                        <tr>
                            <td colSpan="7" style={{ padding: '0', border: 'none'}}>Address</td> 
                        </tr>
                        <tr>
                            <td style={{ padding: '0', border: 'none'}}><strong>Tel: </strong></td> 
                            <td colSpan="77" style={{ padding: '0', border: 'none'}}>(02) 8367 8677</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="4" style={{ padding: '0', border: 'none' }}>(02) 8367 8677</td>
                        </tr>
                        <tr>
                            <td colSpan="5" style={{ padding: '0', border: 'none'}}><strong>Office Mobile no.:</strong> 09369573408 , 09688617147</td>
                        </tr>
                        <tr>
                            <td colSpan="5" style={{ padding: '0', border: 'none'}}><strong>Email:</strong> cfhiairconsolutions@gmail.com</td>
                        </tr>  
                        <tr>
                            <td colSpan="8" style={{ padding: '0', border: 'none', color: 'white', background: '#082464'}}><strong>{'\u00A0'} NOTES:</strong></td>
                        </tr>

                        <tr>
                            <td style={{ padding: '0', border: 'none', width: '5%'}}/>
                            <td style={{ padding: '0', border: 'none', width: '10%'}}/>
                            <td style={{ padding: '0', border: 'none', width: '25%'}}/>
                            <td style={{ padding: '0', border: 'none', width: '5%'}}/>
                            <td style={{ padding: '0', border: 'none', width: '10%'}}/>
                            <td style={{ padding: '0', border: 'none', width: '15%'}}/>
                            <td style={{ padding: '0', border: 'none', width: '15%'}}/>
                            <td style={{ padding: '0', border: 'none', width: '15%'}}/>
                        </tr>
                        
                        <tr style={{fontWeight:'bold'}}>
                            <td style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="7" style={{ padding: '0', border: 'none' }}>A. INCLUSION:</td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="6" style={{ padding: '0', border: 'none' }}>{terms.A}</td>
                        </tr>

                        <tr style={{fontWeight:'bold'}}>
                            <td style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="7" style={{ padding: '0', border: 'none' }}>B. EQUIPMENT:</td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="6" style={{ padding: '0', border: 'none' }}>{terms.B1}</td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="6" style={{ padding: '0', border: 'none' }}>{terms.B2}</td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="6" style={{ padding: '0', border: 'none' }}>{terms.B3}</td>
                        </tr>

                        <tr style={{fontWeight:'bold'}}>
                            <td style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="7" style={{ padding: '0', border: 'none' }}>C. INSTALLATION:</td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="6" style={{ padding: '0', border: 'none' }}>{terms.C1}</td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="6" style={{ padding: '0', border: 'none' }}>{terms.C2}</td>
                        </tr>

                        <tr style={{fontWeight:'bold'}}>
                            <td style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="7" style={{ padding: '0', border: 'none' }}>D. WORKS AND MATERIALS NOT INCLUDED IN THIS QUOTATION:</td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="6" style={{ padding: '0', border: 'none' }}>{terms.D1}</td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="6" style={{ padding: '0', border: 'none' }}>{terms.D2}</td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="6" style={{ padding: '0', border: 'none' }}>{terms.D3}</td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                            <td colSpan="1" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="7" style={{ padding: '0', border: 'none' }}>{terms.D4}</td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="6" style={{ padding: '0', border: 'none' }}><span style={{color: 'red'}}>{terms.D5}</span> {terms.D6}</td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="6" style={{ padding: '0', border: 'none' }}><span style={{color: 'red'}}>{terms.D7}</span> {terms.D8}</td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="6" style={{ padding: '0', border: 'none' }}><span style={{color: 'red'}}>{terms.D9}</span> {terms.D10}</td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="6" style={{ padding: '0', border: 'none' }}><span style={{color: 'red'}}>{terms.D11}</span> {terms.D12}</td>
                        </tr>

                        <tr style={{fontWeight:'bold'}}>
                            <td style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="7" style={{ padding: '0', border: 'none' }}>E. NOTES:</td>
                        </tr>
                        <tr style={{fontWeight:'bold'}}>
                            <td colSpan="2" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="6" style={{ padding: '0', border: 'none', color: 'red' }}>{terms.E}</td>
                        </tr>
                       
                       
                        <tr style={{ height: '20px' }}>
                            <td style={{ padding: '0', border: 'none', height: '10px', lineHeight: '10px' }}></td>
                        </tr>

                        <tr>
                            <td colSpan="5" style={{ padding: '0', border: 'none'}}><strong> Conforme:</strong></td>
                            <td colSpan="3" style={{ padding: '0', border: 'none'}}><strong> Approved by:</strong></td>
                        </tr>

                        <tr style={{ height: '30px'}}>
                            <td style={{ padding: '0', border: 'none', height: '10px', lineHeight: '10px' }}></td>
                        </tr>
                        <tr>
                            <td colSpan="3" style={{ padding: '0', border: 'none', textAlign:'center', borderTop: '1px solid black', marginRight: '10px'}}>Signature over printed name</td>
                            <td colSpan="1" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="1" style={{ padding: '0', border: 'none', textAlign:'center', borderTop: '1px solid black'}}>Date</td>
                            <td colSpan="1" style={{ padding: '0', border: 'none' }}/>
                            <td colSpan="2" style={{ padding: '0', border: 'none', textAlign: 'center', borderTop: '1px solid black'}}>President</td>
                        </tr>
                        <tr style={{fontWeight:'bold', fontSize: '10px'}}>
                            <td colSpan="3" style={{ padding: '0', border: 'none', textAlign:'center', marginRight: '10px'}}>item(s) is received in a good and working condition</td>
                        </tr>

                        




                    </tbody>
                </Table>

            </Card>

            <button className="mt-4 btn w-40" onClick={handleSubmit} disabled={(loader)} style={{color: "white", backgroundColor: "#014c91"}}>
                
                {!loader?(
                    <span> {React.createElement(FaDownload, { size: 18, style: { marginRight: '5px' } })}  {type && type === 'view' ? 'Download' : 'Submit' } Forms </span>
                ):(
                  <span> <Spinner animation="border" size="sm" />  Downloading </span>
                )}
            
            </button>
            {type === 'view' ? (
                <>
                    <button className="mt-4 btn w-40" onClick={handleBack} disabled={(loader)} style={{color: "white", backgroundColor: "#014c91"}}>
                        <span> {React.createElement(MdArrowBack, { size: 18, style: { marginRight: '5px' } })}  Back </span>
                    </button>
                    
                </>
            ) : (<Form><Form.Check type='checkbox' id='downloadCheckbox' label='Download Form as PDF?' onClick={handleCheckboxChange} checked={checkDl}/></Form>)}
            
        </div>
    );
};

export default PreviewQuotation;
