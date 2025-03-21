import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BannerPharma from "@/components/Pharmacy/BannerPharma";
import PharmacyNavbar from "./PharmacyNavbar";

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
    </div>
  );
};

export default OurPharmacy;
