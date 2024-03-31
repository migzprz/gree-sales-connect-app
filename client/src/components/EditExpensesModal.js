import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Modal, Form,  InputGroup } from 'react-bootstrap';
import { FaSave, FaPlus, FaEdit, FaTrash} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const EditExpensesModal = ({id}) => {

    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
    };

    const [record, setRecord] = useState([]);
    const [opExpenseData, setOpExpenseData] = useState([]);
    const [nonopExpenseData, setNonopExpenseData] = useState([]);
    const [userId, setUserId] = useState(1);
    const [expenseList, setExpenseList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getExpenseDetails/${id}`)
                setRecord(response.data[0])
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
        setExpenseList(prevExpenseList => {
            const newExpenseList = [];
            const dateCreated = record.date_created ? new Date(record.date_created).toISOString().slice(0, 19).replace('T', ' '): null;
            const newExpenseType = { type: "Operating Exp.", is_operating: 1, date: dateCreated, expense: [] };
            newExpenseList.push(newExpenseType);
            const newExpenseType2 = { type: "Non-Operating Exp.", is_operating: 0, date: dateCreated, expense: [] };
            newExpenseList.push(newExpenseType2);

            for (let opexpense of opExpenseData) {
                let formattedDate = new Date(opexpense.expense_date).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).split('/').reverse().join('-'); // Convert to "yyyy-MM-dd" format

                newExpenseList[0].expense.push({
                    name: opexpense.name,
                    description: opexpense.description,
                    expense_date: formattedDate,
                    amount: opexpense.amount
                });
            }

            for (let nonopexpense of nonopExpenseData) {
                // Format the date to "yyyy-MM-dd" format
                let formattedDate = new Date(nonopexpense.expense_date).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).split('/').reverse().join('-'); // Convert to "yyyy-MM-dd" format
            
                newExpenseList[1].expense.push({
                    name: nonopexpense.name,
                    description: nonopexpense.description,
                    expense_date: formattedDate, // Use the formatted date
                    amount: nonopexpense.amount
                });
            }
            
            
            return newExpenseList;
        });
        
    }, [record, opExpenseData, nonopExpenseData]);
    
    

    useEffect(() => {
        console.log(expenseList)
    },[expenseList])



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
                const deleteReponse = await axios.delete(`http://localhost:4000/api/deleteExpenses/${id}`)
                console.log(deleteReponse)
                const postReponse = await axios.post(`http://localhost:4000/api/postExpenses/${userId}`, {expenseList})
                console.log(postReponse)
                
                navigate('/viewexpenses')
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

    return (
        <div>

            <div onClick={handleShowModal} style={{color: "white", color: '#014c91', cursor: 'pointer'}}>
                {React.createElement(FaEdit, {size: 18})} 
            </div>


            <Modal show={showModal} onHide={handleCloseModal} size="xl" >
                <Modal.Header style={{color: "white", backgroundColor: "#014c91"}}>
                    <Modal.Title>Edit Expenses</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
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
                                            {expenseType.type}
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
                                                        {React.createElement(FaPlus, { size: 18})} Subexpense
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
                                                    <Form.Control type="text" name="description" value={expenseType.expense[0].description} onChange={(e) => handleChange(e, 0, index)} />
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
                                                                <Form.Control type="text" name="description" value={subexpense.description} onChange={(e) => handleChange(e, subindex, index)} />
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
                                                        {React.createElement(FaPlus, { size: 18})} Subexpense
                                                    </button>
                                                    </Col>
                                                </Row>
                                            )}
                            </Card>
                            
                        ))} 
                    </Modal.Body>

                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>
                        <button className="btn" style={{color: "white", backgroundColor: "#014c91"}}>
                            {React.createElement(FaSave, { size: 18, style: { marginRight: '5px' } })}   Record Updated Expenses
                        </button>
                    
                        <button className="btn" onClick={(e) => { e.preventDefault(); handleCloseModal(); }} style={{color: "white", backgroundColor: "#6c757d"}}>
                            Cancel
                        </button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default EditExpensesModal;
