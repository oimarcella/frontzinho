import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { ERoutes } from "../../core/enums/routes";
import { useNavigate } from "react-router-dom";
import { CardStyled, ContainerStyled, PagePanel } from "./styles";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const PanelPage = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const pets = ["Didi", "Zup", "Lina", "Lik", "Lully"];

    const generatePastelColor = (index: number) => {
        const baseHue = (index * 137.5) % 360; // Varia o tom da cor com base no índice
        const saturation = 70; // Define a saturação
        const lightness = 80; // Define a luminosidade
        return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
    };

    useEffect(() => {
        !user.id && navigate(ERoutes.LOGIN);
    }, []);

    return (
        <PagePanel>
            <ContainerStyled>
                <section>
                    <h3>Pets</h3>

                    <Swiper
                        spaceBetween={30}
                        slidesPerView={2}
                        onSlideChange={() => { }}
                        onSwiper={(swiper) => { }}
                    >
                        {
                            pets.map((pet, index) => {
                                return <SwiperSlide key={pet}>
                                    <CardStyled
                                        className="d-flex align-items-center justify-content-center"
                                        style={{ background: generatePastelColor(index) }}
                                    >
                                        {pet}
                                    </CardStyled>
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </section>
            </ContainerStyled>
        </PagePanel >
    )
}
export default PanelPage;