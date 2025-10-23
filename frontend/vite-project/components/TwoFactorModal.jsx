
const TwoFactorModal = ( {closeModal} ) => {

  const handleTwofactorAuth = async () => {
    const c = confirm("Are you sure");
  }

  return (
    <div className='flex flex-col w-130 h-65 bg-white rounded'>
      <div className='flex w-full h-20 '>
        <span className='text-black w-100 font-medium text-2xl p-5'>Two Factor Auhorization</span>
        <button onClick={closeModal} className=" w-30 flex justify-end mr-4 mt-6">&#10060;</button>
      </div>
      
      <p className="p-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, animi nulla, aperiam blanditiis vero sint odit repudiandae libero pariatur molestiae fugiat impedit aut?.</p>

      <div className="flex items-center justify-center">
        <button
        onClick={handleTwofactorAuth} 
        className="w-50 border-2 bg-blue-400 hover:bg-blue-600 duration-100 rounded p-2">Enable Two factor</button>
      </div>
    </div>
  )
}

export default TwoFactorModal
