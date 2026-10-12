import React from 'react'
import { Profile } from './EmpDashboard'
import { CgProfile } from "react-icons/cg";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaCalendarPlus } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link, Outlet } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { useState } from 'react';
import { MdAddCircleOutline } from "react-icons/md";


// AdminDashboard component for admin dashboard

const AdminDashboard = () => {
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
        <div className='flex items-center gap-4 md:gap-6 shrink-0' >
          <Link to="/admin/adduser">
            <div className='flex items-center gap-2'><MdAddCircleOutline className='text-2xl' />
              <span className='text-xl font-medium'>Add</span>
            </div>
          </Link>
          <CgProfile className='text-4xl' onClick={() => { setIsopen(!isopen) }} />
        </div>
      </header>
      <div className="flex flex-row gap-3 md:gap-10 sm:5 items-center bg-white p-1 rounded-xl p-1 pl-6">
        <span className='text-sm md:text-lg  shrink-0 font-medium'>{JSON.parse(sessionStorage.getItem('role'))} Dashboard</span>
        <span className='text-sm md:text-lg  shrink-0 font-medium sm:text-sm'>Welcome back ,{result}</span>
      </div>
      <nav className='grid grid-rows-1 sm:grid-cols-3 gap-3'>
        <Link to="/admin">
          <div className='bg-white rounded-2xl h-16 md:h-20 px-5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors'>
            <FaCalendarPlus className='text-2xl md:text-2xl shrink-0' />
            <span className='text-base md:text-2xl font-medium'>Employees</span>
          </div>
        </Link>
        <Link to="/admin/emp-leave-request">
          <div className='bg-white rounded-2xl h-16 md:h-20 px-5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors'>
            <FaHistory className='text-2xl md:text-lg font-medium shrink-0' />
            <span className='text-base md:text-2xl font-medium shrink-0 '>Leave Requests</span>
          </div>
        </Link>
        <Link to="/admin/addupdates">
          <div className='bg-white rounded-2xl h-16 md:h-20 px-5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors'>
            <MdAdminPanelSettings className='text-2xl md:text-2xl font-medium shrink-0' />
            <span className='text-base md:text-2xl font-medium shrink-0'>Add updates</span>
          </div>
        </Link>
      </nav>
      <main className=' rounded-2xl h-185 flex flex-col bg-[#E7E7E5] custom-scroll'>

        <Outlet />  

      </main>
    </div>
  )
}

export default AdminDashboard