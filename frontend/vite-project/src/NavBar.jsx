import React from 'react'
import ProfileDropdown from './ProfileDropDown'

function NavBar() {
  return (
    <div className='flex h-10 w-full bg-gray-600'>
        <span className='text-black justify-start m-2'>Logo</span>


        <div className='flex w-full items-end justify-end'>
            <ProfileDropdown/>
        </div>

    </div>
  )
}

export default NavBar
