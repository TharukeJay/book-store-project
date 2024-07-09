import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import { executeLoginUser } from '../../api/loginUser';
import {executeRestPassword} from "../../api/endPoints";

function Login() {
    const navigate = useNavigate(); // Hook for navigation
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setError('')
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await executeRestPassword(formData.email);
            const data = response.data;
            console.log(`Reset link sent to ${formData.email}`);
            localStorage.setItem('token',data.token)
            setLoggedIn(true);
            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
            if(error){
                setError('Error!,Link send fail.Insert valid email')
            }
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center mt-5">
            <Form className="w-50" style={{ backgroundColor: 'yellowgreen', padding: '20px', borderRadius: '10px' }} onSubmit={handleSubmit}>
                <center>
                    <h2>Forgot Password</h2>
                </center>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                    {error && <Form.Text className="text-danger" style={{fontSize:14,fontWeight:"bold"}}>{error}</Form.Text>}
                </Form.Group>

                {/*<Form.Group className="mb-3" controlId="formBasicPassword">*/}
                {/*    <Form.Label>Password</Form.Label>*/}
                {/*    <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />*/}
                {/*</Form.Group>*/}
                <center>
                    <Button variant="dark" type="submit" style={{ width: '100%', alignItems: 'center' }}>
                        Send Reset Link
                    </Button>
                </center>
                <br />
                <Form.Group className="mb-3">
                    <Form.Label>A new admin? </Form.Label>
                    <Link to="/signup"style={{ color: "darkblue" }}> Signup</Link>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default Login;
