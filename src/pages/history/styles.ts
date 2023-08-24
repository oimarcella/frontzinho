import { TimelineContent, TimelineItem } from "@mui/lab";
import { Container } from "react-bootstrap";
import styled from "styled-components";

export const ContainerStyled = styled(Container)`
    min-height: 80vh;
`;

export const TimelineContentStyled = styled(TimelineContent)`
    cursor: pointer;
`;

export const Overflow = styled.div`
    width: 100vw;
    overflow: hidden;
    overflow-x: auto;
`;

export const WrapperMark = styled.span`
        z-index: 999!important;
    p{
        background: #fff;
        padding: 5px 10px;
        margin-top: -5px;
        margin-bottom: 10px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        text-align: center;
        border-radius: 30px;
    }
`;