import React from 'react'
import A1 from "../../assest/about/A1.jpg"
import A2 from "../../assest/about/A2.jpg"
import "../../styles/about.css"
import NavBar from '../../components/navbar/NavBar'
import Footer from '../../components/footer/Footer'

const About = () => {
  return (
    <>
      <NavBar/>
      <div className="about-outer">
         <h2> About Us</h2>
         <p>
            Welcome to www.readlanka.com, your one-stop destination for all things e-books, audio books, and online libraries. Immerse yourself in a world where literature meets technology, as we offer a diverse collection of e-books ranging from newspapers to best-selling novels, and a wide selection of audio books for listeners on the go.
            At ReadLanka, we believe in the power of words to inspire, educate, and entertain. Explore our virtual store where you can browse through different genres, discover hidden literary gems, and curate your personalized online library with just a few clicks.
            Create your own reading oasis where you can escape reality and embark on literary adventures from the comfort of your device. With a seamless website experience and secure payment options, purchasing and enjoying your favorite e-books and audio books has never been easier.
            Let www.readlanka.com be your digital bookshelf, where stories come to life and imagination knows no bounds. Start your literary journey today with us!
         </p>
        <h4> Board Members </h4>
      </div>
      <div className="photo-outer">
            <img id="image" src={A1} alt="" />
            <img id="image" src={A2} alt="" />
      </div>
      <Footer/>
    </>
  )
}

export default About
