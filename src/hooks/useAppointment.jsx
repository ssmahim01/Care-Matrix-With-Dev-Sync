import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useAppointment = () => {

    const axiosSecure = useAxiosSecure()

   const {data:appointments=[], isPending, isLoading} = useQuery({
    queryKey: "appointments",
    queryFn: async ()=>{
        const {data} = await axiosSecure.get('/appointments')
        return data;
    }
   })

    return [appointments]
};

export default useAppointment;