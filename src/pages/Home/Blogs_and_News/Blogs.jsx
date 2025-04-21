import React from 'react';
import BlogCard from './BlogCard';

const Blogs = () => {
    const blogs = [
        {
          image: "https://images.unsplash.com/photo-1576091160399-112e338460ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
          date: "18 Jul 2023",
          category1: "Doctor",
          category2: "Clinic",
          title: "Docure – Making your clinic painless?",
          description: "Explore the benefits & challenges of virtual healthcare appointments, along with tips for making good..."
        },
        {
          image: "https://images.unsplash.com/photo-1580281658623-369597f3c188?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
          date: "28 Sep 2021",
          category1: "Clinic",
          category2: null,
          title: "Benefits of Consulting With an Online Doctor",
          description: "Uncover strategies to achieve a harmonious balance between professional and personal well-being..."
        },
        {
          image: "https://images.unsplash.com/photo-1576765607924-3f7b847c0a96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
          date: "28 Sep 2021",
          category1: null,
          category2: null,
          title: "What are the benefits of online doctor booking?",
          description: "Explore importance of quality sleep & learn tips to improve your sleep, ensuring raise-up refreshed..."
        }
      ];

    return (
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Blogs and News</h1>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <BlogCard
                key={index}
                image={blog.image}
                date={blog.date}
                category1={blog.category1}
                category2={blog.category2}
                title={blog.title}
                description={blog.description}
              />
            ))}
          </div>
        </div>
    );
};

export default Blogs;