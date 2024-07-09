// TopNavbar.js
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Navbar, Nav, Image} from 'react-bootstrap';
import LogoutIcon from '../../assets/exit.png';
import Icon from "antd/es/icon";


function TopNavbar() {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        navigate('/');
    };
    return (
        <Navbar bg="dark" variant="dark" style={{width:'100%'}}>
            <Navbar.Brand as={Link} to="/" style={{marginLeft:30,fontSize:30,fontWeight:"bold"}}>READ LANKA ADMIN </Navbar.Brand>
            {/*<Navbar.Brand href="/" style={{marginRight:30,fontSize:30,fontWeight:"bold"}}>*/}
            {/*    <img*/}
            {/*        src= {LogoutIcon}*/}
            {/*        width="30"*/}
            {/*        height="30"*/}
            {/*        className="d-inline-block align-top"*/}
            {/*        alt="React Bootstrap logo"*/}
            {/*    />*/}
            {/*</Navbar.Brand>*/}
            {/*<Nav className="ml-auto" >*/}
            {/*    <Nav.Link as={Link} to={handleClick}>*/}
            {/*        <span className="d-none d-md-inline">Sign Out </span>*/}
            {/*        <img*/}
            {/*            src={LogoutIcon}*/}
            {/*            width="30"*/}
            {/*            height="30"*/}
            {/*            className="mr-2"*/}
            {/*            alt="Logout Icon"*/}
            {/*            onClick={handleClick}*/}
            {/*        />*/}
            {/*    </Nav.Link>*/}
            {/*</Nav>*/}
            <Nav className="ml-auto">

            </Nav>
        </Navbar>
    );
}

export default TopNavbar;
