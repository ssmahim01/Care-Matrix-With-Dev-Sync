import { FaCheckDouble } from "react-icons/fa";
import { Link } from "react-router";
const AboutUs = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Side: Text */}
      <div>
        <h4 className="text-blue-600 font-semibold uppercase">About CareMatrix</h4>
        <h2 className="text-2xl md:text-3xl lg:text-4xl  text-[#464646] mt-2 tracking-wide">
          We Provide <span className="text-[#0E82FD] font-bold tracking-wider underline underline-offset-4">Exceptional</span> Patient's
          <br /> <span className="font-bold">Care & Amenities</span>
        </h2>
        <p className="text-[#464646] mt-4">
          Embrace a world of comprehensive healthcare where your well-being
          takes center stage. At Meca, we're dedicated to providing you with
          personalized and compassionate medical services.
        </p>
        
        <div className="grid grid-cols-2 gap-4 mt-6 text-[#464646]">
          <p className="flex items-center gap-2 font-semibold">
          <FaCheckDouble className="text-[#0E82FD]" /> Seamless Care
          </p>
          <p className="flex items-center gap-2 font-semibold">
          <FaCheckDouble className="text-[#0E82FD]"/> Patient-Centered Care
          </p>
          <p className="flex items-center gap-2 font-semibold">
          <FaCheckDouble className="text-[#0E82FD]"/> Warm and Welcoming Environment
          </p>
          <p className="flex items-center gap-2 font-semibold">
          <FaCheckDouble className="text-[#0E82FD]"/> Personalized Approach
          </p>
          <p className="flex items-center gap-2 font-semibold">
          <FaCheckDouble className="text-[#0E82FD]"/> Comprehensive Care
          </p>
          <p className="flex items-center gap-2 font-semibold">
          <FaCheckDouble className="text-[#0E82FD]"/> Cutting-Edge Technology
          </p>
          <p className="flex items-center gap-2 font-semibold">
          <FaCheckDouble className="text-[#0E82FD]"/> Expert Doctors
          </p>
          <p className="flex items-center gap-2 font-semibold">
          <FaCheckDouble className="text-[#0E82FD]"/> Positive Reviews
          </p>
        </div>

      <Link to={"#"}> <button className="mt-6 px-3 py-2 sm:px-6 sm:py-3 bg-[#0E82FD]  text-white font-semibold rounded-lg flex items-center gap-2 hover:bg-[#0e81fdc6] transition">
          ➜ More About Us
        </button>
      </Link>
      </div>

      {/* Right Side: Image */}
      <div className="relative">
        <img
          src="/about-us.jpg"
          alt="happy patient"
          className="rounded-lg shadow-lg"
        />
        
      
      <div className="absolute top-2 sm:top-4 text-center right-2 sm:right-4  bg-purple-100 p-2 sm:p-4 rounded-lg shadow-md">
         <div className="border-2 rounded-lg border-white p-2 sm:p-4">
         <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">22+</p>
         <p className="text-gray-600 text-sm">Different <br /> Sections</p>
         </div>
        </div>
     

        <div className="absolute bottom-2 sm:bottom-4 text-center left-2 sm:left-4 bg-green-100 p-2 sm:p-4 rounded-lg shadow-md">
         <div className="border-2 rounded-lg border-white p-2 sm:p-4">
         <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">5K+</p>
         <p className="text-gray-600 text-sm">Patient's <br /> Reviews</p>
         </div>
        </div>
      </div>
    </div>
    );
};

export default AboutUs;