import UnderLineButton from "@/shared/Section/UnderLineButton";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router";

const Medicines = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <Link key={index} to={"?"}>
          <div className="border rounded p-4">
            {/* Image */}
            <div>
              <img
                src="https://i.ibb.co.com/84jYykNn/medicine1-removebg-preview-Copy.png"
                alt=""
              />
            </div>
            {/* Text content */}
            <div className="mt-4">
              <h1 className="text-2xl font-bold">
                Endofree{" "}
                <span className="opacity-70 text-lg font-semibold">
                  (2.5mg)
                </span>
              </h1>
              <h3 className="mt-[2px]  text-xl font-semibold">
                ৳120 -{" "}
                <span className="opacity-70 text-[16px] font-medium line-through">
                  ৳160
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
