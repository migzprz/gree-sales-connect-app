import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEdit, FaSearch, FaCheck, FaTruck, FaClock, FaChevronRight, FaPlus, FaMoneyBillWave, FaShoppingBag} from 'react-icons/fa';
import { Row, Col, Button, CardBody, CardHeader, Table, Form, InputGroup } from 'react-bootstrap';
import '../index.css';

const RecordExpensesForm = () => {


    const [expenseList, setExpenseList] = useState([
        {
            type: "",
            expense: [
                { subexpense: "", description: "", date: null, amount: 0 }
            ]
        }
    ]);

    const addExpense = () => {
        setExpenseList(prevExpenseList => [
            ...prevExpenseList,
            {
                type: "",
                expense: [{ subexpense: "", description: "", date: null, amount: 0 }]
            }
        ]);
    };

    const addSubexpense = (index) => {
        setExpenseList(prevExpenseList => {
            const newExpenseList = [...prevExpenseList];
            const newExpense = { subexpense: "", description: "", date: null, amount: 0 };
            newExpenseList[index].expense.push(newExpense);
            return newExpenseList;
        });
    };
    
    
console.log(expenseList)

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Record Expenses</h1>
            <h5>Record all incurred expenses</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
            {expenseList.map((expenseType, index) => (
                <Row key={index}>
                    <Col className="mt-4">
                        <Row>
                            <Col lg="2">
                                <Form.Group controlId="description">
                                    <Form.Control type="text" name="expense" required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide an expense
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            {expenseType.expense.map((subexpense, subindex) => (
                                subindex === 0 ? (
                                    <React.Fragment key={subindex}>
                                        <Col lg="2">
                                            <Form.Group controlId="description">
                                                <Form.Control type="date" name="inspectionDate" required />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide expense date
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="2">
                                            <Form.Group controlId="description">
                                                <Form.Control type="text" name="expense" required />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide an expense
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="2">
                                            <Form.Group controlId="description">
                                                <Form.Control type="text" name="expense" required />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide an expense
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="2">
                                            <Form.Group controlId="srp">
                                                <InputGroup>
                                                    <InputGroup.Text> ₱ </InputGroup.Text>
                                                    <Form.Control className="money" type="number" inputmode="numeric" min="0"
                                                        required onWheel={(e) => e.target.blur()} />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </React.Fragment>
                                ) : (
                                    <Row key={subindex} className="mt-3">
                                        {/*TODO: If this row is the last main expense AND if it's the first subexpense, make it a button, if not just make it <Col lg="3"/>*/}
                                        {index === expenseList.length - 1 && subindex === 1 ? (
                                            <Col lg="2">
                                                <button className="btn w-100" onClick={addExpense} style={{color: "white", backgroundColor: "#014c91"}}>
                                                    {React.createElement(FaPlus, { size: 18, style: { marginRight: '5px' } })} Add Expense
                                                </button>
                                            </Col>
                                        ) : (
                                            <Col lg="2"/>
                                        )}
                                        <Col lg="2" className="ms-2">
                                            <Form.Group controlId="description">
                                                <Form.Control type="date" name="inspectionDate" required />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide expense date
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="2" className="ms-1">
                                            <Form.Group controlId="description">
                                                <Form.Control type="text" name="expense" required />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide an expense
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="2" className="ms-1">
                                            <Form.Group controlId="description">
                                                <Form.Control type="text" name="expense" required />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide an expense
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="2" className="ms-1">
                                            <Form.Group controlId="srp">
                                                <InputGroup>
                                                    <InputGroup.Text> ₱ </InputGroup.Text>
                                                    <Form.Control className="money" type="number" inputmode="numeric" min="0"
                                                        required onWheel={(e) => e.target.blur()} />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                )
                            ))}
                            {expenseType.expense.length > 0 &&  (
                                <Row className="mt-3">
                                     {index === expenseList.length - 1 && expenseList[index].expense.length === 1? (
                                            <Col lg="2">
                                                <button className="btn w-100" onClick={addExpense} style={{color: "white", backgroundColor: "#014c91"}}>
                                                    {React.createElement(FaPlus, { size: 18, style: { marginRight: '5px' } })} Add Expense
                                                </button>
                                            </Col>
                                        ) : (
                                            <Col lg="2"/>
                                        )}
                                    <Col lg="2" className="ms-2">
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
                        </Row>
                    </Col>
                </Row>
            ))}




            
            
            




        </div>
    );
};

export default RecordExpensesForm;
