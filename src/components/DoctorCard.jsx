import React from "react";
import { Link, useLocation } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  
  return (
    <Link to={`/doctor-details/${doctor.id}`}
    state={doctor.id}
      className="relative w-full h-[400px] overflow-hidden rounded-lg group border border-border block"
    >
      <img
        className="w-full h-full object-cover"
        src={doctor.image}
        alt={doctor.name}
      />
      <div className="w-full flex items-center justify-center flex-col bg-white text-center p-4 absolute -bottom-0 md:-bottom-14 z-10 transition-all duration-300 group-hover:bottom-0">
        <h3 className="text-gray-600">{doctor.title}</h3>
        <h3 className="font-bold text-lg">{doctor.name}</h3>
        <button className="btn border-border border duration-500 w-full mt-2 hover:text-white hover:bg-[#0E82FD]">
          Book Appointment
        </button>
      </div>
    </Link>
  );
};

export default DoctorCard;
