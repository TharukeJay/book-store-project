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
                            src='https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/temp%2FEbooks.jpeg?alt=media&token=825dd36e-9294-4f52-8441-8cb908c4645e'/>
                        <h2>e-Books </h2>
                    </div>
                    <div className='category-outer' onClick={HandleClickAudioBook}>
                        <img
                            src='https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/temp%2FDailyNovel.jpeg?alt=media&token=9c7f2b47-5aca-4ca6-a808-da8e284fed1a'/>
                        <h2> Audio-Books</h2>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default MyLibraryEBook
