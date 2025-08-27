import React from 'react'
import { assets  } from '../assets/assets'

const Header = () => {
  return (
    <section className='w-full px-[5%]'>
      <div className='flex flex-col items-center justify-center gap-2 max-w-[1520px] mx-auto'>
        <img src={assets.header_img} alt="Header" className='w-36 h-36 rounded-full mb-6'/>
        <h1 className='flex justify-center items-center gap-2 text-3xl font-semibold text-gray-800' >Hey Developer <img src={assets.hand_wave} alt="Hand" className='w-8 aspect-square' /></h1>
        <h2 className='text-gray-800 text-4xl font-bold'>Welcome to our App</h2>
        <p className='text-[18px] max-w-[520px] text-center'>Let's start with a quick product tour and we will have you up and running in no time</p>
        <button className='border-1 border-gray-400 px-5 py-2 rounded-4xl text-1xl hover:bg-gray-200 cursor-pointer transition-all duration-200 mt-3'>Get Started</button>
      </div>
    </section>
    
  )
}

export default Header
