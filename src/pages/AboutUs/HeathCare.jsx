import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const HealthCare = () => {
  const items = [
    {
      title: "More Experience",
      description:
        "We offer a wide range of health services to meet all your needs.",
    },
    {
      title: "Seamless care",
      description:
        "We offer a wide range of health services to meet all your needs.",
    },
    {
      title: "The right answers?",
      description:
        "We offer a wide range of health services to meet all your needs.",
    },
    {
      title: "Unparalleled expertise",
      description:
        "We offer a wide range of health services to meet all your needs.",
    },
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-20 lg:pt-24">
      {/* Left Side: Text */}
      <div>
        <div className="text-white flex flex-col items-center">
          {/* title */}
          <h1 className="text-4xl font-bold text-black mb-10 text-center">
            Why <span className="text-[#0E82FD]">Choose Us</span> For Your{" "}
            <br /> Health <span className="text-[#0E82FD]">Care</span> Needs
          </h1>

          {/* items card  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-[#0E82FD] p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
              >
                <FaCheckCircle size={40} className="text-white mb-4" />
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right Side: Image */}
      <div className="relative">
        <img
          src="/Doctor care.jpg"
          alt="happy patient"
          className="rounded-lg h-full w-full shadow-lg object-cover"
        />

        {/* Top left section */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-green-100/20 p-2 sm:p-4 rounded-lg shadow-md backdrop-blur-md border border-white/30">
          <div className="border-2 rounded-lg border-white/40 p-2 sm:p-4 bg-white/10 backdrop-blur-sm">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              20+
            </p>
            <p className="text-gray-900 font-medium text-sm">
              Years <br /> Experience
            </p>
          </div>
        </div>

        {/* Bottom right section */}
        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-purple-100/20 p-2 sm:p-4 rounded-lg shadow-md backdrop-blur-md border border-white/30">
          <div className="border-2 rounded-lg border-white/40 p-2 sm:p-4 bg-white/10 backdrop-blur-sm">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              20+
            </p>
            <p className="text-gray-900 font-medium text-sm">
              Years <br /> Experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthCare;
