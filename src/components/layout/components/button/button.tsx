import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { ButtonStyled } from './button.styles';
import { CSSProperties } from 'styled-components';
import { ButtonProps } from 'react-bootstrap';

type ButtonType = {
  color: string;
  outlined?: string;
  children: string | ReactNode;
  className?: string;
  customStyles?: CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

const Button = (props: ButtonType) => {
  return (
    <ButtonStyled {...props} style={props.customStyles} className={`${props.className} d-flex align-items-center justify-content-center`}>
      {props.children}
    </ButtonStyled>
  );
};

export default Button;
