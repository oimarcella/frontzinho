import { Form, Col } from "react-bootstrap";
import Button from "../../components/layout/components/button/button";
import { ContentStyled, PageStyled, WrapperOverflow } from "./styles";
import HeaderPage from "../../components/layout/components/headerPage/headerPage";
import { useLocation, useNavigate } from "react-router-dom";
import { ERoutes } from "../../core/enums/routes";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from "../../services/api";
import { MouseEventHandler, useEffect, useState } from "react";
import { EHttpResponse } from "../../core/enums/http-responses";
import { useDispatch, useSelector } from 'react-redux';
import { show } from "../../redux/toastSlice";
import { selectUser, login } from "../../redux/userSlice";

const LoginPage = () => {
    const currentRoute = useLocation().pathname;
    const [userCredentials, setUserCredentials] = useState({ username: "", pwd: "" });
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        user.id && navigate(ERoutes.PANEL);
    }, [user.id])

    const submit: MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post("/login", userCredentials);


            localStorage.setItem("@petpass-token", data.token);

            const objUser = data.user ? {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                jwtToken: data.token,
                role: data.user.role
            }
                : data.vet ?
                    {
                        id: data.vet.id,
                        name: data.vet.name,
                        username: data.vet.username,
                        jwtToken: data.token,
                        role: data.vet.role
                    } :
                    {
                        id: data.clinica.id,
                        name: data.clinica.name,
                        username: data.clinica.username,
                        jwtToken: data.token,
                        role: data.clinica.role
                    }
                ;

            dispatch(
                login(objUser)
            );



            dispatch(show({ message: "Logado", type: "success" }));
            setLoading(false);
            navigate(ERoutes.PANEL);

        } catch (error: any) {
            console.log("Error: ", error);
            setLoading(false);
            if (error.response.status && typeof error.response.status === 'number') {
                const status = error.response.status;

                const errorMessage = EHttpResponse[status as keyof typeof EHttpResponse];

                dispatch(show({ message: errorMessage, type: "danger" }));
            } else {
                dispatch(show({ message: "Não foi possível fazer login", type: "danger" }));
            }
        }
    }


    return (
        <PageStyled>
            <WrapperOverflow>
                <ContentStyled className="d-flex flex-column align-items-center justify-content-center">
                    <Col sm={12} md={8} lg={6}>
                        <div className="formWrapper">
                            <HeaderPage
                                textToStyle="login"
                                style={{ color: "#FF41AD" }}
                                title="Olá, seja bem vindo(a)!"
                                text="Faça seu login"
                            />
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Nome de usuário. Ex: john.doe" value={userCredentials.username}
                                        onChange={(e) => setUserCredentials(prev => ({ ...prev, username: e.target.value }))} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="******" value={userCredentials.pwd}
                                        onChange={(e) => setUserCredentials(prev => ({ ...prev, pwd: e.target.value }))} />
                                </Form.Group>
                                <div className="d-flex flex-column align-items-center">
                                    <Button
                                        color="#FF41AD"
                                        outlined="none"
                                        customStyles={{ width: '100%' }}
                                        onClick={!isLoading ? submit : undefined}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Carregando…' : 'Entrar'}
                                    </Button>
                                    <a href={ERoutes.SIGNUP} className="mt-3 d-flex align-items-center">Criar conta <FontAwesomeIcon className="ms-1" icon={faArrowRight} /></a>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </ContentStyled>
            </WrapperOverflow>
        </PageStyled >
    );
};

export default LoginPage;
