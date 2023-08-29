import { Container } from "react-bootstrap";
import { BodyStyled, HeaderStyled } from "./styles";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useParams } from "react-router-dom";
import { Section } from "../../components/layout/components/styles/sections";
import { Pets } from "@material-ui/icons";
import { ERoutes } from "../../core/enums/routes";

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
    const currentUrl = window.location.host;
    const params = useParams<QueryParamsT>();
    const [pet, setPet] = useState<PetT>({} as PetT);
    const [url, setUrl] = useState(currentUrl === "localhost:5173" ? "http://localhost:5173/historico" : "https://frontzinho.vercel.app/historico");

    async function getPetById(id: number) {
        const { data } = await api.get(`pets/${id}`);
        setPet(data);
    }

    useEffect(() => {
        params.petId && getPetById(Number(params.petId));
    }, []);

    return (
        <>
            <HeaderStyled>
                <Section>
                    <Container className="d-flex flex-column  flex-md-row align-items-center justify-content-md-between justify-content-center">
                        <div className="d-flex flex-md-row flex-column justify-content-center align-items-center justify-content-md-start">
                            <img src={`/images/${pet.specie == "cachorro" ? "dog" : pet.specie == "gato" ? "cat" : "another_animals"}.svg`} />
                            <strong className="ms-4 my-4 my-md-0">{pet.name}</strong>
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
                    <div className="d-flex align-items-center mb-4">
                        <h3>Linha do tempo</h3>
                        <Link className="ms-3 ver-mais" to={ERoutes.HISTORY}>Ver mais</Link>
                    </div>
                    {/*@ts-ignore*/}
                    <div>
                        <iframe
                            id="myIframe"
                            src={`${url}?origin=${"iframe"}`}
                            width="100%"
                            height="220px"
                            style={{}}
                            title="Timeline"
                        />
                    </div>
                </Section>
            </BodyStyled>
        </>
    );
}
export default ProfilePetPage;