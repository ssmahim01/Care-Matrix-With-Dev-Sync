import DoctorCard from "@/components/DoctorCard";
import React, { useEffect, useState } from "react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("/doctors.json")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  return (
    <div>
      {/* section inner */}
      <div className="mx-auto px-4 py-10 md:py-14 lg:py-16">
        {/* section-header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wide">
            OUR{" "}
            <span className="text-[#0E82FD] tracking-wider underline underline-offset-4">
              EXPERT
            </span>{" "}
            DOCTORS
          </h1>
          <h3 className="text-lg md:text-xl text-[#464646] font-medium tracking-wider">
            Meet Our Skilled Team Committed to Providing Exceptional{" "}
            <br className="hidden md:block" /> Medical Care and Personalized
            Treatment.
          </h3>
        </div>
        {/* section-content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor}></DoctorCard>
          ))}
          {[...doctors].reverse().map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor}></DoctorCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
