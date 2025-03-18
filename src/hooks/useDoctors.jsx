import React, { useEffect, useState } from 'react';

const useDoctors = () => {
    
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
      fetch("doctors.json")
        .then((res) => res.json())
        .then((data) => setDoctors(data));
    }, []);

    console.log(doctors);
    
    return [doctors]
};

export default useDoctors;