import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutComponent from "../components/layout/layout";
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

function App() {
  return (
    <IntlProvider messages={getLangJson()} locale="pt-br" defaultLocale="en">
      <MyModal />
      <BrowserRouter>
        <Routes>
          <Route path={ERoutes.LOGIN} element={<LoginPage />} />

          <Route path={ERoutes.ORIGIN} element={<LayoutComponent />}>
            <Route index element={<LoginPage />} />
            <Route path={'/'} element={<HomePage />} />
            <Route path={ERoutes.HOME} element={<HomePage />} />
            <Route path={ERoutes.ABOUT_US} element={<AboutUsPage />} />
            <Route path={ERoutes.SIGNUP} element={<SignUpPage />} />
            <Route path={ERoutes.DISCOVER} element={<DiscoverPage />} />
            <Route path={ERoutes.PANEL} element={<PanelPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage404 />} />
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
