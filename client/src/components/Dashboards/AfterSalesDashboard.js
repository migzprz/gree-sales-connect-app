import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Legend, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, LineChart, Line, BarChart, Bar, Rectangle  } from 'recharts';
import { Row, Col, Card, CardBody} from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import axios from 'axios'

const AfterSalesDashboard = () => {

        const [yearOptions, setYearOptions] = useState([]);
        const [warrantyData, setWarrantyData] = useState([]);
        const [warrantyTotal, setWarrantyTotal] = useState([]);
        const [resWarrantyTotal, setResWarrantyTotal] = useState([]);
        const [unitData, setUnitData] = useState([]);
        const [unitTotal, setUnitTotal] = useState([]);

        const [yearFilter, setYearFilter] = useState(2024);
        const [monthFilter, setMonthFilter] = useState(0);
        
        // fetch and mount ocular data to useState
        useEffect(() => {
            const fetchWarrantyData = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/api/getWarrantyStatistics/');
                    const response2 = await axios.get('http://localhost:4000/api/getResolvedWarrantyStatistics/');
                    let newData = [];
                    let total = 0; // Initialize total
                    let resTotal = 0; // Initialize sales total

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
                            const resQty = response2.data.reduce((total, item) => {
                                if (item.year === yearFilter && item.month === month) {
                                    return total + item.qty;
                                }
                                return total;
                            }, 0);
                            total += totalQty; // Add to total
                            resTotal += resQty; // Add to sales total
                            return { name: month, warranty: totalQty, resolved: resQty };
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
                            const resQty = response2.data.reduce((total, item) => {
                                if (item.year === yearFilter && item.monthNum === monthFilter && item.day === i) {
                                    return total + item.qty;
                                }
                                return total;
                            }, 0);
                            total += totalQty; // Add to total
                            resTotal += resQty; // Add to sales total
                            newData.push({ name: i.toString(), warranty: totalQty, resolved: resQty });
                        }
                    }
            
                    setWarrantyData(newData);
                    setWarrantyTotal(total);
                    setResWarrantyTotal(resTotal); // Set salesTotal
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };
            const fetchUnitData = async () => {
                try {
                    let newData = [];
                    let total = 0; // Initialize total
                    
                    if (monthFilter === 0) {
                        // If monthFilter is empty, generate data for all months
                        const response = await axios.get('http://localhost:4000/api/getYearlyClaimedUnitStatistics/');
                        newData = response.data
                            .filter(item => item.year === yearFilter)
                            .map(item => ({ name: item.issue, unit: item.qty }));
                        total = newData.reduce((acc, item) => acc + item.unit, 0);
                    } else {
                        // If a specific month is chosen
                        const response = await axios.get('http://localhost:4000/api/getClaimedUnitStatistics/');
                        newData = response.data
                            .filter(item => item.year === yearFilter && item.monthNum === monthFilter)
                            .map(item => ({ name: item.issue, unit: item.qty }));
                        total = newData.reduce((acc, item) => acc + item.unit, 0);
                    }
            
                    setUnitData(newData);
                    setUnitTotal(total);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };
            
            fetchUnitData();
            
        
            fetchUnitData();
            fetchWarrantyData();
        }, [yearFilter, monthFilter]);
        
        
        useEffect(() => {
            console.log(warrantyData)
        },[warrantyData])
        useEffect(() => {
            console.log(warrantyTotal)
        },[warrantyTotal])
        useEffect(() => {
            console.log(yearOptions)
        },[yearOptions])
        useEffect(() => {
            console.log(unitData)
        },[unitData])
        useEffect(() => {
            console.log(unitTotal)
        },[unitTotal])


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
                             <h5>Total Warranties Claimed</h5>
                             <h1 style={{fontSize:'48px'}}> {warrantyTotal}</h1>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="4">
                    <Card style={{color: '#014c91', overflow: 'hidden'}}>
                        <CardBody>
                             <h5>Total Warranties Resolved</h5>
                             <h1 style={{fontSize:'48px'}}> {resWarrantyTotal}</h1>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="4">
                    <Card style={{color: '#014c91', overflow: 'hidden', height: '100%'}}>
                        <CardBody>
                             <h5>Total Units with Issues</h5>
                             <h1 style={{fontSize:'40px'}}> {unitTotal}</h1>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-3">

                <Col lg="6">
                    <Card style={{ color: '#014c91', overflow: 'hidden' }}>
                        <CardBody className="mb-5">
                            <ResponsiveContainer width='100%' height={300}>
                                <h5>Claimed and Resolved Warranties over Time</h5>
                                <LineChart data={warrantyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="warranty" name="Warranties Claimed" stroke="#1427E2" />
                                    <Line type="monotone" dataKey="resolved" name="Warranties Resolved" stroke="#FFA500" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="6">
                    <Card style={{color: '#014c91', overflow: 'hidden'}}>
                        <CardBody className="mb-5">
                            <ResponsiveContainer width='100%' height={300}>
                            <h5>Claimed Units across Issue Categories</h5>
                                <BarChart data={unitData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name"/>
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="unit" name="Claimed Units" fill="#893101" activeBar={<Rectangle fill="#D67229" stroke="blue" />} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </Col>

            </Row>


            
        </>
    );
};

export default AfterSalesDashboard;
