
import useMyAppointments from '@/hooks/useMyAppointments';
import React from 'react';

const MyAppointments = () => {
    const [appointments, refetch, isLoading] = useMyAppointments()
    console.log(appointments);

    return (
        <div>
            My appointments page {appointments?.length}
        </div>
    );
};

export default MyAppointments;