import { Navigate, Outlet } from "react-router-dom";
import { ERoutes } from "../core/enums/routes";
import jwt_decode from 'jwt-decode';
import { logout } from "../redux/userSlice";
import store from "../redux/store";
import { show } from "../redux/toastSlice";

type DecodedTokenT = {
    exp: number;
    id: number;
    lastname: string;
    name: string;
}

const PrivateRoute = () => {
    let decodedToken: DecodedTokenT;
    function isTokenValid(token: string) {
        decodedToken = jwt_decode(token);
        if (!decodedToken.id) {
            localStorage.removeItem("@petpass-token");
            store.dispatch(show({
                type: "error",
                message: "Autenticação inválida. Faça login novamente.",
            }))
            store.dispatch(logout());
            return false;
        }
        if (Date.now() >= decodedToken.exp * 1000) {
            localStorage.removeItem("@petpass-token");
            store.dispatch(show({
                type: "error",
                message: "Sessão expirou. Faça login novamente.",
            }))
            store.dispatch(logout());
            return false;
        }
        else return true;
    }
    const routerGuard = () => {
        const token = window.localStorage.getItem("@petpass-token");
        if (token) return isTokenValid(token);
        return false;
    }
    return routerGuard() ? <Outlet /> : <Navigate to={ERoutes.LOGIN} />;
};

export default PrivateRoute;