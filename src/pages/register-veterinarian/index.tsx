import { ContainerStyled, FormStyled } from "./styles";
import HeaderPage from "../../components/layout/components/headerPage/headerPage";
import { Accordion, Col, Container, Form, Row } from "react-bootstrap";
import Button from "../../components/layout/components/button/button";
import { ERoutes } from "../../core/enums/routes";
import api from "../../services/api";
import { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { show } from "../../redux/toastSlice";
import { EHttpResponse } from "../../core/enums/http-responses";
import { selectUser } from "../../redux/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

//TODO

type VeterinarianT = {
    name: string;
    username: string;
    password: string;
    clinica_id: number;
}

const RegisterVeterinarianPage = () => {
    const userLogged = useSelector(selectUser);
    const [vet, setVet] = useState<VeterinarianT>({
        username: "",
        name: "",
        password: "",
        clinica_id: 0
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [isLoading, setLoading] = useState(false);

    async function send() {
        const path = "/vets";
        const body = {
            name: vet.name,
            username: vet.username,
            pwd: vet.password,
            clinica_id: userLogged.id
        };

        try {
            const { data } = await api.post(path, body);
            dispatch(show({ message: `Veterinário(a) ${data.name} criado!`, type: "success" }));
            setLoading(false);

            setVet({
                username: "",
                name: "",
                password: "",
                clinica_id: 0
            });

        } catch (error: any) {
            setLoading(false);
            if (error.response.status && typeof error.response.status === 'number') {
                const status = error.response.status;
                let errorMessage = EHttpResponse[status as keyof typeof EHttpResponse];

                if (error.response.data.message === "Unable to create vet. Username marcella.amorim already exists") {
                    errorMessage = "O nome de usuário já existe para um veterinário"
                }

                dispatch(show({ message: errorMessage, type: "danger", delay: 4000 }));
            } else {
                dispatch(show({ message: "Não foi possível finalizar o cadastro", type: "danger", delay: 4000 }));
            }
        }
    }

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
        setLoading(true);
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(true);
            send();
        }
    }

    function handleUsername(name: string) {

        if (name) {
            let username: string = '';

            // Transformar o nome em minúsculas e substituir espaços por pontos
            if (name.trim().split(" ").length > 1)
                username = `${name.toLowerCase().split(" ")[0]}.${name.toLowerCase().split(" ")[1]}`;
            else
                username = `${name.toLowerCase().split(" ")[0]}.` + `${Math.floor(Math.random() * 9999) + 1}`.substring(0, 3);

            setVet(prev => ({ ...prev, username }));
        } else {
            setVet(prev => ({ ...prev, username: "" }));
        }
    }


    return (
        <>
            <ContainerStyled>
                <HeaderPage
                    textToStyle=""
                    style={{ color: "#782f58" }}
                    title="Veterinário"
                    text="Cadastro"
                />

                <a href={ERoutes.PANEL}><FontAwesomeIcon className="me-1" icon={faArrowLeft} />Início</a>

                <FormStyled
                    className="d-flex flex-column align-items-end mt-4"
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <div>
                        <Row className="mt-4">
                            <Col lg={4} sm={12}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Control value={vet.name} required type="text" placeholder="Nome" onChange={e => {
                                        handleUsername(e.target.value);
                                        setVet(prev => ({ ...prev, name: e.target.value }))
                                    }
                                    } />
                                </Form.Group>
                            </Col>
                            <Col lg={4} sm={12}>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Control value={vet.password} required type="password" placeholder="Senha" onChange={e => setVet(prev => ({ ...prev, password: e.target.value }))} />
                                    <small>{vet.password}</small>
                                </Form.Group>
                            </Col>
                            <Col lg={4} sm={12}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Control value={vet.username} required type="text" placeholder="Nome de usuário" onChange={e => setVet(prev => ({ ...prev, username: e.target.value }))} />
                                    {vet.username && <small>Sugestão de nome de usuário. Verifique se é válido.</small>}
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>

                    <Button
                        color="#FF41AD"
                        outlined="none"
                        type="submit"
                        onClick={!isLoading ? () => { } : undefined}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Carregando…' : 'Criar conta'}
                    </Button>
                </FormStyled>
            </ContainerStyled >
        </>

    );
};

export default RegisterVeterinarianPage;