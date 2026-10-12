import React from 'react'
import { CgProfile } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { useState } from 'react';
import axiosInstance from './Axios';
import { useEffect } from 'react';

// LeaveHistory component for displaying the leave history of the employee

const Card =({employee_id,leave_type,start_date,end_date,status})=>{
   const days = (new Date(end_date) - new Date(start_date)) / (1000*60*60*24) + 1;
   console.log(days)
  return(
     <div className=' p-2 flex flex-col'>
       <div className='flex  flex-row items-center justify-between bg-[#F9FAFB] p-5  gap-2 custom-scroll rounded-xl'>
          <div className='flex items-center justify-between gap-2 md:gap-5 shrink-0'>
          <CgProfile className='text-4xl md:text-2xl shrink-0 sm:text-2xl'/>
          <span className='font-medium sm:text-sm md:text-xl text-sm shrink-0 '>{employee_id}</span>
          <span className='font-medium text-sm md:text-xl sm:text-sm shrink-0'>{leave_type}</span>
          <span className='font-medium text-sm md:text-xl sm:text-sm shrink-0'>{start_date.split('T')[0]}</span>
          <span className='font-medium text-sm md:text-xl sm:text-sm shrink-0'>{end_date.split('T')[0]}</span>
          <span className='font-medium text-sm md:text-xl sm:text-sm shrink-0'>{days} days</span>
          <span className='font-medium text-sm md:text-xl sm:text-sm shrink-0'>{status}</span>
          </div>
          <div className='flex font-medium  gap-2 md:text-xl sm:text-sm'>
           {status === 'pending' && <MdDelete className='text-3xl shrink-0 sm:text-2xl'/>} 
          </div>
       </div>
    </div>
  )

}

const LeaveHistory = () => {
  const[leaveshistory,setLeaveshistory] = useState([])
   const id = localStorage.getItem('id')
    const getleaveshistory = async()=>{
    try{
      const response = await axiosInstance.get(`emp/get-requestsby/${id}`)
      setLeaveshistory(response.data)
      console.log(response.data)
    }catch(error){
      console.error('Error fetching leave history:', error)
    }
  }

  useEffect(()=>{
    getleaveshistory()
  },[])
  return (
    <>
      {leaveshistory.map(data => 
        <Card key={data.id} employee_id={data.employee_id}  leave_type={data.leave_type} start_date={data.start_date} end_date={data.end_date} status={data.status}/>)}
    </>
    
  )
}

export default LeaveHistory