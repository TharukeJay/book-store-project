import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import CreateCategory from "./pages/create/createCategory";
import createCategory from "./pages/create/createCategory";
import Category from "./pages/create/createCategory";
import Author from "./pages/create/createAuthor";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home/create/createCategory" element={<Category />} />
                <Route path="/home/create/createAuthor" element={<Category />} />
            </Routes>
        </Router>
    );
}

export default App;

