import React, { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import axiosInstance from './Axios';
import { MdOutlineAddComment } from "react-icons/md";

// LeavesCard component for displaying the leave requests from employees to admin

const LeavesCard = ({name,employee_id,leave_type,start_date,end_date,status,onClick,id,reason}) => {
  const days = (new Date(end_date) - new Date(start_date)) / (1000*60*60*24) + 1;
  const[isreason,setIsreason] = useState(false)
  const[selected,setSelected] = useState(false)
  const[commentopen,setCommentopen] = useState(false)
  const[addcomment,setAddcomment] = useState(
    {
    'status':'',
    'admin_comments':''
    }
  )
  const changehandler = (e)=>setAddcomment({...addcomment,[e.target.name]:e.target.value})
  const handleleavestatus = async () => {
    try {
        const response = await axiosInstance.patch(`emp/update-leave-status/${id}`,addcomment)
        alert('leave status send successfully')
    }
    catch(err){
      alert('failed to send leave status')
    }
  }
  const[isclick,setIsclick] = useState(false)
  return(
        <div className=' p-2 md:p-1 cursor-pointer '  >
              <div className='flex flex-row items-center justify-between bg-[#F9FAFB] p-5  gap-5 custom-scroll rounded-xl'>
                 <div className='flex items-center justify-between gap-2 md:gap-5 shrink-0' onClick={()=>setIsreason(!isreason)}>
                 <CgProfile className='text-4xl md:text-2xl shrink-0 sm:text-2xl'/>
                 <span className='font-medium sm:text-sm md:text-xl text-sm shrink-0 '>{name}</span>
                 <span className='font-medium sm:text-sm md:text-xl text-sm shrink-0 '>{employee_id}</span>
                 <span className='font-medium text-sm md:text-xl sm:text-sm shrink-0'>{leave_type}</span>
                 <span className='font-medium text-sm md:text-xl sm:text-sm shrink-0'>{start_date.split('T')[0]}</span>
                 <span className='font-medium text-sm md:text-xl sm:text-sm shrink-0'>{end_date.split('T')[0]}</span>
                 <span className='font-medium text-sm md:text-xl sm:text-sm shrink-0'>{days} days</span>
                 </div>
                 <div className='flex font-medium  gap-2 md:text-xl sm:text-sm' onClick={()=>setSelected(true)}>
                  {selected && <button className='bg-green-300 p-1 w-15 rounded-lg' type='button' onClick={handleleavestatus}>click</button>}
                     <select name='status' value={addcomment.status} onChange={changehandler}>
                       <option value={status} >
                         {status}
                       </option>
                       <option value='pending'>pending</option>
                       <option value="rejected" >reject</option>
                       <option value="approved">approve</option>
                     </select>
                   <MdOutlineAddComment className='text-3xl shrink-0 sm:text-2xl ' onClick={()=>setCommentopen(!commentopen)} />
                 </div>
              </div>
              <div className='flexflex-col flex-1'>
                {isreason && <div className='font-medium text-xl h-20 p-1  text-blue-500'><b className='text-green-600 '>Reason</b>: {reason}</div>}

                { commentopen && (<div className='font-medium text-xl h-25 p-1 text-black font-medium '>
                  <textarea 
                  name='admin_comments'
                  value={addcomment.admin_comments}
                  onChange={changehandler}
                  maxLength={500} 
                  rows={3} 
                  className='w-[100%] bg-gray-300 pl-5  ' placeholder='Enter the comment here :'>
                  </textarea>
                  </div>)}
              </div>
              
           </div>
  )

}


const EmpLRequest = () => {
  const[leaverequests,setLeaverequests] = useState([])
  const getrequests = async ()=>{
    const response = await axiosInstance.get('emp/get-requests')
    setLeaverequests(response.data)
  }
  useEffect(()=>{
    getrequests()
  },[])

  return (
    <>
    {leaverequests.map(data=><LeavesCard key={data.id} name={data.name} employee_id={data.employee_id} leave_type={data.leave_type} start_date={data.start_date} end_date={data.end_date} status={data.status}   id={data.id} reason={data.reason}/>)} 
    </>
  )
}

export default EmpLRequest