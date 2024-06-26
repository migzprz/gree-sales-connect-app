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

    const [userType, setUserType]=useState(3);
    const role = sessionStorage.getItem('role')
    
    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Dashboard</h1>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
            
            {role === 'Salesperson' ?
                <SalesDashboard/> :
            role === 'Aftersales Staff' ?
                <AfterSalesDashboard/> :
            role === 'Executive' ?
                <ExecutiveDashboard/> :
            role === 'System Administrator' ?
                <SysAdDashboard/> :
            null}
            


        </div>
    );
};

export default Dashboard;
