import React, { useState, useEffect, MouseEventHandler } from "react";
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from "react-redux";
import { CardStyled } from "./styles";
import { Form, Col, Row, Modal } from "react-bootstrap";
import { selectUser } from '../../../../redux/userSlice';
import useWindowDimensions from '../../../../core/hooks/useWindowDimensions';
import Button from "../../../../components/layout/components/button/button";
import Loading from "../../../../components/layout/components/loading";
import api from "../../../../services/api";
import { show } from "../../../../redux/toastSlice";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "../../../../core/enums/routes";
import { Section } from "../../../../components/layout/components/section/sections";

type VetT = {
    role: string,
    id: number,
    clinica_id: number,
    name: string,
    password?: string
};

const ClinicVets = () => {
    const [isLoading, setLoading] = useState(false);
    const user = useSelector(selectUser);
    const viewWidth = useWindowDimensions().width;
    let slidesPerView = 0;
    const dispatch = useDispatch();
    const [vets, setVets] = useState<VetT[]>([]);
    const [petIsLoading, setPetIsLoading] = useState(0);
    const navigate = useNavigate();

    if (viewWidth > 1000) slidesPerView = 3.3;
    else if (viewWidth < 400) slidesPerView = 1.3;
    else slidesPerView = 2.3;

    useEffect(() => {
        setLoading(true);
        api.get(`/clinicas/${user.id}/vets`)
            .then((response) => {

                setVets(response.data.reverse());
                setLoading(false);
            })
            .catch(error => {
                console.log("Erro: ", error);

                setLoading(false);
            });

    }, [user.id]);

    function handleAdd() {
        navigate(ERoutes.REGISTER_VETERINARIAN);
    }

    async function deletePet(vetId: number) {
        try {
            setPetIsLoading(vetId);
            await api.delete(`/pets/${vetId}`)
            const newPets = vets.filter(vet => vet.id !== vetId);

            setVets(newPets);
            setPetIsLoading(0);
        }
        catch (error) {
            setPetIsLoading(0);
            console.log("Erro:", error);
            dispatch(show({
                type: "error",
                message: "Não foi possível remover o pet"
            }));
        }
    }

    return (
        <>
            <Section>
                <div className="d-flex align-items-center justify-content-start mb-2">
                    <h3>Veterinários da sua clínica</h3>
                    <Button
                        onClick={handleAdd}
                        color="#fe51b3" className="ms-2" customStyles={{
                            fontSize: "1rem",
                            borderRadius: "100%",
                            width: "30px",
                            height: "30px"
                        }}>+</Button>
                </div>

                {(!isLoading && (vets.length > 0)) ?
                    <Swiper
                        spaceBetween={viewWidth > 1000 ? 30 : 10}
                        slidesPerView={slidesPerView}
                        onSlideChange={() => { }}
                        onSwiper={(swiper) => { }}
                    >
                        {
                            vets.map((vet, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        {(petIsLoading && petIsLoading === vet.id) ?
                                            <Loading />
                                            :
                                            <CardStyled
                                                className="d-flex flex-column align-items-center justify-content-center">
                                                <img
                                                    src={`/images/profile.png`}
                                                    alt={vet.name}
                                                />
                                                {vet.name}
                                            </CardStyled>}
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    :
                    isLoading ?
                        <Loading />
                        :
                        <p>Não possui nenhum veterinário cadastrado.</p>
                }
            </Section>
        </>
    )
}

export default ClinicVets;