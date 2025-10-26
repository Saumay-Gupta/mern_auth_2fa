import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
const LogoutModal = ( {closeModal2} ) => {   

    const [warning, setWarning] = useState('');
    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.post("http://localhost:5000/logout", {}, {withCredentials: true})
        .then((res)=>{
            if(res.data.message == 'Logged out successfully'){
                setWarning('Logged out successfully');
                setTimeout(()=>{
                    navigate('/signUP');
                },2500)
            }
        })
        .catch((err)=>{
            setWarning("Error while Logout");
            console.log("Error while Logout");
        })
    }

  return (
    <div className='flex flex-col w-100 h-40 bg-white rounded'>
      <div className='flex w-full h-20 '>
        <span className='text-black w-100 font-medium text-2xl p-5'>Are you sure ?</span>
        <button onClick={closeModal2} className=" w-30 flex justify-end mr-4 mt-6">&#10060;</button>
      </div>
      

      <div className="flex flex-col items-center justify-center">
        <button
        onClick={handleLogout} 
        className="w-50 border-2 bg-red-400 hover:bg-red-600 duration-100 rounded p-2">Yes</button>
        <p className="justify-center items-center text-red-600">{warning}</p>
      </div>
    </div>
  )
}

export default LogoutModal
