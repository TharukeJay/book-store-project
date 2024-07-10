
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import {Link, useNavigate} from "react-router-dom";
import {executeRegisterUser} from "../../api/registerUser";

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [error2, setError2] = useState('');
    const [error3, setError3] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        setError('')
        setError2('')
        setError3('')
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password != formData.confirmPassword) {
            // setError('Enter email address');
            setError2('Entered password and confirm password do not match.');
            return;
        } else if(formData.name == ''){
            setError3('Enter user name.');
            return;
        }else if(formData.email == ''){
            setError('Enter email.');
        return;}
        try {
            const response = await executeRegisterUser(formData.name, formData.email, formData.password);
            const data = response.data;
            console.log('Registration successful:', data);
            if(data.exists == true)setError('This email is already exist')
            else{
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.response.data.error)
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center mt-5">
            <Form className="w-50 " style={{ backgroundColor: 'yellowgreen', padding: '20px', borderRadius: '10px' }} onSubmit={handleSubmit}>
                <center><h2>Sign Up</h2></center>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} style={{ borderColor: error2 || error || error3 ? 'red' : '' }} onChange={handleChange} />
                    {error && <Form.Text className="text-danger" style={{fontSize:14,fontWeight:"bold"}}>{error}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={formData.password} style={{ borderColor: error2 || error || error3 ? 'red' : '' }} onChange={handleChange} />
                    {error2 && <Form.Text className="text-danger" style={{fontSize:14,fontWeight:"bold"}}>{error2}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} style={{ borderColor: error2 || error || error3 ? 'red' : '' }} onChange={handleChange} />
                </Form.Group>

                <center>
                    <Button variant="dark" type="submit" style={{ width: '100%' }} >
                        Sign Up
                    </Button>
                </center>
                <br />
                <Form.Group className="mb-3" >
                    <Form.Label>Already have an account? </Form.Label>
                    <Link to="/login" style={{ color: "darkblue" }} > Login</Link> {/* Navigate to "/login" route */}
                </Form.Group>
            </Form>
        </Container>
    );
}

export default SignUp;
