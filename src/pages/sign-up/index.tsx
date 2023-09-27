import { ContainerStyled, FormStyled } from "./styles";
import HeaderPage from "../../components/layout/components/headerPage/headerPage";
import { Accordion, Col, Container, Form, Row } from "react-bootstrap";
import Button from "../../components/layout/components/button/button";
import { ERoutes } from "../../core/enums/routes";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from "../../services/api";
import { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { show } from "../../redux/toastSlice";
import { EHttpResponse } from "../../core/enums/http-responses";
import { login, selectUser } from "../../redux/userSlice";

type userT = {
    username: string;
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
type companyT = {
    name: string;
    username: string;
    cnpj: string;
    password: string;
    passwordConfirm: string;
    street: string;
    neighborhood: string;
    addressNumber: string;
    zipCode: string;
}
type ServicesT = {
    name: string;
    id: number;
}

const SignUpPage = () => {
    const [user, setUser] = useState<userT>({
        username: "",
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
    const [company, setCompany] = useState<companyT>({
        name: "",
        username: "",
        cnpj: "",
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
    const userLogged = useSelector(selectUser);
    const [typeUser, setTypeUser] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [services, setServices] = useState<Array<ServicesT>>([]);
    const [service, setService] = useState<ServicesT>({} as ServicesT);

    useEffect(() => {
        userLogged.id && navigate(ERoutes.PANEL);

        api.get("/services")
            .then((response) => {
                setServices(response.data);
            });
    }, [])

    async function authenticate(loginCredentials: { pwd: string, username: string }) {

        try {
            const newUser = await api.post("/login", loginCredentials);
            localStorage.setItem("@petpass-token", newUser.data.token);

            const storaged = typeUser === "company" ?
                {
                    id: newUser.data.company.id,
                    name: newUser.data.company.name,
                    username: newUser.data.company.username,
                    jwtToken: newUser.data.token,
                    role: newUser.data.company.role
                }
                :
                {
                    id: newUser.data.user.id,
                    name: newUser.data.user.name,
                    username: newUser.data.user.username || loginCredentials.username,
                    email: newUser.data.user.email,
                    jwtToken: newUser.data.token,
                    role: newUser.data.user.role
                };

            dispatch(
                login(storaged)
            );

            dispatch(
                show({
                    message: `Seu cadastro está pronto!`,
                    type: "success"
                })
            );
            navigate(ERoutes.PANEL);
        }
        catch (error: any) {
            dispatch(show({
                message: "Cadastro realizado, mas não foi possível fazer login. Tente fazer o login novamente.",
                delay: 5000,
                type: "success"
            }))
            navigate(ERoutes.LOGIN);
        }
    }

    async function send() {
        const path = typeUser === "company" ? "/clinicas" : "/users";
        const body = typeUser === "company" ?
            {
                name: company.name,
                cnpj: company.cnpj,
                address: company.street,
                number: company.addressNumber,
                zip_code: company.zipCode,
                neighborhood: company.neighborhood,
                username: company.username,
                pwd: company.password,
            }
            :
            {
                username: user.username,
                email: user.email,
                name: `${user.name} ${user.lastname}`,
                //lastname: user.lastname,
                document: user.cpf,
                phone_number: user.phone,
                pwd: user.password,
                address: company.street,
                number: company.addressNumber,
                zip_code: company.zipCode,
                neighborhood: company.neighborhood,
            }


        try {
            const { data } = await api.post(path, body);

            typeUser === "company" &&
                await addServices(data.id);

            setLoading(false);

            const loginCredentials = typeUser === "company" ?
                { username: company.username, pwd: company.password }
                :
                { username: user.username, pwd: user.password };
            authenticate(loginCredentials);
        } catch (error: any) {
            setLoading(false);
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
        setLoading(true);
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (typeUser !== "company" && user.password !== user.passwordConfirm) {
            setarePwdDifferent(true);
            setValidated(false);
        }
        else if (typeUser === "company" && company.password != company.passwordConfirm) {
            setarePwdDifferent(true);
            setValidated(false);
        }
        else {
            setarePwdDifferent(false);
            setValidated(true);
            send();
        }
    }

    async function addServices(clinicId: number) {
        try {
            const body = {
                clinica: clinicId,
                servico: service.id
            }
            await api.post(`${ERoutes.CLINIC}/conectar-serviço`, body);
        }
        catch (error) {
            console.log("Não foi possível associar o serviço à clínica");
        }
    }

    return (
        <>
            <ContainerStyled>
                <HeaderPage
                    textToStyle=""
                    style={{ color: "#FF41AD" }}
                    title={typeUser === "company" ? "Empresa" : typeUser === "tutor" ? "Tutor" : ""}
                    text="Vamos criar sua conta!"
                />

                <a href={ERoutes.ORIGIN}><FontAwesomeIcon icon={faArrowLeft} /> Fazer login</a>

                <Accordion className="mt-4">
                    <Accordion.Item eventKey="0" onClick={() => setTypeUser("tutor")}>
                        <Accordion.Header>Tutor</Accordion.Header>
                        <Accordion.Body>
                            <FormStyled
                                className="d-flex flex-column align-items-end mt-4"
                                validated={validated}
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="name">
                                                <Form.Control value={user.name} required type="text" placeholder="Primeiro nome" onChange={e => setUser(prev => ({ ...prev, name: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="lastname">
                                                <Form.Control value={user.lastname} required type="text" placeholder="Sobrenome" onChange={e => setUser(prev => ({ ...prev, lastname: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="cpf">
                                                <Form.Control value={user.cpf} required type="number" placeholder="CPF" onChange={e => setUser(prev => ({ ...prev, cpf: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="phone">
                                                <Form.Control value={user.phone} required type="number" placeholder="Telefone/celular" onChange={e => setUser(prev => ({ ...prev, phone: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mt-4">
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="username">
                                                <Form.Control value={user.username} required type="text" placeholder="Nome de usuário" onChange={e => setUser(prev => ({ ...prev, username: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="email">
                                                <Form.Control value={user.email} required type="email" placeholder="E-mail" onChange={e => setUser(prev => ({ ...prev, email: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="password">
                                                <Form.Control value={user.password} required type="password" placeholder="Senha" onChange={e => setUser(prev => ({ ...prev, password: e.target.value }))} />
                                                {arePwdDifferent && <small style={{ color: "red" }}>Senhas não são iguais</small>}
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="password-confirm">
                                                <Form.Control value={user.passwordConfirm} required type="password" placeholder="Repita a senha" onChange={e => setUser(prev => ({ ...prev, passwordConfirm: e.target.value }))} />
                                                {arePwdDifferent && <small style={{ color: "red" }}>Senhas não são iguais</small>}
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mt-4">
                                        <Col md={10}>
                                            <Form.Group className="mb-3" controlId="street">
                                                <Form.Control value={user.street} required type="text" placeholder="Rua" onChange={e => setUser(prev => ({ ...prev, street: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="number">
                                                <Form.Control value={user.addressNumber} required type="text" placeholder="Número" onChange={e => setUser(prev => ({ ...prev, addressNumber: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={2}>
                                            <Form.Group className="mb-3" controlId="zipcode">
                                                <Form.Control value={user.zipCode} required type="text" placeholder="CEP" onChange={e => setUser(prev => ({ ...prev, zipCode: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="neighborhood">
                                                <Form.Control value={user.neighborhood} required type="text" placeholder="Bairro" onChange={e => setUser(prev => ({ ...prev, neighborhood: e.target.value }))} />
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
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" onClick={() => setTypeUser("company")}>
                        <Accordion.Header>Hospital/Clínica</Accordion.Header>
                        <Accordion.Body>
                            <FormStyled
                                className="d-flex flex-column align-items-end mt-4"
                                validated={validated}
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="name">
                                                <Form.Control value={company.name} required type="text" placeholder="Nome" onChange={e => setCompany(prev => ({ ...prev, name: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="lastname">
                                                <Form.Control value={company.cnpj} required type="text" placeholder="CNPJ" onChange={e => setCompany(prev => ({ ...prev, cnpj: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mt-4">
                                        <Col>
                                            <Form.Group className="mb-3" controlId="email">
                                                <Form.Control value={company.username} required type="text" placeholder="username" onChange={e => setCompany(prev => ({ ...prev, username: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="password">
                                                <Form.Control value={company.password} required type="password" placeholder="Senha" onChange={e => setCompany(prev => ({ ...prev, password: e.target.value }))} />
                                                {arePwdDifferent && <small style={{ color: "red" }}>Senhas não são iguais</small>}
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="password-confirm">
                                                <Form.Control value={company.passwordConfirm} required type="password" placeholder="Repita a senha" onChange={e => setCompany(prev => ({ ...prev, passwordConfirm: e.target.value }))} />
                                                {arePwdDifferent && <small style={{ color: "red" }}>Senhas não são iguais</small>}
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mt-4">
                                        <Col md={10}>
                                            <Form.Group className="mb-3" controlId="street">
                                                <Form.Control value={company.street} required type="text" placeholder="Rua" onChange={e => setCompany(prev => ({ ...prev, street: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="number">
                                                <Form.Control value={company.addressNumber} required type="text" placeholder="Número" onChange={e => setCompany(prev => ({ ...prev, addressNumber: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={2}>
                                            <Form.Group className="mb-3" controlId="zipcode">
                                                <Form.Control value={company.zipCode} required type="text" placeholder="CEP" onChange={e => setCompany(prev => ({ ...prev, zipCode: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="neighborhood">
                                                <Form.Control value={company.neighborhood} required type="text" placeholder="Bairro" onChange={e => setCompany(prev => ({ ...prev, neighborhood: e.target.value }))} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="mt-3 d-flex flex-column">
                                            {
                                                services.map((svc, index) =>
                                                    <Form.Check
                                                        key={index}
                                                        inline
                                                        label={svc.name}
                                                        checked={svc.name === service.name ? true : false}
                                                        name="group1"
                                                        type="radio"
                                                        id={`inline-${svc}`}
                                                        onChange={() => setService({ name: svc.name, id: svc.id })}
                                                    />
                                                )
                                            }
                                        </div>
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
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </ContainerStyled >
        </>

    );
};

export default SignUpPage;