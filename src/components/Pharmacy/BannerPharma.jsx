import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import sliderbg from "@/assets/slider/slide-bg.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slide from '@/components/Pharmacy/Slide';



const BannerPharma = () => {
    const [banners, setBanners] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch('/banners.json')
            .then(res => res.json())
            .then(data => {
                setBanners(data)
                setLoading(false)
            }).catch(error => toast.error(error))
    }, [])
    const filteredBanners = banners?.filter(banner => banner.status === 'active')
    // console.log(filteredBanners);

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
                className="mySwiper container mx-auto "
            >
                {filteredBanners?.map((medicine) => (
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