import React from 'react'
import '../../styles/ebookcontext.css'
import { useState, useEffect } from 'react';
import { FETCH_ALL_READ_BOOK } from '../../apis/endpoints';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading'
import { SlArrowLeftCircle } from "react-icons/sl";
import {
  FacebookShareButton,
  FacebookIcon,
} from "react-share";
import EbookTopBar from '../ebook-context/EbbokTopBar';

const ReadBook = () => {
  
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true)

    const selectedBookId = localStorage.getItem('selectedBookId');

    useEffect(() => {
      console.log('selected Book Data Execute start');
      const fetchData = async () => {
        try {
          const response = await API_ENDPOINT.get(`${FETCH_ALL_READ_BOOK}/${selectedBookId}`);
          if (response.status == 200) {
            const selectedBookData = response.data.data;
            console.log('Selected Book Data:', selectedBookData);
            setBook(selectedBookData);
            setLoading(false)
          }else{
            console.log("hi");
            window.location.href="/login"
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      fetchData();
    }, []);

    const RedirectPage =()=>{
        window.location.href="/";
    }
    
    const shareUrl = "http://github.com";
    // const shareUrl = "http://localhost:3000/read-book";
    const title = "GitHub";

    if (loading) {
      return <ScreenLoading />
    }

    return (
      <>
        {/* <SlArrowLeftCircle onClick={RedirectPage} style={{fontSize:"50px", margin:'10px'}}/> */}
        <EbookTopBar/>
        <div className='view-novel-outer'>
          <div className="left-photo-outer">
            <img src={book.thumbnail_url} alt="Book Thumbnail"/>
          </div>
          <div className="right-desc-outer">
            <br /><br />
            <p style={{color:"blue"}}>{book.title}</p>
            <p>{book.description}</p>
            <br />
            <div className="pricing-card">
              <span>{book.price} $</span>
            </div>
            <div className="read-button-outer">
              <button> <a href="/read-preview">Read preview</a> </button>
              <button>Buy Now</button>
            </div>
            <div className="Demo__container">
              <div className="Demo__some-network">
                <FacebookShareButton
                  url={shareUrl}
                  className="Demo__some-network__share-button"
                >
                  <FacebookIcon size={50} round />
                </FacebookShareButton>

              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

export default ReadBook

