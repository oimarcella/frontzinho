import React, { useEffect, useState } from "react";
import Loading from "../../../../components/layout/components/loading";
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowDimensions from "../../../../core/hooks/useWindowDimensions";
import { Section } from "../../../../components/layout/components/styles/sections";

const NearbyClinics = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [clinics, setClinics] = useState<Array<string>>([]);
    const viewWidth = useWindowDimensions().width;
    const slidesPerView = 3;

    useEffect(() => {
        setIsLoading(true);
        setClinics(["Amor&Pet", "Health Clinic", "Hospital Pet Amor 24h"]);
        setIsLoading(false);
    }, []);

    return (
        <Section>
            {!isLoading ?
                <Swiper
                    spaceBetween={viewWidth > 1000 ? 30 : 10}
                    slidesPerView={slidesPerView}
                    onSlideChange={() => { }}
                    onSwiper={(swiper) => { }}
                >
                    {
                        clinics.map((clinic, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div>{clinic}</div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                :
                <Loading />
            }
        </Section>
    )
}

export default NearbyClinics;