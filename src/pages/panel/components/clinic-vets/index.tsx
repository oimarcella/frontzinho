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
import { Section } from "../../../../components/layout/components/styles/sections";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "../../../../core/enums/routes";

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
    const [vet, setVet] = useState<VetT>({} as VetT);
    const viewWidth = useWindowDimensions().width;
    let slidesPerView = 0;
    const dispatch = useDispatch();
    const [vets, setVets] = useState<VetT[]>([]);
    const [petIsLoading, setPetIsLoading] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleShow = () => setShowModal(true);
    const navigate = useNavigate();

    if (viewWidth > 1000) slidesPerView = 3.3;
    else if (viewWidth < 400) slidesPerView = 1.3;
    else slidesPerView = 2.3;


    function clearForm() {
        setVet(prevPet => ({
            ...prevPet,
            name: "",
            username: "",
            password: "",
        }));
    }

    const handleVetFieldChange = (field: string, value: any) => {
        setVet(prev => ({
            ...prev,
            [field]: value
        }));
    };

    async function registerNewPet() {
        const body = {}

        try {
            let response = await api.post("/vets", body);
            setVets([...vets, response.data]);
            dispatch(
                show({
                    message: `Veterinário(a) ${vet.name}! `,
                    type: "success"
                })
            );
            handleCloseModal();
            clearForm();
        }
        catch (error) {
            console.log("Erro:", error);
            dispatch(
                show({
                    message: `Erro ao cadastrar vet`,
                    type: "error"
                })
            );
        }
    }

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

    const bodyAddPet = <>
        <Form>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Control required type="text" placeholder="Nome" onChange={e => handleVetFieldChange("name", e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="specie">
                        <Form.Select aria-label="Default select example" required placeholder="Espécie" onChange={e => handleVetFieldChange("specie", e.target.value)} >
                            <option>Espécie</option>
                            <option value="cachorro">Cachorro</option>
                            <option value="gato">Gato</option>
                            <option value="outro">Outro</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="size">
                        <Form.Select aria-label="Default select example" required placeholder="Porte" onChange={e => handleVetFieldChange("size", e.target.value)} >
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
                        <Form.Select aria-label="Default select example" required placeholder="Gênero" onChange={e => handleVetFieldChange("gender", e.target.value)} >
                            <option>Gênero</option>
                            <option value="macho">Menino</option>
                            <option value="femea">Menina</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col >
                    <Form.Group className="mb-3" controlId="castrated">
                        <Form.Select aria-label="Default select example" required placeholder="Castrado(a)" onChange={e => handleVetFieldChange("castrated", e.target.value)} >
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
                        <Form.Control required type="number" placeholder="Peso aproximado em Kgs" onChange={e => handleVetFieldChange("weight", e.target.value)} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="age">
                        <Form.Control required type="text" placeholder="Idade" onChange={e => handleVetFieldChange("age", e.target.value)} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="breed">
                        <Form.Control required type="text" placeholder="Raça" onChange={e => handleVetFieldChange("breed", e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Control as="textarea" rows={3} required type="text" placeholder="Algo importante a registrar" onChange={e => handleVetFieldChange("description", e.target.value)} />
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


    function handleAdd() {
        navigate(ERoutes.REGISTER_VETERINARIAN);
        //handleShow();
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
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    Novo veterinário
                </Modal.Header>
                <Modal.Body>
                    {bodyAddPet}
                </Modal.Body>
            </Modal>

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