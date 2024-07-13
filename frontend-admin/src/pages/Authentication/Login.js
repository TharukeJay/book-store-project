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
    const [error, setError] = useState('');
    const [error2, setError2] = useState('');

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
    const getUsers = async () => {
        const response = await executeGetUsers();
        const data = response.data;
        setUserData(data)
    }

    useEffect(() => {
        getUsers()
    }, [])

    const handleChange = (e) => {
        setError('')
        setError2('')
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('print userData===>',userData)
        const userExists = userData.some(user => user.email === formData.email && user.isAdmin === true);
        const user = userData.find(user => (user.data.email === formData.email) && user.data.isAdmin === false);
        if (formData.email == '' ) {
            setError('Enter email address');
            return;
        } else if (formData.password == ''){
            setError2('Enter password');
            return;
        }else if (user) {
            setError('You have requested an admin user, but your request has not been confirmed. Please try again later.');
            return;
        }

        // console.log('user data====>',user.data)
        // if (!user) {
        //     setError('You have requested an admin user, but your request has not been confirmed. Please try again later.');
        //     return;
        // }

        try {

            const response = await executeLoginUser(formData.email, formData.password);
            const data = response.data;
            console.log('login successful:', data);
            localStorage.setItem('token',data.token)
            localStorage.setItem('email', formData.email);
            setLoggedIn(true);
            navigate('/upload');
        } catch (error) {
            console.error('Error:', error);
            setError(error.response.data)
            // if(error=='Request failed with status code 401')navigate('/login-error');
            // else{navigate('/login');}
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center mt-5">
            <Form className="w-50" style={{ backgroundColor: "yellowgreen", padding: '20px', borderRadius: '10px' }} onSubmit={handleSubmit}>
                <center>
                    <h2>Login</h2>
                </center>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} style={{ borderColor: error2 || error ? 'red' : '' }} onChange={handleChange} />
                    {error && <Form.Text className="text-danger" style={{fontSize:14,fontWeight:"bold"}}>{error}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={formData.password} style={{ borderColor: error2 || error ? 'red' : '' }}onChange={handleChange} />
                    {error2 && <Form.Text className="text-danger" style={{fontSize:14,fontWeight:"bold"}}>{error2}</Form.Text>}
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
