import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {

  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext)

  const sendVerificationOtp = async () => {
    try {
      const {data} = await axios.post(backendUrl+'/api/auth/send-verify-otp');
      if(data.success){
        navigate('/email-verify')
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout')
      if (data.success) {
        setIsLoggedIn(false)
        setUserData(false)
        navigate('/login')
        toast.success(data.message)
        localStorage.removeItem("token");
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <nav className='w-full px-[5%] fixed top-0'>
      <div className='flex justify-between items-center py-4 max-w-[1520px] mx-auto'>
        <img src={assets.logo} alt="Logo" className='w-28 sm:w-32' />
        {userData ?
          <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
            {userData.name[0].toUpperCase()}
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-gray-800  rounded pt-10'>
              <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                {!userData.isAccountVerified ? <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li> : ''}

                <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
              </ul>
            </div>
          </div> :
          <button onClick={() => navigate('/login')} className='flex justify-center items-center gap-1 text-gray-800 bg-gray-100 px-5 py-1 border-1 border-gray-400 rounded-4xl hover:bg-gray-300 cursor-pointer transition-all duration-100'>Login <img src={assets.arrow_icon} alt="" /></button>
        }

      </div>
    </nav>

  )
}

export default Navbar
