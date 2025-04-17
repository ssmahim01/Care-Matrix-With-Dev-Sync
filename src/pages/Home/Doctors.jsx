import DoctorCard from "@/components/DoctorCard";
import useDoctors from "@/hooks/useDoctors";
import SectionHeader from "@/shared/Section/SectionHeader";
import { easeIn, motion } from "framer-motion";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Doctors = () => {
  const [doctors] = useDoctors();

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1026,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: easeIn }}
      >
        {/* section inner */}
        <div className="mx-auto px-4 py-10 md:py-14 lg:py-16">
          {/* section-header */}
          <SectionHeader
            title_1st_slice={"OUR"}
            title_2nd_slice={"EXPERT"}
            title_3rd_slice={"DOCTORS"}
            subTitle={
              "  Meet our highly skilled team of expert doctors, dedicated to \n providing top-quality medical care with a personalized approach to ensure your well-being."
            }
          />
          {/* section-content */}
          <div className="mt-6 w-11/12 md:w-full mx-auto">
            <Slider {...settings}>
              {doctors?.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor}></DoctorCard>
              ))}
            </Slider>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Doctors;
