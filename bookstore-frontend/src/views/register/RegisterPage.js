import React ,  { useState } from 'react'
// import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../styles/authentication-page.css';
import {SIGN_UP  } from "../../apis/endpoints";
import toast, {Toaster} from "react-hot-toast";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email:"" ,
    password:"" ,
    userName:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const apiUrl = SIGN_UP;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // console.log(authApi.registerAPI);

      try {
        const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('User signed up successfully');
        toast.success(" Register Successfully", {
          style: {
            minWidth: '300px',
            height: '50px',
            // marginRight: '200px'
          },
          className: 'toaster',
          duration: 1000,
        });
        window.location.href='/home'
      } else {
        const data = await response.json();
        console.error(data.message);
        toast.error(" Register faild", {
          style: {
            minWidth: '300px',
            height: '50px',
            // marginRight: '200px'
          },
          className: 'toaster',
          duration: 1000,
        });
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
      <div className='main-outer'>
        <Form className='form-controler' onSubmit={handleSubmit}>
          <h1 style={{color:'#6a2bf4'}}> Register Here</h1>
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
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label className='form-lable'>User Name</Form.Label>
            <Form.Control
              name='userName'
              type="text"
              placeholder="Enter User Name"
              value={formData.userName}
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
          <br />
          <Button className='btn button-style' variant="primary" type="submit" >
            Register
          </Button>
          <p>already have an account?  <a href="/login" style={{color:'blue'}}>signIn</a>  </p>
        </Form>
      </div>
    </>
  )
}

export default RegisterPage
