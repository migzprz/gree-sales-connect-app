import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaSave} from 'react-icons/fa';
import { Row, Col, Card, CardBody, Table, Dropdown, CardHeader } from 'react-bootstrap';
import '../index.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios'

const InvoiceDetails = () => {
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const type = searchParams.get('type') // possible: none -> default, for adding new sales, 'add' -> add quotation to existing sale, 'view' viewing a quotation from sales detail
    const sales = searchParams.get('sales')

    const navigate = useNavigate()

    const [activeDropdown, setActiveDropdown] = useState(null);
    const [client, setClient] = useState({})
    const [quotation, setQuotation] = useState([])
    const [total, setTotal] = useState(null)

    const handleBack = () => {
        if (type === 'view') {
            navigate(-1)
        } else {
            navigate('/viewquotations')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = (await axios.get(`http://localhost:4000/api/getQuotationDetailsById/${id}`)).data
                setClient(res.client[0])
                setQuotation(res.quotation)
                setTotal(res.total)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id])
    useEffect(() => {
        console.log(client)
    }, [client])
    useEffect(() => {
        console.log(quotation)
    }, [quotation])

    //Amount Conversion Function
    const formatNumber = (number) => {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

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

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Invoice Details</h1>
            <h5>View a digital copy of the invoice</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />


            
            {/*Invoice*/}
            <Row>
                <Col lg="8">

                <Card style={{ borderRadius: '20px', marginTop: '20px',color: '#014c91'  }}>
                    <CardHeader style={{ textAlign: 'center'}} >
                        <h6>CO FENG HUANG CONDITIONING SUPPLIES</h6>
                        Owned & Operated by: CO FENG HUANG INC. <br/>
                        #955 Quezon Avenue Santa Cruz 1104 Quezon City NCR,<br/>
                        Second District Philippines<br/>
                        VAT Reg. TIN 722-257-933-00000
                    </CardHeader>
                    <CardBody >
                        <Row>
                            <Col lg="8">
                                <strong> SALES INVOICE</strong>
                            </Col>
                            <Col lg="4">
                                <strong> NO. #{String(id).padStart(4, '0')}</strong>
                            </Col>                        
                        </Row>
                        <Row>
                            <Col lg="8">
                                Sold To: {client.client_name}
                            </Col>
                            <Col lg="4">
                                Date: {formatDate(new Date(client.date_created))} {new Date(client.date_created).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </Col>                        
                        </Row>
                        <Row>
                            <Col lg="8">
                                Business Style: {client.company_name}
                            </Col>
                            <Col lg="4">
                                TIN: {client.tin}
                            </Col>                        
                        </Row>
                        <Row>
                            <Col lg="8">
                                Address: {client.site_address}
                            </Col>                        
                        </Row>

                        <Table className="mt-2" style={{ borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                            <thead>
                                <tr>
                                    <th style={{ color: '#014c91', border: '1px solid #ddd' }}>Quantity</th>
                                    <th style={{ color: '#014c91', border: '1px solid #ddd' }}>Unit</th>
                                    <th style={{ color: '#014c91', border: '1px solid #ddd' }}>Articles</th>
                                    <th style={{ color: '#014c91', border: '1px solid #ddd' }}>Unit Price</th>
                                    <th style={{ color: '#014c91', border: '1px solid #ddd' }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quotation.map((quotation, index) => (
                                    <tr key={index} style={{ borderRadius: '20px', padding: '10px' }}>
                                        <td style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px' }}>{quotation.quantity}</td>
                                        <td style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px' }}>{quotation.unit}</td>
                                        <td style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px' }}>{quotation.article}</td>
                                        <td style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px' }}>₱ {formatNumber(quotation.srp)}</td>
                                        <td style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px' }}>₱ {formatNumber(quotation.totalPrice)}</td>
                                    </tr>
                                ))}
                                <tr style={{ textAlign: 'center' }}>
                                    <td colSpan="5" style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px' }}>--------------------------NF--------------------------</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px' }}>
                                        VATable Sales
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px' }}>
                                        VAT-Exempt Sales
                                    </td>
                                    <td colSpan="2" style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px', textAlign: 'right'  }}>
                                        Total Sales
                                    </td>
                                    <td style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px'}}>
                                    ₱ {total ? formatNumber(total - (quotation.reduce((sum, q) => q.totalPrice + sum, 0))*.12): '0.00'}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px' }}>
                                        Zero Rated Sales
                                    </td>
                                    <td colSpan="2" style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px', textAlign: 'right'  }}>
                                        Add: VAT
                                    </td>
                                    <td style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px'}}>
                                    ₱ {total ? formatNumber(total*.12): '0.00'}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px' }}>
                                        VAT Amount
                                    </td>
                                    <td colSpan="2" style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px', textAlign: 'right'  }}>
                                        <strong>TOTAL AMOUNT DUE </strong>
                                    </td>
                                    <td style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px'}}>
                                    ₱ {total ? formatNumber(total): '0.00'}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

    
                    </CardBody>
                </Card>

                </Col>
            </Row>
                <Row className="mt-3">
                    <Col lg="4"/>
                    {type !== 'view' ? (
                        <Col lg="2">
                            <Link to={`/converttosale?id=${id}${type === 'add' ? `&type=add&sales=${sales}` : ''}`} className="btn w-100" style={{color: "white", backgroundColor: "#014c91"}}>
                                {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })}   Proceed to Sale
                            </Link>
                        </Col>
                    ) : <Col lg="2"></Col>}
                    
                    <Col lg="2">
                        <button className="btn w-100" style={{color: "white", backgroundColor: "#6c757d"}} onClick={handleBack}>
                            {type && type === 'view' ? 'Back' : 'Cancel'}
                        </button>
                    </Col>
                </Row>
            


        </div>
    );
};

export default InvoiceDetails;
