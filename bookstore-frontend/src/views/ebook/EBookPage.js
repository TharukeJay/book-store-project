import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import Footer from '../../components/footer/Footer'
import EBookContext from '../../components/ebook-context/EBookContext'
// import '../../styles/ebookcontext.css'

const EBookPage = () => {
  return (
    <>
        <NavBar/>
        <EBookContext/>
        <Footer/>
    </>
  )
}

export default EBookPage
