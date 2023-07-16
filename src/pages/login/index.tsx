import { Container, Form, Col, Row } from "react-bootstrap";
import TopBarComponent from "../../components/layout/components/topbar/topbar";
import Button from "../../components/layout/components/button/button";
import Footer from "../../components/layout/components/footer/footer";
import { ContentStyled } from "./styles";
import HeaderPage from "../../components/layout/components/headerPage/headerPage";

const Content = () => {
    return (
        <ContentStyled>
            <Row className="d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
                <Col lg="6">
                    <HeaderPage
                        textToStyle="login"
                        style={{ color: "#FF41AD" }}
                        title="AmePet!"
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
                        <Button color="#FF41AD" outlined="none" type="submit">
                            Entrar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </ContentStyled>
    );
}

const LoginPage = () => {


    return (
        <>
            <TopBarComponent />

            <Content />

            <Footer />
        </>
    );
};

export default LoginPage;
