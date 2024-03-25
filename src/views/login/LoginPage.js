import React,  { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import '../../styles/loginpage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password:"" ,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
    const response = await axios.post('www.readlanka.lk/api/auth/login', formData);
    console.log('Form data submitted successfully:', response.data);
    } catch (error) {
    console.error('Error submitting form data:', error);
    }
  };
  return (
    <>
    <div className='login-main-outer'>
      <Form className='form-controler' onSubmit={handleSubmit}>
        <h1> Login Here</h1>
        <br /><hr /><br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='form-lable'>Email address</Form.Label>
          <Form.Control 
            name='username' 
            type="email" 
            placeholder="Enter email"
            value={formData.username}
            onChange={handleChange}
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='form-lable'>Password</Form.Label>
          <Form.Control 
            name='password' 
            type="password" 
            placeholder="Password" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <a href="/forgot-password">Forgot Password</a>
        <br /><br />
        <Button className='btn login-button-style' variant="primary" type="submit" >
          Login
        </Button>
        <p>Don't have an account? <a href="/register"> SignUp</a></p>
        {/* <Button className='btn btn-danger button-style' variant="primary"  >
          Register
        </Button> */}
      </Form>
    </div>

    </>
  )
}

export default LoginPage
