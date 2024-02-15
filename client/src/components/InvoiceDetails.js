import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaSave} from 'react-icons/fa';
import { Row, Col, Card, CardBody, Table, Dropdown, CardHeader } from 'react-bootstrap';
import '../index.css';
import { Link } from 'react-router-dom';

const InvoiceDetails = () => {

    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleEllipsisClick = (index) => {
        setActiveDropdown(index === activeDropdown ? null : index);
      };

      const renderDropdown = (index) => {
        if (index === activeDropdown) {
          return (
            <Dropdown.Menu style={{ position: 'absolute', right: '0', left: 'auto', top: '0px' }}>
              <Dropdown.Item>Convert to Sale</Dropdown.Item>
              <Dropdown.Item>Cancel Quotation</Dropdown.Item>
            </Dropdown.Menu>
          );
        }
        return null;
      };
      


    const quotationList = [
        {
            id: 1,
            client: 'Client 1',
            company: 'Company 1',
            contactNumber: '0165189598',
            dateGenerated: '2024-01-15',
            totalPrice: 20000,
            status: 'Active'
        },
        {
            id: 1,
            client: 'Client 1',
            company: 'Company 1',
            contactNumber: '0165189598',
            dateGenerated: '2024-01-15',
            totalPrice: 20000,
            status: 'Active'
        },
        {
            id: 1,
            client: 'Client 1',
            company: 'Company 1',
            contactNumber: '0165189598',
            dateGenerated: '2024-01-15',
            totalPrice: 20000,
            status: 'Active'
        },
        {
            id: 1,
            client: 'Client 1',
            company: 'Company 1',
            contactNumber: '0165189598',
            dateGenerated: '2024-01-15',
            totalPrice: 20000,
            status: 'Active'
        },
        // Add more ocular objects as needed
    ];

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Invoice Details</h1>
            <h5>View a digital copy of the invoice</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />


            
            {/*Invoice*/}
            <Row>
                <Col lg="6">

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
                                <strong> NO. XXXX</strong>
                            </Col>                        
                        </Row>
                        <Row>
                            <Col lg="8">
                                Sold To: 
                            </Col>
                            <Col lg="4">
                                Date:
                            </Col>                        
                        </Row>
                        <Row>
                            <Col lg="8">
                                Business Style:
                            </Col>
                            <Col lg="4">
                                TIN:
                            </Col>                        
                        </Row>
                        <Row>
                            <Col lg="8">
                                Address:
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
                                {quotationList.map((quotation, index) => (
                                    <tr key={quotation.id} style={{ borderRadius: '20px', padding: '10px' }}>
                                        <td style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px' }}>{quotation.id}</td>
                                        <td style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px' }}>{quotation.client}</td>
                                        <td style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px' }}>{quotation.company}</td>
                                        <td style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px' }}>{quotation.contactNumber}</td>
                                        <td style={{ color: '#014c91', border: '1px solid #ddd', padding: '5px' }}>{quotation.dateGenerated}</td>
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
                                    XXXXXXX
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
                                         XXXXXXX
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
                                        XXXXXXX
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

    
                    </CardBody>
                </Card>

                </Col>
            </Row>
                <Row className="mt-3">
                    <Col lg="2"/>
                    <Col lg="2">
                        <Link to="/converttosale" className="btn w-100" style={{color: "white", backgroundColor: "#014c91"}}>
                        {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })}   Proceed to Sale
                        </Link>
                    </Col>
                    <Col lg="2">
                        <button className="btn w-100" style={{color: "white", backgroundColor: "#6c757d"}}>
                        Cancel
                        </button>
                    </Col>
                </Row>
            


        </div>
    );
};

export default InvoiceDetails;
