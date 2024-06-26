import { Delete, Edit, RemoveRedEye, Timeline } from "@material-ui/icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { CardStyled } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { ERoutes } from "../../../../core/enums/routes";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/userSlice";
import api from "../../../../services/api";


type PetCardT = {
    pet: {
        name: string;
        id?: number;
        specie: string;
    };
    index: number;
    deletePet?: (petId: number) => {};
    editPet?: (petId: number) => void;
}

const PetCard = ({ pet, index, ...props }: PetCardT) => {
    const navigate = useNavigate();
    const userLogged = useSelector(selectUser);
    const [petSpecie, setPetSpecie] = useState("");

    const generatePastelColor = (index: number) => {
        const baseHue = (index * 137.3) % 360; // Varia o tom da cor com base no índice
        const saturation = 70; // Defi3e a saturação
        const lightness = 80; // Define a luminosidade
        return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
    };

    const MyOverlay = ({ id, children, title, className }: { id: any, children: ReactNode, title: string, className: string }) => (
        <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
            <a href="#" className={className}>{children}</a>
        </OverlayTrigger>
    );

    useEffect(() => {
        api.get(`/pets/${pet.id}`)
            .then(response => {
                setPetSpecie(response.data.specie);
            })
            .catch((error) => {
                console.log("Não foi possível buscar pelo pet");
            })
    }, []);

    return (
        <>
            <CardStyled
                style={{ background: generatePastelColor(index) }}
                className="d-flex flex-column align-items-center justify-content-center"
            >
                <img
                    src={`/images/${petSpecie == "cachorro" ?
                        "dog" : petSpecie == "gato" ?
                            "cat" : "another_animals"}.svg`}
                    alt={`${pet.name} - ${petSpecie}`}
                />
                {pet.name}
                <div className="mt-3 d-flex align-items-center">
                    <MyOverlay className="pe-1 ps-1" title="Perfil" id={pet.name}>
                        <RemoveRedEye className="icon-actions" onClick={() => navigate(`${ERoutes.PET}/${pet.id}`)} />
                    </MyOverlay>
                    <MyOverlay className="pe-1 ps-1" title="Linha do tempo" id={pet.id}>
                        <Timeline className="icon-actions" onClick={() => navigate(`${ERoutes.TIMELINE}/${pet.id}`)} />
                    </MyOverlay>
                    {
                        userLogged.role === "user" &&
                        <>
                            < MyOverlay className="pe-1 ps-1" title="Apagar" id={pet.id}>
                                <Delete className="icon-actions"
                                    onClick={() => {
                                        if (pet.id) props.deletePet && props.deletePet(pet.id)
                                    }}
                                />
                            </MyOverlay>
                            <MyOverlay className="pe-1 ps-1" title="Editar" id={pet.id}>
                                <Edit className="icon-actions"
                                    onClick={() => {
                                        if (pet.id) props.editPet && props.editPet(pet.id)
                                    }}
                                />
                            </MyOverlay>
                        </>
                    }
                </div>
            </CardStyled >
        </>
    )
}
export default PetCard;