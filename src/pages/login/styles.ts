import { Container, Row } from "react-bootstrap";
import styled from "styled-components";

export const PageStyled = styled.div`
    background-image: url('/images/petfoot.jpg');
    //background-position:  center top -100px;
    background-repeat: no-repeat;
    background-size: cover;

    height: 90vh;

    @media (max-width: 999px) {
        background-position:  center top 0px;   
    }
`;

export const ContentStyled = styled(Container)`
padding-top: 50px;
padding-bottom: 50px;
height: 100%;

.formWrapper{
    background: white;
    padding: 2rem;
    border-radius: 18px;
}

@media (max-width: 1000px) {
    //padding-top: 40px;
    //padding-bottom: 40px;
    min-height: unset;
}
`;

export const WrapperOverflow = styled.div`
    background: rgb(231,242,248);
    background: linear-gradient(180deg, rgba(210,231,242,0.6) 4%, rgba(205,228,241,0.6) 4%);

    height: 100%;
`;