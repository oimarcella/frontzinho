import { Drawer, Typography } from "@material-ui/core";
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

        position: relative;
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

    span{
        position: absolute;
        top: -30px;
        padding: 3px 5px;
        font-size: 12px;
        border-radius: 50px;

    }
    span.soon{
        background: #63e5ff;
        color: #ffffff;
    }
    span.new{
        background: #63ffa9;
        color: #ffffff;
    }
`;

export const CompanyConnectedStyled = styled.div`
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding: 1rem 1.2rem;
    border-radius: 5px;

    
    .clickable{
        cursor:pointer;
        transition: all ease-in-out .3s;

        :hover{
            color: var(--light-blue-500);
        }
    }
`;

export const ChangePetStyledButton = styled(Typography)`
    cursor: pointer;
    transition: all ease-in-out .3s;

    :hover{
        color: var(--light-blue-500);
    }
`;

export const DrawerStyled = styled(Drawer)`
    ul{
        width: 400px;
        list-style: none;
        padding: 0;
        height: 100%;
        background: var(--light-blue-80);
        
        @media (max-width: 1000px) {
            width: 90vw;
        }
    }
    li{
        cursor: pointer;
        padding: .8rem;
        width: 100%;
        transition: all ease-in-out .3s;
        
        :hover{
            background: var(--light-blue-500) !important;
            color: #fff;
        }
    }
    li:nth-child(odd){
        padding: .8rem;
        width: 100%;
        background: var(--light-blue-100);
        
        :hover{
            background: var(--light-blue-500) !important;
            color: #fff;
        }
    }
`;