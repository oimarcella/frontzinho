import { Form, Col } from "react-bootstrap";
import TopBarComponent from "../../components/layout/components/topbar/topbar";
import Button from "../../components/layout/components/button/button";
import Footer from "../../components/layout/components/footer/footer";
import { ContentStyled, PageStyled, WrapperOverflow } from "./styles";
import HeaderPage from "../../components/layout/components/headerPage/headerPage";
import { useLocation } from "react-router-dom";
import { ERoutes } from "../../core/enums/routes";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from "../../services/api";
import { MouseEventHandler, useState } from "react";
import { EHttpResponse } from "../../core/enums/http-responses";
import { useDispatch } from 'react-redux';
import { show } from "../../redux/toastSlice";

const Content = () => {
    const [userCredentials, setUserCredentials] = useState({ email: "", pwd: "" });
    const dispatch = useDispatch();


    const submit: MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();

        try {
            const { data } = await api.post("/login", userCredentials);
            localStorage.setItem("@petpass-token", data.token);
            //redirecionar para area logada
        } catch (error: any) {
            if (error.response.status && typeof error.response.status === 'number') {
                const status = error.response.status;

                const errorMessage = EHttpResponse[status as keyof typeof EHttpResponse];

                dispatch(show({ message: errorMessage, type: "danger" }));
            } else {
                dispatch(show({ message: "Não foi possível fazer login", type: "danger" }));
            }
        }
    }
    /*async function submit(event: React.FormEvent<HTMLFormElement>) {

    }*/

    return (
        <PageStyled>
            <WrapperOverflow>
                <ContentStyled className="d-flex flex-column align-items-center justify-content-center">
                    <Col md={12} lg={6}>
                        <div className="formWrapper">
                            <HeaderPage
                                textToStyle="login"
                                style={{ color: "#FF41AD" }}
                                title="Olá, seja bem vindo(a)!"
                                text="Faça seu login"
                            />
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="jon.doe@myemail.com" value={userCredentials.email}
                                        onChange={(e) => setUserCredentials(prev => ({ ...prev, email: e.target.value }))} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Senha" value={userCredentials.pwd}
                                        onChange={(e) => setUserCredentials(prev => ({ ...prev, pwd: e.target.value }))} />
                                </Form.Group>
                                <div className="d-flex flex-column align-items-center">
                                    <Button
                                        color="#FF41AD"
                                        outlined="none"
                                        customStyles={{ width: '100%' }}
                                        onClick={submit}
                                    >
                                        Entrar
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
}

const LoginPage = () => {
    const currentRoute = useLocation().pathname;
    const isLoginRoute = currentRoute == "/login" ? true : false;

    return (
        <>
            {isLoginRoute && <TopBarComponent />}

            <Content />

            {isLoginRoute && <Footer />}
        </>
    );
};

export default LoginPage;
