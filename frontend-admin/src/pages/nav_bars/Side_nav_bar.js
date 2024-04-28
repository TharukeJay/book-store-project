import React from 'react';
import Nav from 'react-bootstrap/Nav';
import {Link} from "react-router-dom";

function SideNavbar() {
    return (
        <div style={{ width: '250px', background: '#f8f9fa', height: '100vh' }}>
            <Nav defaultActiveKey="/home" className="flex-column p-3">
                <Nav.Link as={Link} to="/home">Upload</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                <Nav.Link as={Link} to="/admin">Admin Panel</Nav.Link>
            </Nav>
        </div>
    );
}

export default SideNavbar;
