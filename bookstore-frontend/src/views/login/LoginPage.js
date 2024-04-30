import React,  { useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import '../../styles/loginpage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password:"" ,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const API_URL = 'http://localhost:3001/api';

    try {
      const response = await fetch('${API_URL}/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.error(data.message);
    } catch (error) {
        console.error('Error:', error);
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
            name='email' 
            type="email" 
            placeholder="Enter email"
            value={formData.email}
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
            value={formData.password}
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
      </Form>
    </div>

    </>
  )
}

export default LoginPage
