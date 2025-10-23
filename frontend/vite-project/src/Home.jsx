import React from 'react'
import NavBar from './NavBar'

function Home() {
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
