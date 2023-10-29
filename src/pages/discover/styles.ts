import styled from "styled-components";

export const WrapperPage = styled.div`
    background: #fff;

    img{
        max-width: 100%;
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
`;

export const HeaderStyled = styled.div`
    //height: 100vh;
    background: var(--light-blue-100);

    h3{
        font-weight: 400;
        text-align: center;
    }
    p{
        text-align: center;
    }

    img{
        border-radius: none;
        box-shadow: none;
        width: 10%;

        @media (max-width: 1000px) {
            width: 30%;
        }
    }

`;
export const HeroStyled = styled.div`
    //height: 100vh;
    background: #fff;

    h6, h4{
        font-weight: bolder;
    }
    h6{
        text-decoration: underline;
        color: var(--pink-500);
    }
    h4.right,h6.right, p.right{
       width: 100%;
       text-align: end;
    }
`;