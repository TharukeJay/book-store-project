import React, {useEffect, useState} from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import  '../../styles/checkout.css'
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import toast, {Toaster} from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import API_ENDPOINT from "../../apis/httpAxios";
import {
    FETCH_ALL_AUDIO_BOOK,
    ADD_TO_PURCHASE_BOOK,
    FETCH_ALL_READ_BOOK,
    GET_COMMENTS_AUDIO, GET_USER_DATA
} from "../../apis/endpoints";
import ScreenLoading from "../loading/Loading";
import {MdArrowBackIos} from "react-icons/md";
import {map} from "react-bootstrap/ElementChildren";
import toast, {Toaster} from "react-hot-toast";
import {confirmationBtn} from "../../common/commonColors";
// toast.configure();

const Checkout = () => {
    const location = useLocation();
    const [book, setBook] = useState(null);
    const [audioBook, setAudioBook] = useState(null);
    const Navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const bookId = params.get('id');
    // const AudioBookid = params.get('AudioBookid');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showModalBuy, setShowModalBuy] = useState(false);
    const [showModalNavigate, setShowModalNavigate] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedAudioId, setSelectedAudioId] = useState(null);
    const userId = localStorage.getItem('userId');
    const { type } = location.state;
    const { BookDataId } = location.state;


    console.log("userId=======================>>>", userId);
    console.log('Bookid========>>>', bookId);
    console.log('BookDataId  ========>>>', BookDataId);

    const fetchData = async () => {
        try {
            if(type =='audio'){
                const response = await API_ENDPOINT.get(`${GET_COMMENTS_AUDIO}/${bookId}`);
                    const selectedSeriesData = response.data.data;
                    setAudioBook(selectedSeriesData);
                    // console.log('seriesData =====================>>>> :', audioBook);
                    setLoading(false);
            }else{
                const response = await API_ENDPOINT.get(`${FETCH_ALL_READ_BOOK}/${bookId}`);
                    const selectedBookData = response.data;
                    setBook(selectedBookData.data);
                    // console.log('response Book Data =====>>>>>>>:', book);
                    setLoading(false);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(()=> {
        fetchData();
    },[type, bookId]);

    const pdfDataId = BookDataId.map(book=> book.bookId);

    const openModal = (id) => {
        if ( pdfDataId.includes(id)) {
            setShowModalBuy(true);
        } else {
            setSelectedId(id);
            setShowModal(true);
        }
    };

    const openModalAudio = (id) => {
        if ( pdfDataId.includes(id)) {
            setShowModalBuy(true);
        } else {
            setSelectedAudioId(id);
            setShowModal(true);
        }
    };

    console.log('selectedId=======>>>>>', selectedId)
    console.log('selectedAudioId=======>>>>>', selectedAudioId)

    const handleConfirmOrder = async () => {
        // if (!userId) {
        //     setShowModalNavigate(true);
        //     return;
        // }
        // try {
        //     if(type =='book') {
        //         await API_ENDPOINT.post(ADD_TO_PURCHASE_BOOK, {
        //             bookid: selectedId,
        //             userId: userId,
        //             type: 'book'
        //         });
        //         setShowModal(false);
        //         toast.success(" Welcome ! ...Payment Successful", {
        //             style: {
        //                 minWidth: '300px',
        //                 height: '50px',
        //                 // marginRight: '200px'
        //             },
        //             className: 'toaster',
        //             duration: 5000,
        //         });
        //         Navigate('/payment-success',{state:{type:'book'}});
        //     }else{
        //         await API_ENDPOINT.post(ADD_TO_PURCHASE_BOOK, {
        //             bookid: selectedAudioId,
        //             userId: userId,
        //             type: 'audio'
        //         });
        //         setShowModal(false);
        //         toast.success(" Welcome ! ...Payment Successful", {
        //             style: {
        //                 minWidth: '300px',
        //                 height: '50px',
        //                 // marginRight: '200px'
        //             },
        //             className: 'toaster',
        //             duration: 5000,
        //         });
        //         Navigate('/payment-success',{state:{type:'audio'}});
        //         // Navigate('/payment-success',{state:{type:'audio'}});
        //     }
        //
        // } catch (error) {
        //     console.error('Error adding to user collection:', error);
        //         setShowModalNavigate(true);
        //         return;
        //
        // }

        // new code ========================
        try {
            if(type =='book') {
                        await API_ENDPOINT.post(ADD_TO_PURCHASE_BOOK, {
                            bookid: selectedId,
                            userId: userId,
                            type: 'book'
                        });
                        setShowModal(false);
                        toast.success(" Welcome ! ...Payment Successful", {
                            style: {
                                minWidth: '300px',
                                height: '50px',
                                // marginRight: '200px'
                            },
                            className: 'toaster',
                            duration: 5000,
                        });
                // const orderId = type === 'book' ? selectedId : selectedAudioId;
                const orderId = '1235';
                // const price = type === 'book' ? book.price : audioBook.seriesPrice;
                const price = '500';
                // const response = await API_ENDPOINT.post('/payment-create', {
                //     order_id: orderId,
                //     amount: price,
                //     userId,
                //     currency: 'LKR'
                // });

                // const { hash, merchant_id, return_url } = response.data;

                // Create an HTML form and submit it
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = 'https://sandbox.payhere.lk/pay/checkout';

                const fields = {
                    // merchant_id,
                    merchant_id :'1228092',
                    // return_url,
                    return_url :'localhost/home',
                    cancel_url: 'http://yourdomain.com/cancel',
                    notify_url: 'http://yourdomain.com/notify',
                    order_id: orderId,
                    // items: type === 'book' ? book.title : audioBook.seriesTitle,
                    items: 'book',
                    currency: 'LKR',
                    amount: price,
                    first_name: 'CustomerFirstName', // Replace with actual customer data
                    last_name: 'CustomerLastName',  // Replace with actual customer data
                    email: 'customer@example.com',  // Replace with actual customer data
                    phone: '0771234567',            // Replace with actual customer data
                    address: 'CustomerAddress',     // Replace with actual customer data
                    city: 'CustomerCity',           // Replace with actual customer data
                    country: 'Sri Lanka',           // Replace with actual customer data
                    // hash,
                    hash:'MTc0NTAxNTQzNjEwMjc3MjMzNjkzNDkxODA5MjIzMTIxOTYwNzgwOQ==',
                };

                for (const key in fields) {
                    if (fields.hasOwnProperty(key)) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = key;
                        input.value = fields[key];
                        form.appendChild(input);
                    }
                }

                document.body.appendChild(form);
                form.submit();

                    }else{
                        await API_ENDPOINT.post(ADD_TO_PURCHASE_BOOK, {
                            bookid: selectedAudioId,
                            userId: userId,
                            type: 'audio'
                        });
                        setShowModal(false);
                        toast.success(" Welcome ! ...Payment Successful", {
                            style: {
                                minWidth: '300px',
                                height: '50px',
                                // marginRight: '200px'
                            },
                            className: 'toaster',
                            duration: 5000,
                        });
                // const orderId = type === 'book' ? selectedId : selectedAudioId;
                const orderId = '1235';
                // const price = type === 'book' ? book.price : audioBook.seriesPrice;
                const price = '500';
                // const response = await API_ENDPOINT.post('/payment-create', {
                //     order_id: orderId,
                //     amount: price,
                //     userId,
                //     currency: 'LKR'
                // });

                // const { hash, merchant_id, return_url } = response.data;

                // Create an HTML form and submit it
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = 'https://sandbox.payhere.lk/pay/checkout';

                const fields = {
                    // merchant_id,
                    merchant_id :'1228092',
                    // return_url,
                    return_url :'localhost/home',
                    cancel_url: 'http://yourdomain.com/cancel',
                    notify_url: 'http://yourdomain.com/notify',
                    order_id: orderId,
                    // items: type === 'book' ? book.title : audioBook.seriesTitle,
                    items: 'book',
                    currency: 'LKR',
                    amount: price,
                    first_name: 'CustomerFirstName', // Replace with actual customer data
                    last_name: 'CustomerLastName',  // Replace with actual customer data
                    email: 'customer@example.com',  // Replace with actual customer data
                    phone: '0771234567',            // Replace with actual customer data
                    address: 'CustomerAddress',     // Replace with actual customer data
                    city: 'CustomerCity',           // Replace with actual customer data
                    country: 'Sri Lanka',           // Replace with actual customer data
                    // hash,
                    hash:'MTc0NTAxNTQzNjEwMjc3MjMzNjkzNDkxODA5MjIzMTIxOTYwNzgwOQ==',
                };

                for (const key in fields) {
                    if (fields.hasOwnProperty(key)) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = key;
                        input.value = fields[key];
                        form.appendChild(input);
                    }
                }

                document.body.appendChild(form);
                form.submit();
                    }

        } catch (error) {
            console.error('Error creating payment:', error);
            setShowModalNavigate(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const closeModalBuy = () => {
        setShowModalBuy(false);
        if(type ==="audio"){
            Navigate('/audio-books');
        }else{
            Navigate('/e-books');
        }
    };

    const handleBackClick  = () => {
        if(type ==="audio"){
            Navigate(`/play-audio/${bookId}`, { state: { selectedSeriesAudioId: bookId }});

        }else{
            Navigate(`/read-book/${bookId}`);

        }
    }

    const closeModalNavigate = () => {
        setShowModalNavigate(false);
    };

    const NavigateLogin = () => {
        Navigate('/login');
    };


    if (loading) {
        return <ScreenLoading />
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='checkout-main-outer'>
                <div className='checkout-inner-outer'>
                    <p style={{ textAlign: 'start', fontSize: '20px', paddingLeft: '20px' }} onClick={handleBackClick }>
                        <MdArrowBackIos />
                    </p>
                    <div className='checkout-title'>
                        <h2>Checkout</h2>
                    </div>
                    {type ==='audio' ? (
                        <div   className='checkout-body'>
                                        <div className='checkout-photo-outer'>
                                            <img id="image" src={audioBook.thumbnail_url} alt="Book Thumbnail"/>
                                        </div>
                                        <div className='description-checkout'>
                                            <h4 style={{color: 'blue', paddingLeft: '70px', textAlign: 'center'}}>Book
                                                Details</h4>
                                            <hr/>
                                            <p>Author: <span>{audioBook.authorName}</span></p>
                                            <p>Title: <span>{audioBook.seriesTitle}</span></p>
                                            <p>Price: <span>{audioBook.seriesPrice} LKR/-</span></p>
                                            <div className='checkout-button-outer'>
                                                <Button style={{background:confirmationBtn}} className='btn button' variant='primary' type='submit'
                                                        onClick={() => openModalAudio(audioBook.seriesId)}>
                                                    Confirm Purchase Book
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                    ) : (null)}
                    {(type === 'book') ? (
                        <div className='checkout-body'>
                            <div className='checkout-photo-outer'>
                                <img id="image" src={book.thumbnail_url} alt="Book Thumbnail"/>
                            </div>
                            <div className='description-checkout'>
                                <h4 style={{color: 'blue',  textAlign: 'center'}}>Book Details</h4>
                                <hr/>
                                <p>Author: <span>{book.authorName}</span></p>
                                <p>Title: <span>{book.title}</span></p>
                                <p>Price: <span>{book.price} LKR/-</span></p>
                                <div className='checkout-button-outer'>
                                    <Button style={{background:confirmationBtn}} className='btn button' variant='primary' onClick={() => openModal(book.id)}>
                                        Confirm Purchase Book
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ):(null)}
                </div>
            </div>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header >
                    <Modal.Title>Confirm Purchase</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to purchase this book? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmOrder}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalBuy} onHide={closeModal}>
                <Modal.Header >
                    <Modal.Title>Thank You!</Modal.Title>
                </Modal.Header>
                <Modal.Body>You have already purchased this book.</Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={closeModalBuy}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalNavigate} onHide={closeModalNavigate}>
                <Modal.Header closeButton>
                    <Modal.Title>Thank You!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please login first.</Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={NavigateLogin}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Checkout;
