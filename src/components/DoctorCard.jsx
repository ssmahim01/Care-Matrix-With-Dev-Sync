import React from "react";
import { Link } from "react-router";

const DoctorCard = ({ doctor }) => {
  return (
    <Link className="relative h-[300px] overflow-hidden rounded group border border-border">
      <img
        className="w-full h-full object-cover"
        src={doctor.image}
        alt={doctor.name}
      />
      <div className="w-full bg-white text-center p-4 absolute top-56 z-10 transition-all duration-300 group-hover:top-44">
        <h3 className="text-gray-600">{doctor.title}</h3>
        <h3 className="font-bold text-lg">{doctor.name}</h3>
        <button className="btn border-border border duration-500 w-full mt-2">
          Book Appointment
        </button>
      </div>
    </Link>
  );
};

export default DoctorCard;
