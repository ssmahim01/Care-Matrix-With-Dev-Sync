import { Search, UserCheck, CalendarCheck, HeartPulse } from "lucide-react";

const HowItWorks = () => {
  const services = [
    {
      icon: <Search size={60} className="text-[#0E82FD]" />,
      title: "Search Doctor",
      description:
        "Search for a doctor based on specialization, location, or availability.",
    },
    {
      icon: <UserCheck size={60} className="text-[#0E82FD]" />,
      title: "Check Doctor Profile",
      description:
        "Explore detailed doctor profiles on our platform to make informed healthcare decisions.",
    },
    {
      icon: <CalendarCheck size={60} className="text-[#0E82FD]" />,
      title: "Schedule Appointment",
      description:
        "Choose your preferred doctor, select a convenient time slot, & confirm your appointment.",
    },
    {
      icon: <HeartPulse size={60} className="text-[#0E82FD]" />,
      title: "Get Your Solution",
      description:
        "Discuss your health concerns with the doctor and receive personalized advice & solutions.",
    },
  ];

  return (
    <div className="flex items-center gap-6 flex-col lg:flex-row justify-center">
      {/* Right Side */}
      <div className="w-full lg:w-4/12">
        {/* Section Heading */}
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold tracking-wide">
            HOW{" "}
            <span className="text-[#0E82FD] tracking-wider underline underline-offset-4">
              IT
            </span>{" "}
            WORKS
          </h1>
          <h3 className="text-lg text-[#464646] font-medium tracking-wider">
            4 easy steps to get your solution
          </h3>
        </div>
        {/* Image */}
        <div className="mt-6">
          <img
            src="https://i.ibb.co.com/FkCJb5PS/doctor-Image-removebg-preview.png"
            alt="doctor_image"
            className="w-full h-full max-h-[520px]"
          />
        </div>
      </div>
      {/* Left Side */}
      <div className="lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-8/12">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white grid h-full place-content-stretch w-full shadow-sm border border-border rounded p-4"
          >
            <div>{service.icon}</div>
            <h3 className="text-xl font-bold mt-2 tracking-wider">
              {service.title}
            </h3>
            <p className="text-gray-600 mt-2 whitespace-pre-line font-semibold">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
