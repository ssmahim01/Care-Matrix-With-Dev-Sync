import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import sliderbg from "@/assets/slider/slide-bg.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slide from '@/components/Pharmacy/Slide';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from '@/hooks/useAxiosSecure';



const BannerPharma = () => {
    // const [banners, setBanners] = useState([])
    // const [loading, setLoading] = useState(false)
    // useEffect(() => {
    //     setLoading(true)
    //     fetch('/banners.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             setBanners(data)
    //             setLoading(false)
    //         }).catch(error => toast.error(error))
    // }, [])
    // const filteredBanners = banners?.filter(banner => banner.status === 'active')
    // console.log(filteredBanners);
    const axiosSecure = useAxiosSecure()
    const { data: banners = [], isLoading } = useQuery({
        queryKey: ["pharmacy-banners"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/banners");
            const filtered = data.filter((item) => item.status === "active");
            return filtered;
        },
    });
    console.log(banners);

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