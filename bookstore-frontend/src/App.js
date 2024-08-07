import {Route, Routes, Navigate, BrowserRouter} from 'react-router-dom';
import Login from './routes/Login'
import Register from './routes/Register'
import ForgetPassword from './routes/ForgetPassword'
import ConfirmPassword from './routes/ConfirmPassword'
import Home from './routes/Home'
import Success from './components/success/Success';
import React, {useState, useEffect} from 'react'
import ReadBook from './components/ebook-context/ReadBook';
import ViewNews from './components/news-context/ViewNews';
import ReadPreview from './components/ebook-context/ReadPreview';
import AudioPlayer from './components/audio-books/PlayAudio';
import About from './views/about/About';
import MyLibraryEBook from './components/library/MyLibraryEBook';
import PrivacyPolicy from './components/privacy/PrivacyPolicy';
import Checkout from "./components/checkout/checkout";
import NewsContext from "./components/news-context/NewsContext";
import SeeAllPage from "./components/seeAll/SeeAllPage";
import EBookPage from "./views/ebook/EBookPage";
import Audio from "./routes/Audio";
import PictureRim from "./components/pictureRim/PictureRim";
import ReadPictureRim from "./components/pictureRim/ReadPictureRim";
import MyLibraryAudio from "./components/library/MyLibraryAudio";
import MyAudioBookPlay from "./components/library/MyAudioBookPlay";
import MyBookRead from "./components/library/MyBookRead";
import MyLibrary from "./components/library/MyLibrary";
import {HelmetProvider} from "react-helmet-async";

const App = () => {


    return (
        <>
            <HelmetProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Authentication */}
                        <Route path="/about" element={<About/>}/>
                        <Route path="/forgot-password" element={<ForgetPassword/>}/>
                        <Route path="/reset-password/:id" element={<ConfirmPassword/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>

                        {/* Home page / DashBoard */}
                        <Route path="/" element={<Home/>}/>

                        {/* Purchase library */}
                        <Route path="/myBookRack" element={<MyLibrary/>}/>
                        <Route path="/myBookRack/eBook" element={<MyLibraryEBook/>}/>
                        <Route path="/my-book-read/:id" element={<MyBookRead/>}/>
                        <Route path="/myBookRack/audio" element={<MyLibraryAudio/>}/>
                        <Route path="/my-audio-play/:id" element={<MyAudioBookPlay/>}/>

                        {/* All books */}
                        <Route path="/details/all-book" element={<SeeAllPage/>}/>

                        {/* e-Books */}
                        <Route path="/e-books" element={<EBookPage/>}/>
                        <Route path="/read-book/:id" element={<ReadBook/>}/>
                        <Route path="/read-preview" element={<ReadPreview/>}/>

                        {/* News paper*/}
                        <Route path="/news-papers" element={<NewsContext/>}/>
                        <Route path="/read-news/:id" element={<ViewNews/>}/>

                        {/* Picture Rim*/}
                        <Route path="/pictureRim/:id" element={<PictureRim/>}/>
                        <Route path="/read-pictureRim/:id" element={<ReadPictureRim/>}/>

                        {/* Audio Book */}
                        <Route path="/audio-books" element={<Audio/>}/>
                        <Route path="/play-audio/:id" element={<AudioPlayer/>}/>

                        {/* Privacy & Policy */}
                        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>

                        {/*  Payment pages  */}
                        <Route path="/checkout-order" element={<Checkout/>}/>
                        <Route path="/payment-success" element={<Success/>}/>
                    </Routes>
                </BrowserRouter>
            </HelmetProvider>
        </>
    );
}

export default App;
