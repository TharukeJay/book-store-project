import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './routes/Login'
import Register from './routes/Register'
import ForgetPassword from './routes/ForgetPassword'
import Home from './routes/Home'
import EBook from './routes/EBook'
import News from './routes/News'

function App() {
  return (
    <>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot-password" element={<ForgetPassword/>}/>
          <Route path="/book-store" element={<EBook/>}/>
          <Route path="/news" element={<News/>}/>
       </Routes>
    </>
  );
}

export default App;
