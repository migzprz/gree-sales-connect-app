import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, LineChart, Line  } from 'recharts';
import { Row, Col, Card, CardBody, Table } from 'react-bootstrap';
import '../index.css';
import SalesDashboard from './Dashboards/SalesDashboard';
import AfterSalesDashboard from './Dashboards/AfterSalesDashboard';
import ExecutiveDashboard from './Dashboards/ExecutiveDashboard';
import SysAdDashboard from './Dashboards/SysAdDashboard';

const Dashboard = () => {

    const [userType, setUserType]=useState(1);

    const ocularData = [
        {name: 'JAN', ocular: 10}, {name: 'FEB', ocular: 120}, {name: 'MAR', ocular: 110}, {name: 'APR', ocular: 150}, 
        {name: 'MAY', ocular: 160}, {name: 'JUN', ocular: 180}, {name: 'JUL', ocular: 160}, {name: 'AUG', ocular: 130},
        {name: 'SEP', ocular: 130}, {name: 'OCT', ocular: 130}, {name: 'NOV', ocular: 130}, {name: 'DEC', ocular: 130}
      ];

    const quotationData = [
        {name: 'JAN', quotation: 120}, {name: 'FEB', quotation: 120}, {name: 'MAR', quotation: 110}, {name: 'APR', quotation: 150}, 
        {name: 'MAY', quotation: 160}, {name: 'JUN', quotation: 180}, {name: 'JUL', quotation: 160}, {name: 'AUG', quotation: 130},
        {name: 'SEP', quotation: 130}, {name: 'OCT', quotation: 30}, {name: 'NOV', quotation: 230}, {name: 'DEC', quotation: 130}
      ];


    const [ocularLinesVisibility, setOcularLinesVisibility] = useState({ocular: true});
    const [quotationLinesVisibility, setquotationLinesVisibility] = useState({quotation: true});
    
    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Dashboard</h1>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
            
            {userType === 1 ?
                <SalesDashboard/> :
            userType===2 ?
                <AfterSalesDashboard/> :
            userType===3 ?
                <ExecutiveDashboard/> :
            userType===4 ?
                <SysAdDashboard/> :
            null}
            


        </div>
    );
};

export default Dashboard;
