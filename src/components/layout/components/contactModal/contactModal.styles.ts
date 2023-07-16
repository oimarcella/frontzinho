import { Modal } from "react-bootstrap";
import styled from "styled-components";

export const ModalStyled = styled(Modal)`
    color: #9a9696;

    p{
        padding: 1rem;
        background: #f5f5f5;
        font-size: 12px;
        color: #9a9696;

    }

    a{
        color: var(--light-blue-500);
        text-decoration: underline;
    }

    input::placeholder{
        color: lightgray;
    }
    input{
        border: 1px solid #9a9696;
    }
`;