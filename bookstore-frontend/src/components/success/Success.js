// import React, {useEffect, useState} from 'react';
// import '../../styles/success.css'
// import {Navigate, useLocation, useNavigate} from "react-router-dom";
// import API_ENDPOINT from "../../apis/httpAxios";
// import {FETCH_ALL_BOOK, PAYMENT_SUCCESS} from "../../apis/endpoints";
// import ScreenLoading from "../loading/Loading";
//
// const Success = () => {
//     const location = useLocation();
//     const Navigate = useNavigate();
//     const [paymentData, setPaymentData] = useState('');
//     const [loading, setLoading] = useState(true); // Loading state
//     const orderId = new URLSearchParams(location.search).get('order_id');
//
//     // const orderId = '4981-348569-8031';
//
//     const getPaymentData = async () => {
//         try {
//             const response = await API_ENDPOINT.get(`${PAYMENT_SUCCESS}/${orderId}`);
//             const paymentResData = response.data.data;
//             setPaymentData(paymentResData);
//             console.log("getPaymentData ===========>>>",paymentData )
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };
//
//     useEffect(() => {
//         getPaymentData();
//     }, [])
//
//     const ConfirmPayment = async () => {
//         Navigate('/myBookRack')
//     }
//     const ErrorConfirmPayment = async () => {
//         Navigate('/')
//     }
//
//     useEffect(() => {
//         const timeoutId = setTimeout(() => {
//             setLoading(false);  // Stop loading after 10 seconds
//             getPaymentData();   // Call the backend within those 10 seconds
//         }, 10000);
//
//         return () => clearTimeout(timeoutId); // Clean up timer
//     }, []);
//
//     if (loading) {
//         return (
//             <div style={{width: '100%', display: "flex", alignItems: 'center', justifyContent: 'center', marginTop: '60px'}}>
//                 <div className="loading-spinner">
//                     <ScreenLoading></ScreenLoading>
//                     <p>Your payment processing.....</p>
//                 </div>
//             </div>
//         );
//     }
//
//     const isSuccess = paymentData.status_code === 'SUCCESS';
//
//     return (
//         <div
//             style={{width: '100%', display: "flex", alignItems: 'center', justifyContent: 'center', marginTop: '60px'}}>
//             <div className='body'>
//                 <div className="card">
//                     {isSuccess ? (
//                         <>
//                             <div style={{
//                                 borderRadius: '200px',
//                                 height: '200px',
//                                 width: '200px',
//                                 background: '#F8FAF5',
//                                 margin: '0 auto'
//                             }}>
//                                 <i className="checkmark">✓</i>
//                             </div>
//                             <h1>Success</h1>
//                             <p>Your payment has been successful<br/> Please save below ID's</p>
//                             <p>Order ID : {paymentData.order_id}</p>
//                             <p>Payment ID : {paymentData.payment_id}</p>
//                             <div style={{height: '40px'}}></div>
//                             <div>
//                                 <button className='btn btn-success' style={{padding: '10px 30px', fontSize: '15px'}}
//                                         onClick={ConfirmPayment}>Go Back to Book Rack
//                                 </button>
//                             </div>
//                         </>
//                     ) : (
//                         <>
//                             <div style={{
//                                 borderRadius: '200px',
//                                 height: '200px',
//                                 width: '200px',
//                                 background: '#F8FAF5',
//                                 margin: '0 auto',
//                                 color: 'red'
//                             }}>
//                                 <i className="checkmark">✗</i>
//                             </div>
//                             <h1>Payment Failed</h1>
//                             <p>There was an issue with your payment.<br/></p>
//                             <div style={{height: '40px'}}></div>
//                             <div>
//                                 <button className='btn btn-danger' style={{padding: '10px 30px', fontSize: '15px'}}
//                                         onClick={ErrorConfirmPayment}>Back to
//                                 </button>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default Success;

//new code

import React, { useEffect, useState } from 'react';
import '../../styles/success.css';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import API_ENDPOINT from "../../apis/httpAxios";
import { PAYMENT_SUCCESS } from "../../apis/endpoints";
import ScreenLoading from "../loading/Loading";

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentData, setPaymentData] = useState('');
    const [loading, setLoading] = useState(true);
    const orderId = new URLSearchParams(location.search).get('order_id');
    // const orderId = '4981-348569-8031';
    const getPaymentData = async () => {
        try {
            const response = await API_ENDPOINT.get(`${PAYMENT_SUCCESS}/${orderId}`);
            const paymentResData = response.data.data;
            setPaymentData(paymentResData);
            console.log("getPaymentData ===========>>>", paymentResData);

            // If status_code is present, we stop loading
            if (paymentResData?.status_code) {
                setLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const ConfirmPayment = async () => {
        navigate('/myBookRack');
    };

    const ErrorConfirmPayment = async () => {
        navigate('/');
    };

    useEffect(() => {
        const firstCallTimeout = setTimeout(() => {
            getPaymentData();
        }, 5000); // Call getPaymentData after 5 seconds

        const secondCallTimeout = setTimeout(() => {
            if (!paymentData?.status_code) {
                getPaymentData(); // Second call at 10 seconds if status_code is still missing
            }
            setLoading(false); // After 10 seconds, stop loading regardless
        }, 10000);

        return () => {
            clearTimeout(firstCallTimeout);
            clearTimeout(secondCallTimeout);
        };
    }, []); // Empty dependency ensures this effect runs only once after mounting

    if (loading) {
        return (
            <div style={{ width: '100%', display: "flex", alignItems: 'center', justifyContent: 'center', marginTop: '60px' }}>
                <div className="loading-spinner">
                    <ScreenLoading></ScreenLoading>
                    <p>Your payment processing.....</p>
                </div>
            </div>
        );
    }

    const isSuccess = paymentData?.status_code === 'SUCCESS';

    return (
        <div style={{ width: '100%', display: "flex", alignItems: 'center', justifyContent: 'center', marginTop: '60px' }}>
            <div className='body'>
                <div className="card">
                    {isSuccess ? (
                        <>
                            <div style={{
                                borderRadius: '200px',
                                height: '200px',
                                width: '200px',
                                background: '#F8FAF5',
                                margin: '0 auto'
                            }}>
                                <i className="checkmark">✓</i>
                            </div>
                            <h1>Success</h1>
                            <p>Your payment has been successful<br/> Please save below ID's</p>
                            <p>Order ID : {paymentData?.order_id}</p>
                            <p>Payment ID : {paymentData?.payment_id}</p>
                            <div style={{ height: '40px' }}></div>
                            <div>
                                <button className='btn btn-success' style={{ padding: '10px 30px', fontSize: '15px' }}
                                        onClick={ConfirmPayment}>Go Back to Book Rack
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{
                                borderRadius: '200px',
                                height: '200px',
                                width: '200px',
                                background: '#F8FAF5',
                                margin: '0 auto',
                                color: 'red'
                            }}>
                                <i className="checkmark">✗</i>
                            </div>
                            <h1>Payment Failed</h1>
                            <p>There was an issue with your payment.<br/></p>
                            <div style={{ height: '40px' }}></div>
                            <div>
                                <button className='btn btn-danger' style={{ padding: '10px 30px', fontSize: '15px' }}
                                        onClick={ErrorConfirmPayment}>Back to
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Success;

