import BannerPharma from "@/components/Pharmacy/BannerPharma";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Medicines from "./Medicines";
import PharmacyNavbar from "./PharmacyNavbar";
import { medicine_categories } from "@/lib/pharmacy";

const OurPharmacy = () => {
  return (
    <div className="w-11/12 mx-auto max-w-screen-2xl">
      <div className="pt-24 rounded-lg">
        <BannerPharma />
      </div>
      {/* Pharmacy Navbar */}
      <div className="mt-12">
        <PharmacyNavbar />
      </div>
      {/* Medicines */}
      <div className="mt-12 flex flex-col lg:flex-row w-full gap-6">
        {/* categories */}
        <div className="w-full lg:w-4/12 xl:w-3/12 border rounded h-fit">
          <div className="p-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-1 space-y-4">
            {medicine_categories.map((category) => (
              <div className="bg-gray-100 rounded py-2 px-4 font-medium text-xl opacity-90 tracking-wider">
                {category?.category_name}
              </div>
            ))}
          </div>
        </div>
        {/* medicines */}
        <div className="w-full lg:w-8/12 xl:w-9/12">
          <Medicines />
        </div>
      </div>
    </div>
  );
};

export default OurPharmacy;
