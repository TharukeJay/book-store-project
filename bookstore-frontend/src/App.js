import { Route, Routes, Navigate  } from 'react-router-dom';
import Login from './routes/Login'
import Register from './routes/Register'
import ForgetPassword from './routes/ForgetPassword'
import Home from './routes/Home'
import EBook from './routes/EBook'
import News from './routes/News'
import PrivateRoute from './components/private-route/PrivateRoute';
import React,  { useState, useEffect } from 'react'
import axios from 'axios'
import ReadBook from './components/ebook-context/ReadBook';
import ViewNews from './components/news-context/ViewNews';




const App =() => {

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  };
  
  return (
    <>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/forgot-password" element={<ForgetPassword/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login />} />

          <Route path="/read-book" element={<PrivateRoute><ReadBook /></PrivateRoute>} />
          {/* <Route path="/read-book" element={<PrivateRoute><ReadBook /></PrivateRoute>} /> */}
          <Route path="/read-news" element={<PrivateRoute><ViewNews /></PrivateRoute>} />
       </Routes>
    </>
  );
}

export default App;
