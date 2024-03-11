import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEllipsisH, FaFilter, FaSort, FaSearch, FaPlus} from 'react-icons/fa';
import { Row, Col, Card, CardBody, CardHeader, Table, Dropdown } from 'react-bootstrap';
import '../index.css';
import { Link } from 'react-router-dom';
import AddProductModal from './AddProductModal';
import axios from 'axios'

const ExpensesList = () => {

    const [expenseData, setExpenseData] = useState([]);
    const [yearData, setYearData] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [filterOption, setFilterOption] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getExpenses/')
                setExpenseData(response.data)
                const response2 = await axios.get('http://localhost:4000/api/getYearExpenses/')
                setYearData(response2.data)
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
        console.log(yearData)
    },[yearData])

    const handleSort = (e) => {
        setSortOption(e.target.value);
    };

    let sortedExpenses = [...expenseData];
    if (sortOption === 'date-asc') {
        sortedExpenses.sort((a, b) => new Date(a.date_created) - new Date(b.date_created));
    } else if (sortOption === 'date-desc') {
        sortedExpenses.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
    } else if (sortOption === 'amt-asc') {
        sortedExpenses.sort((a, b) => parseFloat(a.totalAmount) - parseFloat(b.totalAmount));
    } else if (sortOption === 'amt-desc') {
        sortedExpenses.sort((a, b) => parseFloat(b.totalAmount) - parseFloat(a.totalAmount));
    }


    const filteredExpenses = sortedExpenses.filter(expense => (
        filterOption === '' || expense.date_created.includes(filterOption)
    ));


    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>View Expenses</h1>
            <h5>View and manage all expenses</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />


            {/*Navigation Forms*/ }
            
            <Row>
                <Col lg="3">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex", 
                                                                    backgroundColor: "#014c91", borderRadius: "10px", 
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaSort, { size: 20 })}
                            </div>
                        </div>
                        <select className="form-select" value={sortOption} onChange={handleSort}>
                            <option value="date-desc">Most Recent</option>
                            <option value="date-asc">Oldest</option>
                            <option value="amt-asc">Amount (A-Z)</option>
                            <option value="amt-desc">Amount (Z-A)</option>
                        </select>
                    </div>
                </Col>
                {/*Filtering Mechanism*/ }
                <Col lg="3">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                    backgroundColor: "#014c91", borderRadius: "10px",
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>   
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaFilter, { size: 20 })}
                            </div>  
                        </div>
                        <select className="form-select" value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                            <option value=''>All Expenses</option>   
                            {yearData.map((year, index) => (
                                 <option value={year.year}>{year.year}</option>   
                            ))}
                        </select>
                    </div>
                </Col>
            </Row>

        
            <Row>
                <Col lg="6">
                    <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
                        <CardBody>
                            <Table>
                                <thead>
                                    <tr>
                                        <th style={{color: '#014c91'}}>Date Recorded</th>
                                        <th style={{color: '#014c91'}}>Recorded by</th>
                                        <th style={{color: '#014c91'}}>Expenses Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredExpenses.map((expense, index) => (
                                        <React.Fragment key={expense.expense_id}>
                                            <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                                <td style={{color: '#014c91'}}>
                                                    <Link to={`/viewexpensedetails/${expense.expense_id}`} style={{ color: '#014c91'}}>{expense.date_created}</Link>
                                                </td>
                                                <td style={{color: '#014c91'}}>{expense.login_name}</td>
                                                <td style={{color: '#014c91'}}>{expense.totalAmount}</td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>


           

            


        </div>
    );
};

export default ExpensesList;
