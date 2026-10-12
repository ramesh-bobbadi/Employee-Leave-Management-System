import React from 'react'
import axiosInstance from './Axios';
import { useState } from 'react';

// LeaveRequest component for submitting the leave request by employee

const LeaveRequest = () => {
  const [leaveRequest, setLeaveRequest] = React.useState({
    employee_id: '',
    leave_type: '',
    start_date: '',
    end_date: '',
    start_session: '',
    end_session: '',
    reason: '',
  })
  const handleChange = (e) =>setLeaveRequest({ ...leaveRequest, [e.target.name]: e.target.value })
  const handleSubmit = (e)=>{
    e.preventDefault()
    try{
      const response = axiosInstance.post('emp/post-request',leaveRequest)
      alert('leave request send successfully')
    } catch (error) {
      console.error("Error submitting leave request:", error)
      alert("Failed to submit leave request")
    }
  }
  return (
    <div className='h-scree flex flex-col gap-5 p-5 md:p-15'>
        <div className='h-20 bg-white p-5 flex items-center justify-center text-2xl font-medium rounded-xl'>
            <span>Leave Reaquest Form</span>
        </div>
        <form className='flex md:flex-row gap-5 sm:flex-col flex-wrap' onSubmit={handleSubmit}>
          <div className='flex flex-col flex-1 gap-5'>
            <input 
            placeholder='Enter the emp id' 
            type='number' 
            name='employee_id'
            value={leaveRequest.employee_id}
            onChange={handleChange}
            className='p-5 bg-white text-xl font-medium rounded-xl'/>
            <select 
            name='leave_type'
            value={leaveRequest.leave_type}
            onChange={handleChange}
            className='p-5 bg-white text-xl font-medium rounded-xl'>
                <option value="sick">Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="paid">Paid Leave</option>
                <option value="personal">Personal Leave</option>
            </select>
            <input 
            placeholder='Start Date' 
            type='date' 
            name='start_date'
            value={leaveRequest.start_date}
            onChange={handleChange}
            className='p-5 bg-white text-xl font-medium rounded-xl'/>
            <input 
            placeholder='End Date' 
            type='date' 
            name='end_date'
            value={leaveRequest.end_date}
            onChange={handleChange}
            className='p-5 bg-white text-xl font-medium rounded-xl'/>
          </div>
          <div className='flex flex-col flex-1 gap-5'>
            <select 
            name='start_session'
            value={leaveRequest.start_session}
            onChange={handleChange}
            className='p-5 bg-white text-xl font-medium rounded-xl' >
                <option value="Start session">Start session</option>
                <option value="first_half">First Half</option>
                <option value="second_half">Second Half</option>
            </select>
            <select 
            name='end_session'
            value={leaveRequest.end_session}
            onChange={handleChange}
            className='p-5 bg-white text-xl font-medium rounded-xl'>
                <option value="End session">End session</option>
                <option value="first_half">First Half</option>
                <option value="second_half">Second Half</option>
            </select>
            <textarea 
            maxLength={500}
            placeholder='Reason for Leave' 
            rows="1" 
            name='reason'
            value={leaveRequest.reason}
            onChange={handleChange}
            className='p-5 bg-white text-xl  font-medium rounded-xl ' />
            <button type='submit' className='p-5 bg-[#2C3E50] text-white text-2xl font-medium rounded-xl'>Apply Leave</button>
          </div>
        </form>
    </div>
  )
}

export default LeaveRequest