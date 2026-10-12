import {Navigate,Outlet} from 'react-router-dom'

// ProtectedRoute component for protecting the routes based on the user role and authentication status

const ProtectedRoute = ({allowedRole}) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if(!user){
        return <Navigate to="/login" replace />
    }
    if (user.role !== allowedRole) {
        return <Navigate to='/login' replace />
    }
    return <Outlet/>;
}

export default ProtectedRoute