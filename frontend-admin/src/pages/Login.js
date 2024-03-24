import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import {Link} from "react-router-dom";
import React from "react";

function Login() {
    return (
        <Container className="d-flex flex-column align-items-center mt-5">
            <Form className="w-50"style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px' }}>
                <center>
                <h2>Login</h2></center>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    {/*<Form.Text className="text-muted">*/}
                    {/*    We'll never share your email with anyone else.*/}
                    {/*</Form.Text>*/}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">*/}
                {/*    <Form.Check type="checkbox" label="Check me out" />*/}
                {/*</Form.Group>*/}
                    <center>
                <Button variant="primary" type="submit" style={{width: '100%',alignItems:"center"}}>
                    Login
                </Button></center>
                <br/>
                <Form.Group className="mb-3" >
                    <Form.Label>A new admin ? </Form.Label>
                    <Link to="/signup"> Signup</Link> {/* Navigate to "/login" route */}
                </Form.Group>
            </Form>
        </Container>
    );
}

export default Login;
