import React,  { useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import '../../styles/forgotpassword.css';

const ForgetPasswordPage = () => {
  const [formData, setFormData] = useState({
    useemailrname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
    const response = await axios.post('api/forgot-password', formData);
    console.log('Form data submitted successfully:', response.data);
    } catch (error) {
    console.error('Error submitting form data:', error);
    }
  };
  return (
    <>
    <div className='fw-main-outer'>
      <Form className='form-controler' onSubmit={handleSubmit}>
        <h1> Find your account</h1>
        <br /><hr /><br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='form-lable'>Enter your email </Form.Label>
          <Form.Control 
            name='email' 
            type="email" 
            placeholder="Enter Email "
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </Form.Group>
        <p>You may recieve Email from us for secuirity and login purposes.</p>
        <br />
        <Button className='btn login-button-style' variant="primary" type="submit" >
          Continue
        </Button>
      </Form>
    </div>
    </>
  )
}

export default ForgetPasswordPage
