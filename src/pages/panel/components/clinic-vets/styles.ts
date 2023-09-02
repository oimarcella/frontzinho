import styled from "styled-components";
import { Card } from "react-bootstrap";

export const CardStyled = styled(Card)`
    padding: 1rem;
    border: none;  
    height: 200px;

    background: var(--light-blue-100);

    img{
        max-width:60%;
        margin-bottom: 20px;
        min-height: 90px;
    }
`;