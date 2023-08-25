import { Card } from "react-bootstrap";
import styled from "styled-components";

export const CardStyled = styled(Card)`
    cursor:pointer;
    padding: 1rem;
    max-width: 400px;
    transition: ease .3s all;
    
    &:hover{
        background: #ededed;
    }

    .ellipsis {
        max-width: 200px;
        white-space: nowrap;                  
        overflow: hidden; /* "overflow" value must be different from "visible" */
        text-overflow:    ellipsis;
    }
`;