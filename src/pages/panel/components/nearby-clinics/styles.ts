import { Card } from "react-bootstrap";
import styled from "styled-components";

export const CardStyled = styled(Card)`
    cursor:pointer;
    padding: 1rem;
    max-width: 380px;
    transition: ease .3s all;
    
    &:hover{
        background: #ededed;
    }

    .ellipsis {
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const NearbyStyled = styled.div`

`;