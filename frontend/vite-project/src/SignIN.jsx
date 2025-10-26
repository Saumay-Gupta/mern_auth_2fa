import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignIN() {
    const [email, setEmail] = useState('');
    const [emailWarning, setEmailWarning] = useState('');
    
    const navigate = useNavigate();

    const handleNext = async () => {
        if(email.length != 0){
            await axios.post('http://localhost:5000/sendOTP', {email: email} , {withCredentials: true})
            .then((res)=>{
                console.log(res.data.message)
                if(res.data.message == "Email Already Registered, go for Login"){
                    setEmailWarning("Email Already Registered, redirecting to 'Login Page'");
                    setTimeout(() => {
                        navigate('/signUP');
                    }, 5000); 
                }
                else{
                    console.log("OTP response -> ", res.data);
                    localStorage.setItem("page", "signup")
                    navigate('/verifyOTP');
                }
            })
            .catch((err)=>{
                console.log("SignIN EMAIL ERROR");
            })
        }
        else{
            setEmailWarning("Enter email please..")
        }
    }
  return (
    <div className='flex flex-row h-3/5 w-2/3 bg-black rounded-2xl'>
        
        <div className='flex flex-col ml-5 mt-10 w-1/2'>
            <h1 className='text-white text-4xl font-medium' >Welcome,</h1>
            <h2 className='text-white mt-6 text-2xl'>Create your account</h2>
        </div>

        <div className='flex flex-col ml-5 mt-10 w-1/2 items-start'>
            <h1 className='text-white text-xl'>Enter your mail</h1>
            <input type="text"
            value={email}
            onChange={ (e) =>
                { 
                    setEmail(e.target.value)
                }
            }
            className='mt-10 rounded focus:border-blue-500 border-white border-2 w-70 transition-colors duration-300 text-white p-2' 
            placeholder='Enter your mail' />
            <p className='text-red-500'>{emailWarning}</p>

            <button
            onClick={handleNext} 
            className='mt-10 text-white  bg-blue-500 p-2 rounded hover:bg-blue-700 duration-100'> Next </button>
            <button onClick={() => navigate('/signUP')} className='text-blue-400 hover:text-blue-700 duration-100'>Already have acoount ?</button>
        </div>
        
    </div>
  )
}

export default SignIN
