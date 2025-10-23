import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function SignIN() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstNameWarning, setFirstNameWarning] = useState('');
    
    const navigate = useNavigate();

    const handleNext = () => {
        if(firstName.length != 0){
            localStorage.setItem("firstName", `${firstName}`);
            navigate('/signIN');
        }
        else{
            setFirstNameWarning("Enter first name please..")
        }
    }
  return (
    <div className='flex flex-row h-3/5 w-2/3 bg-black rounded-2xl'>
        
        <div className='flex flex-col ml-5 mt-10 w-1/2'>
            <h1 className='text-white text-4xl font-medium' >Welcome,</h1>
            <h2 className='text-white mt-6 text-2xl'>Create your account</h2>
        </div>

        <div className='flex flex-col ml-5 mt-10 w-1/2 items-start'>
            <h1 className='text-white text-xl'>Enter your name</h1>
            <input type="text"
            value={firstName}
            onChange={ (e) =>
                { 
                    setFirstName(e.target.value)
                }
            }
            className='mt-10 rounded focus:border-blue-500 border-white border-2 w-70 transition-colors duration-300 text-white p-2' 
            placeholder='Enter First Name' />
            <p className='text-red-500'>{firstNameWarning}</p>

            <input type="text"
            value={lastName}
            onChange={ (e) =>
                { 
                    setLastName(e.target.value)
                }
            }
            className='mt-10 rounded focus:border-blue-500 border-white border-2 w-70 transition-colors duration-300 text-white p-2'  
            placeholder='Enter Last Name (optional)'/>

            <button
            onClick={handleNext} 
            className='mt-10 text-white  bg-blue-500 p-2 rounded hover:bg-blue-700 duration-100'> Next </button>
            <button onClick={() => navigate('/signUP')} className='text-blue-400 hover:text-blue-700 duration-100'>Already have acoount ?</button>
        </div>
        
    </div>
  )
}

export default SignIN
