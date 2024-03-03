import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEllipsisH, FaFilter, FaSort, FaSearch, FaEdit} from 'react-icons/fa';
import { Row, Col, Card, CardBody, CardHeader, Table, Dropdown } from 'react-bootstrap';
import '../index.css';
import { Link } from 'react-router-dom';
import AddProductModal from './AddProductModal';


const ExpenseDetails = () => {

    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleEllipsisClick = (index) => {
        setActiveDropdown(index === activeDropdown ? null : index);
      };

      const renderDropdown = (index) => {
        if (index === activeDropdown) {
          return (
            <Dropdown.Menu style={{ position: 'absolute', right: '0', left: 'auto', top: '0px' }}>
              <Dropdown.Item>Edit Details</Dropdown.Item>
              <Dropdown.Item>Remove Product</Dropdown.Item>
            </Dropdown.Menu>
          );
        }
        return null;
      };
      


      const expenseList = [
        {
            type: "Operating Expenses",
            expense: [
                { subexpense: "Rent", description: "Office rent for the month", date: "2024-02-01", amount: 13500 },
                { subexpense: "Salary", description: "Employee salaries for the month", date: "2024-02-15", amount: 13500 },
                { subexpense: "Supplies", description: "Office supplies purchased", date: "2024-02-28", amount: 13500 }
            ]
        },
        {
            type: "Non-operating Expenses",
            expense: [
                { subexpense: "Investment Losses", description: "Losses from investment activities", date: "2024-02-10", amount: 13500 },
                { subexpense: "Income Tax", description: "Income tax payment for the quarter", date: "2024-02-20", amount: 13500 }
            ]
        }
    ];
    
    

    const formatNumber = (number) => {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    
    

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Manage Detailed Expenses</h1>
            <h5>View and manage an expense record</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

        
            <Row>
                <Col lg="8">
                    <Card style={{ borderRadius: '20px', marginTop: '20px', color: '#014c91' }}>
                        <CardHeader>
                            <Row>
                                <Col>
                                    Date Recorded: <strong> Aug-20-2024 </strong>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    {React.createElement(FaEdit, { size: 18 })}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Recorded by:<strong> Miguel Josh C. Perez </strong>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Table striped bordered style={{color: '#014c91' }}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th style={{color: '#014c91' }}>Date</th>
                                        <th style={{color: '#014c91' }}>Subexpense</th>
                                        <th style={{color: '#014c91' }}>Description</th>
                                        <th style={{color: '#014c91' }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenseList.map((expenseType, index) => (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td colSpan="5" style={{color: '#014c91' }}>
                                                    <strong>{expenseType.type}</strong>
                                                </td>
                                            </tr>
                                            {expenseType.expense.map((subexpense, subindex) => (
                                                <tr key={subindex}>
                                                    <td></td>
                                                    <td style={{color: '#014c91' }}>{subexpense.date}</td>
                                                    <td style={{color: '#014c91' }}>{subexpense.subexpense}</td>
                                                    <td style={{color: '#014c91' }}>{subexpense.description}</td>
                                                    <td style={{color: '#014c91' }}>₱ {formatNumber(subexpense.amount)}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'right', color: '#014c91'  }}>
                                            <strong>Total:</strong>
                                        </td>
                                        <td style={{color: '#014c91' }}>₱ 120,000.00</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>

                    </Card>
                </Col>
            </Row>


           

            


        </div>
    );
};

export default ExpenseDetails;
