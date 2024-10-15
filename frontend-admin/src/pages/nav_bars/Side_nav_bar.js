// import React, {useEffect, useState} from 'react';
// import { Nav, Navbar, Container } from 'react-bootstrap';
// import {Link, useNavigate} from 'react-router-dom';
// import {Menu} from "antd";
// import {
//     UploadOutlined,BuildOutlined
// } from '@ant-design/icons';
// import {executeGetUsers} from "../../api/endPoints";
//
// const  SideNavbar = () => {
//
//     const userEmail = localStorage.getItem('email');
//     const navigate = useNavigate();
//     const [usersData, setUsersData] = useState([]);
//
//     const getUsers = async () => {
//         const response = await executeGetUsers();
//         const data = response.data;
//         setUsersData(data)
//         console.log('print USERDATA===>',usersData)
//     }
//     useEffect(() => {
//         getUsers()
//     }, [])
//     const isAdmin = usersData.some(user => user.data.email === userEmail && user.data.userRoles.includes('SUPER_ADMIN'));
//     return (
//         <div>
//             {console.log('print is admin===>',isAdmin)}
//         <div style={{display:"flex", flexDirection:"row" ,color : "green"}}>
//     <header className={"App-header"}>
//             <space>
//     <Menu style={{width: 200, height: '100vh',fontSize:16 ,itemSelectedColor:"#ffffff"}}
//         onClick={({key})=>{
//             if(key==="signOut"){
//                 localStorage.clear();
//                 navigate('/');
//             }else{
//                 navigate(key)
//             }
//         }}
//           // itemSelectedColor ="#FFFFFF"
//         theme={"dark"}
//         mode="inline"
//         defaultOpenKeys={["upload"]}
//         items={[
//             {label:"Upload", key:"/upload" ,icon: <UploadOutlined  />,},
//             // {label: "News Update",key:"newsUpdate"},
//             // {label: "Analytics", key:"analytics"},
//             // {label: "Users",key:"Users"},
//             {label: "Create",key:"create",type:"group",icon: <BuildOutlined />,children:[
//                {label: "Category", key:"/createCategory"},
//                {label: "Author", key:"/createAuthor"},
//                {label: "Book Series", key:"/createBookSeries"},
//                {label: "News", key:"/createNews"},
//                {label: "News Category", key:"/createNewsCategory"},
//                {label: "News Stript", key:"/createNewsStript"},
//                {label: "Picture Rim", key:"/createPictureRim"},
//                 ],},
//             {label: "View",key:"view",type:"group",children:[
//                     {label: "Books",key:"/books"},
//                     {label: "Audio Books",key:"/audioBooks"},
//                 ],},
//
//             {label: "Users",key:"/users"},
//             {label: "Admin Users",key:"/adminUsers", hidden: !isAdmin },
//             // {label: "Sign out",key:"signOut",danger:true},
//         ]}></Menu></space>
//         </header></div>
// </div>
//     );
// };
//
// export default SideNavbar;
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { executeGetUsers } from "../../api/endPoints";
import { UploadOutlined, BuildOutlined } from "@ant-design/icons";

const SideNavbar = () => {
    const userEmail = localStorage.getItem("email");
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState([]);
    const [isOpen, setIsOpen] = useState(true); // By default, sidebar is expanded

    const getUsers = async () => {
        const response = await executeGetUsers();
        const data = response.data;
        setUsersData(data);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const isAdmin = usersData.some(
        (user) =>
            user.data.email === userEmail && user.data.userRoles.includes("SUPER_ADMIN")
    );

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
            <Navbar
                bg="dark"
                variant="dark"
                expand="lg"
                className="flex-column"
                style={{ height: "100%", width: isOpen ? "250px" : "80px", transition: "0.3s" }}
            >
                <Container fluid>
                    <Navbar.Collapse className={isOpen ? "show" : ""}>
                        <Nav className="flex-column">
                            <Button
                                onClick={toggleSidebar}
                                variant="outline-light"
                                className="mb-2"
                            >
                                ☰
                            </Button>
                            <Nav.Link as={Link} to="/upload">
                                <UploadOutlined/> {isOpen && "Upload"}
                            </Nav.Link>

                            {/* "Create" Section Header */}
                            <div style={{color: "#fff", marginTop: "15px", fontWeight: "bold"}}>
                                <BuildOutlined/> {isOpen && "Create"}
                            </div>

                            {/* Create Links */}
                            <Nav.Link as={Link} to="/createCategory">
                                {!isOpen && 'CC'}{isOpen && "Create Category"}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/createAuthor">
                                {!isOpen && 'CA'}{isOpen && "Create Author"}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/createBookSeries">
                                {!isOpen && 'CBS'}{isOpen && "Create Book Series"}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/createNews">
                                {!isOpen && 'CN'} {isOpen && "Create News"}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/createNewsCategory">
                                {!isOpen && 'CNC'} {isOpen && "Create News Category"}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/createNewsStript">
                                {!isOpen && 'CNS'}{isOpen && "Create News Stript"}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/createPictureRim">
                                {!isOpen && 'CPR'} {isOpen && "Create Picture Rim"}
                            </Nav.Link>
                            <div style={{color: "#fff", marginTop: "15px", fontWeight: "bold"}}>
                                <BuildOutlined/> {isOpen && "Views"}
                            </div>
                            <Nav.Link as={Link} to="/books">
                                {!isOpen && 'EB'}{isOpen && "E-Books"}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/audioBooks">
                                {!isOpen && 'AB'}{isOpen && "Audio Books"}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/newsViews">
                                {!isOpen && 'NV'}{isOpen && "News Views"}
                            </Nav.Link>

                            {isAdmin && (
                                <Nav.Link as={Link} to="/adminUsers">
                                    {!isOpen && 'AU'} {isOpen && "Admin Users"}
                                </Nav.Link>
                            )}

                            {/*<Nav.Link*/}
                            {/*    onClick={() => {*/}
                            {/*        localStorage.clear();*/}
                            {/*        navigate("/");*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    {isOpen && "Sign Out"}*/}
                            {/*</Nav.Link>*/}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default SideNavbar;
