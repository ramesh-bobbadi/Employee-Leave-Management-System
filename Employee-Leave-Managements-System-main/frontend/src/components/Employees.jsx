import React, { useEffect } from 'react'
import { CgProfile } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import axiosInstance from './Axios';

// Editemployee component for editing the employee data(partial update)

const Editemployee = ({empid}) => {
  console.log(empid)
  const[userdata,setUserdata] = useState(
    {
      "name":'',
      "email":'',
      "password":'',
      "role":''
    }
  )

  const changehadler = (e) =>setUserdata({...userdata,[e.target.name]:e.target.value})
  const submitHandler = async (e) => {
  e.preventDefault()
    try{
       const response = await axiosInstance.patch(`users/update/${empid}`,userdata)
       console.log(response.data)
       alert('successuflly sended')
    }
    catch(err){
      alert('failed to edit the user data')
      console.log(err)
    }
  }
  
  return(
    <div className='h-110 p-5'>
      <form className='flex flex-col items-center gap-2.5' onSubmit={submitHandler}>
        <input 
        type='text' 
        placeholder='Enter the name' className='w-[100%] bg-white p-4 rounded-lg text-lg font-mono'
        name='name'
        value={userdata.name}
        onChange={changehadler}
        />
        <input 
        type='email' 
        placeholder='Enter the email' className='w-[100%] bg-white p-4 rounded-lg text-lg font-mono '
        name='email'
        value={userdata.email}
        onChange={changehadler}
        />
        <input 
        type='password' 
        placeholder='Enter the password' className='w-[100%] bg-white p-4 rounded-lg text-lg font-mono'
        name='password'
        value={userdata.password}
        onChange={changehadler}
        />
        <input type='password' placeholder='Confirm the password' className='w-[100%] bg-white p-4'/>
        <select 
        className='w-[100%]  bg-white p-4 rounded-lg text-lg font-mono'
        name='role'
        value={userdata.role}
        onChange={changehadler}
        >
          <option>select role</option>
          <option value='employee'>employee</option>
          <option value='admin'>admin</option>
        </select>
        <button type='submit ' className='w-[100%] bg-white p-4 text-xl font-mono cursor-pointer'>Apply Changes</button>
      </form>
    </div>
  )
}


// EmpCard component for displaying the employee data 

const EmpCard = ({name,email,role,id,status}) => {
   const[iseditopen,setIseditopen] = useState(false)
   const[userstatus,setUserstatus] = useState()
   const submitstatus = async () => {
    try {
        const result = await axiosInstance.patch(`users/update-status-by/${id}`,{"is_active":userstatus})
        console.log(result.data)
        alert('update status successfully')
    }
    catch(err) {
       alert('failed to update status')
    }
   }
  return ( 
     <div className=' p-2 md:p-1 ' >
           <div className='flex  flex-row items-center justify-between bg-[#F9FAFB] p-5  gap-5 custom-scroll rounded-xl'>
              <div className='flex items-center justify-between gap-2 md:gap-5 shrink-0'>
              <CgProfile className='text-4xl md:text-2xl shrink-0 sm:text-2xl'/>
              <span className='font-medium sm:text-sm md:text-xl text-sm shrink-0 '>{name}</span>
              <span className='font-medium text-sm md:text-xl sm:text-sm shrink-0'>{id}</span>
              <span className='font-medium text-sm md:text-xl sm:text-sm shrink-0 hidden sm:inline '>{email}</span>
              <span className='font-medium text-sm md:text-xl sm:text-sm shrink-0'>{role}</span>
              </div>
              <div className='flex font-medium md:gap-3  md:text-xl sm:text-sm items-center'>
                  <FaEdit className='font-medium text-sm md:text-[26px] sm:text-sm shrink-0 cursor-pointer' onClick={() =>  setIseditopen(!iseditopen)}>edit</FaEdit>
                 {userstatus && <button className='bg-green-300 p-1 rounded-lg w-15' onClick={submitstatus}>click</button>}
                <select onChange={(e)=>setUserstatus(e.target.value)}>
                  <option>{status ? 'active':'deactive'}</option>
                  <option value='true'>Activate</option>
                  <option value='false'>Deactivate</option>
                </select>
              </div>
           </div>
          {iseditopen ? (<Editemployee empid={id}/>) : ''}
        </div>
  )
}

// Employees component for displaying the list of employees and their data (fetching from backend api)
const Employees = () => {
  const[employees,setEmployees] = useState([])
  const getemps = async () => {
    try {
       const response = await axiosInstance.get('users/get')
       setEmployees(response.data)
    }
    catch(err){
      console.log(err.message)
    }
  }
  useEffect(()=>{
    getemps()
  },[])
  return (
    <>
      {employees.map(data=><EmpCard key={data.id} name={data.name} email={data.email} id={data.id} role={data.role} status={data.is_active}/>)}
    </>
  )
}

export default Employees