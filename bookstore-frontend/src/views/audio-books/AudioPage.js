import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import Footer from '../../components/footer/Footer'
import EBookContext from '../../components/ebook-context/EBookContext'
import AudioBooks from "../../components/audio-books/AudioBooks";
import {bgColor} from "../../common/commonColors";

const AudioPage = () => {
    return (
        <>
            <div className="container" style={{background: bgColor, maxWidth: "100%"}}>
                <NavBar/>
                <AudioBooks/>
                <Footer/>
            </div>
        </>
    )
}

export default AudioPage
