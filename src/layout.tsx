import { Outlet } from "react-router-dom";
import { ContentWrapper } from "./layout.styles";


const LayoutComponent = () => {

  return (
    <ContentWrapper>
      <Outlet />
    </ContentWrapper>
  );
};

export default LayoutComponent;
