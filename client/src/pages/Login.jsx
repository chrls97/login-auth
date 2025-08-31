import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';
const Login = () => {

  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData, isLoggedin } = useContext(AppContext)

  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try{
      e.preventDefault();

      axios.defaults.withCredentials = true

      if(state === 'Sign up'){
        const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password})

        if(data.success){
          setIsLoggedIn(true)
          navigate('/')
          getUserData()
        }else{
          toast.error("data.message")
        }
      }else{
        const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password})

        if(data.success){
          setIsLoggedIn(true)
          navigate('/')
          getUserData()
        }else{
          toast.error(data.message)
        }
      }
    }catch(error){
      toast.error(error.message)
    }
  }



  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />

      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>

        <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === 'Sign up' ? 'Create Account' : 'Login'}</h2>

        <p className='text-center text-sm mb-6'>{state === 'Sign up' ? 'Create Your Account' : 'Login to your account!'}</p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign up' ?
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name} type="text"
                placeholder='Full Name' required className='outline-none text-white' />
            </div>
            : ''}


          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email" placeholder='Email' required className='outline-none text-white' />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password" placeholder='Password' required className='outline-none text-white' />
          </div>

          <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password?</p>

          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer text-white font-medium'>
            {state}
          </button>

          {state === 'Sign up' ?
            <p className='text-gray-400 text-center text-xs mt-4'>Already have an account? <span onClick={() => setState('Login')} className='ml-1 text-blue-400 underline cursor-pointer'>Login here</span></p>
            :
            <p className='text-gray-400 text-center text-xs mt-4'> Dont have an account? <span onClick={() => setState('Sign up')} className='ml-1 text-blue-400 underline cursor-pointer'>Signup</span></p>}





        </form>

      </div>
    </div>
  )
}

export default Login
