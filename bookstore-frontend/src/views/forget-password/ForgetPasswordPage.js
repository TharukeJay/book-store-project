import React,  { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../styles/forgotpassword.css';
import { REQUEST_RESET_PASSWORD_EMAIL } from "../../apis/endpoints";
import API_ENDPOINT from '../../apis/httpAxios';
import toast, {Toaster} from "react-hot-toast";

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
    console.log('formData', formData);
    console.log("Execute Start");
    try {
      const response = await API_ENDPOINT.post(REQUEST_RESET_PASSWORD_EMAIL, formData);
      console.log("response=======", response);

      toast.success("Link send success", {
        style: {
          minWidth: '300px',
          height: '50px',
          // marginRight: '200px'
        },
        className: 'toaster',
        duration: 1000,
      });

      window.location.href="/login";
    } catch (error) {
      console.error('Error:', error);
      toast.error(" Link send faild", {
        style: {
          minWidth: '300px',
          height: '50px',
          // marginRight: '200px'
        },
        className: 'toaster',
        duration: 1000,
      });
    }
  };
  return (
    <>
    <Toaster  
      position="top-center"
      reverseOrder={false}
    />
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
