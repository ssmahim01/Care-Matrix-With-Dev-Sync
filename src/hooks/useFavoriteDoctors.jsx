import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const useFavoriteDoctors = () => {
    const { user } = useSelector((state) => state.auth);
    const axiosSecure = useAxiosSecure()

    const { data: favoriteDoctors = [], refetch, isLoading } = useQuery({
      queryKey: "favorite-doctors",
      queryFn: async () => {
        const { data } = await axiosSecure.get(`favorite-doctors/${user?.email}`)
        // console.log("doctors from useDoctors ",data);
        return data;
      }
    })
  
    return [favoriteDoctors, refetch, isLoading ]
  };

export default useFavoriteDoctors;