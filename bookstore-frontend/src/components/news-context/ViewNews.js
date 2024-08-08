import React, { useState, useEffect } from 'react'
import '../../styles/newscontext.css'
import { FETCH_ALL_READ_NEWS, FETCH_ALL_NEWS } from '../../apis/endpoints';
import API_ENDPOINT from '../../apis/httpAxios';
import { SlArrowLeftCircle } from "react-icons/sl";
import ScreenLoading from "../loading/Loading";
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import {bgColor} from "../../common/commonColors";
import Footer from "../footer/Footer";
import {Helmet} from "react-helmet-async";

const ViewNews = () => {
    const [news, setNews] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const selectedNewsId = localStorage.getItem('selectedNewsId');
    console.log("selectedNewsId : ", selectedNewsId);

    useEffect(() => {
      console.log('selected News Data Execute start');
      const fetchData = async () => {
        try {
          const response = await API_ENDPOINT.get(`${FETCH_ALL_READ_NEWS}/${selectedNewsId}`);
          console.log('Selected News Data:', response);
          if (response.status == 200) {
              const selectedNewsData = response.data.data;
              setNews(selectedNewsData);
              console.log("'Selected News Data:', response", news);
              setLoading(false);
          }else{
              window.location.href="/login"
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
        fetchData();
    }, [selectedNewsId]);

    const RedirectPage =()=>{
      window.location.href="/news-papers";
  }
    if (loading) {
        return <ScreenLoading />
    }
    if (error) {
        return <div>Error loading news: {error.message}</div>;
    }

    if (!news) {
        return <div>No news available</div>;
    }

    const shareUrl = 'https://readlanka.com/read-news/${selectedNewsId';
    const currentURL = "https://readlanka.com" + window.location.pathname;
    // const shareUrl = "http://localhost:3000/read-book";
    const title = "Read Lanka";

  return (
      <>
          <div className="top__bar">
              <p>
                  <SlArrowLeftCircle onClick={RedirectPage} style={{fontSize: "40px", margin: '3px', color: "white"}}/>
              </p>
          </div>

          <div className='view-news-outer' style={{background: bgColor}}>
              <Helmet>
                  <title>{news.newsTitle}</title>
              </Helmet>
              <div className="left-news-outer-view">
                  <img id="image" src={news.thumbnail_url} alt={news.newsTitle}/>
              </div>
              <div className="right-news-desc-outer">
                  <div className='topic'>
                      <h2 style={{fontSize:'25px'}}>{news.newsTitle}</h2>
                  </div>
                  <div className='news-description-body'>
                    <p >{news.description}</p>
                  </div>
              </div>
              <div className="Demo__container">
                  <p style={{fontSize:'25px', color:'red'}}>Share</p>
                  <div className="Demo__some-network">
                      <FacebookShareButton
                          url={currentURL}
                          className="Demo_some-network_share-button"
                      >
                          <FacebookIcon size={30} round />
                      </FacebookShareButton>
                      <TwitterShareButton
                          url={currentURL}
                          className="Demo_some-network_share-button"
                      >
                          <TwitterIcon size={30} round/>
                      </TwitterShareButton>

                      <WhatsappShareButton
                          url={currentURL}
                          className="Demo_some-network_share-button"
                      >
                          <WhatsappIcon size={30} round/>
                      </WhatsappShareButton>

                  </div>
              </div>
          </div>
          <Footer/>
      </>
  )
}
export default ViewNews
