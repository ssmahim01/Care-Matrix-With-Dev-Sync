import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useSelector } from 'react-redux';

const useAppointment = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useSelector((state) => state.auth);
    

   const {data:appointments=[], isPending, isLoading, refetch} = useQuery({
    queryKey: "appointments",
    queryFn: async ()=>{
        const {data} = await axiosSecure.get(`/appointments`)
        return data;
    }
   })

    return [appointments, refetch, isLoading]
};

export default useAppointment;