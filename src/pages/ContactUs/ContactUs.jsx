import SectionHeader from "@/shared/Section/SectionHeader";
import { MdOutlineCall, MdOutlineEmail } from "react-icons/md";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { CgFacebook } from "react-icons/cg";
import { useEffect } from "react";
import ContactUsForm from "./ContactUsForm";
import LocationSection from "./LocationSection";

const ContactUs = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  });

  return (
    <div className="pt-18 pb-6 w-11/12 md:w-10/12 mx-auto max-w-[1440px]">
      <SectionHeader
        title_1st_slice={"Our"}
        title_2nd_slice={"Contact"}
        title_3rd_slice={"Information"}
        subTitle={
          "Great doctor if you need your family member to get effective immediate assistance, \n emergency treatment, or simple consultation."
        }
      />
      {/* Main Section */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-[35px] boxShadow py-[30px] lg:px-[30px] rounded-xl">
        {/*  Information  */}
        <aside className="w-full bg-gradient-to-r from-[#46a0ff] to-[#58aefe] flex flex-col justify-between p-[25px] rounded-md">
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
          {/* Contact Info */}
          <div className="mt-4 flex flex-col gap-[20px] text-white">
            <div className="flex gap-4 items-center">
              <p className="flex items-center gap-[8px] text-[26px] p-2 cursor-pointer rounded-full bg-white text-blue-500 hover:text-blue-600 transition-all duration-500 hover:scale-105 boxShadow">
                <MdOutlineCall />
              </p>
              <div>
                <h1 className="text-xs font-bold underline underline-offset-2">
                  Phone Number
                </h1>
                <h1 className="text-[14px] font-semibold mt-[1px]">
                  +8800000000000
                </h1>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="flex items-center gap-[8px] text-[26px] p-2 cursor-pointer rounded-full bg-white text-blue-500 hover:text-blue-600 transition-all duration-500 hover:scale-105 boxShadow">
                <MdOutlineEmail />
              </p>
              <div>
                <h1 className="text-xs font-bold underline underline-offset-2">
                  Contact Email
                </h1>
                <h1 className="text-[14px] font-semibold mt-[1px]">
                  carematrix06@devsync.com
                </h1>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="flex items-center gap-[8px] text-[26px] p-2 cursor-pointer rounded-full bg-white text-blue-500 hover:text-blue-600 transition-all duration-500 hover:scale-105 boxShadow">
                <IoLocationOutline />
              </p>
              <div>
                <h1 className="text-xs font-bold underline underline-offset-2">
                  Our Location
                </h1>
                <h1 className="text-[14px] font-semibold mt-[1px]">
                  Dhaka, Dhaka-1000, Bangladesh
                </h1>
              </div>
            </div>
          </div>
          {/* Social Icons */}
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
        {/* Contact Us Form */}
        <ContactUsForm />
      </section>
      {/* Location Section */}
      <div className="pt-6 lg:px-[30px] rounded-xl">
        <LocationSection />
      </div>
    </div>
  );
};

export default ContactUs;
