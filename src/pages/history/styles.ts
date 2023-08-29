import { Typography } from "@mui/material";
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
        font-size: 10px;
        color: var(--light-blue-500);
        font-weight: bold!important;
            
        @media(max-width:1000px){
            font-size: 9px!important;
            padding: 5px 8px;
        }
    }
`;

export const TitleStyled = styled(Typography)`
    color: var(--light-blue-300)!important;
    font-weight: bold!important;
    font-size: 12px!important;

    
    @media(max-width:1000px){
        font-size: 10px!important;
    }
`;

export const SummaryStyled = styled.p`
    color: var(--dark-blue-500)!important;
    font-size: 12px!important;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    @media(max-width:1000px){
        font-size: 10px!important;
    }
`;