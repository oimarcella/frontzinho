import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { ERoutes } from "../../core/enums/routes";
import { useNavigate } from "react-router-dom";
import { BodyNodeCadastroPet, CardStyled, ContainerStyled, PagePanel } from "./styles";
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowDimensions from "../../core/hooks/useWindowDimensions";
import Button from "../../components/layout/components/button/button";
import { show } from "../../redux/modalSlice";
import { Form, Col, Row } from "react-bootstrap";

// Import Swiper styles
import 'swiper/css';

const PanelPage = () => {
    const user = useSelector(selectUser);
    const [pet, setPet] = useState({});
    const navigate = useNavigate();
    const pets = ["Didi", "Zup", "Lina", "Lik", "Lully"];
    const viewWidth = useWindowDimensions().width;
    let slidesPerView = 0;
    const dispatch = useDispatch();

    if (viewWidth > 1000) slidesPerView = 3.3;
    else if (viewWidth < 400) slidesPerView = 1.3;
    else slidesPerView = 2.3;

    const generatePastelColor = (index: number) => {
        const baseHue = (index * 137.3) % 360; // Varia o tom da cor com base no índice
        const saturation = 70; // Defi3e a saturação
        const lightness = 80; // Define a luminosidade
        return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
    };

    useEffect(() => {
        !user.id && navigate(ERoutes.LOGIN);
    }, []);

    const bodyNode = <BodyNodeCadastroPet>
        <Form>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Control required type="text" placeholder="Nome" onChange={e => setPet(prev => ({ ...prev, name: e.target.value }))} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="weight">
                        <Form.Control required type="text" placeholder="Peso aproximado em Kgs" onChange={e => setPet(prev => ({ ...prev, weight: e.target.value }))} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="age">
                        <Form.Control required type="text" placeholder="Idade" onChange={e => setPet(prev => ({ ...prev, age: e.target.value }))} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="breed">
                        <Form.Control required type="text" placeholder="Raça" onChange={e => setPet(prev => ({ ...prev, breed: e.target.value }))} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Control as="textarea" rows={3} required type="text" placeholder="Algo importante a registrar" onChange={e => setPet(prev => ({ ...prev, description: e.target.value }))} />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    </BodyNodeCadastroPet>;

    function handleAddPet() {
        dispatch(show({
            bodyNode: bodyNode,
            hasHeader: true,
            title: "Novo pet"
        }));
    }

    return (
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

                    <Swiper
                        spaceBetween={viewWidth > 1000 ? 30 : 10}
                        slidesPerView={slidesPerView}
                        onSlideChange={() => { }}
                        onSwiper={(swiper) => { }}
                    >
                        {
                            pets.map((pet, index) => {
                                return <SwiperSlide key={pet}>
                                    <CardStyled
                                        className="d-flex flex-column align-items-center justify-content-center"
                                        style={{ background: generatePastelColor(index) }}
                                    >
                                        <img src="/images/cat.svg" alt="Cachorro" />
                                        {pet}
                                    </CardStyled>
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </section>
            </ContainerStyled>
        </PagePanel >
    )
}
export default PanelPage;