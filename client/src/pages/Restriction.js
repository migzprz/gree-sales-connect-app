import { Row, Col } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Restriction = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#014c91',
    };

    const contentStyle = {
        textAlign: 'center',
        color: '#fff',
    };

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <FaLock size={85} />
                <h2 className="mt-3">You are unauthorized to access this page.</h2>
                <h4><Link to="/" style={{color: "white"}} >Go Back to Log In Page</Link></h4>
            </div> 
        </div>
    );
};

export default Restriction;
