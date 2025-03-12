import DoctorCard from '@/components/DoctorCard';
import React, { useEffect, useState } from 'react';

const Doctors = () => {
    const [doctors, setDoctors] = useState([])

    useEffect(()=>{
       fetch('/doctors.json')
       .then(res => res.json())
       .then(data => setDoctors(data))
    }, [])

    return (
        <div className='bg-slate-100 '>

            {/* section inner */}

            <div className='container mx-auto px-4 py-10 md:py-14 lg:py-16'>
                {/* section-header */}
                <div className="text-center ">
                    <h3 className='font-bold text-sm text-blue-800'>Doctors</h3>
                    <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold'>OUR EXPERT DOCTORS</h2>

                </div>
                {/* section-content */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
                    {
                        doctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor}></DoctorCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Doctors;