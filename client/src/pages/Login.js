import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useHistory
import { Row, Form } from 'react-bootstrap';
import '../index.css';
import banner from '../assets/gree_banner.png';
import axios from 'axios';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:4000/api/login', { username, password });
            if (response.data.message === "Login successful") {
                navigate('/home');
            } else {
                alert('Incorrect username or password');
            }
        } catch (error) {
            console.error('Login failed:', error.message);
            alert('An error occurred while logging in');
        }
    };
    
    

    return (
        <div style={{ background: '#E5EDF4', color: '#014c91', minHeight: '100vh', overflowX: 'hidden' }}>
            <Row className="pt-5">
                <img src={banner} style={{ width: '100%', height: 'auto', opacity: '1' }} alt="Banner" />
            </Row>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '40px' }}>
                <div style={{ width: '500px', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                    <h2>Log in to Your Account</h2>
                    <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mt-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className="text-center mt-4">
                            <button style={{ width: '300px', padding: '4px', borderRadius: '10px', background: '#014c91', color: 'white' }} onClick={handleLogin}>
                                Sign In
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
