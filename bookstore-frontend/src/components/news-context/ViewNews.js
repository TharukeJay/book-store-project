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

    const shareUrl = "http://github.com";
    // const shareUrl = "http://localhost:3000/read-book";
    const title = "GitHub";

  return (
      <>
          <div className="top__bar">
              <p>
                  <SlArrowLeftCircle onClick={RedirectPage} style={{fontSize: "40px", margin: '10px', color: "white"}}/>
              </p>
          </div>

          <div className='view-news-outer'>
              <div className="left-news-outer">
                  <img src={news.thumbnail_url} alt={news.newsTitle}/>
              </div>
              <div className="right-news-desc-outer">
                  <br/><br/>
                  <h2>{news.newsTitle}</h2>
                  <p>{news.description}</p>
              </div>
              <div className="Demo__container">
                  <div className="Demo__some-network">
                      <FacebookShareButton
                          url={shareUrl}
                          className="Demo__some-network__share-button"
                      >
                          <FacebookIcon size={50} round />
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
      </>
  )
}
export default ViewNews
