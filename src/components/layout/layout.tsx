import TopBarComponent from "./components/topbar/topbar";
import { Outlet } from "react-router-dom";
import { ContentWrapper } from "./layout.styles";
import Footer from "./components/footer/footer";
import myToastFunction from "./components/toast";


const LayoutComponent = () => {

  return (
    <>
      <TopBarComponent />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <Footer />
    </>
  );
};

export default LayoutComponent;
