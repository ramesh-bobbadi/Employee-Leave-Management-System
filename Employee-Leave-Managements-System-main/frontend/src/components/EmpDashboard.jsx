import React from 'react'
import { CgProfile } from "react-icons/cg";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaCalendarPlus } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link, Outlet } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

// this is reusable profile component for employees and admin dashboard

export const Profile = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');

  }
  const name = JSON.parse(sessionStorage.getItem("name"));
  const result = name.split(".")[1];
  return (
    <div className='absolute right-20 top-26 h-60 w-70  '>
      <div className='bg-gray-500 h-30 flex flex-col items-center justify-center gap-5'>
        <FaUserAlt className='text-4xl text-green-300' />
        <span className='text-green-300 text-xl font-medium'>{result}</span>
      </div>
      <div className='bg-gray-200 h-23 flex items-center justify-evenly'>
        <button type='button' className='font-medium text-xl  w-23 p-2 bg-green-300 rounded-lg' onClick={logout}>Logout</button>
        <button type='button' className='font-medium text-xl  w-23 p-2 bg-green-300 rounded-lg'>Edit</button>
      </div>
    </div>
  )
}

// EmpDashboard component for employee dashboard

const EmpDashboard = () => {
  const [isopen, setIsopen] = useState(false)
  const name = JSON.parse(sessionStorage.getItem("name"));
  const result = name.split(".")[1];
  return (
    <div className='bg-[#F2F2F0] min-h-screen p-5 md:p-5 flex flex-col gap-3 relative '>
      {isopen && (<Profile />)}
      <header className='bg-[#FFFFFF] h-16 md:h-20 md:px-6 flex flex-row items-center justify-between gap-4  rounded-xl'>
        <span className='text-lg md:text-3xl from-mono shrink-0 bg-gray-200 p-2 px-10 rounded-xl'>Scratch</span>
        <div className='relative flex-1 max-w-md mx-auto hidden sm:block'>
          <input type='search' placeholder='Enter user id or name' className='bg-[#F2F2F0] h-14 w-full rounded-full md:text-xl font-medium pl-5 pr-11 text-sm outline-none focus:ring-2 focus:ring-gray-300 pl-10 md:pl-5' />
          <FaSearch className='absolute right-4 top-1/2  -translate-y-1/2 size-6 text-gray-400' text-sm />
        </div>
        <div className='flex items-center gap-3 md:gap-5 shrink-0'>
          <CgProfile className='text-4xl' onClick={() => { setIsopen(!isopen) }} />
        </div>
      </header>
      <div className="flex flex-row gap-3 md:gap-10 sm:5 items-center bg-white  rounded-xl p-1 pl-6">
        <span className='text-sm md:text-lg  shrink-0 font-medium '>{JSON.parse(sessionStorage.getItem('role'))} Dashboard</span>
        <span className='text-sm md:text-lg  shrink-0 font-medium'>Welcome back ,{result}</span>
      </div>
      <nav className='grid grid-rows-1 sm:grid-cols-3 gap-3'>
        <Link to="/empdashboard">
          <div className='bg-white rounded-2xl h-16 md:h-20 px-5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors'>
            <FaCalendarPlus className='text-2xl md:text-2xl shrink-0' />
            <span className='text-base md:text-2xl font-medium'>Leave Request</span>
          </div>
        </Link>
        <Link to="/empdashboard/leavehistory">
          <div className='bg-white rounded-2xl h-16 md:h-20 px-5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors'>
            <FaHistory className='text-2xl md:text-lg font-medium shrink-0' />
            <span className='text-base md:text-2xl font-medium '>Leave History</span>
          </div>
        </Link>
        <Link to="/empdashboard/adminupdates">
          <div className='bg-white rounded-2xl h-16 md:h-20 px-5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors'>
            <MdAdminPanelSettings className='text-2xl md:text-2xl font-medium shrink-0' />
            <span className='text-base md:text-2xl font-medium shrink-0'>Add Updates</span>
          </div>
        </Link>
      </nav>
      <main className=' rounded-2xl h-185 flex flex-col bg-[#E7E7E5] custom-scroll'>

        <Outlet />     

      </main>
    </div>
  )
}

export default EmpDashboard