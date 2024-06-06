import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import Footer from '../../components/footer/Footer'
import Context from '../../components/home-context/Context'

const HomePage = () => {
  return (
    <>
    <div id='home' style={{width:'100%', height:'auto',}}>
      <Context/>
    </div>
    </>
  )
}

export default HomePage
