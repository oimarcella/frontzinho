import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled, {css} from "styled-components";

export const NavBarStyled = styled(Navbar)`
    padding: 24px 1rem;
    z-index: 3;
    /*Quando estiver na rota home o navbar será absolute*/
    /*Nas outras ele será relative*/
    ${props =>
        props.isHome?
        css`
        position:absolute!important;
        width: 100%;
        background: transparent;
        `:
        `
            position:relative;
            background: white;
            border-bottom: 2px solid #D1E8F5;
        `
    }

    img{
        width: 200px;
    }
    
    @media(max-width: 1000px){
        position: relative!important;
        background-color: #d1e8f5;
    }
`;

export const NavStyled = styled(Nav)`
    width:100%;

    div:first-child{
        width:100%;
    }

    button{ 
        white-space: nowrap;
    }
`;

export const NavLinkStyled = styled(NavLink)`
    margin:0 5px;

    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    color: var(--dark-blue-500);
    text-decoration: none;
    white-space: nowrap;

    transition: all .3s;

    @media (max-width: 1000px) {
        padding: 2px 0;
    }

    &:hover{
        color: #186ea5;
    }
`;