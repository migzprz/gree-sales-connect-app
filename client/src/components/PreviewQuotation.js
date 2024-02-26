import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaDownload, FaEye } from 'react-icons/fa';
import { Row, Col, Card, Table } from 'react-bootstrap';
import '../index.css';
import PreviewReport from './PreviewReport';
import logo from '../assets/gree_documentlogo.png';
import Spinner from 'react-bootstrap/Spinner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';





const PreviewQuotation = () => {

    const [validated, setValidated] = useState(false);
    const [preview, setPreview] = useState(false);
    const [loader, setLoader] = useState(false);

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
    
    
    
    
    const quotationData = [
      { qty: 1, description: 'Product A', unitModel: 'Model 123', srp: 100, discountedPrice: 80, lineTotal: 80 },
      { qty: 2, description: 'Product B', unitModel: 'Model 456', srp: 50, discountedPrice: 40, lineTotal: 80 },
      { qty: 1, description: 'Product C', unitModel: 'Model 789', srp: 120, discountedPrice: 100, lineTotal: 100 },
  ];

  const [terms, setTerms] = useState({
    A: 
    `First 10 feet of copper tubing, rubber insulation, Breaker, PVC drain pipe and other consumables`,
    B1:
    `One (1) year from the date of start-up on units with factory defects.`,
    B2:
    `Five (5) years warranty on the Compressor`,
    B3:
    `No warranty claims unless units are fully paid by the client.`,
    C1: 
    `Warranty: Warranty for workmanship within a period of three (3) months.`,
    C2: 
    `Work Schedule: To be arranged after receipt of down-payment.`,
    D1: 
    `i. Electrical power lines of sufficient capacity and appropriate phase and voltage terminating to a main disconnect switch.`,
    D2: 
    `ii. Construction of equipment platform, foundation of support and enclosure where necessary including all civil works required such as provision for opening through walls, floor, ceiling, patching and repainting of same after installation thereof; and`,
    D3: 
    `iii. Plans, Permits and other licenses.`,
    D4: 
    `In Excess of 10 feet piping to be charged:`,
    D5: 
    `350`,
    D6: 
    `php per feet on the 1.0hp-1.5hp Wall Mounted Type`,
    D7: 
    `400`,
    D8: 
    `php per feet for 2.0hp-2.5hp Wall Mounted Type`,
    D9: 
    `500`,
    D10: 
    `php per feet for 3.0hp-4.0hp Wall Mounted Type. 4.0hp Floor Mounted Type`,
    D11: 
    `550`,
    D12: 
    `php per feet for 4.0hp Cassette Type. 7.0hp Cassette Type.`,
    E: 
    `*These prices are subject to change without prior notice. If a unit runs out of stock, the price of this unit may change as well`,
});

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
                        <tr>
                            <td colSpan="7" style={{ padding: '0', border: 'none'}}>Name: Miguel Josh C. Perez</td> 
                        </tr>
                        <tr>
                            <td colSpan="7" style={{ padding: '0', border: 'none'}}>Company Name/Buidling: Sheperd Animal Clinic</td> 
                        </tr>
                        <tr>
                            <td colSpan="7" style={{ padding: '0', border: 'none'}}>Street Address: Sheperd Animal Clinic</td> 
                        </tr>
                        <tr>
                            <td colSpan="7" style={{ padding: '0', border: 'none'}}>Delivery Address: Sheperd Animal Clinic</td> 
                        </tr>
                        <tr>
                            <td colSpan="7" style={{ padding: '0', border: 'none'}}>Phone: 09165189598</td> 
                        </tr>
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
                        {quotationData.map((item, index) => (
                            <tr key={index}>
                                <td style={{ padding: '0', border: '1px solid black', textAlign: 'center' }}>{item.qty}</td>
                                <td colSpan="2" style={{ padding: '0', border: '1px solid black', textAlign: 'center' }}>{item.description}</td>
                                <td style={{ padding: '0', border: '1px solid black', textAlign: 'center' }}>{item.unitModel}</td>
                                <td style={{ padding: '0', border: '1px solid black', textAlign: 'center' }}>{item.srp}</td>
                                <td style={{ padding: '0', border: '1px solid black', textAlign: 'center' }}>{item.discountedPrice}</td>
                                <td style={{ padding: '0', border: '1px solid black', textAlign: 'right' }}>
                                    <span style={{ float: 'left', marginLeft: '5px' }}>₱</span> 
                                    <span style={{ marginRight: '5px' }}>{item.lineTotal}</span>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="5" style={{ padding: '0', border: 'none' }}/>
                            <td style={{ padding: '0', border: 'none', textAlign: 'right' }}>SUBTOTAL:</td>
                            <td style={{ padding: '0', border: 'none', borderBottom: '2px solid black', textAlign: 'right' }}>
                                <span style={{ float: 'left', marginLeft: '5px' }}>₱</span> 
                                <span style={{ marginRight: '5px' }}>200</span>
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
                                <span style={{ marginRight: '5px' }}>200</span>
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

            <button className="mt-4 btn w-40" onClick={downloadPDF} disabled={(loader)} style={{color: "white", backgroundColor: "#014c91"}}>
                
                {!loader?(
                  <span> {React.createElement(FaDownload, { size: 18, style: { marginRight: '5px' } })}  Download Forms </span>
                ):(
                  <span> <Spinner animation="border" size="sm" />  Downloading </span>
                )}
            
            </button>
        </div>
    );
};

export default PreviewQuotation;
