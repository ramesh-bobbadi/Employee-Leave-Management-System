import React, { useState } from 'react'
import { MdSubject } from "react-icons/md"
import {FiUser} from "react-icons/fi"
import { FiMail } from 'react-icons/fi'
import { FiLock } from 'react-icons/fi'
import { FiEye } from 'react-icons/fi'
import { FaUserTie } from 'react-icons/fa'
import  axiosInstance from './Axios'


// Adduser componet for adding new user

const Adduser = () => { 

    const [newuser,setNewuser] = useState(
      {
         "name":"",
         "email":"",
         "password":"",
         "role":""
      }
    )
    const changehadler = (e)=>setNewuser({...newuser,[e.target.name]:e.target.value})
    const submitHandler = async (e)=>{
      e.preventDefault()
       try{
          const response = await axiosInstance.post('users/post',newuser)
          alert("new user created")
          console.log(response.data)
      }
      catch(err){
         alert("failed to create new user")
      }
      
    }

  return (
    <div>
       <form className='flex flex-col gap-2 p-2' onSubmit={submitHandler}>
             <div className='h-20 bg-white p-5 flex items-center justify-center text-2xl font-medium rounded-xl'>
                  <span>Add New User</span>
              </div>
              <div className='h-20 relative'>
                 <FiUser className='absolute left-5 top-1/2 -translate-y-1/2 text-2xl'/>
                 <input
                   type='text'
                   placeholder='Enter the name'
                   name='name'
                   value={newuser.name}
                   onChange={changehadler}
                   className='bg-white h-20 w-[100%] pl-18' />
              </div>
              <div className='h-20 relative'>
                 <FiMail className='absolute left-5 top-1/2 -translate-y-1/2 text-2xl'/>
                 <input 
                   type='email'  
                   placeholder='Enter the email' 
                   name='email'
                   value={newuser.email}
                   onChange={changehadler}
                   className='bg-white h-20 w-[100%] pl-18' />
              </div>
              <div className='h-20 relative'>
                 <FiLock className='absolute left-5 top-1/2 -translate-y-1/2 text-2xl'/>
                 <input 
                 type='password'  
                 placeholder='enter the password' 
                 name='password'
                 value={newuser.password}
                 onChange={changehadler}
                 className='bg-white h-20 w-[100%] pl-18' />
              </div>
               <div className='h-20 relative'>
                 <FiLock className='absolute left-5 top-1/2 -translate-y-1/2 text-2xl'/>
                 <input 
                 type='password'  
                 placeholder='confirm the password' 
                 className='bg-white h-20 w-[100%] pl-18' />
              </div>
              <div className='h-20 relative'>
                 <FaUserTie className='absolute left-5 top-1/2 -translate-y-1/2 text-2xl'/>
                 <select  
                 placeholder='enter the role' 
                 name='role'
                 value={newuser.role}
                 onChange={changehadler}
                 className='bg-white h-20 w-[100%] pl-18' >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                 </select>
              </div>
              <div className='flex justify-center'>
                <button className='px-15 p-4 bg-white' type='submit'>Add User</button>
              </div>
          </form>
    </div>
  )
}

export default Adduser