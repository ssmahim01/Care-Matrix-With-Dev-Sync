import useAxiosSecure from './useAxiosSecure';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

const useMyAppointments = (sortDate) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useSelector((state) => state.auth);
  console.log("sortDate from useMyAppointment", sortDate);


  const {data:appointments=[], isLoading, refetch} = useQuery({
    queryKey:[ "appointments", sortDate],
    enabled: !!user,
    queryFn: async()=>{
        const {data} = await axiosSecure.get(`/appointments/patients/${user?.email}?sort=${sortDate}`)
        console.log(data);
        return data;
    }

  })


    return [appointments, refetch, isLoading]
};

export default useMyAppointments;