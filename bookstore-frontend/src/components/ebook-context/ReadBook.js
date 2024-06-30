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
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    InstapaperShareButton,
    InstapaperIcon,
} from "react-share";
import EbookTopBar from '../ebook-context/EbbokTopBar';
import {Navigate, useLocation} from "react-router-dom";
import {AiFillInstagram} from "react-icons/ai";
import {BsInstagram} from "react-icons/bs";
import {bgColor} from "../../common/commonColors";

const ReadBook = () => {
    const location = useLocation();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true)

    // const selectedBookId = localStorage.getItem('selectedBookId');
const {selectedBookId} = location.state;
    console.log('selectedBookId===================>>>', selectedBookId);

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

    // const CheckoutBalnce = () => {
    //     window.location.href="/checkout-order";
    // }

    if (loading) {
      return <ScreenLoading />
    }

    return (
      <>
        {/* <SlArrowLeftCircle onClick={RedirectPage} style={{fontSize:"50px", margin:'10px'}}/> */}
        <EbookTopBar/>
        <div className='view-novel-outer-ebook' style={{background:bgColor}}>
          <div className="left-photo-outer">
            <img src={book.thumbnail_url} alt="Book Thumbnail"/>
          </div>

            <div className="right-desc-outer-ebook">
                <br/><br/>
                <p style={{color: "blue", fontSize: "45px", paddingBottom: "20px"}}>{book.title}</p>
                <p>{book.description}</p>
                <br/>

                <div className="pricing-card">
                    <span>LKR {book.price} </span>
                </div>
                <div style={{height: "40px"}}></div>
                <div className="read-button-outer">
                    <button><a href="/read-preview">Read preview</a></button>
                    {/*<button onClick={CheckoutBalnce}>*/}
                    {/*    Buy Now*/}
                    {/*</button> */}
                    <button><a href={`/checkout-order?price=${book.price}&title=${encodeURIComponent(book.title)}`}> Buy
                        Now</a></button>
                </div>
                <div style={{height: "40px"}}></div>
                <div className="Demo__container">
                    <div className="Demo__some-network">
                        <FacebookShareButton
                            url={shareUrl}
                            className="Demo__some-network__share-button"
                        >
                            <FacebookIcon size={50} round/>
                        </FacebookShareButton>

                        <TwitterShareButton
                            url={shareUrl}
                            className="Demo__some-network__share-button"
                        >
                            <TwitterIcon size={50} round/>
                        </TwitterShareButton>

                        <WhatsappShareButton
                            url={shareUrl}
                            className="Demo__some-network__share-button"
                        >
                            <WhatsappIcon size={50} round/>
                        </WhatsappShareButton>

                    </div>
                </div>
            </div>
        </div>
      </>
    );
};

export default ReadBook

