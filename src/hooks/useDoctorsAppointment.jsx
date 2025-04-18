import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import useAxiosSecure from './useAxiosSecure';

const useDoctorsAppointment = (sortDate, search, category) => {
    const { user } = useSelector((state) => state.auth);
    const axiosSecure = useAxiosSecure()
    const {data: appointments=[], isLoading, refetch} = useQuery({
        queryKey: ['appointments', sortDate, search, category],
        enabled: !!user,
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/appointments/doctors/${user.email}?sort=${sortDate}&search=${search}&category=${category}`)
            return data;
        }
    })
    return [appointments, isLoading, refetch]
};

export default useDoctorsAppointment;