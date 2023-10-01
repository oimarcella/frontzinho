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
import api from "../../../../services/api";

type ClinicT = {
    name: string;
    address: string;
    number: string;
    neighborhood: string;
    role: string;
    cnpj: string;
    zip_code: string;
    id: number;
    services: Array<{ id: number, name: string }>;
}

const NearbyClinics = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [clinics, setClinics] = useState<Array<ClinicT>>([]);
    const viewWidth = useWindowDimensions().width;
    const slidesPerView = viewWidth > 1000 ? 3.3 :
        viewWidth > 400 ?
            2.3
            :
            1.3;
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);

        api.get(ERoutes.CLINIC)
            .then(response => {
                setClinics(response.data);
            })
            .catch(error => {
                console.log(`Erro: ${error.message}`);
            })
        setIsLoading(false);
    }, []);

    function handleClickCard(id: number) {
        navigate(`${ERoutes.CLINIC}/${id}`);
    }

    return (
        <>
            <Section>
                <h3 className="mb-4">Clínicas e hospitais recomendados</h3>
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
                                            onClick={() => handleClickCard(clinic.id)}
                                            className="d-flex align-items-center justify-content-center flex-row">
                                            {/* 
                                                TODO - Colocar o logo da clinica aqui se ela tiver, senão, será o ícone
                                            */}
                                            <Store className="me-2" />
                                            <h6 className="ellipsis mb-0">{clinic.name}</h6>
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
        </>
    )
}

export default NearbyClinics;