import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/context.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NewsContext from '../news-context/NewsContext';
import HomeWindow from '../home-context/HomeWindow';
import NavBar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import HomePage from "../../views/home/HomePage";
import {bgColor} from "../../common/commonColors";


const Context = () => {
  return (
    <>
         <div className="container" style={{background:bgColor, maxWidth: "100%"}} >
            <NavBar/>
            <HomeWindow/>
            <Footer/>
          </div>
    </>
  )
}

export default Context
