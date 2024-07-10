import { Route, Routes, Navigate  } from 'react-router-dom';
import Login from './routes/Login'
import Register from './routes/Register'
import ForgetPassword from './routes/ForgetPassword'
import ConfirmPassword from './routes/ConfirmPassword'
import Home from './routes/Home'
import PrivateRoute from './components/private-route/PrivateRoute';
import React,  { useState, useEffect } from 'react'
import ReadBook from './components/ebook-context/ReadBook';
import ViewNews from './components/news-context/ViewNews';
import ReadPreview from './components/ebook-context/ReadPreview';
import AudioBooks from './components/audio-books/AudioBooks';
import AudioPlayer  from './components/audio-books/PlayAudio';
import About from './views/about/About';
import SeeAll from './components/seeAll/SeeAllPage';
import MyLibrary from './components/library/MyLibrary';
import PrivacyPolicy from './components/privacy/PrivacyPolicy';
import Checkout from "./components/cheeckout/checkout";
import NewsContext from "./components/news-context/NewsContext";
import SeeAllPage from "./components/seeAll/SeeAllPage";
const App =() => {

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  };
  
  return (
    <>
       <Routes>
        {/* Home page / DashBoard */}
          <Route path="/" element={<Home/>}/>

          {/* Purchase library */}
          <Route path="/my-books" element={<MyLibrary/>}/>

          {/* All books */}
          <Route path="/details/all-book" element={<SeeAllPage/>}/>

          {/* Authentication */}
          <Route path="/about" element={<About/>}/>
          <Route path="/forgot-password" element={<ForgetPassword/>}/>
          <Route path="/reset-password/:id" element={<ConfirmPassword/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login />} />

          {/* Pdf */}
          <Route path="/read-book/:id" element={<ReadBook />} />
          <Route path="/read-preview" element={<PrivateRoute><ReadPreview /></PrivateRoute>} />
          <Route path="/read-news" element={<ViewNews />} />

          {/* News aper*/}
          <Route path="/news-papers" element={<NewsContext/>} />

          {/* Audio Book */}
          <Route path="/play-audio/:id" element={<AudioPlayer />} />

          {/* Privacy & Policy */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

           {/*  Payment pages  */}
           <Route path="/checkout-order" element={<Checkout />} />
       </Routes>
    </>
  );
}

export default App;
