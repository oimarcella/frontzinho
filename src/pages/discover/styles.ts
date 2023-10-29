import styled from "styled-components";

export const WrapperPage = styled.div`
    background: #fff;

    img{
        max-width: 100%;
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
`;

export const Hero = styled.div`
    //height: 100vh;
    background: var(--light-blue-100);

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