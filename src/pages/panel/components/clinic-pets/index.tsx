import { ReactNode, useEffect, useState } from "react";
// Import Swiper styles
import 'swiper/css';
import { Section } from "../../../../components/layout/components/styles/sections";
import { ContainerStyled } from "../../styles";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/userSlice";
import api from "../../../../services/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowDimensions from "../../../../core/hooks/useWindowDimensions";
import Loading from "../../../../components/layout/components/loading";
import { CardStyled } from "./styles";
import { RemoveRedEye } from "@material-ui/icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "../../../../core/enums/routes";

type PetT = {
    name: string;
    id: number;
}

const ClinicPets = () => {
    const [clinic, setClinic] = useState();
    const [pets, setPets] = useState<Array<PetT>>([]);
    const userLogged = useSelector(selectUser);
    const typeUserLogged = userLogged.role === "clinica" ? "clinica" : "vet";
    const viewWidth = useWindowDimensions().width;
    let slidesPerView = 0;
    const navigate = useNavigate();

    if (viewWidth > 1000) slidesPerView = 3.3;
    else if (viewWidth < 400) slidesPerView = 1.3;
    else slidesPerView = 2.3;

    const generatePastelColor = (index: number) => {
        const baseHue = (index * 137.3) % 360; // Varia o tom da cor com base no índice
        const saturation = 70; // Defi3e a saturação
        const lightness = 80; // Define a luminosidade
        return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
    };

    async function getVetById(vetId: number) {
        const { data } = await api.get(`/vets/${vetId}`);
        setClinic(data.clinica_id);
        return data;
    }

    async function getPetsByClinicId(clinicId: number) {
        const { data } = await api.get(`/clinicas/${clinicId}/pets`);
        setPets(data);
    }

    useEffect(() => {
        if (typeUserLogged === "vet") {
            getVetById(userLogged.id)
                .then(vet => getPetsByClinicId(vet.clinica_id));
        }
        else {
            getPetsByClinicId(userLogged.id);
        }

    }, [userLogged.id])

    const MyOverlay = ({ id, children, title }: { id: any, children: ReactNode, title: string }) => (
        <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
            <span style={{ cursor: "pointer" }}>{children}</span>
        </OverlayTrigger>
    );

    return (
        <ContainerStyled>
            <Section>
                <h3>Pacientes</h3>

                {
                    pets.length > 0 ?
                        <Swiper
                            className="mt-3"
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
                                                style={{ background: generatePastelColor(index) }}
                                                className="d-flex flex-column align-items-center justify-content-center"
                                            >
                                                <img
                                                    src={"/images/another_animals.svg"}
                                                    alt={pet.name}
                                                />
                                                {pet.name}
                                                <div className="d-flex align-items-center">
                                                    <MyOverlay title="Ver paciente" id={pet.name}><RemoveRedEye className="icon-actions" onClick={() => navigate(`${ERoutes.PET}/${pet.id}`)} /></MyOverlay>
                                                </div>
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