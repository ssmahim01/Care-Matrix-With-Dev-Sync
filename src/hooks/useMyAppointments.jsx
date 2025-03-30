import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

const useMyAppointments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useSelector((state) => state.auth);

  const {data:appointments=[], isLoading, refetch} = useQuery({
    queryKey: "appointments",
    queryFn: async()=>{
        const {data} = await axiosSecure.get(`/appointments/patients/${user?.email}`)
        return data;
    }

  })

    return [appointments, isLoading, refetch]
};

export default useMyAppointments;