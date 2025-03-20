import SectionHeader from "@/shared/Section/SectionHeader";
import {
  FaBriefcaseMedical,
  FaBrain,
  FaHeart,
  FaMicroscope,
  FaEye,
  FaTooth,
  FaUserMd,
  FaNotesMedical,
} from "react-icons/fa";

const OurService = () => {
  const services = [
    {
      id: 1,
      name: "Pharmacology",
      icon: <FaBriefcaseMedical />,
      tips: "Advancing drug research and development for better treatments",
    },
    {
      id: 2,
      name: "Orthopedic",
      icon: <FaMicroscope />,
      tips: "Expert care for bone, joint, and muscle health",
    },
    {
      id: 3,
      name: "Hematology",
      icon: <FaHeart />,
      tips: "Comprehensive blood disorder diagnosis and treatment",
    },
    {
      id: 4,
      name: "Plastic Surgery",
      icon: <FaUserMd />,
      tips: "Enhancing aesthetics and reconstructive care",
    },
    {
      id: 5,
      name: "Neurology",
      icon: <FaBrain />,
      tips: "Cutting-edge solutions for brain and nervous system disorders",
    },
    {
      id: 6,
      name: "Ophthalmology",
      icon: <FaEye />,
      tips: "Innovative eye care for vision health",
    },
    {
      id: 7,
      name: "Dental Care",
      icon: <FaTooth />,
      tips: "Ensuring bright smiles with top-notch dental treatments",
    },
    {
      id: 8,
      name: "Cardiology",
      icon: <FaNotesMedical />,
      tips: "Heart health solutions from diagnosis to treatment",
    },
  ];

  return (
    <section>
      <div>
        {/* Section Heading */}
        <SectionHeader
          title_1st_slice={"OUR"}
          title_2nd_slice={"HIGH QUALITY"}
          title_3rd_slice={"SERVICES"}
          subTitle={
            "We are privileged to work with hundreds of future-thinking \n medical industries, ensuring the best services for patients."
          }
        />

        {/* Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative p-6 rounded-xl shadow-md transition bg-white text-[#464646] group overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition duration-500"
                style={{ backgroundImage: "url('/service.jpg')" }}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-3xl text-[#0E82FD] group-hover:text-white transition">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mt-4 group-hover:text-white transition">
                  {service.name}
                </h3>
                <p className="text-sm  opacity-75 mt-2 font-semibold group-hover:text-white transition">
                  {service.tips}
                </p>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0E82FD] opacity-0 group-hover:opacity-80 transition duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurService;
