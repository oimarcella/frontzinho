import { Container } from "react-bootstrap";
import styled from "styled-components";

export const ProfilePetPageStyled = styled.div``;

export const HeaderStyled = styled.div`
    background: var(--light-blue-100);
    margin-top: 1px;

    img{
        border-radius: 100%;
        width: 200px;
        height: 200px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        background: #fff;

        @media(max-width: 1000px){
            width: 150px;
            height: 150px;
        }
    }
    div >strong{
        font-size: 22px;
        margin: 0;
    }
    ul{
        padding: 0;
    }
`;

export const BodyStyled = styled(Container)`
    h3{
        font-weight: bold;
        font-size: 1rem;
        margin-bottom: 0;
    }

    .ver-mais{
        color: var(--light-blue-500);
        text-transform: uppercase;
        font-size: 10px;
        font-weight: bold;
        
        :hover{
            color: var(--light-blue-300);
        }
    }
`;