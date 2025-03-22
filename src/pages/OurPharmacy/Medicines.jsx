import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router";

const Medicines = ({ medicines, isLoading }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {isLoading
        ? // Skeleton Loader
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="border rounded p-4 animate-pulse">
              {/* Image Skeleton */}
              <div className="h-[150px] w-full bg-base-300"></div>
              {/* Text Skeleton */}
              <div className="mt-4 space-y-2">
                <div className="h-6 bg-base-300 rounded w-4/5"></div>
                <div className="h-5 bg-base-300 rounded w-2/3"></div>
                <div className="h-7 bg-base-300 rounded mt-4 w-2/5"></div>
              </div>
            </div>
          ))
        : // Medicines List
          medicines.map((medicine, index) => (
            <Link key={index} to={`/medicine/${medicine._id}`}>
              <div className="border rounded p-4 hover:shadow-xl duration-300 group">
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={medicine?.imageURL}
                    alt={medicine?.brandName}
                    className="h-[150px] w-full transform group-hover:scale-105 transition-transform duration-300 object-cover"
                  />
                </div>
                {/* Text content */}
                <div className="mt-4">
                  <h1 className="text-2xl font-bold">
                    {medicine?.brandName}{" "}
                    <span className="opacity-70 text-[14px] font-semibold">
                      {medicine?.strength}
                    </span>
                  </h1>
                  <h3 className="text-xl font-semibold">
                    <span className="text-4xl">৳</span>
                    {medicine?.price?.amount} -{" "}
                    <span className="opacity-70 text-[16px] font-medium">
                      <span className="text-4xl">৳</span>
                      <span className="line-through">
                        {medicine?.price?.discountedAmount}
                      </span>
                    </span>
                  </h3>
                  <button className="btn btn-sm border-none hover:bg-[#0e6efd] text-[1rem] duration-500 bg-[#0E82FD] text-white mt-4 relative group flex items-center gap-2">
                    <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-1 after:w-0 after:h-[0.1px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                      Add
                    </span>{" "}
                    <FaCartPlus size={20} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default Medicines;
