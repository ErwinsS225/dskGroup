import React from 'react'
import Navbar from './Navbar'
import { ToastContainer } from 'react-toastify'

type WrapperProps = {
    children : React.ReactNode
}
const Wrapper = ({children}:WrapperProps) => {
  return (
    <div>
    <Navbar/>
      <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      draggable
      pauseOnHover
      />
      <div className='px-5 md:px-[10px] mt-8 mb-10'>
        {children}
      </div>
    </div> 
  )
}

export default Wrapper
