import styled, { css } from "styled-components";

type ButtonStyledType = {
  color: string;
  outlined?: string;
};
export const ButtonStyled = styled.button.attrs((props: ButtonStyledType) => ({
  
}))<ButtonStyledType>`
  font-size: 16px;
  padding: 6px 12px;
  border-radius: 50px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  
  ${(props) => 
      props.outlined && props.outlined == "outlined"?
      css`
        background-color: transparent;
        border: 1px solid ${props.color} !important;
        color: ${props.color} !important;
        &:hover {
          background: ${props.color};
          color: white !important;
        }
      `
      :
      css`
        background-color: ${props.color};
        border: 1px solid ${props.color};
        color: #ffffff;
        &:hover {
          filter: brightness(.9);
          color: white !important;
        }
      `
    } 
  

`;