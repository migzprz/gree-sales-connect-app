import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const MainHeader = () => {

    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();
    const name = sessionStorage.getItem('userName')

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        navigate('/'); // Navigate to the login page after logout
    };

    return (
        <div style={{ backgroundColor: '#014c91', padding: '10px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>GreeSales Connect</div>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }} onClick={handleDropdownToggle}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaUser size={20} style={{ marginRight: '5px' }} /> {name ?? 'Error Missing Name'}
                    <div style={{ marginRight: '10px' }}></div>
                </div>
                <span>&#9662;</span>
                {showDropdown && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '100%',
                            right: '0',
                            background: 'white',
                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                            borderRadius: '4px',
                            zIndex: '1',
                        }}
                    >
                        <div style={{ width: '120px', padding: '8px', cursor: 'pointer', color: 'black' }}>Edit Profile</div>
                        <div style={{ padding: '8px', cursor: 'pointer', color: 'black' }} onClick={handleLogout}>Log Out</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainHeader;
