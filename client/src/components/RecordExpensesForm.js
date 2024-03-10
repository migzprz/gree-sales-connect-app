import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaSave, FaSearch, FaCheck, FaTruck, FaClock, FaChevronRight, FaPlus, FaMoneyBillWave, FaShoppingBag, FaTrash} from 'react-icons/fa';
import { Row, Col, Button, CardBody, CardHeader, Table, Form, InputGroup, Card } from 'react-bootstrap';
import '../index.css';
import axios from 'axios'

const RecordExpensesForm = () => {

    const [validated, setValidated] = useState(false);
    const [userId, setUserId] = useState(1);
    const [expenseList, setExpenseList] = useState([
        {
            type: "Operating Expense",
            is_operating: 1,
            expense: []
        },
        {
            type: "Non-Operating Expense",
            is_operating: 0,
            expense: []
        }
    ]);



    const addSubexpense = (index) => {
        setExpenseList(prevExpenseList => {
            const newExpenseList = [...prevExpenseList];
            const newExpense = { name: "", description: "", expense_date: null, amount: '' };
            newExpenseList[index].expense.push(newExpense);
            return newExpenseList;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

    
        setValidated(true);
        if (form.checkValidity()) {
            try {
                const postReponse = await axios.post(`http://localhost:4000/api/postExpenses/${userId}`, {expenseList})
                console.log(postReponse)
                window.location.reload()
            } catch (error) {
                console.error('Error: Problem encountered when posting data', error)
            }
        }
    };

    useEffect(() => {
        console.log(expenseList)
    },[expenseList])

    const handleRemoveExpense = (expenseIndex, expenseTypeIndex) => {
        setExpenseList(prevExpenseList => {
            const newExpenseList = [...prevExpenseList];
            newExpenseList[expenseTypeIndex].expense = newExpenseList[expenseTypeIndex].expense.filter((_, index) => index !== expenseIndex);
            return newExpenseList;
        });
    };
    
    const handleChange = (event, expenseIndex, expenseTypeIndex) => {
        const { name, value } = event.target;
        setExpenseList(prevExpenseList => {
            const newExpenseList = [...prevExpenseList];
            newExpenseList[expenseTypeIndex].expense[expenseIndex][name] = value;
            return newExpenseList;
        });
    };
    
    
console.log(expenseList)

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Record Expenses</h1>
            <h5>Record all incurred expenses</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />



               
            

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {expenseList.map((expenseType, index) => (
                    <Card className="mt-4" style={{ width: '100%', padding: '20px', color: '#014c91'}}>
                        {expenseType.expense.length > 0 &&
                            <Row className="mt-4">
                                <Col lg="2">
                                    <h6> Expense Type </h6>
                                </Col>
                                <Col lg="2">
                                    <h6> Expense Date </h6>
                                </Col>
                                <Col lg="2">
                                    <h6> Expense Name </h6>
                                </Col>
                                <Col lg="3">
                                    <h6> Expense Description </h6>
                                </Col>
                                <Col lg="2">
                                    <h6> Amount </h6>
                                </Col>
                            </Row>
                        }
                            <Row className="mt-2">
                                <Col lg="2">
                                    <h5 className="p-0"> {expenseType.type} </h5>
                                </Col>
                                
                                {expenseType.expense.length===0 ? (
                                    <>
                                        <Col lg="2">
                                            <button
                                                className="btn w-100"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (!e.currentTarget.disabled) {
                                                        addSubexpense(index);
                                                    }
                                                }}
                                                style={{color: "white", backgroundColor: "#014c91"}}
                                            >
                                                {React.createElement(FaPlus, { size: 18, style: { marginRight: '5px' } })} Add Subexpense
                                            </button>
                                        </Col>
                                    </>
                                ): 
                                    <>
                                    <Col lg="2">
                                        <Form.Group controlId="description">
                                            <Form.Control type="date" name="expense_date" value={expenseType.expense[0].expense_date} onChange={(e) => handleChange(e, 0, index)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide expense date
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="2">
                                        <Form.Group controlId="description">
                                            <Form.Control type="text" name="name" value={expenseType.expense[0].name} onChange={(e) => handleChange(e, 0, index)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide an expense
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="3">
                                        <Form.Group controlId="description">
                                            <Form.Control type="text" name="description" value={expenseType.expense[0].description} onChange={(e) => handleChange(e, 0, index)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a description
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="2">
                                        <Form.Group controlId="srp">
                                            <InputGroup>
                                                <InputGroup.Text> ₱ </InputGroup.Text>
                                                <Form.Control className="money" type="number" inputmode="numeric" min="0" name="amount" value={expenseType.expense[0].amount} onChange={(e) => handleChange(e, 0, index)}
                                                    required onWheel={(e) => e.target.blur()} />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col lg="1">
                                        <FaTrash
                                            size={22}
                                            style={{ marginTop: '5px', marginRight: '5px', cursor: 'pointer' }}
                                            onClick={() => handleRemoveExpense(0, index)}
                                        />
                                    </Col>
                                    </>}
                            </Row>

                                    {expenseType.expense.map((subexpense, subindex) => (
                                        subindex !== 0 &&
                                            <Row key={subindex} className="mt-3">
                                                <Col lg="2"/>
                                                <Col lg="2">
                                                    <Form.Group controlId="description">
                                                        <Form.Control type="date" name="expense_date" value={subexpense.expense_date} onChange={(e) => handleChange(e, subindex, index)} required />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide expense date
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg="2">
                                                    <Form.Group controlId="description">
                                                        <Form.Control type="text" name="name" value={subexpense.name} onChange={(e) => handleChange(e, subindex, index)} required />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide an expense
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg="3">
                                                    <Form.Group controlId="description">
                                                        <Form.Control type="text" name="description" value={subexpense.description} onChange={(e) => handleChange(e, subindex, index)} required />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a description
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg="2">
                                                    <Form.Group controlId="srp">
                                                        <InputGroup>
                                                            <InputGroup.Text> ₱ </InputGroup.Text>
                                                            <Form.Control className="money" type="number" inputmode="numeric" min="0" name="amount" value={subexpense.amount} onChange={(e) => handleChange(e, subindex, index)}
                                                                required onWheel={(e) => e.target.blur()} />
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg="1">
                                                    <FaTrash
                                                        size={22}
                                                        style={{ marginTop: '5px', marginRight: '5px', cursor: 'pointer' }}
                                                        onClick={() => handleRemoveExpense(subindex, index)}
                                                    />
                                                </Col>
                                            </Row>
                                        
                                    ))}

                                    {expenseType.expense.length > 0 &&  (
                                        <Row className="mt-3">
                                            
                                            <Col lg="2"/>
                                            <Col lg="2">
                                            <button
                                                className="btn w-100"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (!e.currentTarget.disabled) {
                                                        addSubexpense(index);
                                                    }
                                                }}
                                                style={{color: "white", backgroundColor: "#014c91"}}
                                            >
                                                {React.createElement(FaPlus, { size: 18, style: { marginRight: '5px' } })} Add Subexpense
                                            </button>
                                            </Col>
                                        </Row>
                                    )}
                    </Card>
                    
                ))}

                <Row className="mt-5">
                    {(expenseList[0].expense.length!==0 || expenseList[1].expense.length!==0) &&
                        <Col lg="2">
                            <button className="btn w-100" style={{color: "white", backgroundColor: "#014c91"}}>
                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })}   Record Expenses
                            </button>
                        </Col>
                    }   
                </Row>

            </Form>




            
            
            




        </div>
    );
};

export default RecordExpensesForm;
