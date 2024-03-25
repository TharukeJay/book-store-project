import React,  { useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';


const ForgetPasswordPage = () => {
  const [formData, setFormData] = useState({
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
    const response = await axios.post('www.readlanka.lk/api/auth/forgot-password', formData);
    console.log('Form data submitted successfully:', response.data);
    } catch (error) {
    console.error('Error submitting form data:', error);
    }
  };
  return (
    <>
      <Form className='main-outer' onSubmit={handleSubmit}>
        <h1> Find your account</h1>
        <br /><hr /><br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter your email / mobile number</Form.Label>
          <Form.Control 
            name='username' 
            type="text" 
            placeholder="Enter Email / Phone Number"
            value={formData.username}
            onChange={handleChange}
            required 
          />
        </Form.Group>
        <p>You may recieve Email and SMS notifications from us for secuirity and login purposes.</p>
        <br />
        <Button className='btn login-button-style' variant="primary" type="submit" >
          Continue
        </Button>
      </Form>
    </>
  )
}

export default ForgetPasswordPage
