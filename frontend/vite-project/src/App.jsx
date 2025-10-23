import { useState } from 'react'
import SignIN from './SignIN.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import SignIN2 from './SignIN2.jsx'
import SignUP from './SignUP.jsx'
import Home from './Home.jsx'
function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<SignIN/>}/>
        <Route path='/signIN' element={<SignIN2/>}/>
        <Route path='/signUP' element={<SignUP/>}/>
        <Route path='/home' element={<Home/>}/>
      </>
    )
  )

  return (
    <>
      <div className='flex h-screen w-full items-center justify-center bg-gray-800'>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
