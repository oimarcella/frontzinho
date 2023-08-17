import { Card, Container } from "react-bootstrap";
import styled from "styled-components";

export const PagePanel = styled.div`
    height: 100vh;
    padding: 40px 0;
`;

export const ContainerStyled = styled(Container)`
    h3{
        font-weight: bold;
        font-size: 1rem;
        margin-bottom: 0;
    }
`;

export const CardStyled = styled(Card)`
    padding: 1rem;
    border: none;  

    img{
        width:60%;
        margin-bottom: 20px;
    }
`;