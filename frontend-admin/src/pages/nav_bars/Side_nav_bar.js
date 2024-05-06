import React from 'react';
import Nav from 'react-bootstrap/Nav';
import {Link} from "react-router-dom";
import {Dropdown} from "react-bootstrap";

function SideNavbar() {
    return (
        <div style={{ width: '250px', background: '#f8f9fa', height: '100vh' }}>
            <Nav defaultActiveKey="/home" className="flex-column p-3">
                <Nav.Link as={Link} to="/home">Upload</Nav.Link>
                <Nav.Link as={Link} to="/about">News Upload</Nav.Link>
                <Nav.Link as={Link} to="/contact">Analytics</Nav.Link>
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-create">
                        Create
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="create/createAuthor">Create Author</Dropdown.Item>
                        <Dropdown.Item as={Link} to="create/createCategory">Create Category</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Nav.Link as={Link} to="create/createCategory">Admin Panel</Nav.Link>
            </Nav>
        </div>
    );
}

export default SideNavbar;
