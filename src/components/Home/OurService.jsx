import { 
    FaBriefcaseMedical, 
    FaBrain, 
    FaHeart, 
    FaMicroscope, 
    FaEye, 
    FaTooth, 
    FaUserMd, 
    FaNotesMedical 
} from "react-icons/fa";

const OurService = () => {
    const services = [
        { id: 1, name: "Pharmacology", icon: <FaBriefcaseMedical /> },
        { id: 2, name: "Orthopedic", icon: <FaMicroscope /> },
        { id: 3, name: "Hematology", icon: <FaHeart /> },
        { id: 4, name: "Plastic Surgery", icon: <FaUserMd /> },
        { id: 5, name: "Neurology", icon: <FaBrain /> },
        { id: 6, name: "Ophthalmology", icon: <FaEye /> },
        { id: 7, name: "Dental Care", icon: <FaTooth /> },
        { id: 8, name: "Cardiology", icon: <FaNotesMedical /> },
    ];

    return (
        <section className="">
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                <div className="text-center space-y-4">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wide">
                        OUR{" "}
                        <span className="text-[#0E82FD] tracking-wider underline underline-offset-4">
                            HIGH QUALITY
                        </span>{" "}
                        SERVICES
                    </h1>
                    <h3 className="text-lg md:text-xl text-[#464646] font-medium tracking-wider">
                        We are privileged to work with hundreds of{" "}
                        <br className="hidden md:block" />
                        future-thinking medical industries, ensuring the best services for patients.
                    </h3>
                </div>

                {/* Service Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="relative p-6 rounded-xl shadow-md transition bg-white text-gray-900 group overflow-hidden"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition duration-500"
                                style={{ backgroundImage: "url('/service.jpg')" }}>
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="text-3xl text-[#0E82FD] group-hover:text-white transition">{service.icon}</div>
                                <h3 className="text-xl font-bold mt-4 group-hover:text-white transition">{service.name}</h3>
                                <p className="text-sm  opacity-75 mt-2 font-semibold group-hover:text-white transition">
                                    Medical competitor research startup to financial
                                </p>
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-80 transition duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurService;
