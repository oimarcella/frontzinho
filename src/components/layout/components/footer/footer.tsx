import React, { useState } from 'react'
import { StyledFooter, ContentStyled, LgpdStyled, LogoStyled, RowStyled } from './footer.styles'
import Button from '../button/button';
import ContactModal from '../contactModal/contactModal';

const Footer = () => {
  const [isModalContactOpen, setIsModalContactOpen] = useState(false);
  const userIsLogged = false;

  return (
    <>
      <ContactModal isOpen={isModalContactOpen} handleShow={() => { setIsModalContactOpen(true) }} handleClose={() => { setIsModalContactOpen(false) }} />
      <StyledFooter>
        <ContentStyled className='d-flex flex-column justify-content-around'>
          <RowStyled className='d-flex flex-wrap justify-content-between'>
            <LogoStyled className='col-md-6 col-12 d-flex'>
              <img style={{}} src="/src/assets/images/petpass_small_dark-v1.svg" className="img-fluid" />
            </LogoStyled>
            <Button color="#212529" outlined='outlined' onClick={() => setIsModalContactOpen(true)}>Fale conosco</Button>
          </RowStyled>
        </ContentStyled>
        {!userIsLogged && <LgpdStyled>
          <p><strong>PetPass</strong> solicita sua coleta de dados para identificação do usuário com a finalidade de entrarmos em contato para fornecermos mais detalhes do tema desejado. <strong>Estes dados não serão utilizados para envio de SPAM.</strong></p>
        </LgpdStyled>}
      </StyledFooter>
    </>
  )
}
export default Footer