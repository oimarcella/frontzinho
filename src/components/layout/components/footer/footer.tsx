import React, { useState } from 'react'
import { StyledFooter, ContentStyled, LgpdStyled, LogoStyled, RowStyled } from './footer.styles'
import Button from '../button/button';
import ContactModal from '../contactModal/contactModal';

const Footer = () => {
  const [isModalContactOpen, setIsModalContactOpen] = useState(false);

  return (
    <>
      <ContactModal isOpen={isModalContactOpen} handleShow={() => { setIsModalContactOpen(true) }} handleClose={() => { setIsModalContactOpen(false) }} />
      <StyledFooter>
        <ContentStyled className='d-flex flex-column justify-content-around'>
          <RowStyled className='d-flex flex-wrap justify-content-between'>
            <LogoStyled className='col-md-6 col-12 d-flex'>
              {/*<img className='img-fluid' src={logoClube} />
              <img className='img-fluid' src={logoConsul} />*/}
              <h1>AmePet</h1>
            </LogoStyled>
            <Button color="#212529" outlined='outlined' onClick={() => setIsModalContactOpen(true)}>Fale conosco</Button>
          </RowStyled>
        </ContentStyled>
        <LgpdStyled>
          <p>*NOME DO APP* solicita sua coleta de dados para identificação do usuário com a finalidade de entrarmos em contato para fornecermos mais detalhes do tema desejado. Estes dados não serão utilizados para envio de SPAM.</p>
        </LgpdStyled>
      </StyledFooter>
    </>
  )
}
export default Footer