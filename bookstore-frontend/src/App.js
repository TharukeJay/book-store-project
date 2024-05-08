import { Route, Routes } from 'react-router-dom';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const jwtKey = process.env.REACT_APP_JWT_KEY;

  // const checkAuthentication = async () => {
  //   try {
  //     const response = await axios.get('/api/check-auth');
  //     setIsAuthenticated(response.data.isAuthenticated);
  //   } catch (error) {
  //     console.error('Authentication check failed:', error);
  //   }
  // }

  // useEffect(() => {
  //   checkAuthentication();
  // }, []);

  return (
    <>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/read-book" element={<ReadBook/>}/>
          <Route path="/read-news" element={<ViewNews/>}/>
          <Route path="/forgot-password" element={<ForgetPassword/>}/>
          <Route path="/register" element={<Register/>}/>
          {!isAuthenticated && <Route path="/login" element={<Login />} />}
           {/* <Route path="/login" element={<Login/>}/>  */}
          {/* <Route path="/" isAuthenticated={isAuthenticated} element={<Home/>}/> */}
          {/* <Route path="/book-store" element={<EBook/>}/>
          <Route path="/news" element={<News/>}/> */}

        {isAuthenticated && <PrivateRoute path="/ebook" element={<EBook />} isAuthenticated={isAuthenticated} />}
        {isAuthenticated && <PrivateRoute path="/news" element={<News />} isAuthenticated={isAuthenticated} />}
       </Routes>
    </>
  );
}

export default App;
