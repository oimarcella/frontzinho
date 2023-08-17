import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { ERoutes } from "../../core/enums/routes";
import { useNavigate } from "react-router-dom";
import { CardStyled, ContainerStyled, PagePanel } from "./styles";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import useWindowDimensions from "../../core/hooks/useWindowDimensions";
import Button from "../../components/layout/components/button/button";
import { show } from "../../redux/modalSlice";
import MyModal from "../../components/layout/components/modal";

const PanelPage = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const pets = ["Didi", "Zup", "Lina", "Lik", "Lully"];
    const viewWidth = useWindowDimensions().width;
    let slidesPerView = 0;
    const dispatch = useDispatch();

    if (viewWidth > 1000) slidesPerView = 3.3;
    else if (viewWidth < 400) slidesPerView = 1.3;
    else slidesPerView = 2.3;

    const generatePastelColor = (index: number) => {
        const baseHue = (index * 137.3) % 360; // Varia o tom da cor com base no índice
        const saturation = 70; // Defi3e a saturação
        const lightness = 80; // Define a luminosidade
        return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
    };

    useEffect(() => {
        !user.id && navigate(ERoutes.LOGIN);
    }, []);

    function handleAddPet() {
        dispatch(show());
    }

    return (
        <PagePanel>
            <ContainerStyled>
                <section>
                    <div className="d-flex align-items-center justify-content-start mb-2">
                        <h3>Seus pets</h3>
                        <Button
                            onClick={handleAddPet}
                            color="#fe51b3" className="ms-2" customStyles={{
                                fontSize: "1rem",
                                borderRadius: "100%",
                                width: "30px",
                                height: "30px"
                            }}>+</Button>
                    </div>

                    <Swiper
                        spaceBetween={viewWidth > 1000 ? 30 : 10}
                        slidesPerView={slidesPerView}
                        onSlideChange={() => { }}
                        onSwiper={(swiper) => { }}
                    >
                        {
                            pets.map((pet, index) => {
                                return <SwiperSlide key={pet}>
                                    <CardStyled
                                        className="d-flex flex-column align-items-center justify-content-center"
                                        style={{ background: generatePastelColor(index) }}
                                    >
                                        <img src="/images/cat.svg" alt="Cachorro" />
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