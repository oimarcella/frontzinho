import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '../button/button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import { ModalStyled } from './contactModal.styles';

type ContactModalT = {
  isOpen: boolean;
  handleClose?: () => void;
  handleShow?: () => void;
}

function ContactModal(props: ContactModalT) {
  const [verified, setVerified] = useState(true);
  const politicsAndPrivacy = "/";

  function submit() {
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
          <Modal.Title>Nos envie uma mensagem</Modal.Title>
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
            <Row md={12}>
              <Col>
                <Form.Group className="mb-3" controlId="message">
                  <Form.Control as="textarea" rows={3} type="text" placeholder="Escreva sua mensagem aqui..." />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="AcceptCommunication">
              <Form.Check type="checkbox" label="Aceito receber comunicações do PetPass" />
            </Form.Group>

            {/*<small>*Ao enviar seu contato, você está de acordo com nossa <a target="_blank" href={politicsAndPrivacy}>Política de Privacidade</a></small>*/}
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex flex-row justify-content-center'>
          <Button customStyles={{ width: '40%' }} color='#9a9696' outlined='outlined' onClick={props.handleClose}>
            Cancelar
          </Button>
          {verified ?
            <Button customStyles={{ width: '40%', }} color="#FE51B3" onClick={submit}>
              Enviar
            </Button>
            :
            <Button disabled customStyles={{ width: '40%', }} color="#807e7e" onClick={submit}>
              Enviar
            </Button>
          }

          <p className='mt-3'>
            O PetPass solicita os dados acima para fins de contato. Estes dados não serão utilizados para envio de SPAM e também não serão compartilhados com terceiros.
          </p>
        </Modal.Footer>
      </ModalStyled>
    </>
  );
}

export default ContactModal;