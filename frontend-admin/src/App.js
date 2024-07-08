import {Route, Routes, useLocation} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import SideNavbar from "./pages/nav_bars/Side_nav_bar";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import CreateCategory from "./pages/create/createCategory";
import CreateAuthor from "./pages/create/createAuthor";
import BookSeries from "./pages/create/createBookSeries";
import News from "./pages/create/createNews";
import Users from "./pages/Users";
import Books from "./pages/Books";
import AudioBooks from "./pages/AudioBooks";
import AdminUsers from "./pages/AdminUsers";
import Top_nav_bar from "./pages/nav_bars/Top_nav_bar";
import CreateNewsCategory from "./pages/create/createNewsCategory";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";


const App = () => {
    const location = useLocation();

    return (
        <Row>
            <Row>
                <Top_nav_bar/>
            </Row>
            {location.pathname !== '/' && location.pathname !== '/signup' && location.pathname !== '/login' && location.pathname !== '/forgotPassword' && location.pathname !== '/confirm-reset-password/:token' && (
                <Col xs={3}>
                    <SideNavbar />
                </Col>
            )}
            <Col xs={location.pathname !== '/' && location.pathname !== '/signup' && location.pathname !== '/login' && location.pathname !== '/forgotPassword'&& location.pathname !== '/confirm-reset-password/:token'  ? 9 : 12}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    <Route path="/reset-password/:id" element={<ResetPassword/>}/>
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
                </Routes>
            </Col>
        </Row>
    );
};

export default App;
