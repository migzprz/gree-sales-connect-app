import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import ResetPasswordModal from './ResetPasswordModal';
import {Dropdown} from 'react-bootstrap';

const MainHeader = () => {

    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();
    const name = sessionStorage.getItem('userName')
    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        const res = axios.get('http://localhost:4000/api/logout/')
        navigate('/'); // Navigate to the login page after logout
        
    };

    const renderDropdown = (index, id) => {
          return (
            <Dropdown.Menu style={{ position: 'absolute', right: '0', left: 'auto', top: '20px' }}>
              <ResetPasswordModal type={"edit"} id={sessionStorage.getItem('login_id')}/>
              <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          );
      };


    return (
        <div style={{ backgroundColor: '#014c91', padding: '10px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>GreeSales Connect</div>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }} onClick={handleDropdownToggle}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaUser size={20} style={{ marginRight: '5px' }} /> {name ?? 'Error Missing Name'}
                    <div style={{ marginRight: '10px' }}></div>
                </div>
                <div style={{cursor: 'pointer'}} onClick={() => renderDropdown}>&#9662;</div>
                <Dropdown show={showDropdown} align="start">
                    {renderDropdown()}
                </Dropdown>

            </div>
        </div>
    );
};

export default MainHeader;
