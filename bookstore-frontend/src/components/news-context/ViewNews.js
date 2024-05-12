import React from 'react'
import '../../styles/newscontext.css'
import { useState, useEffect } from 'react';
import { FETCH_ALL_READ_NEWS } from '../../apis/endpoints';
import API_ENDPOINT from '../../apis/httpAxios';

const ViewNews = () => {
    const [news, setNews] = useState(null);
    const selectedNewsId = localStorage.getItem('selectedNewsId');

      useEffect(() => {
        console.log('selected News Data Execute start');
        const fetchData = async () => {
          try {
            const response = await API_ENDPOINT.get(`${FETCH_ALL_READ_NEWS}/${selectedNewsId}`);
            const selectedNewsData = response.data;
            console.log('Selected News Data:', selectedNewsData);
            setNews(selectedNewsData.data);
            console.log('Selected News :', news);
          } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchData();
      }, []);
    
  return (
    <>
        <a href='/' >Back</a>
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
