import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import Loader from '../components/Loader'

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Header></Header>
      <BlogList></BlogList>
      {/* <Loader></Loader> */}
      <Newsletter></Newsletter>
      <Footer></Footer>
    </div>
  )
}

export default Home
