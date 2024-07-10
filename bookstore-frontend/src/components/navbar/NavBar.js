import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react'
import '../../styles/navbar.css';
import Logo from '../../assest/img/VLogo.mp4'
import API_ENDPOINT from "../../apis/httpAxios";
import { VscSignOut } from "react-icons/vsc";
import {FETCH_ALL_AUDIO_BOOK, FETCH_ALL_READ_BOOK, GET_USER_DATA} from "../../apis/endpoints";

 const NavBar= () => {
     const [userData, setUserData] =useState("")
     const [showSignOut, setShowSignOut] =useState(false);
     const [showMyRack, setShowMyRack] =useState(false)
     const [showLoginSignup, setShowLoginSignup] =useState(true)
     const userId  = localStorage.getItem('userId');


     useEffect(() => {
         console.log('Audio Data Execute start');
         const fetchUserData = async () => {
             try { console.log("execute Function========>>>>")
                 const response = await API_ENDPOINT.get(`${GET_USER_DATA}/${userId}`);
                 console.log('user Data Execute Midle', response);
                 const getData = response.data.data;
                 setUserData(getData);
                 if(getData.userId != "") {
                     setShowSignOut(!showSignOut);
                     setShowMyRack(!showMyRack);
                     setShowLoginSignup(!showLoginSignup);
                 }
                 console.log("userData========>>>>", userData)
             } catch (error) {
                 console.error('Error:', error);
             }
         };
         fetchUserData();
     }, [userId]);

     const SignOut=()=>{
         localStorage.clear();
         window.location.href='/';
     }
  return (
    <>
      <div className='nav-bar'>
          <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary nav-outer">
              <Container className='nav-container'>
                  <Navbar.Brand href="/" style={{fontSize:"20px" , color:"white",paddingLeft:"2px"} }>
                              Read Lanka
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav togs " />
                  <Navbar.Collapse id="responsive-navbar-nav tog-border">
                      <div className='right-outer'>
                          <Nav className='link-page'>
                              {userData && (
                                <Nav.Link  style={{fontSize:"10px" , color:"white"}}> {userData.email}</Nav.Link>
                              )}
                              {showMyRack &&(
                                <Nav.Link href="/my-books">My Book Rack</Nav.Link>
                              )}
                              <Nav.Link href="/">Books</Nav.Link>
                              <Nav.Link href="/news-papers">News</Nav.Link>

                              {showSignOut &&(
                                <Nav.Link ><VscSignOut onClick={SignOut} xlinkShow={showSignOut}/></Nav.Link>
                              )}
                              {showLoginSignup &&(
                                  <Nav.Link href="/login">Login | Register</Nav.Link>
                              )}
                          </Nav>
                      </div>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
      </div>
    </>
  )
}

export default NavBar;
