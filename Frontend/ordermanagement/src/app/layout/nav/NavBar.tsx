import React from 'react'
import '../../../index.css'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
  <div className='w-full bg-orange-500 flex justify-center gap-10 p-5'>
   <Link to='/' className='text-white'>Order Management App</Link>
   <Link to='/customers' className='text-white'>Customers</Link>
   <Link to='/orders' className='text-white'>Orders</Link>
  </div>    
  )
}

export default NavBar