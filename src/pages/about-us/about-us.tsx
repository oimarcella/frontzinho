import Button from '../../components/layout/components/button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
  AboutUsButton,
  AboutUsSectionWrapper,
  AboutUsVideo,
} from './about-us.styles';
import HeaderPage from '../../components/layout/components/headerPage/headerPage';
import ContactModal from '../../components/layout/components/contactModal/contactModal';
import { useState } from 'react';

const AboutUsSection = () => {
  const [isModalContactOpen, setIsModalContactOpen] = useState(false);

  return (
    <>
      <ContactModal isOpen={isModalContactOpen} handleShow={()=>{setIsModalContactOpen(true)}} handleClose={()=>{setIsModalContactOpen(false)}} />

      <AboutUsSectionWrapper>
        <HeaderPage
          title="Clube Consulfarma"
          text="Conheça todos os recursos para sua farmácia crescer"
          textToStyle="farmácia crescer"
          style={{ color: '#FF41AD' }}
        />
        <AboutUsVideo className="col-lg-10 ratio ratio-16x9">
          <iframe
            src="https://www.youtube.com/embed/yxyNTcoJ054?rel=0"
            title="YouTube video"
          />
        </AboutUsVideo>
        <AboutUsButton className="d-flex justify-content-center">
          <Button color="#FF41AD" onClick={() => setIsModalContactOpen(true)}>
            Experimente por 30 dias grátis
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </AboutUsButton>
      </AboutUsSectionWrapper>
    </>
  );
};
export default AboutUsSection;
