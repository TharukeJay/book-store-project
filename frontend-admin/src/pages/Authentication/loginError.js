import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { executeLoginUser } from '../../api/loginUser';
import {executeGetBookSeries, executeGetContent, executeGetUsers} from "../../api/endPoints";

function Login() {
    const navigate = useNavigate(); // Hook for navigation
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // const getBookSeries = async () => {
    //     setLoading(true)
    //     const response = await executeGetBookSeries();
    //     const data = response.data;
    //     setBookSeriesData(data)
    //     setLoading(false)
    //     console.log('print getBookserie===>',bookSeriesData);
    //
    // }
    //
    // const getUser = async () => {
    //     setLoading(true)
    //     const response = await executeGetUsers();
    //     const data = response.data;
    //     setLoading(false)
    //
    // }

    useEffect(() => {

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await executeLoginUser(formData.email, formData.password);
            const data = response.data;
            console.log('login successful:', data);
            localStorage.setItem('token',data.token)
            setLoggedIn(true);
            navigate('/upload');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center mt-5">
            <Form className="w-50" style={{ backgroundColor: "darkorange", padding: '20px', borderRadius: '10px' }} onSubmit={handleSubmit}>
                <center>
                    <h2>Sorry! You're not registered admin.</h2>
                </center>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Forgot password? </Form.Label>
                    <Link to="/forgotPassword" style={{ color: "darkblue" }}> Reset password</Link>

                </Form.Group>
                <center>
                    <Button variant="dark" type="submit" style={{ width: '100%', alignItems: 'center'}}>
                        Login
                    </Button>
                </center>
                <br />
                <Form.Group className="mb-3">
                    <Form.Label>A new admin?  </Form.Label>
                    <Link to="/signup" style={{ color: "darkblue" }}>  Signup</Link>
                </Form.Group>
            </Form>
            {isLoggedIn && <Navigate to="/upload" />} {/* Conditionally render Navigate outside the form */}
        </Container>
    );
}

export default Login;
