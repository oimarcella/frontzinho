import React from "react";
import { ContainerStyled, FormStyled } from "./styles";
import HeaderPage from "../../components/layout/components/headerPage/headerPage";
import { Col, Form, Row } from "react-bootstrap";
import Button from "../../components/layout/components/button/button";
import { ERoutes } from "../../core/enums/routes";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignUpPage = () => {

    return (
        <ContainerStyled>
            <HeaderPage
                textToStyle=""
                style={{ color: "#FF41AD" }}
                title="Cadastro"
                text="Vamos criar sua conta!"
            />

            <a href={ERoutes.ORIGIN}><FontAwesomeIcon icon={faArrowLeft} /> Fazer login</a>

            <FormStyled className="d-flex flex-column align-items-end mt-4">
                <div>
                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Control type="text" placeholder="Nome completo" />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group className="mb-3" controlId="cpf">
                                <Form.Control type="number" placeholder="CPF" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Control type="number" placeholder="Telefone/celular" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Control type="email" placeholder="E-mail" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Control type="password" placeholder="Senha" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col md={10}>
                            <Form.Group className="mb-3" controlId="street">
                                <Form.Control type="text" placeholder="Rua" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="number">
                                <Form.Control type="text" placeholder="Número" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <Form.Group className="mb-3" controlId="zipcode">
                                <Form.Control type="text" placeholder="CEP" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="neighborhood">
                                <Form.Control type="text" placeholder="Número" />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>

                <Button color="#FF41AD" outlined="none">
                    Criar conta
                </Button>
            </FormStyled>
        </ContainerStyled >
    );
};

export default SignUpPage;
