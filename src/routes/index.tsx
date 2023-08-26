import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/home";

import { IntlProvider } from "react-intl";
import { ERoutes } from "../core/enums/routes";
import { getLangJson } from "../core/utils/lang.util";
import AboutUsPage from "../pages/about-us/about-us";
import NotFoundPage404 from "../pages/not-found-404";
import LoginPage from "../pages/login";
import SignUpPage from "../pages/sign-up";
import DiscoverPage from "../pages/discover";
import PanelPage from "../pages/panel";
import MyModal from "../components/layout/components/modal";
import { useDispatch, useSelector } from "react-redux";
import { selectModal } from "../redux/modalSlice";
import { login, logout, selectUser } from "../redux/userSlice";
import TopBarComponent from "../components/layout/components/topbar/topbar";
import Footer from "../components/layout/components/footer/footer";
import MyToast from "../components/layout/components/toast";
import PrivateRoute from "./privateRoutes";
import HistoryPage from "../pages/history";
import ProfilePetPage from "../pages/pet-profile";

const AppRoutes = () => {
  const modal = useSelector(selectModal);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  //let decodedToken: DecodedTokenT;

  return (
    <>
      <TopBarComponent />
      <MyToast />
      <MyModal
        contentBody={modal.bodyNode}
        contentFooter={modal.footerNode}
        title={modal.title}
        hasFooter={modal.hasFooter}
        hasHeader={modal.hasHeader}
      />
      <Routes>
        <Route path={ERoutes.LOGIN} element={<LoginPage />} />

        <Route index element={<LoginPage />} />
        <Route path={'/'} element={<HomePage />} />
        <Route path={ERoutes.HOME} element={<HomePage />} />
        <Route path={ERoutes.ABOUT_US} element={<AboutUsPage />} />
        <Route path={ERoutes.SIGNUP} element={<SignUpPage />} />
        <Route element={<PrivateRoute />}>
          <Route path={ERoutes.DISCOVER} element={<DiscoverPage />} />
          <Route path={ERoutes.PANEL} element={<PanelPage />} />
          <Route path={ERoutes.HISTORY} element={<HistoryPage />} />
          <Route path={`${ERoutes.CLINIC}/:clinicId`} element={<PanelPage />} />
          <Route path={`${ERoutes.PET}/:petId`} element={<ProfilePetPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default AppRoutes;
