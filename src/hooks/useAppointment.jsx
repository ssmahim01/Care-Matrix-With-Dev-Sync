import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useSelector } from 'react-redux';

const useAppointment = (sortDate) => {
    console.log("sort date from ", sortDate);

    const axiosSecure = useAxiosSecure();
    const { user } = useSelector((state) => state.auth);

    const { data: appointments = [], isPending, isLoading, refetch } = useQuery({
        queryKey: ["appointments", sortDate],
        enabled: !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/appointments/${user?.email}?sort=${sortDate}`)
            return data;
        }
    })

    return [appointments, refetch, isLoading]
};

export default useAppointment;