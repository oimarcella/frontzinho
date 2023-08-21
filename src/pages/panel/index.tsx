import React, { useEffect, useState } from "react";
// Import Swiper styles
import 'swiper/css';
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { CardStyled, ContainerStyled, DropdownStyled, PagePanel } from "./styles";
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowDimensions from "../../core/hooks/useWindowDimensions";
import Button from "../../components/layout/components/button/button";
import { showModal } from "../../redux/modalSlice";
import { Form, Col, Row } from "react-bootstrap";
import api from "../../services/api";
import Loading from "../../components/layout/components/loading";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { show } from "../../redux/toastSlice";


type PetT = {
    id?: number;
    age: string;
    specie: string;
    name: string;
    castrated: string;
    weight: number;
    gender: string;
    breed: string;
    size: string;
    description: string;
};

const PanelPage = () => {
    const [isLoading, setLoading] = useState(false);
    const user = useSelector(selectUser);
    const [pet, setPet] = useState<PetT>({} as PetT);
    const viewWidth = useWindowDimensions().width;
    let slidesPerView = 0;
    const dispatch = useDispatch();
    const [pets, setPets] = useState<PetT[]>([]);
    const [petIsLoading, setPetIsLoading] = useState(0);

    const [openMoreOptions, setOpenMoreOptions] = React.useState<null | HTMLElement>(null);
    const [whichMoreOptions, setWhichMoreOptions] = useState<null | string>(null);

    if (viewWidth > 1000) slidesPerView = 3.3;
    else if (viewWidth < 400) slidesPerView = 1.3;
    else slidesPerView = 2.3;


    const generatePastelColor = (index: number) => {
        const baseHue = (index * 137.3) % 360; // Varia o tom da cor com base no índice
        const saturation = 70; // Defi3e a saturação
        const lightness = 80; // Define a luminosidade
        return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
    };

    function clearForm() {
        setPet({
            age: "",
            specie: "",
            name: "",
            castrated: "",
            weight: 0,
            gender: "",
            breed: "",
            size: "",
            description: ""
        });
    }

    const handlePetFieldChange = (field: string, value: any) => {
        setPet(prev => ({
            ...prev,
            [field]: value
        }));
    };

    async function registerNewPet() {
        const newPet = pet;
        let isCastrated = false;

        if (pet.castrated == "sim") {
            isCastrated = true;
        }

        const body = {
            ...newPet,
            gender: newPet.gender == "2" ? "femea" : "macho",
            age: newPet.age,
            castrated: isCastrated,
            user_id: user.id
        }

        try {
            let response = await api.post("/pets", body);
            setPets([...pets, response.data]);
            clearForm();
        }
        catch (error) {
            console.log("Erro:", error);
        }
    }

    useEffect(() => {
        setLoading(true);
        api.get(`/pets/${user.id}`)
            .then((response) => {
                setPets(response.data);
                setTimeout(
                    () => {
                        setLoading(false);
                    },
                    3000
                )
            })
            .catch(error => {
                console.log("Erro: ", error);

                setTimeout(
                    () => {
                        setLoading(false);
                    },
                    3000
                )
            });

    }, [user.id]);

    const bodyNode = <>
        <Form>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Control required type="text" placeholder="Nome" onChange={e => handlePetFieldChange("name", e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="specie">
                        <Form.Select aria-label="Default select example" required placeholder="Espécie" onChange={e => handlePetFieldChange("specie", e.target.value)} >
                            <option>Espécie</option>
                            <option value="cachorro">Cachorro</option>
                            <option value="gato">Gato</option>
                            <option value="outro">Outro</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="size">
                        <Form.Select aria-label="Default select example" required placeholder="Porte" onChange={e => handlePetFieldChange("size", e.target.value)} >
                            <option>Porte</option>
                            <option value="pequeno">Pequeno</option>
                            <option value="medio">Médio</option>
                            <option value="grande">Grande</option>
                            <option value="gigante">Gigante</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={5}>
                    <Form.Group className="mb-3" controlId="gender">
                        <Form.Select aria-label="Default select example" required placeholder="Gênero" onChange={e => handlePetFieldChange("gender", e.target.value)} >
                            <option>Gênero</option>
                            <option value="1">Menino</option>
                            <option value="2">Menina</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col >
                    <Form.Group className="mb-3" controlId="castrated">
                        <Form.Select aria-label="Default select example" required placeholder="Castrado(a)" onChange={e => handlePetFieldChange("castrated", e.target.value)} >
                            <option>Castrado(a)?</option>
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="weight">
                        <Form.Control required type="text" placeholder="Peso aproximado em Kgs" onChange={e => handlePetFieldChange("weight", e.target.value)} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="age">
                        <Form.Control required type="text" placeholder="Idade" onChange={e => handlePetFieldChange("age", e.target.value)} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="breed">
                        <Form.Control required type="text" placeholder="Raça" onChange={e => handlePetFieldChange("breed", e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Control as="textarea" rows={3} required type="text" placeholder="Algo importante a registrar" onChange={e => handlePetFieldChange("description", e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
            <Button color="#FF41AD" outlined="none" type="button" onClick={registerNewPet}>
                Adicionar
            </Button>
        </Form>
    </>;

    function handleAddPet() {
        dispatch(showModal({
            bodyNode: bodyNode,
            hasHeader: true,
            title: "Cadastrar novo pet"
        }));
    }

    function handleMoreOptions(event: any, petName: string) {
        setOpenMoreOptions(event.currentTarget);
        setWhichMoreOptions(petName);
    }

    const handleClose = () => {
        setOpenMoreOptions(null);
        setWhichMoreOptions(null);
    };

    async function editPet(petId: number) {
        try {
            if (petId) {
                setPetIsLoading(petId);
                await api.put(`/pets/${petId}`)
                const newPets = pets.filter(pet => pet.id !== petId);
                setTimeout(() => {
                    setPets(newPets);
                    setPetIsLoading(0);
                }, 3000);

                handleClose();
            }
        }
        catch (error) {
            setPetIsLoading(0);
            console.log("Erro:", error);
            dispatch(show({
                type: "error",
                message: "Não foi possível editar o pet"
            }));
        }
    }
    async function deletePet(petId: number) {
        try {
            setPetIsLoading(petId);
            await api.delete(`/pets/${petId}`)
            const newPets = pets.filter(pet => pet.id !== petId);

            setTimeout(() => {
                setPets(newPets);
                setPetIsLoading(0);
            }, 3000);

            handleClose();
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

    return !isLoading ? (

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

                    {pets.length > 0 &&
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
                                            {(petIsLoading && petIsLoading === pet.id) ?
                                                <Loading />
                                                :
                                                <CardStyled
                                                    className="d-flex flex-column align-items-center justify-content-center"
                                                    style={{ background: generatePastelColor(index) }}
                                                >
                                                    <div className="d-flex flex-row-reverse align-items-start">
                                                        <IconButton
                                                            aria-label="more"
                                                            onClick={(e) => handleMoreOptions(e, pet.name)}
                                                            aria-haspopup="true"
                                                            aria-controls="long-menu"
                                                        >
                                                            <MoreVert />
                                                        </IconButton>
                                                        <Menu
                                                            id={`more-options-${pet.name}-${index}`}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'left',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                            aria-labelledby="demo-positioned-button"
                                                            anchorEl={openMoreOptions as any}
                                                            keepMounted onClose={handleClose}
                                                            open={whichMoreOptions === pet.name}
                                                        >
                                                            <MenuItem onClick={() => {
                                                                if (pet.id) deletePet(pet.id)
                                                            }}>Remover</MenuItem>
                                                            <MenuItem onClick={() => {
                                                                if (pet.id) editPet(pet.id)
                                                            }}>Editar</MenuItem>
                                                        </Menu>

                                                        <img
                                                            src={`/images/${pet.specie == "cachorro" ?
                                                                "dog" : pet.specie == "gato" ?
                                                                    "cat" : "another_animals"}.svg`}
                                                            alt={`${pet.name} - ${pet.specie}`}
                                                        />
                                                    </div>
                                                    {pet.name}
                                                </CardStyled>}
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>}
                </section>
            </ContainerStyled>
        </PagePanel >
    )
        :

        <Loading />
}
export default PanelPage;