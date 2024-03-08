import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react'; 
import { FaEllipsisH, FaFilter, FaSort, FaSearch} from 'react-icons/fa';
import { Row, Col, Card, CardBody, Table, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../index.css';
import AddProductModal from './AddProductModal';
import AddUserModal from './AddUserModal';
import axios from 'axios'
import EditUserModal from './EditUserModal';


const UsersList = () => {

    const [activeDropdown, setActiveDropdown] = useState(null);
    const [employeeData, setEmployeeData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [filterOption, setFilterOption] = useState('');
    const [roleFilterOption, setRoleFilterOption] = useState('');

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getUsers/')
                setEmployeeData(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    },[])
    
    //Navigation Functions

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (e) => {
        setSortOption(e.target.value);
    };

    let sortedEmployees = [...employeeData];
    if (sortOption === 'name-asc') {
        sortedEmployees.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
        sortedEmployees.sort((a, b) => b.name.localeCompare(a.name));
    }

    const filteredEmployees = sortedEmployees.filter(employee => (
        (filterOption === '' || employee.is_active.toString() === filterOption) &&
        (roleFilterOption === '' || employee.role.toString() === roleFilterOption) &&
        (employee.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()))
    ));
    
    
      
    
    //Ellipsis Functions
    const handleEllipsisClick = (index) => {
        setActiveDropdown(index === activeDropdown ? null : index);
      };

      const renderDropdown = (index, id) => {
        if (index === activeDropdown) {
          return (
            <Dropdown.Menu style={{ position: 'absolute', right: '0', left: 'auto', top: '0px' }}>
              <EditUserModal id={id}/>
              <Dropdown.Item>Reset Password</Dropdown.Item>
              <Dropdown.Item>Deactivate User</Dropdown.Item>
            </Dropdown.Menu>
          );
        }
        return null;
      };


      //Date Conversion Function
      function formatDate(dateString) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Parse the date string to a Date object
        const date = new Date(dateString);
        
        // Get day, month, and year from the date object
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        
        // Format day with leading zero if necessary
        const formattedDay = day < 10 ? '0' + day : day;
        
        // Format date in desired format
        return `${formattedDay}-${months[monthIndex]}-${year}`;
    }
      

    return (
        <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91'}}>
            <h1>Manage System Users</h1>
            <h5>View and manage system users</h5>
            <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />


            {/*Navigation Forms*/ }
            <Row>
                {/*Search Bar*/ }
                <Col lg="3">
                    <div className="mb-2 mt-3 input-group" style={{ maxWidth: "100%", display: "flex", 
                                                                    backgroundColor: "#014c91", borderRadius: "10px", 
                                                                    overflow: "hidden"}}>
                        <div style={{backgroundColor: "#014c91", width: "30px", height: "100%"}}>
                            <div style={{padding: "5px", color: 'white'}}>
                                {React.createElement(FaSearch, { size: 20 })}
                            </div>
                        </div>
                        <input type="search" className="form-control" placeholder="Search" value={searchTerm} onChange={handleSearch}/>
                    </div>
                </Col>
                {/*Sorting Mechanism*/ }
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
                            <option value="name-asc">Employee Name (A-Z)</option>
                            <option value="name-desc">Employee Name (Z-A)</option>
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
                            <option value="">All Status</option>
                            <option value="1">Active</option>
                            <option value="0">Deactivated</option>
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
                        <select className="form-select" value={roleFilterOption} onChange={(e) => setRoleFilterOption(e.target.value)}>
                            <option value="">All Roles</option>
                            <option value="Salesperson">Salesperson</option>
                            <option value="Aftersales Staff">Aftersales Staff</option>
                            <option value="Executive">Executive</option>
                            <option value="System Administrator">System Administrator</option>
                        </select>
                    </div>
                </Col>
            </Row>

        
            {filteredEmployees.length > 0 ? (
            <Card style={{ borderRadius: '20px', marginTop: '20px' }}>
                <CardBody>
                    <Table>
                         <thead>
                            <tr>
                                <th style={{color: '#014c91'}}>Name</th>
                                <th style={{color: '#014c91'}}>User ID</th>
                                <th style={{color: '#014c91'}}>User Role</th>
                                <th style={{color: '#014c91'}}>Date Added</th>
                                <th style={{color: '#014c91'}}>System Access</th>
                                <th style={{color: '#014c91'}}>Status</th>
                                <th style={{color: '#014c91'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((user, index) => (
                                <React.Fragment key={user.login_id}>
                                    <tr style={{ borderRadius: '20px', padding: '10px' }}>
                                        <td style={{color: '#014c91'}}>{user.name}</td>
                                        <td style={{color: '#014c91'}}>{user.username}</td>
                                        <td style={{color: '#014c91'}}>{user.role}</td>
                                        <td style={{color: '#014c91'}}>{formatDate(user.date_added)}</td>
                                        <td style={{color: '#014c91'}}>{user.system_access}</td>
                                        <td style={{ color: user.is_active === 1 ? 'green' : 'red' }}>
                                            {user.is_active === 1 ? 'Active' : 'Deactivated'}
                                        </td>

                                        <td style={{ color: '#014c91' }}>
                                        <div style={{ position: 'relative' }}>
                                            <div style={{cursor: 'pointer'}} onClick={() => handleEllipsisClick(index)}>
                                                <FaEllipsisH size={20} />
                                                </div>
                                                <Dropdown show={index === activeDropdown} align="start">
                                                    {renderDropdown(index, user.login_id)}
                                                </Dropdown>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>

                    <Row className="mt-3">
                        <Col>
                            <AddUserModal/>
                        </Col>
                    </Row>

                </CardBody>
            </Card>
            ):(
                <Card style={{ borderRadius: '20px', marginTop: '20px', textAlign: 'center' }}>
                    <CardBody style={{ padding:'100px', color: '#014c91'}}>
                        <h1 className="mt-3"> <FaSearch size={50} className="me-2" />No Users Found  </h1>
                        <Row className="mt-3">
                            <Col>
                                <AddUserModal/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            )}


        </div>
    );
};

export default UsersList;
