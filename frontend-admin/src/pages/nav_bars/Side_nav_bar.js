import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {Menu} from "antd";

const SideNavbar = () => {
    const navigate = useNavigate();
    return (
        // <Navbar bg="light" expand="lg" className="flex-column">
        //     <Container>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Nav className="flex-column">
        //                 <Nav.Link as={Link} to="/upload">Upload</Nav.Link>
        //                 <Nav.Link as={Link} to="/createCategory">Create Category</Nav.Link>
        //                 <Nav.Link as={Link} to="/createAuthor">Create Author</Nav.Link>
        //                 <Nav.Link as={Link} to="/users">Users</Nav.Link>
        //                 <Nav.Link as={Link} to="/books">Books</Nav.Link>
        //                 <Nav.Link as={Link} to="/audioBooks">Audio Books</Nav.Link>
        //                 <Nav.Link as={Link} to="/adminUsers">Admin Users</Nav.Link>
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
        <div>
        <div style={{display:"flex", flexDirection:"row"}}>
    <header className={"App-header"}>
            <space>
    <Menu
        onClick={({key})=>{
            if(key==="signOut"){
                localStorage.clear();
                navigate('/');
            }else{
                navigate(key)
            }
        }}
        mode="inline"
        defaultOpenKeys={["upload"]}
        items={[
            {label:"Upload", key:"/upload"},
            // {label: "News Update",key:"newsUpdate"},
            // {label: "Analytics", key:"analytics"},
            // {label: "Users",key:"Users"},
            {label: "Create",key:"create",type:"group",children:[
               {label: "Category", key:"/createCategory"},
               {label: "Author", key:"/createAuthor"},
               {label: "Book Series", key:"/createBookSeries"},
               {label: "News", key:"/createNews"},
                ],},
            {label: "View",key:"view",type:"group",children:[
                    {label: "Books",key:"/books"},
                    {label: "Audio Books",key:"/audioBooks"},
                ],},

            {label: "Users",key:"/users"},
            {label: "Admin Users",key:"/adminUsers"},
            {label: "Sign out",key:"signOut",danger:true},
        ]}></Menu></space>
        </header></div>
</div>
    );
};

export default SideNavbar;
