import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { executeLoginUser } from '../../api/loginUser';
import {executeGetBookSeries, executeGetContent, executeGetUsers} from "../../api/endPoints";
import toast from "bootstrap/js/src/toast";
import axios from "axios";
import {REQUEST_RESET_PASSWORD} from "../../configs/commomConfigs";

function ResetPassword() {
    const navigate = useNavigate(); // Hook for navigation
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState([]);
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const token = window.location.href.split('/reset-password/')[1];
    console.log('User ID:', token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        if (formData.newPassword !== formData.confirmPassword) {
            alert('Passwords do not match');
        }
        try {
            console.log("Execute Start");
            const response = await axios.post(`${REQUEST_RESET_PASSWORD}/${token}`, formData);
            console.log("response=======", response);
            const data = response.data;

            alert("Password Change Successfully");
            navigate('/login');
            // window.location.href = "/login";
        } catch (error) {
            console.error('Error:', error);
            alert("Password Change fail")}
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //
    //         const response = await executeLoginUser(formData.email, formData.password);
    //         const data = response.data;
    //         console.log('login successful:', data);
    //         localStorage.setItem('token',data.token)
    //         setLoggedIn(true);
    //         navigate('/upload');
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    return (
        <Container className="d-flex flex-column align-items-center mt-5">
            <Form className="w-50" style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px' }} onSubmit={handleSubmit}>
                <center>
                    <h2>Reset Password</h2>
                </center>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='form-lable'>Password</Form.Label>
                    <Form.Control
                        name='newPassword'
                        type="password"
                        placeholder="Enter password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='form-lable'>Re-Password</Form.Label>
                    <Form.Control
                        name='confirmPassword'
                        type="password"
                        placeholder="confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                {/*<Form.Group className="mb-3" controlId="formBasicEmail">*/}
                {/*    <Form.Label>Email address</Form.Label>*/}
                {/*    <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />*/}
                {/*</Form.Group>*/}

                {/*<Form.Group className="mb-3" controlId="formBasicPassword">*/}
                {/*    <Form.Label> New Password</Form.Label>*/}
                {/*    <Form.Control type="password" placeholder="Password" name="password" value={formData.newPassword} onChange={handleChange} />*/}
                {/*</Form.Group>*/}
                {/*<Form.Group className="mb-3" controlId="formBasicPassword">*/}
                {/*    <Form.Label> Confirm Password</Form.Label>*/}
                {/*    <Form.Control type="password" placeholder="Password" name="password" value={formData.confirmPassword} onChange={handleChange} />*/}
                {/*</Form.Group>*/}
                <center>
                    <Button variant="primary" type="submit" style={{ width: '100%', alignItems: 'center' }}>
                        Change Password
                    </Button>
                </center>
                <br />
                <Form.Group className="mb-3">
                    <Form.Label>A new admin? </Form.Label>
                    <Link to="/signup"> Signup</Link>
                </Form.Group>
            </Form>
            {isLoggedIn && <Navigate to="/upload" />} {/* Conditionally render Navigate outside the form */}
        </Container>
    );
}

export default ResetPassword;
