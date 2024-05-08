import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import Footer from '../../components/footer/Footer'
import NewsContext from '../../components/news-context/NewsContext'

const NewsPage = () => {
  return (
    <>
        <NavBar/>
        <NewsContext/>
        <Footer/>
    </>
  )
}

export default NewsPage
