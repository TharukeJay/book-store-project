import React, {useEffect} from 'react'
import Navbar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import '../../styles/ebookcontext.css';
import {bgColor} from "../../common/commonColors";
import {useLocation, useNavigate} from "react-router-dom";

const MyLibraryEBook = () => {
    const navigate = useNavigate();

    const HandleClickEBook = () =>{
        navigate('/myBookRack/eBook');
    }
    const HandleClickAudioBook = () =>{
        navigate('/myBookRack/audio');
    }

    return (
        <>
            <Navbar/>
            <div className='outer' style={{background: bgColor}}>
                <div className='inner-outer'>
                    <div className='category-outer' onClick={HandleClickEBook}>
                        <img
                            src='https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/temp%2FE%20book.png?alt=media&token=f988ca3e-472b-4d2f-995c-8c3c16d7ccc8'/>
                        <h2>e-Books </h2>
                    </div>
                    <div className='category-outer' onClick={HandleClickAudioBook}>
                        <img
                            src='https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/temp%2Faudio%20book%202.png?alt=media&token=8709654f-527a-42db-ba50-5f73871290cf'/>
                        <h2> Audio-Books</h2>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default MyLibraryEBook
