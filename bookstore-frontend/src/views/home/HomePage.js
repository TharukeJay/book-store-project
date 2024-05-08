import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import Footer from '../../components/footer/Footer'
import Context from '../../components/home-context/Context'

const HomePage = () => {
  return (
    <>
    <div style={{width:'100%', height:'200vh',}}>
      <NavBar/>
      <Context/>
      <Footer/>
    </div>
    </>
  )
}

export default HomePage
