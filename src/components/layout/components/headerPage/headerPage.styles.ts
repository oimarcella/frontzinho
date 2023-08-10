import styled from "styled-components";
import { Container } from 'react-bootstrap';

export const HeaderPageStyled = styled(Container)`
  //margin-top: 80px;
  margin-bottom: 60px;

  @media (max-width: 1000px) {
      margin-top: 50px;
      margin-bottom: 40px;
    }
`;
export const TitleStyled = styled.p`
  color: #36C5F3;
  font-weight: 700;
  font-size: 15px;
  text-align: center;
  color: var(--light-blue-500);
`;
export const TextStyled = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  text-align: center;
  line-height: 36px;
  max-width: 550px;
  color: #0B344E;
`;
