import DoctorCard from "@/components/DoctorCard";
import SectionHeader from "@/shared/Section/SectionHeader";
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
        {/* section-header */}{" "}
        <SectionHeader
          title_1st_slice={"OUR"}
          title_2nd_slice={"EXPERT"}
          title_3rd_slice={"DOCTORS"}
          subTitle={
            "Meet Our Skilled Team Committed to Providing Exceptional \n Medical Care and Personalized Treatment."
          }
        />
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
