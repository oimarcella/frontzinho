import { useEffect, useState } from "react";
import { Section } from "../../../../components/layout/components/styles/sections";
import { ContainerStyled } from "../../styles";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/userSlice";
import api from "../../../../services/api";
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowDimensions from "../../../../core/hooks/useWindowDimensions";
import Loading from "../../../../components/layout/components/loading";
import { CardStyled } from "./styles";

const ClinicPets = () => {
    const [clinic, setClinic] = useState();
    const [pets, setPets] = useState([]);
    const veterinarian = useSelector(selectUser);
    const viewWidth = useWindowDimensions().width;
    let slidesPerView = 0;

    if (viewWidth > 1000) slidesPerView = 3.3;
    else if (viewWidth < 400) slidesPerView = 1.3;
    else slidesPerView = 2.3;

    async function getVetById() {
        const { data } = await api.get(`/vets/${veterinarian.id}`);
        setClinic(data.clinica_id);
    }

    async function getPetsById() {
        const { data } = await api.get(`/clinicas/${clinic}/pets`);
        setPets(data);
    }

    useEffect(() => {
        getVetById();
        getPetsById();

    }, [veterinarian.id])
    return (
        <ContainerStyled>
            <Section>
                <h3>Pacientes</h3>

                {
                    pets.length > 0 ?
                        <Swiper
                            spaceBetween={viewWidth > 1000 ? 30 : 10}
                            slidesPerView={slidesPerView}
                            onSlideChange={() => { }}
                            onSwiper={(swiper) => { }}
                        >
                            {
                                pets.map((pet, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <CardStyled
                                                className="d-flex flex-column align-items-center justify-content-center">
                                                <img
                                                    src={`/images/profile.png`}
                                                //alt={pet.name}
                                                />
                                                pet.name
                                            </CardStyled>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                        :
                        <p>Nenhum pet para mostrar.</p>

                }
            </Section>
        </ContainerStyled>
    )
}
export default ClinicPets;