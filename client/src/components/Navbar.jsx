import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <nav className='w-full px-[5%] fixed top-0'>
      <div className='flex justify-between items-center py-4 max-w-[1520px] mx-auto'>
        <img src={assets.logo} alt="Logo" className='w-28 sm:w-32' />

        <button onClick={()=>navigate('/login')} className='flex justify-center items-center gap-1 text-gray-800 bg-gray-100 px-5 py-1 border-1 border-gray-400 rounded-4xl hover:bg-gray-300 cursor-pointer transition-all duration-100'>Login <img src={assets.arrow_icon} alt="" /></button>
      </div>
    </nav>
    
  )
}

export default Navbar
