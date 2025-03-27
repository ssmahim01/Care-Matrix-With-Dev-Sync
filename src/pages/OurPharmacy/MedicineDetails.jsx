import { FaStar } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import ImageWithMagnifier from "@/shared/Section/ImageWithMagnifier";
import useCart from "@/hooks/useCart";
import { useAuthUser } from "@/redux/auth/authActions";
import toast from "react-hot-toast";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MedicineDetails = () => {
  const axiosPublic = useAxiosPublic()
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("black");
  const [isFavorite, setIsFavorite] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 5,
  });
  const [checkout, SetCheckout] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (number) => number.toString().padStart(2, "0");

  // Get Medicine Details
  const {
    data: medicine = {},
    isLoading,
    refetch: medicineRefetch,
  } = useQuery({
    queryKey: ["medicine-details"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/pharmacy/medicine/${id}`
      );
      return data;
    },
  });

  // Destructuring the properties
  const {
    _id,
    genericName,
    brandName,
    category,
    dosageForm,
    strength,
    batchNumber,
    manufactureDate,
    expiryDate,
    manufacturer,
    supplier,
    price,
    prescriptionRequired,
    storageConditions,
    availabilityStatus,
    lastUpdated,
    imageURL,
    description,
    customerReviews,
    totalReviews,
    isReviewable,
  } = medicine || {};

  console.log(medicine)

  const user = useAuthUser();
  const [cart, cartLoading, refetch] = useCart();

  // Function For AddToCart
  const handleAddToCart = async () => {
    if (!user) {
      return toast.error("You must login before add to cart");
    }

    const cartItem = {
      customer: {
        customerName: user.displayName,
        customerEmail: user.email,
      },
      medicineId: _id,
      medicineName: brandName,
      price: price?.discount?.discountedAmount
        ? price.discount.discountedAmount
        : price?.amount,
      image: imageURL,
      strength: strength,
      quantity: quantity,
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
    SetCheckout(true)
    refetch();
  };


  return (
    <div className="pt-24 pb-12 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left side - Image gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square">
            {/* Discount */}
            <div className="absolute top-4 left-4 z-10 space-y-2">
              <span className="inline-block px-2 py-1 text-xs font-semibold bg-black text-white">
                Discount
              </span>
              <div className="inline-block px-2 py-1 text-xs font-semibold bg-blue-500 text-white">
                -{price?.discount?.percentage}%
              </div>
            </div>

            {/* Main image with navigation arrows */}
            <div className="relative">
              <ImageWithMagnifier imageURL={imageURL} />
            </div>
          </div>
        </div>

        {/* Right side - Product details */}
        <div>
          <h1 className="mb-2 text-[1.6rem] md:text-[1.9rem] text-gray-800 font-semibold">
            {brandName}{" "}
            <span className="text-[15px]">
              ( {dosageForm} - {strength} )
            </span>
          </h1>

          <Separator />
          <h1 className="my-1 text-lg text-gray-800 font-medium">
            <span className="font-semibold text-xl">Generic:</span>{" "}
            {genericName}
          </h1>
          <Separator />

          <p className="text-gray-600 mt-3 text-[0.9rem]">{description}</p>

          <div className="flex items-center gap-3">
            <span className="text-[1.5rem] text-gray-800 font-medium">
              ৳ {price.discount.discountedAmount ? price.discount.discountedAmount : price.amount}
            </span>
            {
              price.discount.discountedAmount &&

              <span className="text-lg text-gray-500 line-through">৳ {price.amount}</span>
            }
          </div>

          <div className="pb-2">
            <p className="font-medium text-[0.9rem] text-gray-600">
              Offer expires in:
            </p>
            <div className="flex items-center gap-[10px] mt-2">
              <div className="flex items-center justify-center flex-col gap-[0.2rem]">
                <h5 className="py-2 px-3 bg-gray-100 text-[1.9rem] font-semibold">
                  {formatNumber(timeLeft.days)}
                </h5>
                <span className="text-[0.7rem]">Days</span>
              </div>
              <div className="flex items-center justify-center flex-col gap-[0.2rem]">
                <h5 className="py-2 px-3 bg-gray-100 text-[1.9rem] font-semibold">
                  {formatNumber(timeLeft.hours)}
                </h5>
                <span className="text-[0.7rem]">Hours</span>
              </div>
              <div className="flex items-center justify-center flex-col gap-[0.2rem]">
                <h5 className="py-2 px-3 bg-gray-100 text-[1.9rem] font-semibold">
                  {formatNumber(timeLeft.minutes)}
                </h5>
                <span className="text-[0.7rem]">Minutes</span>
              </div>
              <div className="flex items-center justify-center flex-col gap-[0.2rem]">
                <h5 className="py-2 px-3 bg-gray-100 text-[1.9rem] font-semibold">
                  {formatNumber(timeLeft.seconds)}
                </h5>
                <span className="text-[0.7rem]">Seconds</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 border-t border-t-gray-200 pt-4">
            <p className="font-medium text-[0.9rem] text-gray-600">
              Measurements
            </p>
            <p className="text-gray-800">17 1/2×20 5/8 "</p>
          </div>

          <div className="flex gap-4 items-center pt-6">
            <div className="flex items-center bg-gray-100 rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-[0.560rem] text-[1.3rem] font-[300] hover:bg-gray-100 rounded-l-md"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-10 font-medium outline-none text-[0.9rem] bg-transparent text-center"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-[0.560rem] text-[1.3rem] font-[300] hover:bg-gray-100 rounded-r-md"
              >
                +
              </button>
            </div>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="py-3 border border-gray-200 rounded-md flex items-center justify-center gap-[10px] grow hover:bg-gray-50"
            >
              {isFavorite ? (
                <FaHeart className="w-5 h-5 text-red-500" />
              ) : (
                <FaRegHeart className="w-5 h-5 text-gray-800" />
              )}
              Wishlist
            </button>
          </div>


          {
            checkout ?
              // <Button>Proceed to Checkout <FaShoppingCart></FaShoppingCart> </Button>
              <div className="flex justify-center items-center gap-6">

                <Link to={"/pharmacy"} className="cursor-pointer w-full px-6 py-3 bg-[#184b5599] text-white rounded-md hover:bg-[#0FABCA]/90 mt-4">
                  Continue Shopping
                </Link>
                <Link to={"/dashboard/patient/manage-cart"} className="cursor-pointer w-full px-6 py-3 bg-green-500/80 text-white rounded-md hover:bg-green-500 mt-4">
                  Proceed to Checkout <FaShoppingCart className="inline-flex"></FaShoppingCart>
                </Link>

              </div>
              :
              <button onClick={handleAddToCart} className="cursor-pointer w-full px-6 py-3 bg-[#0FABCA] text-white rounded-md hover:bg-[#0FABCA]/90 mt-4">
                Add to Cart
              </button>
          }
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;
