import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import useCart from "@/hooks/useCart";
import { useAuthUser } from "@/redux/auth/authActions";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router";

const Medicines = ({ medicines, isLoading }) => {
  const axiosPublic = useAxiosPublic();

  const user = useAuthUser();
  const [cart, cartLoading, refetch] = useCart();

  useEffect(() => {
    window.scroll({
      top: 580,
      behavior: "smooth",
    });
  });

  // Function For AddToCart
  const handleAddToCart = async (e, medicine) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      return toast.error("You must login before add to cart");
    }

    const cartItem = {
      customer: {
        customerName: user.displayName,
        customerEmail: user.email,
      },
      medicineId: medicine._id,
      medicineName: medicine.brandName,
      price: medicine?.price?.discountedAmount
        ? medicine.price.discountedAmount
        : medicine?.price?.amount,
      image: medicine.imageURL,
      strength: medicine.strength,
      quantity: 1,
    };

    await toast.promise(axiosPublic.post("/carts", cartItem), {
      loading: "Adding to cart...",
      success: <b>Successfully Added To Cart</b>,
      error: (error) => {
        const errorMessage =
          error.response?.data?.error || error.message || "Unable to Add";
        return <b>{errorMessage}</b>;
      },
    });
    refetch();
  };

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
          medicines?.map((medicine, index) => (
            <Link key={index} to={`/medicine/${medicine._id}`}>
              <div className="border rounded p-4 hover:shadow-xl duration-300 group  flex flex-col h-full">
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={medicine?.imageURL}
                    alt={medicine?.brandName}
                    className="h-[150px] w-full transform group-hover:scale-110 transition-transform duration-300 object-cover"
                  />
                </div>
                {/* Text content */}
                <div className="mt-4 flex-grow ">
                  <h1 className="text-2xl font-bold">
                    {medicine?.brandName}{" "}
                    <span className="opacity-70 text-[14px] font-semibold">
                      {medicine?.strength}
                    </span>
                  </h1>
                  <h3 className="text-xl mt-1 font-semibold flex-grow">
                    <span className="text-lg pr-1 font-extrabold">৳</span>
                    {medicine?.price?.discountedAmount} -{" "}
                    <span className="opacity-70 text-[16px] font-medium">
                      <span className="text-lg pr-1 font-extrabold">৳</span>
                      <span className="line-through">
                        {medicine?.price?.amount}
                      </span>
                    </span>
                  </h3>
                </div>
                <div>
                  <button
                    disabled={medicine?.availability === "Out Of Stock"}
                    onClick={(e) => handleAddToCart(e, medicine)}
                    className="btn btn-sm border-none hover:bg-[#0e6efd] text-[1rem] duration-500 bg-[#0E82FD] text-white mt-4 relative group flex items-center gap-2 disabled:text-neutral-800"
                  >
                    {medicine?.availability === "Out Of Stock" ? (
                      "Out Of Stock"
                    ) : (
                      <>
                        <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-1 after:w-0 after:h-[0.1px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                          Add
                        </span>{" "}
                        <FaCartPlus size={20} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default Medicines;
