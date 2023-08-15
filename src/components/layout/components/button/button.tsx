import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { ButtonStyled } from './button.styles';
import { CSSProperties } from 'styled-components';

type ButtonType = {
  color: string;
  outlined?: string;
  children: string | ReactNode;
  className?: string;
  customStyles?: CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonType) => {
  return (
    <ButtonStyled {...props} style={props.customStyles} className={props.className}>
      {props.children}
    </ButtonStyled>
  );
};

export default Button;
