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

const NavBar = () => {
    const [userData, setUserData] = useState("")
    const [showSignOut, setShowSignOut] = useState(false);
    const [showMyRack, setShowMyRack] = useState(false)
    const [showLoginSignup, setShowLoginSignup] = useState(true)
    const userId = localStorage.getItem('userId');
    const [showModal, setShowModal] = useState(false);

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
        window.location.href = '/home';
    }
    const SignOut = () => {
        setShowModal(!showModal);
    }

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <>
            <div className='nav-bar'>
                <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary nav-outer">
                    <Container className='nav-container'>
                        <Navbar.Brand href="/home" style={{fontSize: "30px", color: "black", fontFamily:"Harlow Solid Italic", paddingLeft: "2%"}}>
                            <Nav.Link style={{fontSize: "35px", color: "black", fontFamily :"Harlow Solid Italic"}}> Read Lanka</Nav.Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav togs "/>
                        <Navbar.Collapse id="responsive-navbar-nav tog-border">
                            <div className='right-outer'>
                                <Nav className='link-page'>
                                    <Nav.Link href="/home">Home</Nav.Link>
                                    <Nav.Link href="/e-books">e-Books</Nav.Link>
                                    <Nav.Link href="/audio-books">Audio-Books</Nav.Link>
                                    <Nav.Link href="/news-papers">News</Nav.Link>
                                    {showMyRack && (
                                        <Nav.Link href="/myBookRack">My Book Rack</Nav.Link>
                                    )}
                                    {showSignOut && (
                                        <Nav.Link><VscSignOut onClick={SignOut} xlinkShow={showSignOut}/></Nav.Link>
                                    )}
                                    {showLoginSignup && (
                                        <Nav.Link href="/login">Login | Register</Nav.Link>
                                    )}
                                    {/*{userData && (*/}
                                    {/*    <Nav.Link style={{fontSize: "17px", color: "red", flex: 'end'}} className='show-username'>{userData.email}</Nav.Link>*/}
                                    {/*)}*/}
                                </Nav>
                            </div>
                            <div className="last-outer">
                                <Nav className='link-page-last'>
                                    {userData && (
                                        <Nav.Link style={{fontSize: "17px", color: "red", flex: 'end'}} className='show-username'>{userData.email}</Nav.Link>
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
