import React from 'react'
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import axiosInstance from './Axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    "email": '',
    "password": ''
  })

  //changehandler function to change the credentials state when the user types in the input fields

  const changehandler = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })         
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('users/login', credentials)
      if (response.data.role === 'employee' || response.data.role === 'admin'){

        // storing the user data in the session ,later we use in checking the user role and id to make routes protected

        sessionStorage.setItem('user', JSON.stringify(response.data))                
        sessionStorage.setItem('id',JSON.stringify(response.data.id))

       //these storing for displaying the user name and role in the dashboard header seconder header
       
        sessionStorage.setItem('role',JSON.stringify(response.data.role))
        sessionStorage.setItem('name',JSON.stringify(response.data.name))
        navigate(response.data.role === 'admin' ? '/admin' : '/empdashboard')
      }
    }
    catch (err) {
      alert("The user with this credentials was not found")
      console.log(err.message)
    }
  }
  return (
    <div className='h-screen  flex flex-col items-center justify-center bg-[#F7F6F2]'>
      <div className='h-40 w-50 border-l-30 border-t-30 border-r-30 rounded-tl-[50%] rounded-tr-[50%]'></div>
      <form className='flex flex-col items-center justify-center gap-10  bg-[#FFFFFF] h-110 w-120 relative rounded-2xl'>
        <h3 className='text-2xl font-bold tracking-wide'>Welcome back</h3>
        <CgProfile className='absolute left-15 top-34 size-9 text-[#9e9d99] ' />
        <input
          type='email'
          name='email'
          value={credentials.email}
          onChange={changehandler}
          placeholder='Enter the email'
          autoComplete='email'
          className='bg-[#F7F6F2] p-5 w-100 pl-17 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4d1d1] placeholder:text-xl text-2xl' />
        <RiLockPasswordLine className='absolute left-15 top-60 size-9 text-[#9e9d99]' />
        <input
          type='password'
          name='password'
          value={credentials.password}
          onChange={changehandler}
          placeholder='Enter the password'
          autoComplete=''
          className='bg-[#F7F6F2] p-5 w-100 pl-17 rounded-2xl focus:outline-none focus:ring-[#d4d1d1] focus:ring-2 placeholder:text-xl text-2xl' />
        <button type='button' className='bg-[#2C3E50] p-5 w-100 text-white rounded-2xl text-2xl tracking-wide' onClick={handleLogin}>Unlock</button>
      </form>
    </div>
  )
}

export default Login