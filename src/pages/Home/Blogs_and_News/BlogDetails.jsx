import MainLayoutLoader from "@/components/Loader/MainLayoutLoader";
import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [isExpanded, setIsExpanded] = useState(false);
  const charLimit = 1200;
  
  const { data: blog = {}, isLoading: blogLoading } = useQuery({
    queryKey: ["blogDetails", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/blogs/${id}`);
      return data;
    },
  });

  const { data: latestPosts = [], isLoading: latestBlogLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/blogs");
      return data;
    },
  });

  if (blogLoading || latestBlogLoading) return <MainLayoutLoader />;

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const textToShow = isExpanded
    ? blog?.description
    : blog?.description?.slice(0, charLimit);

  const shouldShowToggle = blog?.description?.length > charLimit;

  // const categories = [{ name: "Health Care", postCount: 71 }];

  return (
    <div className="pt-16 pb-12 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
      <div className="container mx-auto py-8 flex flex-col lg:flex-row gap-8 min-h-screen">
        {/* Main Blog Post Section */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={blog?.image}
              alt={blog?.title}
              className="w-full h-64 lg:h-[350px] object-cover rounded-t-lg"
            />
            <div className="p-3 lg:p-6">
              <h2>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mb-2">
                  {blog?.tag}
                </span>
              </h2>
              <Link>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {blog?.title}
                </h2>
              </Link>
              <div className="flex items-center text-gray-600 text-sm mb-4">
                <FaUserCircle className="mr-2" />
                <span>{blog?.author}</span>
                <FaCalendarAlt className="ml-4 mr-2" />
                <span>{blog?.date}</span>
              </div>
              <div>
                <p className="text-gray-700 whitespace-pre-line">
                  {textToShow}
                  {!isExpanded && shouldShowToggle && "..."}
                </p>

                {shouldShowToggle && (
                  <button
                    onClick={toggleExpanded}
                    className="text-blue-500 mt-2 cursor-pointer hover:underline"
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Latest Posts and Categories */}
        <div className="lg:w-1/3 space-y-8 lg:sticky lg:top-18 max-h-screen overflow-y-auto">
          {/* Latest Posts */}
          <div className="bg-white rounded-lg shadow-md border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-1 h-5 bg-blue-500 mr-2"></span>
              Latest Blogs
            </h3>
            <ul className="space-y-4">
              {latestPosts?.slice(0, 10).map((post, index) => (
                <Link to={`/blogs/${post._id}`} key={index}>
                  <li className="flex items-start hover:bg-gray-100 cursor-pointer duration-300 p-2 rounded-lg group">
                    <span className="text-blue-500 font-bold mr-3">
                      {index + 1}
                    </span>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-12 object-cover rounded mr-3"
                    />
                    <div>
                      <Link to={`/blogs/${post._id}`}>
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                          {post.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-gray-600">{post.date}</p>
                    </div>
                  </li>{" "}
                </Link>
              ))}
            </ul>
          </div>

          {/* Categories */}
          {/* Uncomment if needed */}
          {/* <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-1 h-5 bg-blue-500 mr-2"></span>
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name} className="flex items-center justify-between">
                  <Link to={`/category/${category.name.toLowerCase().replace(/\s/g, "-")}`}>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full hover:bg-blue-200">
                      {category.name}
                    </span>
                  </Link>
                  <span className="text-gray-600 text-sm">{category.postCount} Posts</span>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
