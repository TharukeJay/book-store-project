import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import '../../styles/newscontext.css';
import { Link } from "react-router-dom";



const NewsContext = () => {
  const photos = [
    "https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a",
    "https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a",
    "https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a",
    "https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a",
    "https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a",
    "https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a",
    "https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a",
    "https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a",
    "https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a",
    "https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a",
    "https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a",
    "https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a",
    "https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a",
    "https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a",
    "https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a",
  ];

  const [index, setIndex] = useState(0); 

  const handleNext = () => {
    if (index + 4 < photos.length) {
      setIndex(index + 4);
    }
  };

  const handlePrevious = () => {
    if (index - 4 >= 0) {
      setIndex(index - 4);
    }
  };
  return (
    <>
    <br /><br />
    <div className="gallery-container">
      <div className="news-list">
        <a href='/read-news'>
          {photos.slice(index, index + 4).map((photo, i) => (
            <img key={i} src={photo} alt="News" className="photo-item"/>
          ))}
        </a>
      </div>
      <div className="buttons">
        <button onClick={handlePrevious} disabled={index === 0}>Previous</button>
        <button onClick={handleNext} disabled={index + 4 >= photos.length}>Next</button>
      </div>
    </div>
      
    </>
  )
}

export default NewsContext
