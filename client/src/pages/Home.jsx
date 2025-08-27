import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Home = () => {
  const navigate = useNavigate();

  const { isLoggedin } = useContext(AppContext)

  useEffect(()=>{
  if(!isLoggedin){
      navigate('/login')
    }
  },[isLoggedin])
  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover'>
      <Navbar/>
      <Header/>
    </div>
  )
}

export default Home
