import React, { useState, useEffect } from 'react'
import '../../styles/newscontext.css'
import { FETCH_ALL_READ_NEWS, FETCH_ALL_NEWS } from '../../apis/endpoints';
import API_ENDPOINT from '../../apis/httpAxios';
import { SlArrowLeftCircle } from "react-icons/sl";

const ViewNews = () => {
    const [news, setNews] = useState(null);
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
          const selectedNewsData = response.data.data;
          setNews(selectedNewsData);
          setLoading(false);
        } catch (error) {
          console.error('Error:', error);
          setError(error);
          setLoading(false);
          console.log("'Selected News Data:', response", news);
        }
      };
  
      if (selectedNewsId) {
        fetchData();
      } else {
        setLoading(false);
      }
    }, [5000]);

    const RedirectPage =()=>{
      window.location.href="/";
  }
  return (
    <>
        <SlArrowLeftCircle onClick={RedirectPage} style={{fontSize:"50px", margin:'10px'}}/>
        <div className='view-news-outer'>
            <div className="left-news-outer">
                <img src={news.thumbnail} alt="ABC"/>
            </div>
            <div className="right-desc-outer">
                <br /><br />
                <p>{news.description}</p>
            </div>
        </div>
    </>
  )
}
export default ViewNews
