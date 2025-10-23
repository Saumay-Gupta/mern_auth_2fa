import React, { useState ,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function SignUP() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailWarning, setEmailWarning] = useState('');
    const [passwordWarning, setPasswordWarning] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async () => {
        if(email.length == 0){
            setEmailWarning("Enter email please");
        }
        else if(password.length <= 6){
            setPasswordWarning("Password should be more than 6 digits or characters");
        }
        else{
            try{
                const res = await axios.post('http://localhost:5000/signUP', {email,password} )
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
            <h1 className='text-white text-4xl font-medium' >Welcome Back Sir,</h1>
            <h2 className='text-white mt-6 text-2xl'>Please Fill Login Details</h2>
        </div>

        <div className='flex flex-col ml-5 mt-10 w-1/2 items-start'>
            <h1 className='text-white text-xl'>Enter Email and Password</h1>
            <input type="text"
            value={email}
            onChange={ (e) =>
                { 
                    setEmail(e.target.value)
                }
            }
            className='mt-10 rounded focus:border-blue-500 border-white border-2 w-70 transition-colors duration-300 text-white p-2' 
            placeholder='Enter Email' />
            <p className='text-red-500'>{emailWarning}</p>

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
            <button onClick={() => navigate('/')} className='text-blue-400 hover:text-blue-700 duration-100'>Create an acoount !!</button>
        </div>
        
    </div>
  )
}

export default SignUP
