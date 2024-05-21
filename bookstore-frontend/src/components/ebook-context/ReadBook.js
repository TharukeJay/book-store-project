import React from 'react'
import '../../styles/ebookcontext.css'
import { useState, useEffect } from 'react';
import { FETCH_ALL_READ_BOOK } from '../../apis/endpoints';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading'

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
            const selectedBookData = response.data;
            console.log('Selected Book Data:', selectedBookData);
            setBook(selectedBookData.data);
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

    if (loading) {
      return <ScreenLoading />
    }
    return (
      <>
        <a href="/">Back</a>
        <div className='view-novel-outer'>
          <div className="left-photo-outer">
            <img src={book.thumbnail} alt="Book Thumbnail" style={{ width: '300px', height: '400px' }} />
          </div>
          <div className="right-desc-outer">
            <br /><br />
            <p>{book.description}</p>
            <br />
            <div className="pricing-card">
              <span>{book.price} $</span>
            </div>
            <br />
            <div className="button-outer">
              <button> <a href="/read-preview">Read preview</a> </button>
              <button>Buy Now</button>
            </div>
          </div>
        </div>
      </>
    );
  };

export default ReadBook

