import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/context.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NewsContext from '../news-context/NewsContext';
import EBookContext from '../ebook-context/EBookContext';


const Context = () => {
  return (
    <>
         <div className="container">
            {/* <EBookContext/> */}
            <NewsContext/>
          </div> 
    </>
  )
}

export default Context
