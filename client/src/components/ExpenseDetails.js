import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect} from 'react'; 
import { FaEllipsisH, FaFilter, FaSort, FaSearch, FaEdit} from 'react-icons/fa';
import { Row, Col, Card, CardBody, CardHeader, Table, Dropdown } from 'react-bootstrap';
import '../index.css';
import { useParams } from 'react-router-dom';
import AddProductModal from './AddProductModal';
import axios from 'axios'

const ExpenseDetails = () => {

    const { id } = useParams();
    
    const [expenseData, setExpenseData] = useState([]);
    const [opExpenseData, setOpExpenseData] = useState([]);
    const [nonopExpenseData, setNonopExpenseData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getExpenseDetails/${id}`)
                setExpenseData(response.data[0])
                const response2 = await axios.get(`http://localhost:4000/api/getOperatingExpenses/${id}`)
                setOpExpenseData(response2.data)
                const response3 = await axios.get(`http://localhost:4000/api/getNonOperatingExpenses/${id}`)
                setNonopExpenseData(response3.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
            
        }
        fetchData()
    },[])

    useEffect(() => {
        console.log(expenseData)
    },[expenseData])

    useEffect(() => {
        console.log(opExpenseData)
    },[opExpenseData])

    useEffect(() => {
        console.log(nonopExpenseData)
    },[nonopExpenseData])
      
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
                                    Date Recorded: <strong> {expenseData.date_created} </strong>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    {React.createElement(FaEdit, { size: 18 })}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Recorded by:<strong> {expenseData.login_name} </strong>
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
                                    {opExpenseData.length > 0 &&
                                    <>
                                        <tr>
                                            <td colSpan="5" style={{color: '#014c91' }}>
                                                <strong>Operating Expenses</strong>
                                            </td>
                                        </tr>
                                        {opExpenseData.map((subexpense, subindex) => (
                                            <tr key={subindex}>
                                                <td></td>
                                                <td style={{color: '#014c91' }}>{subexpense.expense_date}</td>
                                                <td style={{color: '#014c91' }}>{subexpense.name}</td>
                                                <td style={{color: '#014c91' }}>{subexpense.description}</td>
                                                <td style={{color: '#014c91' }}>₱ {formatNumber(subexpense.amount)}</td>
                                            </tr>
                                        ))}
                                    </>
                                    }
                                    {nonopExpenseData.length > 0 &&
                                    <>
                                        <tr>
                                            <td colSpan="5" style={{color: '#014c91' }}>
                                                <strong>Non-Operating Expenses</strong>
                                            </td>
                                        </tr>
                                        {nonopExpenseData.map((subexpense, subindex) => (
                                            <tr key={subindex}>
                                                <td></td>
                                                <td style={{color: '#014c91' }}>{subexpense.expense_date}</td>
                                                <td style={{color: '#014c91' }}>{subexpense.name}</td>
                                                <td style={{color: '#014c91' }}>{subexpense.description}</td>
                                                <td style={{color: '#014c91' }}>₱ {formatNumber(subexpense.amount)}</td>
                                            </tr>
                                        ))}
                                    </>
                                    }
                                       
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'right', color: '#014c91'  }}>
                                            <strong>Total:</strong>
                                        </td>
                                        <td style={{color: '#014c91' }}>{expenseData.totalAmount}</td>
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
