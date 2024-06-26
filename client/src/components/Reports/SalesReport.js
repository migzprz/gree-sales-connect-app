import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import { Row, Col, Card, Table } from 'react-bootstrap';
import logo from '../../assets/gree_documentlogo.png';
import Spinner from 'react-bootstrap/Spinner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate, NavLink, useParams  } from 'react-router-dom';
import axios from 'axios';

const SalesReport = () => {

  const { syear,smonth,sday,eyear,emonth,eday } = useParams();
  const [reportDetails, setReportDetails] = useState({
        date_generated: new Date(),
        user: 'Perez, Miguel',
        start_date: new Date(parseInt(syear), parseInt(smonth)-1, parseInt(sday)),
        end_date: new Date(parseInt(eyear), parseInt(emonth)-1, parseInt(eday)),
  })
  const [totalSales, setTotalSales] = useState('')
  const [periodDays, setPeriodDays] = useState('')
  const [salesGrowth, setSalesGrowth] = useState('')

  const [productData, setProductData] = useState([])
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getReportSalesTotal/${syear}/${smonth}/${sday}/${eyear}/${emonth}/${eday}`);
                console.log(response.data[0].total);
                const totalSales = response.data[0].total;

                // Calculate the start and end dates for the previous period
                const startDatePrev = new Date(parseInt(syear), parseInt(smonth) - 1, parseInt(sday));
                const endDatePrev = new Date(parseInt(eyear), parseInt(emonth) - 1, parseInt(eday));
                const startDate = new Date(parseInt(syear), parseInt(smonth) - 1, parseInt(sday));
                const endDate = new Date(parseInt(eyear), parseInt(emonth) - 1, parseInt(eday));

                // Calculate the number of days for the previous period dynamically
                const diffTime = endDate - startDate;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Calculate days between two dates
                startDatePrev.setDate(startDatePrev.getDate() - diffDays); // Subtract the number of days from the start date
                endDatePrev.setDate(endDatePrev.getDate() - diffDays); // Subtract the number of days from the end date

                // Format the previous period dates
                const syearPrev = startDatePrev.getFullYear();
                const smonthPrev = startDatePrev.getMonth() + 1;
                const sdayPrev = startDatePrev.getDate();
                const eyearPrev = endDatePrev.getFullYear();
                const emonthPrev = endDatePrev.getMonth() + 1;
                const edayPrev = endDatePrev.getDate();

                // Fetch report sales total for the previous period
                const responsePrev = await axios.get(`http://localhost:4000/api/getReportSalesTotal/${syearPrev}/${smonthPrev}/${sdayPrev}/${eyearPrev}/${emonthPrev}/${edayPrev}`);
                console.log(responsePrev.data[0].total);
                const totalSalesPrev = responsePrev.data[0].total;

                // Calculate sales growth
                const growth = (((totalSales - totalSalesPrev) / totalSalesPrev) * 100).toFixed(2);
                let growthWithSign;

                if (!isFinite(growth)) {
                    growthWithSign = 'No Percentage to Display';
                } else {
                    const growthLimited = Math.min(Math.abs(growth), 100000);
                    growthWithSign = (growth > 0 ? `+${growthLimited}` : `-${growthLimited}`) + '%';
                }

                // Store total sales, sales growth, and period days in state
                setTotalSales(totalSales);
                setSalesGrowth(growthWithSign); // Store sales growth with sign as string
                setPeriodDays(diffDays); // Store number of days in the current period
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        const fetchProductsData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getReportSalesProducts/${syear}/${smonth}/${sday}/${eyear}/${emonth}/${eday}`);
                console.log(response.data);
                
                setProductData(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        
        fetchData();
        fetchProductsData();
    }, []);

    useEffect(() => {
        const splitDataIntoPages = async () => {
            const itemsPerPage = 16;
            const totalPages = Math.ceil(productData.length / itemsPerPage);
            const pagesArray = Array.from({ length: totalPages }, (_, index) => {
                const startIndex = index * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                return productData.slice(startIndex, endIndex);
            });
            setPages(pagesArray);
        };
    
        splitDataIntoPages();
    }, [productData]);
    

    useEffect(() => {
        console.log(pages)
    }, [productData]);





    
    const navigate = useNavigate()

    const [validated, setValidated] = useState(false);
    const [preview, setPreview] = useState(false);
    const [loader, setLoader] = useState(false);
    const [totalSum, setTotalSum] = useState(null)
    const [checkDl, setCheckDl] = useState(true)
    //const [address, setAddress] = useAddressString(quotations)

    //Date Conversion Function
    function formatDate(dateString) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Parse the date string to a Date object
        const date = new Date(dateString);
        
        // Get day, month, and year from the date object
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        
        // Format day with leading zero if necessary
        const formattedDay = day < 10 ? '0' + day : day;
        
        // Format date in desired format
        return `${formattedDay}-${months[monthIndex]}-${year}`;
    }

    //Amount Conversion Function
    const formatNumber = (number) => {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    

    const downloadPDF = () => {
        setLoader(true);
    
        const promises = pages.map((page, index) => {
            const capture = document.querySelector(`.quotation-file.page-${index}`);
            return html2canvas(capture, { scale: 2 });
        });
    
        Promise.all(promises).then((canvases) => {
            const doc = new jsPDF('p', 'in', 'letter');
            const imgWidth = 8.5;
            const imgHeight = 11;
    
            canvases.forEach((canvas, index) => {
                const imgData = canvas.toDataURL('image/png');
                if (index !== 0) {
                    doc.addPage();
                }
                doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            });
    
            setLoader(false);
            doc.save(`sales_report_${formatDate(reportDetails.date_generated)}.pdf`);
        });
    };
    

    const handleSubmit = () => {
        if (checkDl) { downloadPDF() }
    }

 
    
    
    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Preview Generated Report</h1>
            <h5>View or download generated report</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

            {pages.map((item, index) => (    
            <Card className={`quotation-file mt-2 page-${index}`} style={{ width: '8.5in', height: '11in', padding: '0.5in', overflow: 'auto' }}>
                <Row>
                    <Col lg="7">
                        <img src={logo} style={{ maxWidth: '100%', height: 'auto', opacity: '1', paddingBottom: '7px' }} alt="Banner" />
                    </Col>
                    <Col lg="5" style={{ textAlign: 'right' }}>
                        <h1 className="me-2" style={{ fontFamily: 'Cambria', color: '#0070c0', fontSize: '2em', fontWeight: 'bold' }}>SALES REPORT</h1>
                    </Col>
                </Row>

                <Table style={{ fontSize:"13px", borderCollapse: 'collapse', width: '100%', border: 'none' }}>
                    <tbody>
                        <tr>
                            <td colSpan="4" style={{ padding: '0', border: 'none'}}>Generated on<strong> {formatDate(reportDetails.date_generated)} {new Date(reportDetails.date_generated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong> </td> 
                        </tr>
                        <tr>
                            <td colSpan="4" style={{ padding: '0', border: 'none'}}>Generated by <strong>{reportDetails.user}</strong> </td> 
                        </tr>
                        <tr>
                            <td colSpan="4" style={{ padding: '0', border: 'none'}}>Period Covered: <strong>{formatDate(reportDetails.start_date)} to {formatDate(reportDetails.end_date)}</strong> </td> 
                        </tr>
                        {index === 0 ? 
                            <>
                            <tr style={{ height: '10px' }}></tr> 
                            <tr >
                            <td colSpan="4" style={{ padding: '0', border: '1px solid black', color: 'white', background: '#082464', textAlign: 'center' }}>
                                <strong>Sales Overview </strong>
                            </td>
                            </tr>
                            <tr>
                                <td colSpan="2" style={{ padding: '3px', border: '1px solid black'}}>Total Sales Revenue </td>
                                <td colSpan="2" style={{ padding: '3px', border: '1px solid black', textAlign: 'right' }}><strong>₱ {formatNumber(totalSales)} </strong></td>  
                            </tr>
                            <tr>
                                <td colSpan="2" style={{ padding: '3px', border: '1px solid black'}}>Sales Growth (vs. Last {periodDays} Days)</td>
                                <td colSpan="2" style={{ padding: '3px', border: '1px solid black', textAlign: 'right', color: salesGrowth.startsWith('+') ? 'green' : 'red' }}><strong>{salesGrowth} </strong></td>
                            </tr>
                            </> : null}

                        {item.some(product => product.type === 1) && (
                            <>
                                <tr style={{ height: '10px' }}></tr> 
                                <tr>
                                    <td colSpan="4" style={{ padding: '3px', border: '1px solid black', color: 'white', background: '#082464', textAlign: 'center' }}>
                                        <strong>Window-Type Products Breakdown</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '3px', border: '1px solid black', width: '50%' }}><strong>Window-Type Product</strong></td>
                                    <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '12%' }}><strong>Units Sold</strong></td>
                                    <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '23%' }}><strong>Average Selling Price</strong></td>
                                    <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '15%' }}><strong>Revenue</strong></td>
                                </tr>
                                {item.filter(product => product.type === 1).map((product, index) => (
                                    <tr key={index}>
                                        <td style={{ padding: '3px', border: '1px solid black', width: '50%' }}>
                                            <NavLink style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '3px' }}
                                                to={`/viewreport/2/${syear}/${smonth}/${sday}/${eyear}/${emonth}/${eday}/${product.product_id}/1`}
                                                activeStyle={{ backgroundColor: 'lightgray' }}
                                                onMouseOver={(e) => e.target.style.backgroundColor = 'lightgray'}
                                                onMouseOut={(e) => e.target.style.backgroundColor = ''}
                                            >
                                                {product.description}
                                            </NavLink>
                                        </td>
                                        <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '12%' }}>{product.units}</td>
                                        <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '23%' }}>₱ {formatNumber(product.average_amount)}</td>
                                        <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '15%' }}>₱ {formatNumber(product.revenue)}</td>
                                    </tr>
                                ))}
                            </>
                        )}

                        {item.some(product => product.type === 2) && (
                            <>
                                <tr style={{ height: '10px' }}></tr> 
                                <tr>
                                    <td colSpan="4" style={{ padding: '3px', border: '1px solid black', color: 'white', background: '#082464', textAlign: 'center' }}>
                                        <strong>Split-Type Products Breakdown</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '3px', border: '1px solid black', width: '50%' }}><strong>Split-Type Product</strong></td>
                                    <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '12%' }}><strong>Units Sold</strong></td>
                                    <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '23%' }}><strong>Average Selling Price</strong></td>
                                    <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '15%' }}><strong>Revenue</strong></td>
                                </tr>
                                {item.filter(product => product.type === 2).map((product, index) => (
                                    <tr key={index}>
                                        <td style={{ padding: '3px', border: '1px solid black', width: '50%' }}>
                                            <NavLink style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '3px' }}
                                                to={`/viewreport/2/${syear}/${smonth}/${sday}/${eyear}/${emonth}/${eday}/${product.product_id}/1`}
                                                activeStyle={{ backgroundColor: 'lightgray' }}
                                                onMouseOver={(e) => e.target.style.backgroundColor = 'lightgray'}
                                                onMouseOut={(e) => e.target.style.backgroundColor = ''}
                                            >
                                                {product.description}
                                            </NavLink>
                                        </td>
                                        <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '12%' }}>{product.units}</td>
                                        <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '23%' }}>₱ {formatNumber(product.average_amount)}</td>
                                        <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '15%' }}>₱ {formatNumber(product.revenue)}</td>
                                    </tr>
                                ))}
                            </>
                        )}

                        {item.some(product => product.type === 3) && (
                            <>
                                <tr style={{ height: '10px' }}></tr> 
                                <tr>
                                    <td colSpan="4" style={{ padding: '3px', border: '1px solid black', color: 'white', background: '#082464', textAlign: 'center' }}>
                                        <strong>AC Parts Breakdown</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '3px', border: '1px solid black', width: '50%' }}><strong>AC Parts</strong></td>
                                    <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '12%' }}><strong>Units Sold</strong></td>
                                    <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '23%' }}><strong>Average Selling Price</strong></td>
                                    <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '15%' }}><strong>Revenue</strong></td>
                                </tr>
                                {item.filter(product => product.type === 3).map((product, index) => (
                                    <tr key={index}>
                                        <td style={{ padding: '3px', border: '1px solid black', width: '50%' }}>
                                            <NavLink style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '3px' }}
                                                to={`/viewreport/2/${syear}/${smonth}/${sday}/${eyear}/${emonth}/${eday}/${product.product_id}/2`}
                                                activeStyle={{ backgroundColor: 'lightgray' }}
                                                onMouseOver={(e) => e.target.style.backgroundColor = 'lightgray'}
                                                onMouseOut={(e) => e.target.style.backgroundColor = ''}
                                            >
                                                {product.description}
                                            </NavLink>
                                        </td>
                                        <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '12%' }}>{product.units}</td>
                                        <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '23%' }}>₱ {formatNumber(product.average_amount)}</td>
                                        <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '15%' }}>₱ {formatNumber(product.revenue)}</td>
                                    </tr>
                                ))}
                            </>
                        )}

                        
                        {item.some(product => product.type === 4) && (
                            <>
                                <tr style={{ height: '10px' }}></tr> 
                                <tr>
                                    <td colSpan="4" style={{ padding: '3px', border: '1px solid black', color: 'white', background: '#082464', textAlign: 'center' }}>
                                        <strong>Services Rendered Breakdown</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '3px', border: '1px solid black', width: '50%' }}><strong>Service Rendered</strong></td>
                                    <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '12%' }}><strong>Units Sold</strong></td>
                                    <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '23%' }}><strong>Average Selling Price</strong></td>
                                    <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '15%' }}><strong>Revenue</strong></td>
                                </tr>
                                {item.filter(product => product.type === 4).map((product, index) => (
                                    <tr key={index}>
                                        <td style={{ padding: '3px', border: '1px solid black', width: '50%' }}>
                                            <NavLink style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '3px' }}
                                                to={`/viewreport/2/${syear}/${smonth}/${sday}/${eyear}/${emonth}/${eday}/${product.product_id}/3`}
                                                activeStyle={{ backgroundColor: 'lightgray' }}
                                                onMouseOver={(e) => e.target.style.backgroundColor = 'lightgray'}
                                                onMouseOut={(e) => e.target.style.backgroundColor = ''}
                                            >
                                                {product.description}
                                            </NavLink>
                                        </td>
                                        <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '12%' }}>{product.units}</td>
                                        <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '23%' }}>₱ {formatNumber(product.average_amount)}</td>
                                        <td style={{ padding: '3px', border: '1px solid black', textAlign: 'right', width: '15%' }}>₱ {formatNumber(product.revenue)}</td>
                                    </tr>
                                ))}
                            </>
                        )}

                        {index === pages.length - 1 ? 
                            <>
                                <tr style={{ height: '10px' }}></tr> 
                                <tr>
                                    <td colSpan="4" style={{ padding: '9px', border: '1px solid black', color: 'white', background: '#082464', textAlign: 'center' }}>
                                        <strong>*** END OF REPORT *** </strong>
                                    </td>
                                </tr>
                            </>
                        : null}

                    </tbody>
                </Table>
                <div style={{ position: 'absolute', bottom: '20px', right: '50px' }}>
                    Page <strong> {index + 1} </strong> of <strong>{pages.length}</strong>
                </div>
            </Card>
            ))}

       

            <button className="mt-4 btn w-40" onClick={handleSubmit} disabled={(loader)} style={{color: "white", backgroundColor: "#014c91"}}>
                
                {!loader?(
                    <span> {React.createElement(FaDownload, { size: 18, style: { marginRight: '5px' } })}  Download Forms </span>
                ):(
                  <span> <Spinner animation="border" size="sm" />  Downloading </span>
                )}
            
            </button>
           
           
        </div>
    );
};

export default SalesReport;
