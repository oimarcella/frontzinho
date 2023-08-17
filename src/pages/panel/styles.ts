import { Card, Container } from "react-bootstrap";
import styled from "styled-components";

export const PagePanel = styled.div`
    height: 100vh;
    padding: 40px 0;
`;

export const ContainerStyled = styled(Container)`
`;

export const CardStyled = styled(Card)`
    padding: .5rem;
    height: 150px;

    border: none;  

    img{
        width:70%;
        margin-bottom: 20px;
    }
    
`;