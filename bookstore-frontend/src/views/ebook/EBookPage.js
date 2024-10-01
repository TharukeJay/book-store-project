import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import Footer from '../../components/footer/Footer'
import EBookContext from '../../components/ebook-context/EBookContext'
import {bgColor, bookPageBackgroundColor} from "../../common/commonColors";

const EBookPage = () => {
  return (
    <>
        <div className="container" style={{background:bookPageBackgroundColor, maxWidth: "100%"}} >
            <NavBar />
            <EBookContext/>
            <Footer/>
        </div>
    </>
  )
}

export default EBookPage