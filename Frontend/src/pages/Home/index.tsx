import React from 'react'
import Clock from './Clock'
import Quote from './Quote'
import '../../styles/css/pages/Home/index.css'

function Home() {
    
  return (   
    <>
      <section>
        <img src="banner-home.jpeg" alt="" className='banner-home'/>
        <Clock />
        <Quote />
      </section>
    </>
  )
}

export default Home