import React, { useEffect } from 'react'
import NavBar from './NavBar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Home() {

  const navigate = useNavigate();

  useEffect( ()=>{
    axios.get("http://localhost:5000/api/verify_user", {
      withCredentials: true,
    })
    .then((res)=>{
      console.log('User Res -> ', res.data);

      if(res.data.message === "Invalid Token" || res.data.message === "No Token") navigate('/signIN');
    })
    .catch((err)=>{
      console.log('Verify_User Errro..!!!');
    })
  },[])

  return (
    <>
      <div className='flex flex-col h-screen w-full'>
        <NavBar/>
        <div className='flex bg-white h-screen w-full items-center justify-center'>
          <h1 className='text-orange-400 font-medium text-3xl'>Welcome to the website..!!</h1>
        </div>
      </div>
    </>
  )
}

export default Home
