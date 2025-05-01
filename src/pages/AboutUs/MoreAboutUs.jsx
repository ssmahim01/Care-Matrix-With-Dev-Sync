import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Github, Linkedin } from "lucide-react"
const MoreAboutUs = () => {
  
  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Images */}
        <div className="relative">
          <img
            src="/Hospital Interior2.jpg"
            alt="Hospital"
            className="w-full object-cover rounded-xl shadow-lg"
          />
          <img
            src="/hospital bed.jpg"
            alt="Hospital bed"
            className="absolute bottom-4 left-4 w-20 h-20 sm:w-40 sm:h-40 object-cover rounded-lg shadow-md border-4 border-white"
          />
          <img
            src="/operaation theater.jpg"
            alt="Hospital operation theater"
            className="absolute bottom-4 right-4 w-20 h-20 sm:w-40 sm:h-40 object-cover rounded-lg shadow-md border-4 border-white"
          />
        </div>

        {/* Right Side - Text */}
        <div>
          <h4 className="text-[#0E82FD] font-semibold text-sm uppercase tracking-wider">
            More About Us
          </h4>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-4">
            We Are A Clinic,{" "}
            <span className="text-[#0E82FD]">Provide Excellence</span> In
            Personalized Care
          </h2>
          <p className="text-gray-600 mt-6">
            We are a private, independent practice constantly striving to
            provide excellence in personalized, compassionate care that is
            consistent, quality-driven and choice-conscious for all of our
            patients.
          </p>

          <div className="mt-6 flex items-center space-x-6">
            {/* Doctor Image */}
            <img
              src="/Doctor.jpg"
              alt="Doctor"
              className="w-28 h-28 rounded-xl object-cover shadow-lg"
            />
            {/* Right-side text */}
            <div>
              <p className="text-gray-700">
                We welcome advances in learning and technology in an effort to
                achieve efficient and quality-driven patient care.
              </p>
              <p className="mt-4 text-gray-700">
                Together, our team of doctors bring a broad spectrum of
                experience and continually undertake professional development to
                stay updated on the latest in medical treatment.
              </p>
            </div>
          </div>

          {/* Learn More Button */}
          <Link
            to="/contact-us"
            className="mt-8 inline-flex items-center text-[#0E82FD] font-medium hover:underline"
          >
            Learn More <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
      
    </section>
  );
};

export default MoreAboutUs;
