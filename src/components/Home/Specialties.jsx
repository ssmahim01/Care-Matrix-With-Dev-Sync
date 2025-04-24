import React, { useRef } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Brain, Eye, Bone, HeartPulse, FlaskConical, Baby, Sun, BrainCircuit, Ribbon } from "lucide-react";
import { FaBaby, FaTooth, FaXRay } from "react-icons/fa";
import OwlCarousel from "react-owl-carousel3";
import headerSvg from "../../assets/Images/header-icon.svg";
import { Link } from "react-router";

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
    const carouselRef = useRef(null);

    const goPrev = () => carouselRef.current?.prev();
    const goNext = () => carouselRef.current?.next();

    return (
        <motion.div
            className="relative text-center py-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {/* Section Header */}
            <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl lg:text-4xl relative font-bold flex items-center gap-2">
                    Specialities
                    <img className="absolute w-8 left-40 -top-1 lg:left-48" src={headerSvg} alt="" />
                </h2>

                {/* Nav Buttons */}
                <motion.div
                    className="flex items-center gap-3 bg-white shadow-md px-3 py-2 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <button onClick={goPrev} className="p-2 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition cursor-pointer">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={goNext} className="p-2 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition cursor-pointer">
                        <ChevronRight size={24} />
                    </button>
                </motion.div>
            </motion.div>

            {/* Carousel */}
            <OwlCarousel
                ref={carouselRef}
                className="owl-theme mt-6"
                loop
                margin={20}
                nav={false}
                responsive={{
                    0: { items: 2 },
                    600: { items: 3 },
                    1200: { items: 6 },
                }}
            >
                {specialtiesData.map((item, index) => (
                    <motion.div
                        key={index}
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
                ))}
            </OwlCarousel>
            {/* btn */}
            <motion.div
                className="flex justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
            >
                <Link to={"/services"}
                 className="mt-6 px-6 py-3 bg-[#0E82FD] text-white font-semibold rounded-md flex items-center gap-2  transition cursor-pointer relative overflow-hidden group">
                    <span className="absolute left-4 transition-all duration-300 group-hover:translate-x-[150px]">
                        ➜
                    </span>
                    <span className="relative transition-all group-hover:ml-0 ml-3 duration-300  group-hover:-translate-x-[10px]">
                        See All Specialities
                    </span>
                </Link>

            </motion.div>
        </motion.div>
    );
};

export default Specialties;
