import { Link } from "react-router-dom";
import { ContainerStyled } from "./styles";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotFoundPage404 = () => {
  return (
    <ContainerStyled className="d-flex flex-column align-items-center justify-content-center">
      <img src="public/images/petpass_dark-v1.svg" alt="Logo" />
      <h2>Ops, nada para ver aqui</h2>
      <p>
        <Link to="/"><FontAwesomeIcon className="me-1" icon={faArrowLeft} />Voltar ao início</Link>
      </p>
    </ContainerStyled>
  );
};

export default NotFoundPage404;
