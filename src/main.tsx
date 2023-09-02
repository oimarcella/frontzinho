import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes";
import { Provider } from 'react-redux'
import store from './redux/store';
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { getLangJson } from "./core/utils/lang.util";
import api from "./services/api";
import { login } from "./redux/userSlice";
import jwt_decode from 'jwt-decode';

type DecodedT = {
  id: number;
  role: string;
}

const token = localStorage.getItem('@petpass-token');

function decodeToken(token: string): DecodedT {
  return jwt_decode(token);
}

if (token) {
  const decoded: DecodedT = decodeToken(token);
  const role = decoded.role;

  api.get(`/${role}s/${decoded.id}`) /* TODO - Preciso receber o username do usuario nessa response */
    .then(response => {
      const user = response.data;
      store.dispatch(login({
        role: decoded.role,
        id: user.id,
        name: user.name,
        username: user.username,
        //email: user.email,
        ...(user.email ? { email: user.email } : {}),
        jwtToken: token /* TODO - Passar mais uma propriedade no objeto para armazenar o username do usuário, caso */
      }));
    })
    .catch(error => {
      console.error('Erro ao buscar dados do usuário:', error);
    });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  });
}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider messages={getLangJson()} locale="pt-br" defaultLocale="en">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  </React.StrictMode>
);
