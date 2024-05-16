import React,{ useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../styles/loginpage.css';
import { CONFIRM_RESET_PASSWORD } from "../../apis/endpoints";
import API_ENDPOINT from '../../apis/httpAxios';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    repassword:"" ,
  });
  const selectedToken = localStorage.getItem('token');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.password !== formData.repassword) {
      alert('Passwords do not match');
    }
    try {
      console.log("Execute Start");
      const response = await API_ENDPOINT.post(`${CONFIRM_RESET_PASSWORD}/${selectedToken}`, formData);
      console.log("response=======", response);
      const data = response.data;
      console.log("Execute success");
      window.location.href = "/login";
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <>
    <div className='login-main-outer'>
      <Form className='form-controler' onSubmit={handleSubmit}>
        <br /><hr /><br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='form-lable'>Password</Form.Label>
          <Form.Control 
            name='password' 
            type="password" 
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='form-lable'>Re-Password</Form.Label>
          <Form.Control 
            name='repassword' 
            type="password" 
            placeholder="confirm Password" 
            value={formData.repassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <br /><br />
        <Button className='btn login-button-style' variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
    </div>

    </>
  )
}

export default ChangePassword;
