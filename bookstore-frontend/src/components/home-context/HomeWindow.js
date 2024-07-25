import React from 'react'
import NavBar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import {bgColor} from "../../common/commonColors";
import '../../styles/context.css';
import {useNavigate} from "react-router-dom";


const HomeWindow = () => {
    const navigate = useNavigate();

    const HandleClickEBook = () =>{
        navigate('/e-books');
    }
    const HandleClickAudioBook = () =>{
        navigate('/audio-books');
    }
    const HandleClickNews = () =>{
        navigate('/news-papers');
    }
    const HandleClickMyBook = () =>{
        navigate('/myBookRack');
    }
    return (
        <div className='outer' style={{background:bgColor}}>
                <div className='inner-outer'>
                    <div className='category-outer' onClick={HandleClickEBook}>
                        <img src='https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/temp%2FEbooks.jpeg?alt=media&token=825dd36e-9294-4f52-8441-8cb908c4645e'/>
                        <h2>e-Books </h2>
                    </div>
                    <div className='category-outer' onClick={HandleClickAudioBook}>
                        <img src='https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/temp%2FDailyNovel.jpeg?alt=media&token=9c7f2b47-5aca-4ca6-a808-da8e284fed1a'/>
                        <h2> Audio-Books</h2>
                    </div>
                    <div className='category-outer' onClick={HandleClickNews}>
                        <img src='https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/temp%2FFeatured.jpeg?alt=media&token=907cb122-a09a-45ac-a911-3f908db18d06'/>
                        <h2>News</h2>
                    </div>
                    <div className='category-outer' onClick={HandleClickMyBook}>
                        <img src='https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/temp%2FShortStorie.jpeg?alt=media&token=a7038133-016b-4132-b7ee-3b5dce4c7619'/>
                        <h2>My Book Rack</h2>
                    </div>
                </div>
        </div>
    )
}

export default HomeWindow