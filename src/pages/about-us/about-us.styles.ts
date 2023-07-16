import styled from "styled-components";
import { Container } from "react-bootstrap";

export const AboutUsSectionWrapper = styled(Container)`
  padding-bottom: 5.625rem;
`;
export const AboutUsVideo = styled.div`
  margin: 0 auto;
  max-width: 1076px;
  iframe{
    height: 100%;
    width: 100%;
  }
`;
export const AboutUsButton = styled.div`
  margin-top: 3.125rem;
  button{
    font-size: 20px;
    padding: 0.5rem 1.75rem;
    line-height: 20px;
  }
  button > svg {
    margin-left: 10px;
  }
`;
