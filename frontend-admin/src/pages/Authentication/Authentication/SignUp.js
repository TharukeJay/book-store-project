// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Container from 'react-bootstrap/Container';
// import {Link} from "react-router-dom";
//
// function SignUp() {
//     return (
//         <Container className="d-flex flex-column align-items-center mt-5">
//             <Form className="w-50 " style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px' }}>
//                 <center><h2>Sign Up</h2></center>
//                 <Form.Group className="mb-3" controlId="formBasicName">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control type="text" placeholder="Enter your name" />
//                 </Form.Group>
//
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control type="email" placeholder="Enter email" />
//                     <Form.Text className="text-muted">
//                         We'll never share your email with anyone else.
//                     </Form.Text>
//                 </Form.Group>
//
//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control type="password" placeholder="Password" />
//                 </Form.Group>
//
//                 <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
//                     <Form.Label>Confirm Password</Form.Label>
//                     <Form.Control type="password" placeholder="Confirm Password" />
//                 </Form.Group>
// <center>
//                 <Button variant="primary" type="submit" style={{width:'100%'}}>
//                     Sign Up
//                 </Button></center>
//                 <br/>
//                 <Form.Group className="mb-3" >
//                     <Form.Label>Already have an account? </Form.Label>
//                     <Link to="/login"> Login</Link> {/* Navigate to "/login" route */}
//                 </Form.Group>
//             </Form>
//         </Container>
//     );
// }
//
// export default SignUp;
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import {executeRegisterUser} from "../../api/registerUser";

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await executeRegisterUser(formData.name, formData.email, formData.password);
            const data = response.data;
            console.log('Registration successful:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center mt-5">
            <Form className="w-50 " style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px' }} onSubmit={handleSubmit}>
                <center><h2>Sign Up</h2></center>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </Form.Group>

                <center>
                    <Button variant="primary" type="submit" style={{ width: '100%' }} >
                        Sign Up
                    </Button>
                </center>
                <br />
                <Form.Group className="mb-3" >
                    <Form.Label>Already have an account? </Form.Label>
                    <Link to="/login"> Login</Link> {/* Navigate to "/login" route */}
                </Form.Group>
            </Form>
        </Container>
    );
}

export default SignUp;
