import React from 'react'
import { MdSubject } from "react-icons/md"

// Addupdates component for adding new updates from admin to employees

const Addupdates = () => {
  return (
    <div className='flex flex-col gap-2 p-2'>
       <div className='h-20 bg-white p-5 flex items-center justify-center text-2xl font-medium rounded-xl'>
            <span>Add Update</span>
        </div>
        <div className='h-20 relative'>
           <MdSubject className='absolute left-5 top-1/2 -translate-y-1/2 text-2xl'/>
           <input type='text'  placeholder='enter the sub' className='bg-white h-20 w-[100%] pl-18 text-xl font-medium' />
        </div>
        <textarea className='bg-white p-10 text-xl font-medium ' rows={10} placeholder='Enter the message here'/>
        <div className='flex justify-center'>
          <button className='px-15 p-4 bg-white rounded-xl text-2xl font-medium'>Add Update</button>
        </div>
    </div>
  )
}

export default Addupdates