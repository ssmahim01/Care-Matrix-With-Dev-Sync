import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import sliderbg from "@/assets/slider/slide-bg.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slide from '@/components/Pharmacy/Slide';
import BannerPharma from '@/components/Pharmacy/BannerPharma';


const OurPharmacy = () => {

    return (
        <div>
            <BannerPharma></BannerPharma>
        </div>
    );
};

export default OurPharmacy;