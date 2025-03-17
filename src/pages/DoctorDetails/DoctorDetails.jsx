import useDoctors from '@/hooks/useDoctors';
import React from 'react';

const DoctorDetails = () => {

    const [doctors] = useDoctors()

    return (
        <div className='mt-24'>
            Doctors details page: {doctors.length}
        </div>
    );
};

export default DoctorDetails;