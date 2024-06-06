import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/context.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NewsContext from '../news-context/NewsContext';
import EBookContext from '../ebook-context/EBookContext';
import NavBar from '../navbar/NavBar';
import Footer from '../footer/Footer';


const Context = () => {
  return (
    <>
        <NavBar/>
         <div className="container" style={{maxWidth: "100%"}}>
            <EBookContext/>
            <NewsContext/>
          </div> 
        <Footer/>
    </>
  )
}

export default Context
