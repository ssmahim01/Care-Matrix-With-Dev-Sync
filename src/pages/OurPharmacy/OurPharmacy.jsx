import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Medicines from "./Medicines";
import PharmacyNavbar from "./PharmacyNavbar";
import BannerPharma from "@/components/Pharmacy/BannerPharma";
import { medicine_categories } from "@/lib/pharmacy";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const OurPharmacy = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setCategory] = useState("All Medicines");

  // Get medicines data
  const {
    data: medicines = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["medicines", search, selectedCategory],
    queryFn: async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/pharmacy/medicines?search=${encodeURIComponent(
          search
        )}&category=${encodeURIComponent(selectedCategory)}`
      );
      return data;
    },
  });

  return (
    <div className="w-11/12 mx-auto max-w-screen-2xl">
      <div className="pt-24 rounded-lg">
        <BannerPharma />
      </div>
      {/* Pharmacy Navbar */}
      <div className="mt-12">
        <PharmacyNavbar search={search} setSearch={setSearch} />
      </div>
      {/* Medicines */}
      <div className="mt-12 flex flex-col lg:flex-row w-full gap-6">
        {/* categories */}
        <div className="w-full lg:w-4/12 xl:w-3/12 border rounded h-fit">
          <div className="p-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
            {medicine_categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setCategory(category.category_name)}
                className={`rounded h-full grid place-content-stretch py-2 px-4 font-medium text-xl tracking-wider w-full text-left cursor-pointer 
                ${
                  selectedCategory === category?.category_name
                    ? "bg-blue-500/95 text-white"
                    : "bg-gray-100 opacity-90 hover:bg-gray-200 duration-300"
                }`}
              >
                {category?.category_name}
              </button>
            ))}
          </div>
        </div>
        {/* medicines */}
        <div className="w-full lg:w-8/12 xl:w-9/12">
          {medicines.length === 0 ? (
            "No Medicine Available"
          ) : (
            <Medicines medicines={medicines} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OurPharmacy;
