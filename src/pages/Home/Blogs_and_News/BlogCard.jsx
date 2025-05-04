import UnderLineButton from "@/shared/Section/UnderLineButton";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router";

const BlogCard = ({ blog }) => {
  return (
    <div
      className="w-full h-full grid place-item-stretch shadow-[0px_4px_10px_#0E82FD50] hover:shadow-none z-0 bg-white rounded relative cursor-pointer group 
          before:absolute before:top-0 hover:before:top-[10px] before:left-0 hover:before:left-[-10px] 
          before:w-full before:h-full before:rounded before:bg-[#0E82FD20] before:transition-all before:duration-500 before:z-[-1] 
          after:w-full after:h-full after:absolute after:top-0 hover:after:top-[20px] after:left-0 hover:after:left-[-20px] 
          after:rounded after:bg-[#0E82FD10] after:z-[-2] after:transition-all after:duration-500"
    >
      <div className="bg-white rounded-lg shadow-md flex flex-col">
        {/* Image & Date */}
        <div className="relative">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[180px] object-cover rounded-t-lg 
            sm:h-[200px] md:h-[220px] lg:h-[250px]"
          />
          {/* Date */}
          <div className="flex items-center bg-blue-100 text-blue-800 text-sm mb-2   px-3 py-1 rounded-full w-[130px] top-2 right-2 absolute">
            <FaCalendarAlt className="mr-2" />
            <span>{blog.date}</span>
          </div>
        </div>
        {/* Text */}
        <div className="pl-3 pb-0 flex flex-col p-2 sm:p-4  flex-grow">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 mb-2">
              <span
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs
              sm:text-sm sm:px-3"
              >
                {blog.tag}
              </span>
            </div>
          </div>
          <h3
            className="text-base font-semibold text-gray-800 mt-2
          sm:text-lg md:text-xl"
          >
            {blog.title}
          </h3>
          <p
            className="text-gray-600 mt-2 text-sm line-clamp-3 flex-grow
          sm:text-base"
          >
            {blog.description.slice(0, 150)}......
          </p>
        </div>
        <Link to={`blogs/${blog._id}`} className="pl-3 pb-3 -mt-2">
          <UnderLineButton text={"Read More..."} />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
