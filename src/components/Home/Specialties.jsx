import { motion } from "framer-motion";

import {
    Baby,
    Bone,
    Brain,
    BrainCircuit,
    ChevronLeft,
    ChevronRight,
    Eye,
    FlaskConical,
    HeartPulse,
    Ribbon,
    Sun,
} from "lucide-react";

import React, { useRef } from "react";
import { FaBaby, FaTooth, FaXRay } from "react-icons/fa";

import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import headerSvg from "../../assets/Images/header-icon.svg";

import "swiper/css";
import "swiper/css/navigation";

const specialtiesData = [
  { name: "Neurology", icon: <Brain size={40} /> },
  { name: "Ophthalmology", icon: <Eye size={40} /> },
  { name: "Orthopedic", icon: <Bone size={40} /> },
  { name: "Cardiologist", icon: <HeartPulse size={40} /> },
  { name: "Dentist", icon: <FaTooth size={40} /> },
  { name: "Laboratory", icon: <FlaskConical size={40} /> },
  { name: "Pediatrics", icon: <Baby size={40} /> },
  { name: "Radiology", icon: <FaXRay size={40} /> },
  { name: "Dermatology", icon: <Sun size={40} /> },
  { name: "Psychiatry", icon: <BrainCircuit size={40} /> },
  { name: "Oncology", icon: <Ribbon size={40} /> },
  { name: "Gynecology", icon: <FaBaby size={40} /> },
];

const Specialties = () => {
  const swiperRef = useRef(null);

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  return (
    <motion.div
      className="relative text-center py-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl lg:text-4xl relative font-bold flex items-center gap-2">
          Specialities
          <img
            className="absolute w-8 left-40 -top-1 lg:left-48"
            src={headerSvg}
            alt=""
          />
        </h2>

        {/* Nav Buttons */}
        <motion.div
          className="flex items-center gap-3 bg-white shadow-md px-3 py-2 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button
            onClick={goPrev}
            className="p-2 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goNext}
            className="p-2 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>
      </motion.div>

      {/* Swiper Carousel */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          600: { slidesPerView: 3 },
          1200: { slidesPerView: 6 },
        }}
        className="mt-6"
      >
        {specialtiesData.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="flex flex-col items-center w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white border rounded-lg p-6 shadow-sm transition-all duration-500 hover:border-blue-500 group cursor-pointer w-full">
                <motion.div
                  className="rounded-full p-4 text-blue-500 bg-gray-100 inline-block transition-all duration-500 group-hover:bg-blue-500 group-hover:text-white group-hover:rotate-[360deg]"
                  whileHover={{ transition: { duration: 0.6 } }}
                >
                  {item.icon}
                </motion.div>
                <p className="mt-4 font-semibold">{item.name}</p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* See All Specialities Button */}
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <Link
          to="/services"
          className="mt-6 px-6 py-3 bg-[#0E82FD] text-white font-semibold rounded-md flex items-center gap-2 transition cursor-pointer relative overflow-hidden group"
        >
          <span className="absolute left-4 transition-all duration-300 group-hover:translate-x-[150px]">
            ➜
          </span>
          <span className="relative transition-all group-hover:ml-0 ml-3 duration-300 group-hover:-translate-x-[10px]">
            See All Specialities
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Specialties;
