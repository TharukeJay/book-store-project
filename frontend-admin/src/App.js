import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;

