import React from "react";
import ClinicAndSpecialties from "../Home/Clinic_and_Specialties/ClinicAndSpecialties";
import BedPage from "../BedBooking/BedPage";

const Services = () => {
  return (
    <div className="mt-12 mb-12 min-h-screen mx-auto 
    //bg-gradient-to-b from-sky-50 to-white
    ">
      <ClinicAndSpecialties />
      <BedPage />
    </div>
  );
};

export default Services;
