import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import useAxiosSecure from './useAxiosSecure';

const useDoctorsAppointment = (sortDate) => {
    const { user } = useSelector((state) => state.auth);
    const axiosSecure = useAxiosSecure()
    const {data: appointments=[], isLoading, refetch} = useQuery({
        queryKey: ['appointments', sortDate],
        enabled: !!user,
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/appointments/doctors/${user.email}?sort=${sortDate}`)
            return data;
        }
    })
    return [appointments, isLoading, refetch]
};

export default useDoctorsAppointment;