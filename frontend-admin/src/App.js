import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Login from './pages/Authentication/Login';
import SignUp from "./pages/Authentication/SignUp";
import Home from "./pages/Home";
import {Menu,Upload as Uop} from "antd";
import Upload from "./pages/Upload";
import Users from "./pages/Users";
import AudioBooks from "./pages/AudioBooks";
import Books from "./pages/Books";
import BookSeries from "./pages/create/createBookSeries";
import AdminUsers from "./pages/AdminUsers";
import SideNavbar from "./pages/nav_bars/Side_nav_bar";
import createCategory from "./pages/create/createCategory";
import createAuthor from "./pages/create/createAuthor";
import {Col, Row} from "reactstrap";
import TopNavbar from "./pages/nav_bars/Top_nav_bar";
import CreateCategory from "./pages/create/createCategory";
import CreateAuthor from "./pages/create/createAuthor";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <Router>
            <div className="App">
                <Row >
                    <TopNavbar />
                </Row>
                <Row>
                    <Col xs={2}>
                        <SideNavbar />
                    </Col>
                    <Col xs={10} >
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/upload" element={<Upload />} />
                            <Route path="/createCategory" element={<CreateCategory />} />
                            <Route path="/createAuthor" element={<CreateAuthor />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/books" element={<Books />} />
                            <Route path="/audioBooks" element={<AudioBooks />} />
                            <Route path="/adminUsers" element={<AdminUsers />} />
                            <Route path="/createBookSeries" element={<BookSeries />} />
                        </Routes>
                    </Col>
                </Row>
            </div>
        </Router>
    );
}

// <div>
//         <div style={{display:"flex", flexDirection:"row"}}>
//     <header className={"App-header"}>
//             <space>
//     <Menu
//         onClick={({key})=>{
//             if(key==="signout"){
//
//             }else{
//                 navigate(key)
//             }
//         }}
//         mode="inline"
//         defaultOpenKeys={["upload"]}
//         items={[
//             {label:"Upload", key:"/upload",icon:<Uop />},
//             // {label: "News Update",key:"newsUpdate"},
//             // {label: "Analytics", key:"analytics"},
//             // {label: "Users",key:"Users"},
//             {label: "Create",key:"create",type:"group",children:[
//                {label: "Category", key:"/createCategory"},
//                {label: "Author", key:"/createAuthor"},
//                 ],},
//             {label: "View",key:"view",type:"group",children:[
//                     {label: "Books",key:"/books"},
//                     {label: "Audio Books",key:"/audioBooks"},
//                 ],},
//
//             {label: "Users",key:"/users"},
//             {label: "Admin Users",key:"/adminUsers"},
//             {label: "Sign out",key:"signOut",danger:true},
//         ]}></Menu></space>
//         </header></div>
//             <Content />
//
// </div>
// function Content(){
//     return<div>
//              <Routes>
//              <Route path="/login" element={<Login />} />
//                  <Route path="/signup" element={<SignUp />} />
//                  <Route path="*" element={<Login />} />
//
//                 <Route path="/upload" element={<Upload />} />
//                 <Route path="/createCategory" element={<createCategory />} />
//                 <Route path="/createAuthor" element={<createAuthor />} />
//                 <Route path="/users" element={<Users />} />
//                 <Route path="/books" element={<Books />} />
//                 <Route path="/audioBooks" element={<AudioBooks />} />
//                 <Route path="/adminUsers" element={<AdminUsers />} />
// //
//              </Routes>
//     </div>
// }



export default App;


