import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import AdminDashboard from './components/AdminDashboard'
import EmpDashboard from './components/EmpDashboard'
import Login from './components/Login'
import LeaveRequest from './components/LeaveRequest'
import LeaveHistory from './components/LeaveHistory'
import AdminUpdates from './components/AdminUpdates'
import ProtectedRoute from './components/ProtectedRoute'
import Addupdates from './components/Addupdates'
import EmpLRequest from './components/EmpLRequest'
import Employees from './components/Employees'
import Adduser from './components/Adduser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<ProtectedRoute allowedRole="admin"/>}>
      <Route path='/admin' element={<AdminDashboard/>}>
      <Route path='' element={<Employees/>}/>
      <Route path='emp-leave-request' element={<EmpLRequest/>}/>
      <Route path='addupdates' element={<Addupdates/>}/>
      <Route path='adduser' element={<Adduser/>}/>
      </Route>
      </Route>
      <Route path="/login" element={<Login/>} />
       <Route  element={<ProtectedRoute allowedRole="employee"/>}>
        <Route path="/empdashboard" element={<EmpDashboard/>}>
          <Route path="" element={<LeaveRequest />} />
          <Route path="leavehistory" element={<LeaveHistory />} />
          <Route path="adminupdates" element={<AdminUpdates />} />
          </Route>
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
