import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';
import '../../styles/navbar.css';

 const NavBar= () => {
  return (
    <>
     <Stack direction="horizontal" gap={2}>
      <div className="p-2" style={{color:'black'}}>Book Store</div>
      {/* <div className="p-2 ms-auto"> */}
        <div className='nav-main-outer'>
          <Navbar expand="lg" className="bg-body-tertiary">
            {/* <Container> */}
              {/* <Navbar.Brand   href="/book-store">Book Store</Navbar.Brand> */}
              {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
              {/* <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                </Nav>
              </Navbar.Collapse> */}
              
              {/* <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">HOME</Nav.Link>
                  <Nav.Link href="#link">E-Book</Nav.Link>

                  <Nav.Link href="#link">News Letter</Nav.Link>
                  <Nav.Link href="/proposal/create">About</Nav.Link>
                </Nav>
              </Navbar.Collapse> */}
            {/* </Container> */}
          </Navbar> 
        </div>
      {/* </div> */}
      {/* <div className="vr" /> */}
      <div className="p-2" style={{color:'black'}}><Nav.Link href="/login">Login</Nav.Link></div>
    </Stack>

    </>
  )
}
export default NavBar;
