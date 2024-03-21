import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Legend, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, LineChart, Line  } from 'recharts';
import { Row, Col, Card, CardBody} from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import axios from 'axios'

const SalesDashboard = () => {

        const [yearOptions, setYearOptions] = useState([]);

        const [ocularData, setOcularData] = useState([]);
        const [ocularTotal, setOcularTotal] = useState([]);
        const [quotationData, setQuotationData] = useState([]);
        const [quotationTotal, setQuotationTotal] = useState([]);
        const [salesTotal, setSalesTotal] = useState([]);
        const [revenueTotal, setRevenueTotal] = useState([]);


        const [yearFilter, setYearFilter] = useState(2024);
        const [monthFilter, setMonthFilter] = useState(0);
        
        // fetch and mount ocular data to useState
        useEffect(() => {
            const fetchOcularData = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/api/getOcularStatistics/');
                    let newData = [];
                    let total = 0; // Initialize total

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
                                    return total + item.qty;
                                }
                                return total;
                            }, 0);
                            total += totalQty; // Add to total
                            return { name: month, ocular: totalQty };
                        });
                    } else {
                        // Get the number of days in the selected month
                        const daysInMonth = new Date(yearFilter, monthFilter, 0).getDate();
                        // Generate data for each day of the selected month
                        for (let i = 1; i <= daysInMonth; i++) {
                            const totalQty = response.data.reduce((total, item) => {
                                if (item.year === yearFilter && item.monthNum === monthFilter && item.day === i) {
                                    return total + item.qty;
                                }
                                return total;
                            }, 0);
                            total += totalQty; // Add to total
                            newData.push({ name: i.toString(), ocular: totalQty });
                        }
                    }
        
                    setOcularData(newData);
                    setOcularTotal(total); // Set ocularTotal
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };
            const fetchQuotationData = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/api/getQuotationStatistics/');
                    const response2 = await axios.get('http://localhost:4000/api/getSalesStatistics/');
                    let newData = [];
                    let total = 0; // Initialize total
                    let salesTotal = 0; // Initialize sales total
            
                    if (monthFilter === 0) {
                        // If monthFilter is empty, generate data for all months
                        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        newData = months.map((month) => {
                            const totalQty = response.data.reduce((total, item) => {
                                if (item.year === yearFilter && item.month === month) {
                                    return total + item.qty;
                                }
                                return total;
                            }, 0);
                            const salesQty = response2.data.reduce((total, item) => {
                                if (item.year === yearFilter && item.month === month) {
                                    return total + item.qty;
                                }
                                return total;
                            }, 0);
                            total += totalQty; // Add to total
                            salesTotal += salesQty; // Add to sales total
                            return { name: month, quotation: totalQty, sales: salesQty };
                        });
                    } else {
                        // Get the number of days in the selected month
                        const daysInMonth = new Date(yearFilter, monthFilter, 0).getDate();
                        // Generate data for each day of the selected month
                        for (let i = 1; i <= daysInMonth; i++) {
                            const totalQty = response.data.reduce((total, item) => {
                                if (item.year === yearFilter && item.monthNum === monthFilter && item.day === i) {
                                    return total + item.qty;
                                }
                                return total;
                            }, 0);
                            const salesQty = response2.data.reduce((total, item) => {
                                if (item.year === yearFilter && item.monthNum === monthFilter && item.day === i) {
                                    return total + item.qty;
                                }
                                return total;
                            }, 0);
                            total += totalQty; // Add to total
                            salesTotal += salesQty; // Add to sales total
                            newData.push({ name: i.toString(), quotation: totalQty, sales: salesQty });
                        }
                    }
            
                    setQuotationData(newData);
                    setQuotationTotal(total);
                    setSalesTotal(salesTotal); // Set salesTotal
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };
            const fetchRevenueData = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/api/getRevenueStatistics/');
                    console.log(response.data)
                    let total = 0; // Initialize total
        
                    if (monthFilter === 0) {
                        // If monthFilter is empty, calculate total revenue for all months
                        total = response.data.reduce((total, item) => {
                            if (item.year === yearFilter) {
                                return total + item.total;
                            }
                            return total;
                        }, 0);
                    } else {
                        // Calculate total revenue for the selected month
                        total = response.data.reduce((total, item) => {
                            if (item.year === yearFilter && item.month === monthFilter) {
                                return total + item.total;
                            }
                            return total;
                        }, 0);
                    }
                    console.log(total)
                    setRevenueTotal(total);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };
        
            fetchRevenueData();
            fetchOcularData();
            fetchQuotationData();
        }, [yearFilter, monthFilter]);
        
        
        useEffect(() => {
            console.log(ocularData)
        },[ocularData])
        useEffect(() => {
            console.log(ocularTotal)
        },[ocularTotal])
        useEffect(() => {
            console.log(yearOptions)
        },[yearOptions])
        useEffect(() => {
            console.log(quotationData)
        },[quotationData])
        useEffect(() => {
            console.log(quotationTotal)
        },[quotationTotal])
        useEffect(() => {
            console.log(revenueTotal)
        },[revenueTotal])


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
                <Col lg="3">
                    <Card style={{color: '#014c91', overflow: 'hidden'}}>
                        <CardBody>
                             <h5>Total Oculars Scheduled</h5>
                             <h1 style={{fontSize:'48px'}}> {ocularTotal}</h1>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3">
                    <Card style={{color: '#014c91', overflow: 'hidden'}}>
                        <CardBody>
                             <h5>Total Quotations Generated</h5>
                             <h1 style={{fontSize:'48px'}}> {quotationTotal}</h1>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3">
                    <Card style={{color: '#014c91', overflow: 'hidden'}}>
                        <CardBody>
                             <h5>Total Sale Orders Made</h5>
                             <h1 style={{fontSize:'48px'}}> {salesTotal}</h1>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3">
                    <Card style={{color: '#014c91', overflow: 'hidden', height: '100%'}}>
                        <CardBody>
                             <h5>Total Revenue Generated</h5>
                             <h1 style={{fontSize:'40px'}}> ₱ {formatNumber(revenueTotal)}</h1>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col lg="6">
                    <Card style={{color: '#014c91', overflow: 'hidden'}}>
                        <CardBody className="mb-5">
                            <ResponsiveContainer width='100%' height={300}>
                            <h5>Scheduled Oculars over Time</h5>
                                <LineChart data={ocularData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name"/>
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    {Object.keys(ocularLinesVisibility).map((key, index) => (
                                        ocularLinesVisibility[key] && (
                                            <Line key={key} type="monotone" dataKey={key} stroke={'#E26014'}/>
                                        )
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="6">
                    <Card style={{ color: '#014c91', overflow: 'hidden' }}>
                        <CardBody className="mb-5">
                            <ResponsiveContainer width='100%' height={300}>
                                <h5>Quotations Generated and Sale Conversion over Time</h5>
                                <LineChart data={quotationData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="quotation" name="Quotations Generated" stroke="#1427E2" />
                                    <Line type="monotone" dataKey="sales" name="Converted to Sale" stroke="#097969" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </Col>

            </Row>


            
        </>
    );
};

export default SalesDashboard;
