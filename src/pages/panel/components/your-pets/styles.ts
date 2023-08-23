import styled from "styled-components";
import { Card } from "react-bootstrap";

export const CardStyled = styled(Card)`
    padding: 1rem;
    border: none;  
    height: 200px;

    img{
        width:60%;
        margin-bottom: 20px;
        min-height: 90px;
    }
`;