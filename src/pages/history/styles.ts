import { Typography } from "@mui/material";
import { TimelineContent, TimelineItem } from "@mui/lab";
import { Container } from "react-bootstrap";
import styled from "styled-components";

export const ContainerStyled = styled(Container)`
    height: auto;
`;

export const TimelineContentStyled = styled(TimelineContent)`
    cursor: pointer;
`;

export const Overflow = styled.div`
    width: 100%;
    overflow: hidden;
    overflow-x: auto;
    margin-top: 40px;
`;


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

export const FilterOptions = styled.div`
    //max-width: 30%;
    margin: 40px 0;

    h5{
        font-weight: 600;
        font-size: 16px;
        color:var(--dark-blue-500);
    }

    span{
        cursor: pointer;
        border: 1px solid var(--dark-blue-500);
        color: var(--dark-blue-500);
        padding: 4px 15px;
        border-radius: 20px;
        margin: 3px 5px;

        font-size: 14px;
        transition: all ease-in-out .3s;

        &:first-of-type{
            margin-left: 0;
        }

        &.active{
            background: var(--pink-500);
            border: none;
            color: #fff;
        }

        :hover{
            background: var(--pink-500);
            border: none;
            color: #fff;
        }
    }

    /*@media(max-width: 1000px){
        max-width: 100%;
    }*/
`;

export const HeaderPet = styled.div`
    margin-top: 40px;
    margin-bottom: 20px;

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

    strong.name{
        font-size: 22px;
        margin-top: 30px;
    }
    small{
        margin-top: 20px;
    }
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
    small{
        padding: 5px 10px;
        margin-top: -5px;
        margin-bottom: 10px;
        text-align: center;
        font-size: 10px;
        color: var(--pink-500);
        font-weight: bold!important;
            
        @media(max-width:1000px){
            font-size: 9px!important;
            padding: 5px 8px;
        }
    }
`;

export const TitleStyled = styled(Typography)`
    color: var(--light-blue-500)!important;
    font-weight: bold!important;
    font-size: 12px!important;

    
    @media(max-width:1000px){
        font-size: 10px!important;
    }
`;

export const SummaryStyled = styled.p`
    color: var(--dark-blue-500)!important;
    font-size: 12px!important;
    font-weight: 400;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    @media(max-width:1000px){
        font-size: 10px!important;
    }
`;