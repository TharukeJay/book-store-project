import React ,  { useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../styles/registerpage.css'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email:"" ,
    username:"" ,            
    password:"" ,
    repassword:"" ,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.password !== formData.repassword) {
      console.error('Passwords do not match');
      return;
    }
    const API_URL = 'http://localhost:3000/api';
      try {
        const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle successful signup
        console.log('User signed up successfully');
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({formData}),
  //     });
  //     if (response.ok) {
  //       // Handle successful signup
  //       console.log('User signed up successfully');
  //     } else {
  //       const data = await response.json();
  //       console.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error signing up:', error);
  //   }
  // };

  return (
    <>
      <div className='register-main-outer'>
        <Form className='form-controler' onSubmit={handleSubmit}>
          <h1> Register Here</h1>
          <br /><hr /><br />
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label className='form-lable'>Enter your Name</Form.Label>
            <Form.Control 
              name='username' 
              type="text" 
              placeholder="Enter Your Name"
              value={formData.username}
              onChange={handleChange}
              required 
            />
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="formBasicRePassword">
            <Form.Label className='form-lable'>Password</Form.Label>
            <Form.Control 
              name='repassword' 
              type="password" 
              placeholder="Password"
              value={formData.repassword}
              onChange={handleChange}
              required 
            />
          </Form.Group>
          <br />
          <Button className='btn register-button-style' variant="primary" type="submit" >
            Register
          </Button>
          <p>already have an account?  <a href="/login">signIn</a>  </p>
          {/* <Button className='btn btn-danger button-style' variant="primary" onclick="window.location.href='/login'" >
            Login
          </Button> */}
        </Form>
      </div>
    </>
  )
}

export default RegisterPage
