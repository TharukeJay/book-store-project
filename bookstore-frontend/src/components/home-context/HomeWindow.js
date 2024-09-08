import React, {useEffect, useState} from 'react'
import NavBar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import {bgColor} from "../../common/commonColors";
import '../../styles/context.css';
import {useNavigate} from "react-router-dom";
import API_ENDPOINT from "../../apis/httpAxios";
import {GET_USER_DATA} from "../../apis/endpoints";

const HomeWindow = () => {
    const navigate = useNavigate();
    const [userData, setUserData] =useState("");
    const [showMyRack, setShowMyRack] =useState(false);
    const userId  = localStorage.getItem('userId');

    const fetchUserData = async () => {
        try {
            const response = await API_ENDPOINT.get(`${GET_USER_DATA}/${userId}`);
            const getData = response.data.data;
            setUserData(getData);
            if(getData.userId != "") {
                setShowMyRack(!showMyRack);
            }
            console.log("userData Home Window========>>>>", userData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [userId]);


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
                        <img src='https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/temp%2FE%20book.png?alt=media&token=f988ca3e-472b-4d2f-995c-8c3c16d7ccc8'/>
                        <h2>e-Books </h2>
                    </div>
                    <div className='category-outer' onClick={HandleClickAudioBook}>
                        <img src='https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/temp%2Faudio%20book%202.png?alt=media&token=8709654f-527a-42db-ba50-5f73871290cf'/>
                        <h2> Audio-Books</h2>
                    </div>
                    <div className='category-outer' onClick={HandleClickNews}>
                        <img src='https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/temp%2F%E0%B6%B4%E0%B6%AD%E0%B7%8A%E0%B6%AD%E0%B6%BB%E0%B7%9A.png?alt=media&token=4ec23b88-fb6a-4936-b1fe-da3e7925ea94'/>
                        <h2>News</h2>
                    </div>
                    {showMyRack &&(
                        <div className='category-outer' onClick={HandleClickMyBook}>
                            <img src='https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/temp%2Flibrary.jpeg?alt=media&token=1b805b63-39b9-4a5b-b99f-57218e4c92d9'/>
                            <h2>Book Rack</h2>
                        </div>
                    )}
                </div>
        </div>
    )
}

export default HomeWindow
