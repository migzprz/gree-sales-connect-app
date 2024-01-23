import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { FaEllipsisH, FaFilter, FaSort, FaSearch} from 'react-icons/fa';
import { Row, Col, Card, CardBody, Table } from 'react-bootstrap';
import '../index.css';

const OcularList = () => {

    const ocularList = [
        {
            id: 1,
            client: 'Client 1',
            company: 'Company 1',
            date: '2024-01-15',
            time: '10:00 AM',
            technician: 'Technician 1',
            status: 'Scheduled'
        },
        {
            id: 2,
            client: 'Client 2',
            company: 'Company 2',
            date: '2024-01-16',
            time: '2:30 PM',
            technician: 'Technician 2',
            status: 'Completed'
        },
        {
            id: 1,
            client: 'Client 1',
            company: 'Company 1',
            date: '2024-01-15',
            time: '10:00 AM',
            technician: 'Technician 1',
            status: 'Scheduled'
        },
        {
            id: 2,
            client: 'Client 2',
            company: 'Company 2',
            date: '2024-01-16',
            time: '2:30 PM',
            technician: 'Technician 2',
            status: 'Completed'
        },
        {
            id: 1,
            client: 'Client 1',
            company: 'Company 1',
            date: '2024-01-15',
            time: '10:00 AM',
            technician: 'Technician 1',
            status: 'Scheduled'
        },
        {
            id: 2,
            client: 'Client 2',
            company: 'Company 2',
            date: '2024-01-16',
            time: '2:30 PM',
            technician: 'Technician 2',
            status: 'Completed'
        },
        // Add more ocular objects as needed
    ];

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Manage Oculars</h1>
            <h5>Manage all scheduled oculars</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />


            {/*Navigation Forms*/ }
            <Row>
                {/*Search Bar*/ }
                <Col lg="4">
                    <form>
                        <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", borderRadius: "10px", 
                                                                        overflow: "hidden"}} >
                            <input type="search" className="form-control" placeholder="Search"/>
                            <button className="btn me-auto" style={{color: "white", backgroundColor: "#014c91"}}>
                                <div style={{color: 'white'}}>
                                    {React.createElement(FaSearch, { size: 20 })}
                                </div>
                            </button>
                        </div>
                    </form>
                </Col>
                {/*Sorting Mechanism*/ }
                <Col lg="4">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex", 
                                                                    backgroundColor: "#014c91", borderRadius: "10px", 
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaSort, { size: 20 })}
                            </div>
                        </div>
                        <select className="form-select">
                            <option value="">Sort by Date and Time (A-Z)</option>
                            <option value="1">Sort by Date and Time (Z-A)</option>
                        </select>
                    </div>
                </Col>
                {/*Filtering Mechanism*/ }
                <Col lg="4">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex",
                                                                    backgroundColor: "#014c91", borderRadius: "10px",
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>   
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaFilter, { size: 20 })}
                            </div>  
                        </div>
                        <select className="form-select">
                            <option value="">All Technicians</option>
                            <option value="1">Technician 1</option>
                            <option value="0">Techinician 2</option>
                        </select>
                    </div>
                </Col>
            </Row>

        
            {/*Table for page content*/}
            <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
                <CardBody>
                    <Table>
                         <thead>
                            <tr>
                                <th style={{color: '#014c91'}}>Client</th>
                                <th style={{color: '#014c91'}}>Company</th>
                                <th style={{color: '#014c91'}}>Date of Ocular</th>
                                <th style={{color: '#014c91'}}>Time of Ocular</th>
                                <th style={{color: '#014c91'}}>Assigned Technician</th>
                                <th style={{color: '#014c91'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ocularList.map((ocular, index) => (
                                <React.Fragment key={ocular.id}>
                                    <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                        <td style={{color: '#014c91'}}>{ocular.client}</td>
                                        <td style={{color: '#014c91'}}>{ocular.company}</td>
                                        <td style={{color: '#014c91'}}>{ocular.date}</td>
                                        <td style={{color: '#014c91'}}>{ocular.time}</td>
                                        <td style={{color: '#014c91'}}>{ocular.technician}</td>
                                        <td style={{color: '#014c91'}}>{React.createElement(FaEllipsisH, { size: 20 })}</td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>


        </div>
    );
};

export default OcularList;
