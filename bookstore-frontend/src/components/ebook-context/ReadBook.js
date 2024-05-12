import React from 'react'
import '../../styles/ebookcontext.css'
import { useState, useEffect } from 'react';
import { FETCH_ALL_READ_BOOK } from '../../apis/endpoints';
import API_ENDPOINT from '../../apis/httpAxios';

const ReadBook = () => {
    const [book, setBook] = useState(null);
    const selectedBookId = localStorage.getItem('selectedBookId');

    useEffect(() => {
      console.log('selected Book Data Execute start');
      const fetchData = async () => {
        try {
          const response = await API_ENDPOINT.get(`${FETCH_ALL_READ_BOOK}/${selectedBookId}`);
          const selectedBookData = response.data;
          console.log('Selected Book Data:', selectedBookData);
          setBook(selectedBookData.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      fetchData();
    }, []);
  
    if (!book) {
      return <p>Loading...</p>;
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

