import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const BlogCard = ({ image, date, category1, category2, title, description }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <FaCalendarAlt className="mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex space-x-2 mb-2">
            <span className="bg-blue-100K text-white px-3 py-1 rounded-full text-sm">{category1}</span>
            {category2 && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{category2}</span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mt-2">{title}</h3>
          <p className="text-gray-600 mt-2 line-clamp-3">{description}</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Read More
          </button>
        </div>
      </div>
    );
};

export default BlogCard;