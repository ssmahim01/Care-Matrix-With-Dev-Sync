import SectionHeader from "@/shared/Section/SectionHeader";
import { MdOutlineCall, MdOutlineEmail } from "react-icons/md";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { CgFacebook } from "react-icons/cg";

const ContactUs = () => {
  return (
    <div className="py-24 w-11/12 md:w-10/12 mx-auto max-w-screen-2xl">
      <SectionHeader
        title_1st_slice={"Our"}
        title_2nd_slice={"Contact"}
        title_3rd_slice={"Information"}
        subTitle={
          "Great doctor if you need your family member to get effective immediate assistance, \n emergency treatment, or simple consultation."
        }
      />
      {/* Contact Us Form */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-[35px] boxShadow p-[30px] rounded-xl">
        {/*  information  */}
        <aside className="w-full bg-[#0E82FD] flex flex-col justify-between p-[25px] rounded-md">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-white border-b-2 w-fit">
              Contact Us
            </h1>
            <p className="mt-2 text-xs font-medium text-white">
              We’re here to help you with any questions or concerns regarding
              our hospital services. Whether you need assistance with
              appointments, medical records, or general inquiries, our team is
              ready to support you.
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-[20px] text-white">
            <div className="flex gap-4 items-center">
              <p className="flex items-center gap-[8px] text-[26px] p-2 cursor-pointer rounded-full bg-white text-blue-500 hover:text-blue-600 transition-all duration-500 hover:scale-105 boxShadow">
                <MdOutlineCall />
              </p>
              <div>
                <h1 className="text-xs font-bold">Phone Number</h1>
                <h1 className="text-[14px] font-semibold mt-[1px]">
                  +8805678795643
                </h1>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="flex items-center gap-[8px] text-[26px] p-2 cursor-pointer rounded-full bg-white text-blue-500 hover:text-blue-600 transition-all duration-500 hover:scale-105 boxShadow">
                <MdOutlineEmail />
              </p>
              <div>
                <h1 className="text-xs font-bold">Contact Email</h1>
                <h1 className="text-[14px] font-semibold mt-[1px]">
                  zenuilibrary@gmail.com
                </h1>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="flex items-center gap-[8px] text-[26px] p-2 cursor-pointer rounded-full bg-white text-blue-500 hover:text-blue-600 transition-all duration-500 hover:scale-105 boxShadow">
                <IoLocationOutline />
              </p>
              <div>
                <h1 className="text-xs font-bold">Our Location</h1>
                <h1 className="text-[14px] font-semibold mt-[1px]">
                  Kulaura, Moulvibazar, Sylhet
                </h1>
              </div>
            </div>
          </div>

          <div className="flex gap-[15px] flex-wrap text-black mt-8">
            <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full bg-white text-blue-500 hover:text-blue-600 transition-all duration-500 hover:scale-105 boxShadow">
              <CgFacebook />
            </a>
            <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full bg-white text-blue-500 hover:text-blue-600 transition-all duration-500 hover:scale-105 boxShadow">
              <BsTwitter />
            </a>
            <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full bg-white text-blue-500 hover:text-blue-600 transition-all duration-500 hover:scale-105 boxShadow">
              <BsInstagram />
            </a>
            <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full bg-white text-blue-500 hover:text-blue-600 transition-all duration-500 hover:scale-105 boxShadow">
              <BsLinkedin />
            </a>
          </div>
        </aside>

        {/* form area */}
        <form className="pt-[20px]">
          <div className="flex flex-col sm:flex-row items-center gap-[30px]">
            <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
              <label className="text-[1rem] text-gray-700">First Name</label>
              <input
                type="text"
                required
                className="peer border-gray-300 border-b outline-none focus:border-[#0E82FD] w-full text-gray-400 transition-colors duration-300"
              />
            </div>

            <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
              <label className="text-[1rem] text-gray-700">Last Name</label>
              <input
                type="text"
                required
                className="peer border-gray-300 border-b outline-none focus:border-[#0E82FD] w-full text-gray-400 transition-colors duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-[30px] mt-10">
            <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
              <label className="text-[1rem] text-gray-700">Email Address</label>
              <input
                type="email"
                required
                className="peer border-gray-300 border-b outline-none focus:border-[#0E82FD] w-full text-gray-400 transition-colors duration-300"
              />
            </div>

            <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
              <label className="text-[1rem] text-gray-700">Phone Number</label>
              <input
                type="number"
                required
                className="peer border-gray-300 border-b outline-none focus:border-[#0E82FD] w-full text-gray-400 transition-colors duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[5px] w-full mt-10">
            <label className="text-[1rem] text-gray-700">Write Message</label>
            <textarea
              required
              className="peer min-h-[100px] border-gray-300 border-b resize-none outline-none w-full text-gray-400 transition-colors focus:border-[#0E82FD] duration-300"
            ></textarea>
          </div>

          <div className="w-full flex items-center sm:items-end justify-center sm:justify-end mt-3">
            <button className="btn border-none hover:bg-[#0e6efd] text-[1rem] duration-500 bg-[#0E82FD] text-white mt-4 relative group">
              <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                Send Message
              </span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
