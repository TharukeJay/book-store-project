import React,{ useState ,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../styles/authentication-page.css';
import { CONFIRM_RESET_PASSWORD } from "../../apis/endpoints";
import API_ENDPOINT from '../../apis/httpAxios';
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    nwPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const token = window.location.href.split('/reset-password/')[1];
  console.log('Token ID:', token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      console.log("Execute Start");
      const response = await axios.post(`${CONFIRM_RESET_PASSWORD}/${token}`, formData);
      console.log("response=======", response);

      toast.success("Password Change Successfully", {
        style: {
          minWidth: '300px',
          height: '50px',
          // marginRight: '200px'
        },
        className: 'toaster',
        duration: 1000,
      });

      window.location.href = "/login";
    } catch (error) {
      console.error('Error:', error);
      toast.error(" Password Change faild", {
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
    <div className='main-outer'>
      <Form className='form-controler' onSubmit={handleSubmit}>
        <br /><hr /><br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='form-lable'>Password</Form.Label>
          <Form.Control 
            name='newPassword'
            type="password" 
            placeholder="Enter New password"
            value={formData.newPassword}
            onChange={handleChange}
            required 
          />
        </Form.Group>
        <br /><br />
        <Button className='btn button-style' variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
    </div>

    </>
  )
}

export default ChangePassword;
