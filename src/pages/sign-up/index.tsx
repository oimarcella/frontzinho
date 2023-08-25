import { ContainerStyled, FormStyled } from "./styles";
import HeaderPage from "../../components/layout/components/headerPage/headerPage";
import { Col, Form, Row } from "react-bootstrap";
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
    const typeUser = "company";
    const [isLoading, setLoading] = useState(false);


    useEffect(() => {
        userLogged.id && navigate(ERoutes.PANEL);
    }, [])

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
                email: user.email,
                name: user.name,
                lastname: user.lastname,
                document: user.cpf,
                phone_number: user.phone,
                pwd: user.password,
            }


        try {
            const { data } = await api.post(path, body);
            dispatch(
                show({
                    message: `${data.name}, seu cadastro está pronto!`,
                    type: "success"
                })
            );

            const loginCredentials = typeUser === "company" ?
                { username: company.username, pwd: company.password }
                :
                { email: user.email, pwd: user.password };

            //clear states
            setCompany({
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
            setUser({
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

            //new user authentication
            const newUser = await api.post("/login", loginCredentials);
            localStorage.setItem("@petpass-token", newUser.data.token);

            const storaged = typeUser === "company" ?
                {
                    id: newUser.data.company.id,
                    name: newUser.data.company.name,
                    username: newUser.data.company.username,
                    jwtToken: newUser.data.token
                }
                :
                {
                    id: newUser.data.user.id,
                    name: newUser.data.user.name,
                    email: newUser.data.user.email,
                    jwtToken: newUser.data.token
                };

            dispatch(
                login(storaged)
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
        console.log("handleSubmit ~ Teste");
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (typeUser !== "company" && user.password !== user.passwordConfirm) {
            console.log("🚀 ~ file: index.tsx:149 ~ user");
            setarePwdDifferent(true);
            setValidated(false);
        }
        else if (typeUser === "company" && company.password != company.passwordConfirm) {
            console.log("🚀 ~ file: index.tsx:149 ~ company");
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
                title={typeUser === "company" ? "Empresa" : "Tutor"}
                text="Vamos criar sua conta!"
            />

            <a href={ERoutes.ORIGIN}><FontAwesomeIcon icon={faArrowLeft} /> Fazer login</a>

            {typeUser !== "company" ?
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

                    <Button
                        color="#FF41AD"
                        outlined="none"
                        type="submit"
                        onClick={!isLoading ? undefined : undefined}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Carregando…' : 'Criar conta'}
                    </Button>
                </FormStyled>
                :
                <FormStyled
                    className="d-flex flex-column align-items-end mt-4"
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <div>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Control required type="text" placeholder="Nome" onChange={e => setCompany(prev => ({ ...prev, name: e.target.value }))} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="lastname">
                                    <Form.Control required type="text" placeholder="CNPJ" onChange={e => setCompany(prev => ({ ...prev, cnpj: e.target.value }))} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Control required type="text" placeholder="username" onChange={e => setCompany(prev => ({ ...prev, username: e.target.value }))} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Control required type="password" placeholder="Senha" onChange={e => setCompany(prev => ({ ...prev, password: e.target.value }))} />
                                    {arePwdDifferent && <small style={{ color: "red" }}>Senhas não são iguais</small>}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="password-confirm">
                                    <Form.Control required type="password" placeholder="Repita a senha" onChange={e => setCompany(prev => ({ ...prev, passwordConfirm: e.target.value }))} />
                                    {arePwdDifferent && <small style={{ color: "red" }}>Senhas não são iguais</small>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col md={10}>
                                <Form.Group className="mb-3" controlId="street">
                                    <Form.Control required type="text" placeholder="Rua" onChange={e => setCompany(prev => ({ ...prev, street: e.target.value }))} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="number">
                                    <Form.Control required type="text" placeholder="Número" onChange={e => setCompany(prev => ({ ...prev, addressNumber: e.target.value }))} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2}>
                                <Form.Group className="mb-3" controlId="zipcode">
                                    <Form.Control required type="text" placeholder="CEP" onChange={e => setCompany(prev => ({ ...prev, zipCode: e.target.value }))} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="neighborhood">
                                    <Form.Control required type="text" placeholder="Bairro" onChange={e => setCompany(prev => ({ ...prev, neighborhood: e.target.value }))} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>

                    <Button
                        color="#FF41AD"
                        outlined="none"
                        type="submit"
                        onClick={!isLoading ? undefined : undefined}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Carregando…' : 'Criar conta'}
                    </Button>
                </FormStyled>
            }
        </ContainerStyled >
    );
};

export default SignUpPage;

/*
address
: 
"Gelsumino Lizardi"
cpnj
: 
"80453622000104"
name
: 
"PetPass S.A."
neighborhood
: 
"Jardim San Diego"
number
: 
"10"
pwd
: 
"admin"
username
: 
"petpass"
zip_code
: 
"13052570"


"name": "string",
  "cnpj": "string",
  "address": "string",
  "number": "string",
  "zip_code": "string",
  "neighborhood": "string",
  "username": "string",
  "pwd": "string"

*/
