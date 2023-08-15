import { ContainerStyled, FormStyled } from "./styles";
import HeaderPage from "../../components/layout/components/headerPage/headerPage";
import { Col, Form, Row } from "react-bootstrap";
import Button from "../../components/layout/components/button/button";
import { ERoutes } from "../../core/enums/routes";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from "../../services/api";
import { MouseEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { show } from "../../redux/toastSlice";
import { EHttpResponse } from "../../core/enums/http-responses";
import { login } from "../../redux/userSlice";

type userT = {
    name: string;
    lastname: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
    passwordConfirm: string;
    street: string;
    neighborhood: string;
    addressNumber: string;
    zipCode: string;
}

const SignUpPage = () => {
    const [user, setUser] = useState<userT>({
        name: "",
        lastname: "",
        email: "",
        cpf: "",
        phone: "",
        password: "",
        passwordConfirm: "",
        street: "",
        neighborhood: "",
        addressNumber: "",
        zipCode: ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [arePwdDifferent, setarePwdDifferent] = useState(false);

    async function send() {
        try {
            const { data } = await api.post("/users", {
                email: user.email,
                name: user.name,
                lastname: user.lastname,
                document: user.cpf,
                phone_number: user.phone,
                pwd: user.password,
                activated: true
            });
            dispatch(
                show({
                    message: `${data.name}, seu cadastro está pronto!`,
                    type: "success"
                })
            );

            const loggedUser = await api.post("/login", { email: user.email, pwd: user.password });
            localStorage.setItem("@petpass-token", loggedUser.data.user.token);
            dispatch(
                login({
                    id: loggedUser.data.user.id,
                    name: loggedUser.data.user.name,
                    email: loggedUser.data.user.email,
                    jwtToken: loggedUser.data.token
                })
            );
            navigate(ERoutes.PANEL);
        } catch (error: any) {
            if (error.response.status && typeof error.response.status === 'number') {
                const status = error.response.status;
                const errorMessage = EHttpResponse[status as keyof typeof EHttpResponse];
                dispatch(show({ message: errorMessage, type: "danger", delay: 4000 }));
            } else {
                dispatch(show({ message: "Não foi possível finalizar o cadastro", type: "danger", delay: 4000 }));
            }
        }
    }

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (user.password !== user.passwordConfirm) {
            setarePwdDifferent(true);
            setValidated(false);
        }
        else {
            setarePwdDifferent(false);
            setValidated(true);
            send();
        }
    }

    return (
        <ContainerStyled>
            <HeaderPage
                textToStyle=""
                style={{ color: "#FF41AD" }}
                title="Cadastro"
                text="Vamos criar sua conta!"
            />

            <a href={ERoutes.ORIGIN}><FontAwesomeIcon icon={faArrowLeft} /> Fazer login</a>

            <FormStyled
                className="d-flex flex-column align-items-end mt-4"
                validated={validated}
                onSubmit={handleSubmit}
            >
                <div>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Control required type="text" placeholder="Primeiro nome" onChange={e => setUser(prev => ({ ...prev, name: e.target.value }))} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="lastname">
                                <Form.Control required type="text" placeholder="Sobrenome" onChange={e => setUser(prev => ({ ...prev, lastname: e.target.value }))} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="cpf">
                                <Form.Control required type="number" placeholder="CPF" onChange={e => setUser(prev => ({ ...prev, cpf: e.target.value }))} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Control required type="number" placeholder="Telefone/celular" onChange={e => setUser(prev => ({ ...prev, phone: e.target.value }))} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Control required type="email" placeholder="E-mail" onChange={e => setUser(prev => ({ ...prev, email: e.target.value }))} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Control required type="password" placeholder="Senha" onChange={e => setUser(prev => ({ ...prev, password: e.target.value }))} />
                                {arePwdDifferent && <small style={{ color: "red" }}>Senhas não são iguais</small>}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="password-confirm">
                                <Form.Control required type="password" placeholder="Repita a senha" onChange={e => setUser(prev => ({ ...prev, passwordConfirm: e.target.value }))} />
                                {arePwdDifferent && <small style={{ color: "red" }}>Senhas não são iguais</small>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col md={10}>
                            <Form.Group className="mb-3" controlId="street">
                                <Form.Control required type="text" placeholder="Rua" onChange={e => setUser(prev => ({ ...prev, street: e.target.value }))} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="number">
                                <Form.Control required type="text" placeholder="Número" onChange={e => setUser(prev => ({ ...prev, addressNumber: e.target.value }))} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <Form.Group className="mb-3" controlId="zipcode">
                                <Form.Control required type="text" placeholder="CEP" onChange={e => setUser(prev => ({ ...prev, zipCode: e.target.value }))} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="neighborhood">
                                <Form.Control required type="text" placeholder="Bairro" onChange={e => setUser(prev => ({ ...prev, neighborhood: e.target.value }))} />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>

                <Button color="#FF41AD" outlined="none" type="submit">
                    Criar conta
                </Button>
            </FormStyled>
        </ContainerStyled >
    );
};

export default SignUpPage;
