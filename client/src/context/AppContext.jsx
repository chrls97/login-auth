import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) =>{

  axios.defaults.withCredentials=true;

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthState = async () => {
    try{
      const {data} = await axios.get(backendUrl+'/api/auth/is-auth')
      if(data.success){
        setIsLoggedIn(true)
        getUserData()
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
      
    }
  }


  const getUserData = async () => {
    try{
      const {data} = await axios.get(backendUrl+'/api/user/get-users')
      if(data.success){
        setUserData(data.userdata)
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  const value = {
    backendUrl, 
    isLoggedin, setIsLoggedIn,
    userData, setUserData,
    getUserData
  }

  // useEffect(()=>{
  //     getAuthState()
  // },[])

  return(
    <AppContext.Provider value={value} >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;