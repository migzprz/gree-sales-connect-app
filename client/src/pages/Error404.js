import { Row, Col } from 'react-bootstrap';
import { FaExclamationCircle } from 'react-icons/fa';
import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Error404 = () => {
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
                <FaExclamationCircle size={85} />
                <h2 className="mt-3">There has been an error.</h2>
                <h4 ><Link to="/home" style={{color: "white"}}>Go Back</Link></h4>
            </div>
        </div>
    );
};

export default Error404;
