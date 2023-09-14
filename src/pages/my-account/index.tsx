import { useDispatch, useSelector } from "react-redux";
import HeaderPage from "../../components/layout/components/headerPage/headerPage";
import { Section } from "../../components/layout/components/styles/sections";
import { selectUser } from "../../redux/userSlice";
import { MouseEventHandler, useEffect, useState } from "react";
import api from "../../services/api";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from "../../components/layout/components/button/button";
import { show } from "../../redux/toastSlice";
import { EHttpResponse } from "../../core/enums/http-responses";

type UserT = {
    name: string;
    lastname: string;
    address: string;
    neighborhood: string;
    number: string;
    zip_code: string;
    email: string;
    document: string;
}

function MyAccount() {
    const userLogged = useSelector(selectUser);
    const apiPath = userLogged.role === "user" ? "/users" : userLogged.role === "clinica" ? "/clinicas" : "/vets";
    const [userRegister, setUserRegister] = useState({} as UserT);
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();

    const submit: MouseEventHandler<HTMLFormElement> = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            console.log("seila")
        }

        /* if (userLogged.role !== "company") {
             console.log("not company")
             setValidated(false);
         }
         else if (userLogged.role === "company") {
             console.log("company")
             setValidated(false);
         }*/
        else {
            console.log("eba")
            setValidated(true);
            send();
        }
    }

    async function send() {
        let body = {};

        try {
            await api.put(`${apiPath}/${userLogged.id}`, userRegister);
            dispatch(show({ message: "Dados atualizados!", type: "success" }));
            window.location.reload();

        } catch (error: any) {
            setIsLoading(false);
            if (error.response.status && typeof error.response.status === 'number') {
                const status = error.response.status;
                const errorMessage = EHttpResponse[status as keyof typeof EHttpResponse];
                dispatch(show({ message: errorMessage, type: "danger", delay: 4000 }));
            } else {
                dispatch(show({ message: "Não foi possível atualizar", type: "danger", delay: 4000 }));
            }
        }
    }

    useEffect(() => {
        api.get(`${apiPath}/${userLogged.id}`)
            .then(response => {
                setUserRegister(response.data);
            })
    }, [userLogged.role]);
    return (
        <Section style={{ height: "100%" }}>
            <Container>
                <HeaderPage
                    textToStyle="conta"
                    style={{ color: "#FF41AD" }}
                    title={userLogged.role === "user" ? "Tutor" : userLogged.role === "clinica" ? "Clínica/Hospital" : "Veterinário"}
                    text="Minha conta"
                />
                <Form
                    validated={validated}
                    onSubmit={submit}
                >
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Control required type="text" placeholder="Nome" value={userRegister.name}
                                    onChange={(e) => setUserRegister(prev => ({ ...prev, name: e.target.value }))} />
                            </Form.Group>
                        </Col>
                        {userLogged.role === "user" &&
                            <>
                                <Col >
                                    <Form.Group className="mb-3" controlId="formBasicLastname">
                                        <Form.Control required type="text" placeholder="Sobrenome" value={userRegister.lastname}
                                            onChange={(e) => setUserRegister(prev => ({ ...prev, lastname: e.target.value }))} />
                                    </Form.Group>
                                </Col>
                                <Col >
                                    <Form.Group className="mb-3" controlId="formBasicDocument">
                                        <Form.Control required type="text" placeholder="Documento" value={userRegister.document || ""}
                                            onChange={(e) => setUserRegister(prev => ({ ...prev, document: e.target.value }))} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control required type="text" placeholder="E-mail" value={userRegister.email}
                                            onChange={(e) => setUserRegister(prev => ({ ...prev, email: e.target.value }))} />
                                    </Form.Group>
                                </Col>
                            </>
                        }
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3" controlId="formBasicaddress">
                                <Form.Control required type="text" placeholder="Rua" value={userRegister.address}
                                    onChange={(e) => setUserRegister(prev => ({ ...prev, pwd: e.target.value }))} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3" controlId="formBasicNeightborhood">
                                <Form.Control required type="text" placeholder="Rua" value={userRegister.neighborhood}
                                    onChange={(e) => setUserRegister(prev => ({ ...prev, pwd: e.target.value }))} />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group className="mb-3" controlId="formBasicZip">
                                <Form.Control required type="text" placeholder="CEP" value={userRegister.zip_code}
                                    onChange={(e) => setUserRegister(prev => ({ ...prev, zip_code: e.target.value }))} />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group className="mb-3" controlId="formBasicNumber">
                                <Form.Control required type="text" placeholder="Rua" value={userRegister.number}
                                    onChange={(e) => setUserRegister(prev => ({ ...prev, number: e.target.value }))} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex flex-column align-items-center">
                        <Button
                            color="#FF41AD"
                            outlined="none"
                            onClick={!isLoading ? () => { } : undefined}
                        >
                            {isLoading ? 'Carregando…' : 'Atualizar'}
                        </Button>
                    </div>
                </Form>
            </Container>
        </Section>
    )
}

export default MyAccount;