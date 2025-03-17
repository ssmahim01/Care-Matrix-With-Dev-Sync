import React, { useEffect, useState } from 'react';

const useDoctors = () => {
    
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
      fetch("/doctors.json")
        .then((res) => res.json())
        .then((data) => setDoctors(data));
    }, []);
    
    return [doctors]
};

export default useDoctors;