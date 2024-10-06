import React,  { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../styles/authentication-page.css';
import { LOG_IN } from "../../apis/endpoints";
import API_ENDPOINT from '../../apis/httpAxios';
import toast, {Toaster} from "react-hot-toast";

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
    console.log("Execute Start");
    try {
      const response = await API_ENDPOINT.post(LOG_IN, formData);
      console.log("response=======", response);
      const data = response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);

      toast.success(" Welcome ! ...Login Succesfully", {
        style: {
          minWidth: '300px',
          height: '50px',
          // marginRight: '200px'
        },
        className: 'toaster',
        duration: 5000,
      });
      if (response.status == 200) {
        window.location.href="/"
      }
      window.location.href = "/";

    } catch (error) {
      console.error('Error:', error);
      toast.error(" Login Faild", {
        style: {
          minWidth: '300px',
          height: '50px',
          // marginRight: '200px'
        },
        className: 'toaster',
        duration: 2000,
      });
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
        <h1 style={{color:'#6a2bf4'}}> Login Here</h1>
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
        <a href="/forgot-password" style={{color:'blue'}}>Forgot Password</a>
        <br /><br />
        <Button className='btn button-style' variant="primary" type="submit" >
          Login
        </Button>
        <p>Don't have an account? <a href="/register" style={{color:'blue'}}> SignUp</a></p>
        <div style={{height:'10px'}}></div>
        <p style={{alignItems:'start'}}>If you are a Admin Login  <a href='https://book-store-project-azure.vercel.app/' style={{color:'blue'}}>here</a></p>
      </Form>
    </div>

    </>
  )
}

export default LoginPage
