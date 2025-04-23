import { BsArrowRight } from "react-icons/bs";
import { FaMessage } from "react-icons/fa6";
import MedicalExpertChat from "../../assets/Images/chat-medical-expert.jpg";
import { MdNetworkPing } from "react-icons/md";
import { FaPills, FaUser, FaUserMd, FaUserNurse } from "react-icons/fa";
import { Link } from "react-router-dom";
import useRole from "@/hooks/useRole";

const Chat = () => {
  const [role] = useRole();
  return (
    <div className="bg-[#F2F4F5] py-5 md:py-8 w-full rounded-md mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[30px] md:gap-[15px] md:px-8 px-5">
        <div className="w-full md:w-[55%]">
          <p className="py-1.5 px-4 text-[0.8rem] rounded-md bg-sky-600 text-white flex gap-2 items-center lg:w-[30%] w-1/2">
            <MdNetworkPing className="text-xl" />
            Build Communication
          </p>
          <h3 className="lg:text-3xl text-[1.4rem] font-bold flex gap-2 items-center text-gray-900 my-2">
            <span>Chat</span> <FaMessage className="text-teal-600 text-xl" />{" "}
            <span>& Get Extra Facilities</span>
          </h3>
          <p className="text-gray-700 mb-4 font-medium">
            {" "}
            Connect with <span className="font-semibold">doctors</span>,{" "}
            <span className="font-semibold">pharmacists</span>, and{" "}
            <span className="font-semibold">patients</span> in real time. Get
            instant health advice and manage appointments seamlessly.
          </p>

          <div className="flex gap-6 mt-4">
            <div className="flex flex-col items-center">
              <FaUserMd className="lg:text-3xl text-2xl text-yellow-300" />
              <span className="text-sm mt-1">Doctor</span>
            </div>
            <div className="flex flex-col items-center">
              <FaPills className="lg:text-3xl text-2xl text-pink-300" />
              <span className="text-sm mt-1">Pharmacist</span>
            </div>
            <div className="flex flex-col items-center">
              <FaUser className="lg:text-3xl text-2xl" />
              <span className="text-sm mt-1">Patient</span>
            </div>
          </div>
          <button className="mt-7 group w-max bg-[#4c61d5] text-white py-2.5 rounded-md hover:bg-[#4859b7] transition-all duration-300 px-8 justify-center font-semibold cursor-pointer">
            <Link
              to={`${
                role === "patient"
                  ? "/dashboard/patient/patient-chat"
                  : role === "doctor"
                  ? "/dashboard/doctor-chat"
                  : role === "pharmacist"
                  ? "/dashboard/pharmacist-chat"
                  : "/dashboard"
              }`}
              className="flex items-center gap-[10px]"
            >
              Explore Chat Dashboard
              <BsArrowRight className="group-hover:ml-1 transition-all duration-300" />
            </Link>
          </button>
        </div>
        <div className="w-full mx-auto md:w-[50%] md:h-80 h-60">
          <img
            alt="Image of Medical Expert"
            src={MedicalExpertChat}
            className="rounded-md object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
