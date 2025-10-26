import React, { useState ,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function SignIN2() {
    const [password, setPassword] = useState('');
    const [passwordWarning, setPasswordWarning] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async () => {
        if(password.length <= 6){
            setPasswordWarning("Password should be more than 6 digits or characters");
        }
        else{
            try{
                const res = await axios.post('http://localhost:5000/signIN', {password} , {withCredentials:true});
                if(res.data.message === "Session Expired by token" || res.data.message === "Session Expired by email"){
                    setPasswordWarning("Session Expired, redirecting for SignIn Again");
                    setTimeout(()=>{
                        navigate('/signIN');
                    },5000)
                }
                if(res.data.message === "Email already registered"){
                    setPasswordWarning("Email already registered, redirecting for LogIn");
                    setTimeout(()=>{
                        navigate('/signUP');
                    },5000)
                }
                console.log(res.data.message);
                navigate('/home');
            }
            catch(err){
                console.log("Frontend SigIn error");
            }
        }
    }

  return (
    <div className='flex flex-row h-3/5 w-2/3 bg-black rounded-2xl'>
        
        <div className='flex flex-col ml-5 mt-10 w-1/2'>
            <h1 className='text-white text-4xl font-medium' >Just few steps more</h1>
            <h2 className='text-white mt-6 text-2xl'>Enter Password</h2>
        </div>

        <div className='flex flex-col ml-5 mt-10 w-1/2 items-start'>
            <input type="text"
            value={password}
            onChange={ (e) =>
                { 
                    setPassword(e.target.value)
                }
            }
            className='mt-10 rounded focus:border-blue-500 border-white border-2 w-70 transition-colors duration-300 text-white p-2'  
            placeholder='Password (Min. 6 characters)'/>
            <p className='text-red-500'>{passwordWarning}</p>

            <button
            onClick={handleSubmit} 
            className='mt-10 text-white  bg-blue-500 p-2 rounded hover:bg-blue-700 duration-100'> Submit </button>
            <button onClick={() => navigate('/signUP')} className='text-blue-400 hover:text-blue-700 duration-100'>Already have acoount ?</button>
        </div>
        
    </div>
  )
}

export default SignIN2
