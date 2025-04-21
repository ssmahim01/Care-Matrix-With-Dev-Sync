import React from "react";
import BlogCard from "./BlogCard";
import SectionHeader from "@/shared/Section/SectionHeader";

const Blogs = () => {
  const blogs = [
    {
      image:
        "/Nurse-Practitioner-vs-Doctor.jpg",
      date: "15 Apr 2025",
      category1: "Doctor",
     
      title: "Doccure – Making your clinic painless visit?",
      description:
        "Explore the benefits & challenges of virtual healthcare appointments, along with tips for making good...",
    },
    {
      image:
        "/doctor-Patient-at-Appointment-1400046250-770x533-1_jpg.webp",
      date: "17 Apr 2025",
      category1: "Clinic",
     
      title: "Benefits of Consulting With an Online Doctor",
      description:
        "Uncover strategies to achieve a harmonious balance between professional and personal well-being...",
    },
    {
      image:
        "/shutterstock_624008096.jpg",
      date: "19 Apr 2025",
      category1: "Clinic",
      
      title: "Benefits of online doctor booking?",
      description:
        "Explore importance of quality sleep & learn tips to improve your sleep, ensuring raise-up refreshed...",
    },
  ];

  return (
    <div className="">
      {/* Section Heading */}
      <SectionHeader
        title_1st_slice={"BLOG"}
        title_2nd_slice={"&"}
        title_3rd_slice={"NEWS"}
        subTitle={
          "Explore Our Latest Blogs & News."
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            image={blog.image}
            date={blog.date}
            category1={blog.category1}
           
            title={blog.title}
            description={blog.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
