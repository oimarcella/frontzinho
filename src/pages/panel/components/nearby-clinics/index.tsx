import React, { useEffect, useState } from "react";
import Loading from "../../../../components/layout/components/loading";
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowDimensions from "../../../../core/hooks/useWindowDimensions";
import { Section } from "../../../../components/layout/components/styles/sections";
import { Card } from "react-bootstrap";
import { CardStyled } from "./styles";
import { Store } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "../../../../core/enums/routes";

const NearbyClinics = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [clinics, setClinics] = useState<Array<string>>([]);
    const viewWidth = useWindowDimensions().width;
    const slidesPerView = viewWidth > 1000 ? 3.3 :
        viewWidth > 400 ?
            2.3
            :
            1.3;
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        setClinics(["Amor&Pet", "Health Clinic", "Bem saúde Veterinário", "Hospital Pet Amor 24h", "Hospital Veterinário Eicke Buckowtz"]);
        setIsLoading(false);
    }, []);

    function handleClickCard() {
        navigate(`${ERoutes.CLINIC}/${1}`);
    }

    return (
        <NearbyStyled>
            <Section>
                <h3 className="mb-4">Clínicas e hospitais próximos de você</h3>
                {!isLoading ?
                    <Swiper
                        spaceBetween={viewWidth > 1000 ? 10 : 10}
                        slidesPerView={slidesPerView}
                        onSlideChange={() => { }}
                        onSwiper={(swiper) => { }}
                    >
                        {
                            clinics.sort(
                                function (a, b) {
                                    //ordenando por nome
                                    if (a > b) {
                                        return 1;
                                    }
                                    if (a < b) {
                                        return -1;
                                    }
                                    return 0;
                                }
                            ).map((clinic, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <CardStyled
                                            onClick={handleClickCard}
                                            className="d-flex align-items-center justify-content-center flex-row">
                                            {/* 
                                                TODO - Colocar o logo da clinica aqui se ela tiver, senão, será o ícone
                                            */}
                                            <Store className="me-2" />
                                            <h6 className="ellipsis mb-0">{clinic}</h6>
                                        </CardStyled>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    :
                    <Loading />
                }
            </Section>
        </NearbyStyled>
    )
}

export default NearbyClinics;