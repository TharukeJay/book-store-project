import React ,  { useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../styles/registerpage.css'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname:"" ,
    phonenumber:"" ,
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
    try {
    const response = await axios.post('www.readlanka.lk/api/auth/register', formData);
    console.log('Form data submitted successfully:', response.data);
    } catch (error) {
    console.error('Error submitting form data:', error);
    }
  };

  return (
    <>
      <div className='register-main-outer'>
        <Form className='form-controler' onSubmit={handleSubmit}>
          <h1> Register Here</h1>
          <br /><hr /><br />
          <Form.Group className="mb-3" controlId="formBasicFname">
            <Form.Label className='form-lable'>First Name</Form.Label>
            <Form.Control 
              name='fname' 
              type="text" 
              placeholder="First Name" 
              value={formData.fname}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLname">
            <Form.Label className='form-lable'>Last Name</Form.Label>
            <Form.Control 
              name='lname' 
              type="text" 
              placeholder="Last Name"
              value={formData.lname}
              onChange={handleChange}
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label className='form-lable'>Phone Number</Form.Label>
            <Form.Control 
              name='phonenumber' 
              type="text" 
              placeholder="Enter phone"
              value={formData.phonenumber}
              onChange={handleChange}
              required 
            />
          </Form.Group>
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
