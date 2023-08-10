import { Container, Form } from "react-bootstrap";
import styled from "styled-components";

export const ContainerStyled = styled(Container)`
    padding-top: 50px;
    padding-bottom: 50px;

    @media (max-width: 1000px) {
        padding-top: 40px;
        padding-bottom: 40px;
        min-height: unset;
    }
`;

export const FormStyled = styled(Form)`
    >div{
        width: 100%;
    }
`;