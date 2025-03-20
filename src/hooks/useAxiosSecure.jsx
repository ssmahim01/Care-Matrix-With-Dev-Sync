<<<<<<< HEAD
import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
})
const useAxiosSecure = () => {
    return axiosSecure;
=======
import { useAuthUser } from '@/redux/auth/authActions';
import axios from 'axios';
import React from 'react';

import { useNavigate } from 'react-router-dom';
const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
const useAxiosSecure = () => {
    const navigate = useNavigate()
    // const { logOut } = useAuthUser()

    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token')

        // console.log('request stopped by interceptors', token);
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, (error) => {
        return Promise.reject(error)
    })

    // //response interceptor
    // axiosSecure.interceptors.response.use((response) => {
    //     return response
    // }, async (error) => {
    //     const status = error.response.status

    //     // console.log('status error in the interceptors', status);
    //     if (status === 401 || status === 403) {
    //         await logOut()
    //         navigate('/login')
    //     }
    //     return Promise.reject(error)
    // })


    return axiosSecure
>>>>>>> 1751d8836a0ddadd0a0e124cc36d33c3b9686461
};

export default useAxiosSecure;