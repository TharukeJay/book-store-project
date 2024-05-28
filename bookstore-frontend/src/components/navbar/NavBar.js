import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import '../../styles/navbar.css';

 const NavBar= () => {
  return (
    <>
      <div className='nav-bar'>
          <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary nav-outer">
              <Container>
                  <Navbar.Brand href="/" style={{fontSize:"25px" , color:"white",paddingLeft:"2px"} }>Read <span style={{color:'yellow'}} >Lanka</span></Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav togs " />
                  <Navbar.Collapse id="responsive-navbar-nav tog-border">
                      <div className='right-outer'>
                          <Nav className='link-page'>
                              <Nav.Link href="/">Book</Nav.Link>
                              <Nav.Link href="/audio-books">Audio</Nav.Link>

                              <Nav.Link href="/login">Login | Register</Nav.Link>
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
