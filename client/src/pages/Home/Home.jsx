import React from 'react'
import Header from '../../components/particles/Header'
import  Hero  from '../../components/particles/Hero'
import  Clients  from '../../components/particles/Clients'
import  Works  from '../../components/particles/Works'
import  Reviews  from '../../components/particles/Reviews'




const Home = () => {
    return (
        <div>
        <Header />
          <Hero />
          <Clients />
          <Works />
          <Reviews />
      
  
        </div>
      );
}

export default Home