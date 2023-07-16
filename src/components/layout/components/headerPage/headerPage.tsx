import React from 'react'
import { HeaderPageStyled, TextStyled, TitleStyled } from './headerPage.styles'

interface Props {
  title: string;
  text: string;
  textToStyle: string;
  style: React.CSSProperties;
}
const HeaderPage : React.FC<Props> = ({title, text, textToStyle, style}) => {
  const titlePage = title;
  const index = text.indexOf(textToStyle);
  const firstPart = text.slice(0, index);
  const secondPart = text.slice(index + textToStyle.length);
  return (
    <HeaderPageStyled className="d-flex flex-column align-items-center justify-content-center">
      <TitleStyled>{titlePage}</TitleStyled>
      <TextStyled>
        {firstPart}
        <span style={style}>{textToStyle}</span>
        {secondPart}
      </TextStyled>
    </HeaderPageStyled>
  );
};

export default HeaderPage ;