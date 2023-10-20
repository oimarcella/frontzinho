import { Col, Container, Form, Modal, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { BodyStyled, HeaderStyled, ButtonStyled, DrawerStyled, CompanyConnectedStyled } from "./styles";
import { ReactNode, useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Section } from "../../components/layout/components/section/sections";
import { Add, LinkOff, LinkOutlined, Pets, Timeline } from "@material-ui/icons";
import { ERoutes } from "../../core/enums/routes";
import { WifiProtectedSetup } from "@mui/icons-material";
import useWindowDimensions from "../../core/hooks/useWindowDimensions";
import { Typography } from "@mui/material";
import Loading from "../../components/layout/components/loading";
import { selectUser } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/layout/components/button/button";
import { show } from "../../redux/toastSlice";
import { delay } from "@reduxjs/toolkit/dist/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ClinicAds from "../../components/layout/components/clinic-ads";

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
    description: string;
    weight: number;
    castrated: boolean;
}

/*TODO - O que vamos fazer hoje? */

function ProfilePetPage() {
    const currentUrl = window.location.host;
    const params = useParams<QueryParamsT>();
    const [pets, setPets] = useState<Array<PetT>>([]);
    const [pet, setPet] = useState<PetT>({} as PetT);
    const [url, setUrl] = useState(currentUrl === "localhost:5173" ? `http://localhost:5173/linha-do-tempo/${params.petId}` : `https://frontzinho.vercel.app/linha-do-tempo/${params.petId}`);
    const { width } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(selectUser);
    const [anchor, setAnchor] = useState(false);
    const [isOpenModalConnect, setIsOpenModalConnect] = useState(false);
    const [availableClinics, setAvailableClinics] = useState<Array<any>>([]);
    const [connectedClinics, setConnectedClinics] = useState<Array<any>>([]);
    const [clinicSelected, setClinicSelected] = useState(0);
    const dispatch = useDispatch();
    const [connectionLoading, setConnectionLoading] = useState(false);
    const isGuardian = user.role === 'user';
    const [clinicId, setClinicId] = useState(0);
    const navigate = useNavigate();

    async function getPetById(id: number) {
        const { data } = await api.get(`pets/${id}`);
        setPet(data);
    }

    async function getConnectedClinics(id: number) {
        const { data } = await api.get(`pets/${id}/clinicas/conectadas`);
        setConnectedClinics(data);
    }

    async function getNotConnectedClinics(id: number) {
        const { data } = await api.get(`pets/${id}/clinicas/nao-conectadas`);
        setAvailableClinics(data);
    }

    function handleDrawer() {
        setAnchor(true);
    }

    function handleChange(e: React.MouseEvent<HTMLLIElement, MouseEvent>, pet: any) {
        e.preventDefault();
        setAnchor(false);

        setIsLoading(true);
        setPet(pet);
        setIsLoading(false);

        navigate(`${ERoutes.PET}/${pet.id}`);
    }

    async function getUserPets(userId: number) {
        const { data } = await api.get(`/users/${userId}/pets`);
        setPets(data);
    }

    async function getPetsByClinicId(clinicId: number) {
        const { data } = await api.get(`/clinicas/${clinicId}/pets`);
        setPets(data);
    }

    async function getAllClinics() {
        const response = await api.get("/clinicas");
    }

    async function connectPet() {
        try {
            api.post("/pets/connect", {
                clinica: clinicSelected,
                pet: pet.id
            });

            setClinicSelected(0);
            setIsOpenModalConnect(false);


            const clinicToConnect = availableClinics.find(clinic => {
                if (clinic.id === clinicSelected)
                    return { name: clinic.name, id: clinic.id }
            });
            const newConnectedArray = [...connectedClinics, clinicToConnect];
            setConnectedClinics(newConnectedArray);

            const newAvailableClinicArray = availableClinics.filter(clinic =>
                clinic.id !== clinicSelected
            );
            setAvailableClinics(newAvailableClinicArray);

            dispatch(
                show({ message: "Conectado!", type: "success" })
            );
        }
        catch (error) {
            console.log("Erro ao tentar conectar pet à clínica");
            console.log("🚀 ~ file: index.tsx:166 ~ connectPet ~ pet:", pet)
            dispatch(
                show({ message: "Não foi possível conectar-se à clínica no momento", delay: 4000, type: "error" })
            );
        }
    }

    function desconnect(clinicId: number) {
        try {
            api.delete("/pets/connect", {
                data: {
                    clinica: clinicId,
                    pet: pet.id
                }
            });

            const newNotConnectedArray: Array<any> = [];
            let clinicDeleted = null;
            connectedClinics.forEach(clinic => {
                if (clinic.id !== clinicId) newNotConnectedArray.push(clinic);
                else clinicDeleted = clinic;
            });
            setConnectedClinics(newNotConnectedArray);

            const newAvailableArray = [...availableClinics, clinicDeleted];
            setAvailableClinics(newAvailableArray);

            dispatch(
                show({ message: "Desconectada", type: "success", delay: 2000 })
            );
        }
        catch (error) {
            console.log("Erro ao tentar desconectar da clínica");
            dispatch(
                show({ message: "Não foi possível desconectar", delay: 3000, type: "error" })
            );
        }
    }

    async function getVetById(vetId: number) {
        const { data } = await api.get(`/vets/${vetId}`);
        setClinicId(data.clinica_id);
        return data;
    }

    useEffect(() => {
        setTimeout(() => { setIsLoading(false) }, 1000);

        if (isGuardian) {
            // é tutor

            getUserPets(user.id);
            getConnectedClinics(pet.id);
            getNotConnectedClinics(pet.id);
        }
        else if (user.role === "clinica") {
            // é clínica
            getPetsByClinicId(user.id);
        }
        else {
            // é veterinário
            getVetById(user.id);
            getPetsByClinicId(clinicId); //verificar de qual clinica o veterinario
        }
    }, [user.id, pet.id, clinicId])

    useEffect(() => {
        setConnectionLoading(true);
        !pet.id ?
            params.petId && getPetById(Number(params.petId))
            :
            params.petId && getPetById(Number(pet.id));
        setConnectionLoading(false);
    }, [pet.id]);

    useEffect(() => {
        setUrl(prev => prev = currentUrl === "localhost:5173" ? `http://localhost:5173/linha-do-tempo/${params.petId}` : `https://petpass-front.vercel.app/linha-do-tempo/${params.petId}`);
    }, [params.petId])

    const MyOverlay = ({ id, children, title }: { id: any, children: ReactNode, title: string }) => (
        <OverlayTrigger overlay={< Tooltip id={id} > {title}</Tooltip>}>
            <a href="#">{children}</a>
        </OverlayTrigger >
    );

    return (
        <>
            {
                !isLoading ?
                    <>
                        <Modal show={isOpenModalConnect} onHide={() => setIsOpenModalConnect(false)}>
                            <Modal.Header>Conectar {pet.name} à uma clínica</Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Select aria-label="Selecione a clínica para conectar seu pet aqui"
                                                value={clinicSelected}
                                                onChange={(e) => setClinicSelected(Number(e.target.value))}
                                            >
                                                <option value={0}>Quer conectar seu pet com qual clínica?</option>
                                                {availableClinics.map(clinic => <option key={clinic.id} value={clinic.id}>{clinic.name}</option>)}
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Button className="mt-3" color="#FF41AD" outlined="none" type="button" onClick={() => connectPet()}>
                                        Conectar
                                    </Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                        <HeaderStyled gender={pet.gender}>
                            <Section>
                                <Container className="d-flex flex-column flex-md-row align-items-center justify-content-md-between justify-content-center">

                                    <div className="d-flex flex-column">
                                        <div className="mb-4 d-flex gap-2 flex-wrap justify-content-center justify-content-md-start align-items-center flex-row">
                                            <ButtonStyled
                                                gender={pet.gender}
                                                variant="body2" className="d-flex align-items-center justify-content-center"
                                                onClick={handleDrawer}
                                            >
                                                <WifiProtectedSetup />
                                                {width > 1000 && <strong className="ms-1">Ver outro pet</strong>}
                                            </ButtonStyled>
                                            <ButtonStyled
                                                gender={pet.gender} variant="body2" className="d-flex align-items-center">
                                                <a
                                                    href={`${ERoutes.CREATE_TIMELINE}/${pet.id}/${pet.name}`}
                                                    style={{ fontWeight: "bold" }}>
                                                    <Add />
                                                </a>
                                                {width > 1000 &&
                                                    <a
                                                        href={`${ERoutes.CREATE_TIMELINE}/${pet.id}/${pet.name}`}
                                                        style={{ fontWeight: "bold" }}>Novo registro</a>
                                                }
                                            </ButtonStyled>
                                            {isGuardian &&
                                                <ButtonStyled
                                                    gender={pet.gender}
                                                    variant="body2" className="d-flex align-items-center"
                                                    onClick={() => setIsOpenModalConnect(true)}
                                                >
                                                    <LinkOutlined />
                                                    {width > 1000 && <strong className="ms-1">Conectar a uma clínica</strong>}
                                                </ButtonStyled>
                                            }
                                            <ButtonStyled
                                                gender={pet.gender}
                                                variant="body2" className="d-flex align-items-center"
                                            >
                                                <Timeline />
                                                {width > 1000 &&
                                                    <a
                                                        href={`${ERoutes.TIMELINE}/${pet.id}`}
                                                        style={{ fontWeight: "bold" }} className="ms-1">Linha do tempo</a>
                                                }
                                            </ButtonStyled>
                                        </div>

                                        <div className="d-flex flex-md-row flex-column justify-content-center align-items-center justify-content-md-start">
                                            <img src={`/images/${pet.specie == "cachorro" ? "dog" : pet.specie == "gato" ? "cat" : "another_animals"}.svg`} />
                                            <div className="d-flex flex-column ms-0 ms-md-4 my-4 my-md-0 align-items-center align-items-md-start">
                                                <strong>{pet.name || "..."}</strong>
                                                <div className="wrapper-text">
                                                    <p>{pet.description ? pet.description : "Sem descrição"}</p>
                                                </div>
                                            </div>
                                        </div>
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
                            {isGuardian &&
                                <>
                                    <Section>
                                        <h3 className="mb-2">Conexões</h3>
                                        <small>Administre as conexões aqui. Clicando no ícone <LinkOff style={{ width: "20px" }} /> você desfaz a conexão do seu pet com a clínica.</small>
                                        <div className="mt-4 d-flex flex-wrap gap-2">
                                            {
                                                connectionLoading ?
                                                    <Loading />
                                                    :
                                                    connectedClinics.length > 0 ?
                                                        (
                                                            connectedClinics.map(clinic => {
                                                                return (
                                                                    <CompanyConnectedStyled key={clinic.id}>
                                                                        {clinic.name}
                                                                        <MyOverlay title="Desconectar" id={clinic.id}><LinkOff className="ms-2 clickable" onClick={() => desconnect(clinic.id)} /></MyOverlay>
                                                                    </CompanyConnectedStyled>
                                                                )
                                                            })
                                                        )
                                                        :
                                                        <p>Sem conexões no momento</p>
                                            }

                                        </div>
                                    </Section>
                                    {/*<Section>
                                        <h3 className="mb-4">O que vamos fazer hoje?</h3>
                                        </Section>*/}
                                </>

                            }

                            <ClinicAds orientation="horizontal" quantity={3} />

                            <Section>
                                <div className="d-flex align-items-center mb-4">
                                    <div className="d-flex flex-column">
                                        <h3>Linha do tempo</h3>
                                        <small>
                                            Esses são os últimos 3 registros feitos na linha do tempo do pet.
                                            Para conferir registros mais antigos confira a linha do tempo completa, clicando em <strong>Ver mais informações</strong> abaixo da linha do tempo.
                                        </small>
                                    </div>

                                </div>
                                {/*@ts-ignore*/}
                                <div className="d-flex flex-column align-items-center" style={{ marginTop: '100px' }}>
                                    <iframe
                                        id="myIframe"
                                        src={`${url}?origin=${"iframe"}`}
                                        width="100%"
                                        height="300px"
                                        title="Timeline"
                                    />
                                    <Link className="ms-3 ver-mais" to={`${ERoutes.TIMELINE}/${pet.id}`}>
                                        Ver mais informações
                                        <FontAwesomeIcon className="ms-1" icon={faArrowRight} />
                                    </Link>
                                </div>
                            </Section>
                        </BodyStyled>
                        <DrawerStyled
                            anchor={"right"}
                            open={anchor}
                            onClose={() => setAnchor(false)}
                        >
                            <ul>
                                {pets.map(pet =>
                                    <li
                                        key={pet.id}
                                        onClick={(e) => handleChange(e, pet)}
                                    >
                                        <strong>{pet.name}</strong>
                                    </li>
                                )}
                            </ul>
                        </DrawerStyled>
                    </>
                    :
                    <>
                        <Loading />
                    </>
            }
        </>
    );
}
export default ProfilePetPage;