import expertDoctors from "../../assets/Images/expert-doctors.png";
import HeroBG from "../../assets/Images/hero-bg.jpg";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";


const Hero = () => {
  return (
    <div className="w-full mx-auto bg-cover bg-center  bg-no-repeat" style={{
      backgroundImage: `url('${HeroBG}')`
    }}>
      <div className="lg:w-10/12 px-6 py-6 flex flex-col lg:flex-row items-center justify-between lg:gap-12  mx-auto">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="lg:w-1/2 md:space-y-4 space-y-2 lg:py-0 md:pt-8 pt-6">
          <h2 className="md:text-4xl xl:text-5xl text-3xl font-bold text-white/90">
            Streamline Healthcare Management
            <br className="md:block hidden" />
            With Care Matrix
          </h2>

          <p className="lg:text-base text-sm font-medium text-white/70 pb-5">
            Empower your hospital with an all-in-one management system. From
            patient appointments to medical records and staff coordination, Care
            Matrix ensures efficiency, accuracy, and seamless healthcare
            operations. Experience the future of hospital management today!
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white/80 p-2 rounded-lg shadow-md flex items-center space-x-2">
            <FaSearch className="text-gray-500 mx-2" />
            <input
              type="text"
              placeholder="Search appointments..."
              className="flex-grow outline-none p-2"
            />
            <button className="btn bg-cyan-600 text-white px-4 py-2 rounded-md font-bold">
              Search
            </button>
          </motion.div>
        </motion.div>

        {/* Right Image Content */}
        <motion.figure
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="lg:relative lg:w-1/2 lg:h-[460px] md:h-96 h-72">
          <img
            src={expertDoctors}
            alt="Doctors"
            className="lg:absolute lg:top-6 lg:mt-0 mt-6 w-full h-full object-cover object-top overflow-x-visible"
            referrerPolicy="no-referrer"
          />
        </motion.figure>
      </div>
    </div>
  );
};

export default Hero;
