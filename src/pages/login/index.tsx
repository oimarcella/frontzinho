import { Container, Form, Col, Row } from "react-bootstrap";
import TopBarComponent from "../../components/layout/components/topbar/topbar";
import Button from "../../components/layout/components/button/button";
import Footer from "../../components/layout/components/footer/footer";
import { ContentStyled } from "./styles";
import HeaderPage from "../../components/layout/components/headerPage/headerPage";
import { useLocation } from "react-router-dom";
import { ERoutes } from "../../core/enums/routes";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Content = () => {
    return (
        <ContentStyled>
            <Row className="d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
                <Col lg="6">
                    <HeaderPage
                        textToStyle="login"
                        style={{ color: "#FF41AD" }}
                        title="Olá, seja bem vindo(a)!"
                        text="Faça seu login"
                    />
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="jon.doe@myemail.com" />
                            <Form.Text className="text-muted">
                                Nós nunca compartilharemos esse endereço de e-mail com ninguém.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Senha" />
                        </Form.Group>
                        {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>*/}
                        <div className="d-flex flex-column align-items-center">
                            <Button color="#FF41AD" outlined="none" customStyles={{ width: '100%' }}>
                                Entrar
                            </Button>
                            <a href={ERoutes.SIGNUP} className="mt-3 d-flex align-items-center">Criar conta <FontAwesomeIcon className="ms-1" icon={faArrowRight} /></a>
                        </div>
                    </Form>
                </Col>
            </Row>
        </ContentStyled>
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
