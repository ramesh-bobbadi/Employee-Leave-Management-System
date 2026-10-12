import axios from "axios"

// base url where backend server is running (port 5000)

const BASE_URL = 'http://localhost:5000/';
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    accept: 'application/json',
})

// interceptors to add the token to the request header ,later these checks will be done in backend midleware auth.js file (middleware function names :verification ,check_isactive)

axiosInstance.interceptors.request.use((config) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if(user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
})

export default axiosInstance;