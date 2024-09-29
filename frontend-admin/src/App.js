import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import SideNavbar from "./pages/nav_bars/Side_nav_bar";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import CreateCategory from "./pages/create/createCategory";
import CreateAuthor from "./pages/create/createAuthor";
import BookSeries from "./pages/create/createBookSeries";
import CreateNewsStript from "./pages/create/createNewsStript";
import CreatePictureRim from "./pages/create/createPictureRim";
import News from "./pages/create/createNews";
import Users from "./pages/Users";
import Books from "./pages/Books";
import AudioBooks from "./pages/AudioBooks";
import AdminUsers from "./pages/AdminUsers";
import Top_nav_bar from "./pages/nav_bars/Top_nav_bar";
import CreateNewsCategory from "./pages/create/createNewsCategory";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";
import LoginError from "./pages/Authentication/loginError";
import {useEffect} from "react";
//
//
// const App = () => {
//     const location = useLocation();
//     const token = window.location.href.split('/reset-password/')[1];
//     return (
//         <Row>
//             <Row>
//                 <Top_nav_bar/>
//             </Row>
//             {/*{location.pathname !== '/home' && location.pathname !== '/signup' && location.pathname !== '/login' && location.pathname !== '/forgotPassword' && location.pathname !== `/reset-password/${token}` && location.pathname !== "/" (*/}
//             {/*    <Col xs={2}>*/}
//             {/*        <SideNavbar />*/}
//             {/*    </Col>*/}
//             {/*)}*/}
//             {location.pathname !== '/home' &&
//                 location.pathname !== '/signup' &&
//                 location.pathname !== '/login' &&
//                 location.pathname !== '/forgotPassword' &&
//                 location.pathname !== `/reset-password/${token}` &&
//                 location.pathname !== '/' && (
//                     <Col xs={2}>
//                         <SideNavbar />
//                     </Col>
//                 )}
//
//             <Col xs={location.pathname !== '/home' && location.pathname !== '/signup' && location.pathname !== '/login' && location.pathname !== '/forgotPassword'&& location.pathname !== '/' && location.pathname !== `/reset-password/${token}`  ? 10 : 12} >
//                 <Routes>
//                     <Route path="/" element={<Login />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/signup" element={<SignUp />} />
//                     <Route path="/home" element={<Home />} />
//                     <Route path="/forgotPassword" element={<ForgotPassword />} />
//                     <Route path="/reset-password/:token" element={<ResetPassword/>}/>
//                         <Route path="/login-error" element={<LoginError/>}/>
//                     <Route path="/upload" element={<Upload />} />
//                     <Route path="/createCategory" element={<CreateCategory />} />
//                     <Route path="/createAuthor" element={<CreateAuthor />} />
//                     <Route path="/users" element={<Users />} />
//                     <Route path="/books" element={<Books />} />
//                     <Route path="/audioBooks" element={<AudioBooks />} />
//                     <Route path="/adminUsers" element={<AdminUsers />} />
//                     <Route path="/createBookSeries" element={<BookSeries />} />
//                     <Route path="/createNews" element={<News />} />
//                     <Route path="/createNewsCategory" element={<CreateNewsCategory />} />
//                     <Route path="/createNewsStript" element={<CreateNewsStript />} />
//                     <Route path="/createPictureRim" element={<CreatePictureRim  />} />
//                 </Routes>
//             </Col>
//         </Row>
//     );
// };
//
// export default App;
// import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
// import {Col, Row} from "react-bootstrap";
// import {useEffect} from "react";
// import SideNavbar from "./pages/nav_bars/Side_nav_bar";
// import Login from "./pages/Authentication/Login";
// import SignUp from "./pages/Authentication/SignUp";
// import Home from "./pages/Home";
// import Upload from "./pages/Upload";
// import CreateCategory from "./pages/create/createCategory";
// import CreateAuthor from "./pages/create/createAuthor";
// import BookSeries from "./pages/create/createBookSeries";
// import CreateNewsStript from "./pages/create/createNewsStript";
// import CreatePictureRim from "./pages/create/createPictureRim";
// import News from "./pages/create/createNews";
// import Users from "./pages/Users";
// import Books from "./pages/Books";
// import AudioBooks from "./pages/AudioBooks";
// import AdminUsers from "./pages/AdminUsers";
// import Top_nav_bar from "./pages/nav_bars/Top_nav_bar";
// import CreateNewsCategory from "./pages/create/createNewsCategory";
// import ForgotPassword from "./pages/Authentication/ForgotPassword";
// import ResetPassword from "./pages/Authentication/ResetPassword";
// import LoginError from "./pages/Authentication/loginError";

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const token = window.location.href.split('/reset-password/')[1];

    // Check if localStorage.email is available and navigate to home if logged in
    useEffect(() => {
        if (localStorage.getItem("email") && location.pathname === "/") {
            navigate("/home"); // Redirect to home if email is in local storage
        }
    }, [location, navigate]);

    return (
        <Row>
            <Row>
                <Top_nav_bar/>
            </Row>

            {location.pathname !== '/home' &&
                location.pathname !== '/signup' &&
                location.pathname !== '/login' &&
                location.pathname !== '/forgotPassword' &&
                location.pathname !== `/reset-password/${token}` &&
                location.pathname !== '/' && (
                    <Col xs={2}>
                        <SideNavbar />
                    </Col>
                )}

            <Col xs={location.pathname !== '/home' && location.pathname !== '/signup' && location.pathname !== '/login' && location.pathname !== '/forgotPassword' && location.pathname !== '/' && location.pathname !== `/reset-password/${token}`  ? 10 : 12} >
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword/>}/>
                    <Route path="/login-error" element={<LoginError/>}/>
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/createCategory" element={<CreateCategory />} />
                    <Route path="/createAuthor" element={<CreateAuthor />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/audioBooks" element={<AudioBooks />} />
                    <Route path="/adminUsers" element={<AdminUsers />} />
                    <Route path="/createBookSeries" element={<BookSeries />} />
                    <Route path="/createNews" element={<News />} />
                    <Route path="/createNewsCategory" element={<CreateNewsCategory />} />
                    <Route path="/createNewsStript" element={<CreateNewsStript />} />
                    <Route path="/createPictureRim" element={<CreatePictureRim  />} />
                </Routes>
            </Col>
        </Row>
    );
};

export default App ;
