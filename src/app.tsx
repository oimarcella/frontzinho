import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import LayoutComponent from "./components/layout/layout";
import HomePage from "./pages/home/home";

import { IntlProvider } from "react-intl";
import { ERoutes } from "./core/enums/routes";
import { getLangJson } from "./core/utils/lang.util";
import AboutUsPage from "./pages/about-us/about-us";
import NotFoundPage404 from "./pages/not-found-404/not-found-404";
import LoginPage from "./pages/login";

function App() {
  return (
    <IntlProvider messages={getLangJson()} locale="pt-br" defaultLocale="en">
      <BrowserRouter basename="/">
        <Routes>
          <Route path={ERoutes.LOGIN} element={<LoginPage />} />

          <Route path={ERoutes.ORIGIN} element={<LayoutComponent />}>
            <Route index element={<HomePage />} />
            <Route path={ERoutes.HOME} element={<HomePage />} />
            <Route path={ERoutes.ABOUT_US} element={<AboutUsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage404 />} />
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
