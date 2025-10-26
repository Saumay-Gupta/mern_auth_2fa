import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Verification() {
    const [OTP, setOTP] = useState('');
    const [OTPWarning, setOTPWarning] = useState('');
    const navigate = useNavigate();
    const page = localStorage.getItem("page");

    const handleOTP = async () => {
        await axios.post('http://localhost:5000/verifyOTP', {otp : OTP},  { withCredentials: true })
        .then((res)=>{
            if(res.data.message === "Session Expired handleVerifyOTP"){
                setOTPWarning("Session Expired, redirecting back");

                setTimeout(()=>{
                    navigate(-1);
                },5000)
            }
            if(res.data.message === "Wrong OTP inserted handleVerifyOTP"){
                setOTPWarning("Wrong OTP inserted");
            }
            console.log("OTP response->", res.data);
            if(page == "signup") navigate('/signIN');
            else{
                axios.post('http://localhost:5000/signUP', {},{ withCredentials: true })
                .then((res)=>{
                    if(res.data.message == "Login Succesfully"){
                        setOTPWarning("Login Succesfully");
                        setTimeout(()=>{
                            navigate('/home')
                        },5000)
                    }
                })
                .catch((err)=>{
                    setOTPWarning("VerifyOTP Login error");
                    console.log("VerifyOTP Login error");
                })
            }
        })
        .catch((err)=>{
            console.log("Mail Error..!!!");
        })
    }

  return (
    <div className='flex flex-row h-3/5 w-2/3 bg-black rounded-2xl'>
        
        <div className='flex flex-col ml-5 mt-10 w-1/2'>
            <h1 className='text-white text-4xl font-medium' >Verify</h1>
            <h2 className='text-white mt-6 text-2xl'>Enter the code</h2>
        </div>

        <div className='flex flex-col ml-5 mt-10 w-1/2 items-start'>
            <h1 className='text-white text-xl'>Enter OTP</h1>
            <input type='text'
            value={OTP}
            onChange={ (e) =>
                { 
                    setOTP(e.target.value)
                }
            }
            className='mt-10 rounded focus:border-blue-500 border-white border-2 w-70 transition-colors duration-300 text-white p-2' 
            placeholder='Enter 4-digit OTP' />
            <p className='text-red-500'>{OTPWarning}</p>

            <button
            onClick={handleOTP} 
            className='mt-10 text-white  bg-blue-500 p-2 rounded hover:bg-blue-700 duration-100'> Verify </button>
        </div>
    </div>
  )
}

export default Verification
