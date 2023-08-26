import { Container } from "react-bootstrap";
import { BodyStyled, HeaderStyled, ProfilePetPageStyled } from "./styles";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import { Section } from "../../components/layout/components/styles/sections";
import { Pets } from "@material-ui/icons";

type QueryParamsT = {
    petId: string;
};

type PetT = {
    size: string;
    gender: string;
    age: string;
    id: number;
    breed: string;
    specie: string;
    name: string;
    weight: number;
    castrated: boolean;
}



function ProfilePetPage() {
    const params = useParams<QueryParamsT>();
    const [pet, setPet] = useState<PetT>({} as PetT);

    async function getPetById(id: number) {
        const { data } = await api.get(`pets/${id}`);
        setPet(data);
        console.log("🚀 ~ file: index.tsx:34 ~ getPetById ~ data:", data)
    }

    useEffect(() => {
        params.petId && getPetById(Number(params.petId));
    }, []);

    return (
        <>
            <HeaderStyled>
                <Section>
                    <Container className="d-flex flex-row align-items-center justify-content-lg-between justify-content-center flex-wrap">
                        <div className="d-flex flex-lg-row flex-column justify-content-center align-items-center justify-content-md-start">
                            <img src={`/images/${pet.specie == "cachorro" ? "dog" : pet.specie == "gato" ? "cat" : "another_animals"}.svg`} />
                            <h3 className="ms-4 my-4 my-md-0">{pet.name}</h3>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center"
                            style={{ flex: 1 }}
                        >
                            <ul>
                                <p className="d-flex align-items-center"><Pets className="me-2" fontSize="small" /><strong className="me-1">Idade:</strong>{pet.age}</p>
                                <p className="d-flex align-items-center"><Pets className="me-2" fontSize="small" /><strong className="me-1">Raça:</strong>{pet.breed}</p>
                                <p className="d-flex align-items-center"><Pets className="me-2" fontSize="small" /><strong className="me-1">Gênero:</strong>{pet.gender}</p>
                                <p className="d-flex align-items-center"><Pets className="me-2" fontSize="small" /><strong className="me-1">Peso:</strong>{pet.weight}</p>
                                <p className="d-flex align-items-center"><Pets className="me-2" fontSize="small" /><strong className="me-1">Castração:</strong>{pet.castrated ? "Sim" : "Não"}</p>
                            </ul>
                        </div>
                    </Container>
                </Section>
            </HeaderStyled>
            <BodyStyled>
                <Section>
                    <h3 className="mb-4">O que vamos fazer hoje?</h3>
                </Section>
                <Section>
                    <h3 className="mb-4">Linha do tempo</h3>
                </Section>
            </BodyStyled>
        </>
    );
}
export default ProfilePetPage;