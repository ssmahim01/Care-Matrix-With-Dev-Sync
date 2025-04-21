import UnderLineButton from '@/shared/Section/UnderLineButton';
import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router';

const BlogCard = ({ image, date, category1, category2, title, description }) => {
    return (
       <div className='w-full h-full grid place-content-stretch shadow-[0px_4px_10px_#0E82FD50] hover:shadow-none z-0 bg-white rounded relative cursor-pointer group 
            before:absolute before:top-0 hover:before:top-[10px] before:left-0 hover:before:left-[-10px] 
            before:w-full before:h-full before:rounded before:bg-[#0E82FD20] before:transition-all before:duration-500 before:z-[-1] 
            after:w-full after:h-full after:absolute after:top-0 hover:after:top-[20px] after:left-0 hover:after:left-[-20px] 
            after:rounded after:bg-[#0E82FD10] after:z-[-2] after:transition-all after:duration-500'>
         <div className="bg-white rounded-md shadow-md overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <FaCalendarAlt className="mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex space-x-2 mb-2">
            {/* <span className="bg-blue-100K text-white px-3 py-1 rounded-full text-sm">{category1}</span> */}
            
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{category1}</span>
            
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mt-2">{title}</h3>
          <p className="text-gray-600 mt-2 line-clamp-3">{description}</p>
         
          <Link
                
              >
                <UnderLineButton text={"Read More..."} />
              </Link>
        </div>
      </div>
       </div>
    );
};

export default BlogCard;