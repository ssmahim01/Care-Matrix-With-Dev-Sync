import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useDoctors = () => {
  const axiosSecure = useAxiosSecure()
    
   const {data:doctors=[], isPending, isLoading} = useQuery({
    queryKey: "doctors",
    queryFn: async()=>{
      const {data} = await axiosSecure.get('/dashboard/administrator/doctors')
      console.log("doctors from useDoctors ",data);
      return data;
    } 
   })
    
    return [doctors]
};

export default useDoctors;