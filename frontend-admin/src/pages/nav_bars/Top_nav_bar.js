// // TopNavbar.js
// import React from 'react';
// import {Link, useNavigate} from 'react-router-dom';
// import {Navbar, Nav, Image} from 'react-bootstrap';
// import LogoutIcon from '../../assets/exit.png';
// import Icon from "antd/es/icon";
//
//
// function TopNavbar() {
//     const navigate = useNavigate();
//
//     const handleClick = () => {
//         localStorage.clear();
//         navigate('/');
//     };
//
//     return (
//         <Navbar bg="dark" variant="dark" expand="lg" style={{ width: '100%' }}>
//             {/* Left-aligned Brand */}
//             <Navbar.Brand as={Link} to="/" style={{ marginLeft: 30, fontSize: 30, fontWeight: "bold" }}>
//                 READ LANKA ADMIN
//             </Navbar.Brand>
//
//             {/* Right-aligned items */}
//             <Nav className="ml-auto" style={{ marginLeft: 1000 }}>
//                 <Navbar.Brand href="/" style={{ fontSize: 18, fontWeight: "bold" ,marginRight: 60 }}>
//                     {localStorage.email}
//                 </Navbar.Brand>
//                 {localStorage.email ? (   <Navbar.Brand onClick={handleClick} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//                     <img
//                         src={LogoutIcon}
//                         width="30"
//                         height="30"
//                         className="d-inline-block align-top"
//                         alt="Sign Out"
//                     />
//                     <p style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold", marginBottom: 0 }}>
//                         Sign Out
//                     </p>
//                 </Navbar.Brand>) : null}
//
//             </Nav>
//         </Navbar>
//     );
// }
//
// export default TopNavbar;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import LogoutIcon from '../../assets/exit.png';

function TopNavbar() {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={{ width: '100%' }}>
            {/* Left-aligned Brand */}
            <Navbar.Brand as={Link} to="/" style={{ marginLeft: 30, fontSize: 30, fontWeight: "bold" }}>
                READ LANKA ADMIN
            </Navbar.Brand>

            {/* Toggle button for smaller screens */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            {/* Collapsible items */}
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto" style={{ marginLeft: 'auto' }}>
                    <Navbar.Brand style={{ fontSize: 18, fontWeight: "bold", marginRight: 60 }}>
                        {localStorage.email}
                    </Navbar.Brand>
                    {localStorage.email && (
                        <Navbar.Brand
                            onClick={handleClick}
                            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        >
                            <img
                                src={LogoutIcon}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="Sign Out"
                            />
                            <p style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold", marginBottom: 0 }}>
                                Sign Out
                            </p>
                        </Navbar.Brand>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TopNavbar;
