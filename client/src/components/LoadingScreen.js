import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingScreen = () => {
    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#E5EDF4', color: '#014c91' }}>
            <Spinner animation="border" style={{ width: '5rem', height: '5rem' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default LoadingScreen;
