import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import Footer from '../../components/footer/Footer'
import Context from '../../components/home-context/Context'

const HomePage = () => {
  return (
    <>
      <NavBar/>
      <Context/>
      <Footer/>
    </>
  )
}

export default HomePage
