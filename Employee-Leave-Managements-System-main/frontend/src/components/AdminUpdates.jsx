import React from 'react'
import { CgProfile } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { useState } from 'react';

// UpdateCard component for displaying the updates from admin to employees

const UpdateCard = () => {
  const [opencomment,setOpencomment] = useState(false)
  return (
     <div className='flex-1 p-3 md:p-2 '>
           <div className='flex  flex-row items-center justify-between bg-[#F9FAFB] p-5  gap-5 custom-scroll rounded-xl'>
              <div className='flex items-center justify-between gap-2 md:gap-5 shrink-0'>
              <CgProfile className='text-4xl md:text-2xl shrink-0 sm:text-2xl'/>
              <span className='font-medium sm:text-sm md:text-xl text-sm shrink-0 '>Bobbadi Ramesh</span>
              <span className='font-medium sm:text-sm md:text-xl text-sm shrink-0 '>The people hr portal is updated go and check it.</span>
              </div>
              <div className='flex font-medium  gap-2 md:text-xl sm:text-sm'>
                  <button type='button' className='bg-green-300 p-2 rounded-xl shrink-0'>Read More</button>
              </div>
           </div>
        </div>
  )
}
const AdminUpdates = () => {
  return (
        <UpdateCard/>
  )
}

export default AdminUpdates