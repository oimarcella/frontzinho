import { Container } from "react-bootstrap";
import styled from "styled-components";

export const ContentStyled = styled(Container)`
    padding-top: 50px;
    padding-bottom: 50px;

    @media (max-width: 1000px) {
        padding-top: 40px;
        padding-bottom: 40px;
        min-height: unset;
    }
`;