import useAxiosSecure from './useAxiosSecure';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

const useMyAppointments = (sortDate, search, category) => {
  const axiosSecure = useAxiosSecure();

  console.log("search ", search);
  console.log("category ", category);
  const { user } = useSelector((state) => state.auth);
  // console.log("sortDate from useMyAppointment", sortDate);


  const {data:appointments=[], isLoading, refetch} = useQuery({
    queryKey:[ "appointments", sortDate, search, category],
    enabled: !!user,
    queryFn: async()=>{
        const {data} = await axiosSecure.get(`/appointments/patients/${user?.email}?sort=${sortDate}&search=${search}&category=${category}`)
        // console.log(data);
        return data;
    }

  })


    return [appointments, refetch, isLoading]
};

export default useMyAppointments;