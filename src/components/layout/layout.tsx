import TopBarComponent from "./components/topbar/topbar";
import { Outlet } from "react-router-dom";
import { ContentWrapper } from "./layout.styles";
import Footer from "./components/footer/footer";


const LayoutComponent = () => {
  //códigos

  return (
    <>
      <TopBarComponent />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <Footer/>
    </>
  );
};

export default LayoutComponent;
