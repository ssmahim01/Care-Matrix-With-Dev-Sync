import sliderbg from "@/assets/slider/slide-bg.jpg";
import Slide from "@/components/Pharmacy/Slide";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BannerPharma = () => {
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["pharmacy-banners"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/banners`);
      return data;
    },
  });

  return (
    <div
      className="bg-no-repeat bg-cover bg-right-top py-12"
      style={{ backgroundImage: `url('${sliderbg}')` }}
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-11/12 lg:w-10/12 mx-auto "
      >
        {banners?.map((medicine) => (
          <SwiperSlide key={medicine._id}>
            <Slide
              image={medicine.image}
              title={medicine.medicineName}
              subtitle={medicine.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerPharma;
