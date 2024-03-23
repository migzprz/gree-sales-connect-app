import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Legend, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, LineChart, Line  } from 'recharts';
import { Row, Col, Card, CardBody} from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import axios from 'axios'

const ExecutiveDashboard = () => {

        const [yearOptions, setYearOptions] = useState([]);

        const [salesAndExpenseData, setSalesAndExpenseData] = useState([]);
        const [expenseTotal, setExpenseTotal] = useState(0);
        const [profitTotal, setProfitTotal] = useState(0);
        const [revenueTotal, setRevenueTotal] = useState(0);


        const [yearFilter, setYearFilter] = useState(2024);
        const [monthFilter, setMonthFilter] = useState(0);
        
        // fetch and mount ocular data to useState
        useEffect(() => {
            const fetchSalesAndExpenseData = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/api/getExpenseStatistics/');
                    const response2 = await axios.get('http://localhost:4000/api/getDetailedRevenueStatistics/');
                    let newData = [];
                    let total = 0; // Initialize total
                    let salesTotal = 0; // Initialize sales total

                     // Get unique year values from response.data
                     const uniqueYears = [...new Set(response.data.map(item => item.year))];
                     // Sort uniqueYears array in descending order
                     setYearOptions(uniqueYears.sort((a, b) => b - a));
            
                    if (monthFilter === 0) {
                        // If monthFilter is empty, generate data for all months
                        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        newData = months.map((month) => {
                            const totalQty = response.data.reduce((total, item) => {
                                if (item.year === yearFilter && item.month === month) {
                                    return total + item.total;
                                }
                                return total;
                            }, 0);
                            const salesQty = response2.data.reduce((total, item) => {
                                if (item.year === yearFilter && item.month === month) {
                                    return total + item.total;
                                }
                                return total;
                            }, 0);
                            total += totalQty; // Add to total
                            salesTotal += salesQty; // Add to sales total
                            return { name: month, expense: totalQty, revenue: salesQty };
                        });
                    } else {
                        // Get the number of days in the selected month
                        const daysInMonth = new Date(yearFilter, monthFilter, 0).getDate();
                        // Generate data for each day of the selected month
                        for (let i = 1; i <= daysInMonth; i++) {
                            const totalQty = response.data.reduce((total, item) => {
                                if (item.year === yearFilter && item.monthNum === monthFilter && item.day === i) {
                                    return total + item.total;
                                }
                                return total;
                            }, 0);
                            const salesQty = response2.data.reduce((total, item) => {
                                if (item.year === yearFilter && item.monthNum === monthFilter && item.day === i) {
                                    return total + item.total;
                                }
                                return total;
                            }, 0);
                            total += totalQty; // Add to total
                            salesTotal += salesQty; // Add to sales total
                            newData.push({ name: i.toString(), expense: totalQty, revenue: salesQty });
                        }
                    }
            
                    setSalesAndExpenseData(newData);
                    setExpenseTotal(total);
                    setRevenueTotal(salesTotal); 
                    setProfitTotal(salesTotal-total);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };

            fetchSalesAndExpenseData();
        }, [yearFilter, monthFilter]);
        
        
        useEffect(() => {
            console.log(salesAndExpenseData)
        },[salesAndExpenseData])
        useEffect(() => {
            console.log(revenueTotal)
        },[revenueTotal])
        useEffect(() => {
            console.log(yearOptions)
        },[yearOptions])
        useEffect(() => {
            console.log(expenseTotal)
        },[expenseTotal])
        useEffect(() => {
            console.log(profitTotal)
        },[profitTotal])


    const [ocularLinesVisibility, setOcularLinesVisibility] = useState({ocular: true});
    const [quotationLinesVisibility, setquotationLinesVisibility] = useState({quotation: true});
    const [salesLinesVisibility, setsalesLinesVisibility] = useState({sales: true});

    //Amount Conversion Function
    const formatNumber = (number) => {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    
    return (
        <>
            <Row className="mb-3">
                <Col lg="3">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                    backgroundColor: "#014c91", borderRadius: "10px",
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>   
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaFilter, { size: 20 })}
                            </div>  
                        </div>
                        <select className="form-select" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
                            {yearOptions.map((year) => (
                                <option value={year}>{year}</option>
                            ))}
                        </select>

                    </div>
                </Col>
                <Col lg="3">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                    backgroundColor: "#014c91", borderRadius: "10px",
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>   
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaFilter, { size: 20 })}
                            </div>  
                        </div>
                        <select className="form-select" value={monthFilter} onChange={(e) => setMonthFilter(parseInt(e.target.value))}>
                            <option value="0">All Months</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                <option key={month} value={month}>{new Date(2024, month - 1, 1).toLocaleString('default', { month: 'short' })}</option>
                            ))}
                        </select>


                    </div>
                </Col>
            </Row>

            <Row>
                <Col lg="4">
                    <Card style={{color: '#014c91', overflow: 'hidden'}}>
                        <CardBody>
                             <h5>Total Expenses Incurred</h5>
                             <h1 style={{fontSize:'48px'}}> ₱ {formatNumber(expenseTotal)}</h1>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="4">
                    <Card style={{color: '#014c91', overflow: 'hidden'}}>
                        <CardBody>
                             <h5>Total Sales Revenue Generated</h5>
                             <h1 style={{fontSize:'48px'}}> ₱ {formatNumber(revenueTotal)}</h1>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="4">
                    <Card style={{color: '#014c91', overflow: 'hidden', height: '100%'}}>
                        <CardBody>
                             <h5>Total Profits</h5>
                             <h1 style={{fontSize:'40px'}}> ₱ {formatNumber(profitTotal)}</h1>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col lg="12">
                    <Card style={{ color: '#014c91', overflow: 'hidden' }}>
                        <CardBody className="mb-5">
                            <ResponsiveContainer width='100%' height={300}>
                                <h5>Quotations Generated and Sale Conversion over Time</h5>
                                <LineChart data={salesAndExpenseData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="expense" name="Expenses Incurred" stroke="#1427E2" />
                                    <Line type="monotone" dataKey="revenue" name="Revenue Generated" stroke="#097969" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </Col>

            </Row>


            
        </>
    );
};

export default ExecutiveDashboard;
