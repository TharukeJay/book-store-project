import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {Menu} from "antd";

const SideNavbar = () => {
    const navigate = useNavigate();
    return (
        <div style={{ width: '250px', background: '#f8f9fa', height: '100vh' }}>
            <Nav defaultActiveKey="/home" className="flex-column p-3">
                <Nav.Link as={Link} to="/home">Upload</Nav.Link>
                <Nav.Link as={Link} to="/about">News Upload</Nav.Link>
                <Nav.Link as={Link} to="/contact">Analytics</Nav.Link>
                <Nav.Link as={Link} to="/admin">Admin Panel</Nav.Link>
            </Nav>
        </div>
    );
};

export default SideNavbar;
