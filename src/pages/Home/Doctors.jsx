import DoctorCard from "@/components/DoctorCard";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    fetch("/doctors.json")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

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
          <p className="text-[#464646] font-medium tracking-wider">

            Meet our highly skilled team of expert  {" "}
            <br className="hidden md:block" /> doctors, dedicated to providing top-quality medical care with a personalized approach to ensure your well-being.
          </p>
        </div>
        {/* section-content */}

        <div className="mt-6 w-11/12 md:w-full mx-auto">
        <Slider {...settings}>
      {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor}></DoctorCard>
          ))}
    </Slider>
        </div>


      </div>
    </div>
  );
};

export default Doctors;