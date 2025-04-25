import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

const useRewardUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useSelector((state) => state.auth);
    
    const {data:rewardUser=[], isPending, isLoading, refetch} = useQuery({
        queryKey: ["rewardUser"],
        enabled: !!user,
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/reward-users/${user?.email}`)
            return data;
        }
    }) 

    return [rewardUser, isPending, isLoading, refetch]

};

export default useRewardUsers;