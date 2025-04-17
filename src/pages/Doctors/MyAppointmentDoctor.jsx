import useDoctorsAppointment from '@/hooks/useDoctorsAppointment';
import React from 'react';

const MyAppointmentDoctor = () => {
    const [appointments, isLoading, refetch] = useDoctorsAppointment()

    console.log("Doctors appointments are ", appointments);
    return (
        <div>
            My appointments are hen ten : {appointments.length} 
        </div>
    );
};

export default MyAppointmentDoctor;