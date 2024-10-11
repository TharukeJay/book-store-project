import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react'
import '../../styles/navbar.css';
import Logo from '../../assest/img/VLogo.mp4'
import API_ENDPOINT from "../../apis/httpAxios";
import {VscSignOut} from "react-icons/vsc";
import {FETCH_ALL_AUDIO_BOOK, FETCH_ALL_READ_BOOK, GET_USER_DATA} from "../../apis/endpoints";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {bgColor, homePageBackgroundColor, navigationBarP} from "../../common/commonColors";
import {useNavigate} from "react-router-dom";

const NavBar = () => {
    const [userData, setUserData] = useState("")
    const [showSignOut, setShowSignOut] = useState(false);
    const [showMyRack, setShowMyRack] = useState(false)
    const [showLoginSignup, setShowLoginSignup] = useState(true)
    const userId = localStorage.getItem('userId');
    const [showModal, setShowModal] = useState(false);
    const Navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const response = await API_ENDPOINT.get(`${GET_USER_DATA}/${userId}`);
            const getData = response.data.data;
            setUserData(getData);
            if (getData.userId != "") {
                setShowSignOut(!showSignOut);
                setShowMyRack(!showMyRack);
                setShowLoginSignup(!showLoginSignup);
            }
            console.log("userData Nav Bar========>>>>", userData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [userId]);

    const handleConfirmOrder = async () => {
        localStorage.clear();
        window.location.href = '/login';
    }

    const SignOut = () => {
        setShowModal(!showModal);
    }

    const closeModal = () => {
        setShowModal(false);
    };

    const homeClick = () =>{
        Navigate('/')
    }

    const eBookClick = () =>{
        Navigate('/e-books')
    }

    const audioBookClick = () =>{
        Navigate('/audio-books')
    }

    const newsClick = () =>{
        Navigate('/news-papers')
    }

    const bookRackClick = () =>{
        Navigate('/myBookRack')
    }

    const loginClick = () =>{
        Navigate('/login')
    }

    return (
        <>
            <div className='nav-bar' style={{backgroundColor:bgColor}}>
                <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary nav-outer" style={{backgroundColor:bgColor}}>
                    <Container className='nav-container'>
                        <Navbar.Brand>
                            {/*<Nav.Link className='nav-header topic-logo' style={{fontFamily :"Harlow Solid Italic"}}> Read Lanka</Nav.Link>*/}
                            <p className='nav-header topic-logo' style={{fontFamily :"Harlow Solid Italic"}}> Read Lanka</p>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav togs "/>
                        <Navbar.Collapse id="responsive-navbar-nav tog-border">
                            <div className='right-outer'>
                                <Nav className='link-page' >
                                    {/*<Nav.Link href='/'>Home</Nav.Link>*/}
                                    <p onClick={homeClick} style={{cursor: 'pointer', color: 'darkred'}}>Home</p>
                                    <p onClick={eBookClick} style={{cursor: 'pointer', color: 'darkred'}}>e-Books</p>
                                    <p onClick={audioBookClick} style={{cursor: 'pointer', color: 'darkred'}}>Audio-Books</p>
                                    <p onClick={newsClick} style={{cursor: 'pointer', color: 'darkred'}}>News</p>
                                    {showMyRack && (
                                    <p onClick={bookRackClick} style={{cursor: 'pointer', color: 'darkred'}}>My Book Rack</p>
                                    )}
                                    {showSignOut && (
                                    <p onClick={SignOut} style={{cursor: 'pointer', color: 'darkred'}}><VscSignOut onClick={SignOut} xlinkShow={showSignOut}/></p>
                                    )}
                                    {showLoginSignup && (
                                    <p onClick={loginClick} style={{cursor: 'pointer', color: 'darkred'}}>Login | Register</p>
                                    )}
                                    {/*<Nav.Link href="/e-books">e-Books</Nav.Link>*/}
                                    {/*<Nav.Link href="/audio-books">Audio-Books</Nav.Link>*/}
                                    {/*<Nav.Link href="/news-papers">News</Nav.Link>*/}
                                    {/*{showMyRack && (*/}
                                    {/*    <Nav.Link href="/myBookRack">My Book Rack</Nav.Link>*/}
                                    {/*)}*/}
                                    {/*{showSignOut && (*/}
                                    {/*    <Nav.Link><VscSignOut onClick={SignOut} xlinkShow={showSignOut}/></Nav.Link>*/}
                                    {/*)}*/}
                                    {/*{showLoginSignup && (*/}
                                    {/*    <Nav.Link href="/login">Login | Register</Nav.Link>*/}
                                    {/*)}*/}
                                </Nav>
                            </div>
                            <div className="last-outer">
                                <Nav className='link-page-last'>
                                    {userData && (
                                        <Nav className='show-username'>{userData.email}</Nav>
                                    )}
                                </Nav>
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div style={{
                backgroundColor: 'white',
                width: '100%',
                display: 'flex',
                alignItems: "end",
                justifyContent: 'end'
            }}>

                {/*<div className='right-outer-name' style={{backgroundColor: 'white'}}>*/}
                {/*    {userData && (*/}
                {/*        <p*/}
                {/*            style={{fontSize: "17px", color: "red", flex: 'end'}}> {userData.email}</p>*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to logout? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleConfirmOrder}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NavBar;
