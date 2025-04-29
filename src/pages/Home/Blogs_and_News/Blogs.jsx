import React from "react";
import BlogCard from "./BlogCard";
import SectionHeader from "@/shared/Section/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";

const Blogs = () => {
  const axiosPublic= useAxiosPublic();



  // get blog 
  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/blogs");
      return data;
    },
  });





  // const blogs = [
  //   {
  //     image: "/Nurse-Practitioner-vs-Doctor.jpg",
  //     date: "15 Apr 2025",
  //     category1: "Doctor",

  //     title: "Doccure – Making your clinic painless visit?",
  //     description:
  //       "Explore the benefits & challenges of virtual healthcare appointments, along with tips for making good...",
  //   },
  //   {
  //     image: "/doctor-Patient-at-Appointment-1400046250-770x533-1_jpg.webp",
  //     date: "17 Apr 2025",
  //     category1: "Clinic",

  //     title: "Benefits of Consulting With an Online Doctor",
  //     description:
  //       "Uncover strategies to achieve a harmonious balance between professional and personal well-being...",
  //   },
  //   {
  //     image: "/shutterstock_624008096.jpg",
  //     date: "19 Apr 2025",
  //     category1: "Clinic",

  //     title: "Benefits of online doctor booking?",
  //     description:
  //       "Explore importance of quality sleep & learn tips to improve your sleep, ensuring raise-up refreshed...",
  //   },
  // ];

  return (
    <div className="">
      {/* Section Heading */}
      <SectionHeader
        title_1st_slice={"BLOGS"}
        title_2nd_slice={"&"}
        title_3rd_slice={"NEWS"}
        subTitle={
          "Stay informed with the latest insights and updates in healthcare \n through our Blogs & News section"
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogs.slice(0,3).map((blog, index) => (
          <BlogCard
            key={index}
           blog={blog}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
