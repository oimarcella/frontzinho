import React, { useState, useEffect } from "react";
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from "react-redux";
import { CardStyled } from "./styles";
import { Form, Col, Row, Modal } from "react-bootstrap";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { selectUser } from '../../../../redux/userSlice';
import useWindowDimensions from '../../../../core/hooks/useWindowDimensions';
import Button from "../../../../components/layout/components/button/button";
import Loading from "../../../../components/layout/components/loading";
import api from "../../../../services/api";
import { show } from "../../../../redux/toastSlice";
import { Section } from "../../../../components/layout/components/styles/sections";

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

/*
    TODO
    - talvez / Verificar se a modal de cadastro foi fechada, e se sim limpar o formulario
    - Corrigir cadastro pet
*/

const YourPets = () => {
    const [isLoading, setLoading] = useState(false);
    const user = useSelector(selectUser);
    const [pet, setPet] = useState<PetT>({} as PetT);
    const viewWidth = useWindowDimensions().width;
    let slidesPerView = 0;
    const dispatch = useDispatch();
    const [pets, setPets] = useState<PetT[]>([]);
    const [petIsLoading, setPetIsLoading] = useState(0);
    const [openMoreOptions, setOpenMoreOptions] = React.useState<null | HTMLElement>(null);
    const [whichMoreOptions, setWhichMoreOptions] = useState<null | number>(null);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
        setIsEditing(false);
        setIsAddingPet(false);
    };
    const handleShow = () => setShowModal(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingPet, setIsAddingPet] = useState(false);

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
        setPet(prevPet => ({
            ...prevPet,
            age: "",
            specie: "",
            name: "",
            castrated: "",
            weight: 0,
            gender: "",
            breed: "",
            size: "",
            description: ""
        }));
    }

    const handlePetFieldChange = (field: string, value: any) => {
        setPet(prev => ({
            ...prev,
            [field]: value
        }));
    };

    async function registerNewPet() {
        let isCastrated = false;

        if (pet.castrated == "sim") {
            isCastrated = true;
        }

        const body = {
            ...pet,
            gender: pet.gender == "2" ? "femea" : "macho",
            age: pet.age,
            castrated: isCastrated,
            user_id: user.id
        };

        try {
            let response = await api.post("/pets", body);
            setPets([...pets, response.data]);
            dispatch(
                show({
                    message: `Novo pet! `,
                    type: "success"
                })
            );
            handleCloseModal();
            clearForm();
            setIsAddingPet(false);
        }
        catch (error) {
            console.log("Erro:", error);
            dispatch(
                show({
                    message: `Erro ao cadastrar pet`,
                    type: "error"
                })
            );
        }
    }

    useEffect(() => {
        setLoading(true);
        api.get(`/pets/${user.id}`)
            .then((response) => {

                setPets(response.data.reverse());
                setLoading(false);
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

    const bodyAddPet = <>
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
                            <option value="macho">Menino</option>
                            <option value="femea">Menina</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col >
                    <Form.Group className="mb-3" controlId="castrated">
                        <Form.Select aria-label="Default select example" required placeholder="Castrado(a)" onChange={e => handlePetFieldChange("castrated", e.target.value)} >
                            <option>Castrado(a)?</option>
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                            <option value="nao">Não se aplica</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="weight">
                        <Form.Control required type="number" placeholder="Peso aproximado em Kgs" onChange={e => handlePetFieldChange("weight", e.target.value)} />
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
            <Button color="#FF41AD" outlined="none" type="button" onClick={() => {
                registerNewPet()
            }}>
                Adicionar
            </Button>
        </Form>
    </>;

    const bodyEditPet = <>
        <Form>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Control required type="text" placeholder="Nome" onChange={e => handlePetFieldChange("name", e.target.value)} value={pet.name} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="specie">
                        <Form.Select aria-label="Default select example" required placeholder="Espécie" onChange={e => handlePetFieldChange("specie", e.target.value)} value={pet.specie} >
                            <option>Espécie</option>
                            <option value="cachorro">Cachorro</option>
                            <option value="gato">Gato</option>
                            <option value="outro">Outro</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="size">
                        <Form.Select aria-label="Default select example" required placeholder="Porte" onChange={e => handlePetFieldChange("size", e.target.value)} value={pet.size}>
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
                        <Form.Select aria-label="Default select example" required placeholder="Gênero" onChange={e => handlePetFieldChange("gender", e.target.value)} value={pet.gender}>
                            <option>Gênero</option>
                            <option value="macho">Menino</option>
                            <option value="femea">Menina</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col >
                    <Form.Group className="mb-3" controlId="castrated">
                        <Form.Select aria-label="Default select example" required placeholder="Castrado(a)" onChange={e => handlePetFieldChange("castrated", e.target.value)} value={pet.castrated ? "sim" : "nao"}>
                            <option>Castrado(a)?</option>
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                            <option value="nao">Não se aplica</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="weight">
                        <Form.Control required type="number" placeholder="Peso aproximado em Kgs" onChange={e => handlePetFieldChange("weight", e.target.value)} value={pet.weight} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="age">
                        <Form.Control required type="text" placeholder="Idade" onChange={e => handlePetFieldChange("age", e.target.value)} value={pet.age} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="breed">
                        <Form.Control required type="text" placeholder="Raça" onChange={e => handlePetFieldChange("breed", e.target.value)} value={pet.breed} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Control as="textarea" rows={3} required type="text" placeholder="Algo importante a registrar" onChange={e => handlePetFieldChange("description", e.target.value)} value={pet.description} />
                    </Form.Group>
                </Col>
            </Row>
            <Button color="#FF41AD" outlined="none" type="button" onClick={() => {
                pet.id && finishEditPet(pet.id)
            }}>
                Adicionar
            </Button>
        </Form>
    </>;

    function handleAddPet() {
        setIsAddingPet(true);
        handleShow();
    }

    function handleMoreOptions(event: any, pet: number | undefined) {
        setOpenMoreOptions(event.currentTarget);
        pet && setWhichMoreOptions(pet);
    }

    const handleClose = () => {
        setOpenMoreOptions(null);
        setWhichMoreOptions(null);
    };

    function handleEditPet(petId: number) {
        setIsEditing(true);
        handleShow();
        handleClose();

        const petEdited = pets.find(pet => pet.id === petId);
        petEdited && setPet(petEdited);
    }

    async function finishEditPet(petId: number) {
        try {
            await api.put(`/pets/${petId}`, pet);
            dispatch(show({
                type: "success",
                message: "Pet editado!"
            }));


            const petEditedIndex = pets.findIndex(pet => pet.id === petId);
            const tempPets = [...pets];
            tempPets[petEditedIndex] = pet;

            setPets(tempPets);

            handleCloseModal();
            clearForm();
            setIsEditing(false);
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

            setPets(newPets);
            setPetIsLoading(0);

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

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    {
                        isEditing && "Editar dados"
                    }
                    {
                        isAddingPet && "Novo pet!"
                    }
                </Modal.Header>
                <Modal.Body>
                    {
                        isEditing && bodyEditPet
                    }
                    {
                        isAddingPet && bodyAddPet
                    }
                </Modal.Body>
            </Modal>

            <Section>
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

                {(!isLoading && (pets.length > 0)) ?
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
                                                <div className="d-flex flex-row-reverse align-items-start justify-content-between">
                                                    <IconButton
                                                        aria-label="more"
                                                        onClick={(e) => handleMoreOptions(e, pet.id)}
                                                        aria-haspopup="true"
                                                        aria-controls="long-menu"
                                                    >
                                                        <MoreVert />
                                                    </IconButton>
                                                    <Menu
                                                        id={`more-options-${pet.id}-${index}`}
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
                                                        open={whichMoreOptions === pet.id}
                                                    >
                                                        <MenuItem onClick={() => {
                                                            if (pet.id) deletePet(pet.id)
                                                        }}>Remover</MenuItem>
                                                        <MenuItem onClick={() => {
                                                            if (pet.id) handleEditPet(pet.id)
                                                        }}>Editar</MenuItem>
                                                    </Menu>

                                                    <div className="d-flex justify-content-center">
                                                        <img
                                                            src={`/images/${pet.specie == "cachorro" ?
                                                                "dog" : pet.specie == "gato" ?
                                                                    "cat" : "another_animals"}.svg`}
                                                            alt={`${pet.name} - ${pet.specie}`}
                                                        />
                                                    </div>
                                                </div>
                                                {pet.name}
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
                        <p>Nenhum pet por enquanto</p>
                }
            </Section>
        </>
    )
}

export default YourPets;