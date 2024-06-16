import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import  '../../styles/checkout.css'
// import toast, {Toaster} from "react-hot-toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// toast.configure();

const Checkout = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const price = params.get('price');
    const title = params.get('title');

    const ConfirmOrder = (e) => {
        e.preventDefault()
        alert('Order successfully');
        window.location.href='/my-books'
    };

    return (
        <>
            <div className='checkout-main-outer'>
                <Form className='form-controler' onSubmit={ConfirmOrder}>
                    <h1> Checkout</h1>
                    <br/>
                    <hr/>
                    <br/>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='form-lable'><span>Book Title:</span> {title}</Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='form-lable'><span>Total Amount:</span> LKR {price}</Form.Label>
                    </Form.Group>
                    <br/><br/>
                    <Button className='btn button-style' variant="primary" type="submit"  >
                        Confirm
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default Checkout;
