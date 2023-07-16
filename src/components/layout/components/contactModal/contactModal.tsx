import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '../button/button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import { ModalStyled } from './contactModal.styles';
import ReCaptcha from '../reCaptcha/reCaptcha';

type ContactModalT = {
    isOpen: boolean;
    handleClose?: () => void;
    handleShow?: () => void;
}

function ContactModal(props:ContactModalT) {
    const [verified, setVerified] = useState(true);
    const politicsAndPrivacyConsulfarma = "https://www.consulfarma.com/politica-privacidade";

    function submit(){
      alert("enviar");
    }


    const handleVerify = (token: string | null) => {
      // enviar o token para o servidor e verificar se é válido
      if (token) {
        setVerified(true);
      }
    };

  return (
    <>
      <ModalStyled show={props.isOpen} onHide={props.handleClose}>
        <Modal.Header className='d-flex justify-content-center'>
          <Modal.Title>Saiba mais</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="Name">
                <Form.Control type="text" placeholder="Nome" />
            </Form.Group>

            <Row xs={1} md={2}>
                <Col>
                    <Form.Group className="mb-3" controlId="Email">
                        <Form.Control type="email" placeholder="E-mail" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="Phone">
                        <Form.Control type="text" placeholder="Celular" />
                    </Form.Group>
                </Col>
            </Row>
            <Row xs={1} md={2}>
                <Col >
                    <Form.Group className="mb-3" controlId="Ocupation">
                        <Form.Control type="text" placeholder="Cargo" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="CNPJ">
                        <Form.Control type="text" placeholder="CNPJ da farmácia" />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="AcceptCommunication">
                <Form.Check type="checkbox" label="Aceito receber comunicações da Consulfarma" />
            </Form.Group>

            <small>*Ao enviar seu contato, você está de acordo com nossa <a target="_blank" href={politicsAndPrivacyConsulfarma}>Política de Privacidade</a></small>
            <ReCaptcha siteKey='6Lel9NIZAAAAAKUbE4MgR8hfbNLVkZYH45m7sPER' onVerify={handleVerify}/>
            {
              verified &&
                <small>Verificado</small>
            }
            
        </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex flex-row justify-content-center'>
          <Button customStyles={{width: '40%'}} color='#9a9696' outlined='outlined' onClick={props.handleClose}>
            Cancelar
          </Button>
          {verified? 
            <Button customStyles={{width: '40%', }} color="#188755" onClick={submit}>
              Enviar
            </Button>
            :
            <Button disabled customStyles={{width: '40%', }} color="#807e7e" onClick={submit}>
              Enviar
            </Button>
          }

          <p className='mt-3'>
            A Consulfarma solicita sua coleta de dados para identificação do usuário com a finalidade de garantir que podemos entrar em contato para falarmos sobre a disponibilização dos planos e assuntos pertinentes ao Clube Consulfarma. Estes dados não serão utilizados para envio de SPAM.
          </p>
        </Modal.Footer>
      </ModalStyled>
    </>
  );
}

export default ContactModal;