// TopNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function TopNavbar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">ADMIN PANEL</Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">Contat Us</Nav.Link>
                <Nav.Link as={Link} to="/contact">Logout</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default TopNavbar;
