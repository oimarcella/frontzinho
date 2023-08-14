import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { ERoutes } from "../../core/enums/routes";
import { useNavigate } from "react-router-dom";

const PanelPage = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        !user.id && navigate(ERoutes.LOGIN);
    }, [])
    return (
        <>
            <h1>Bem vindo {user.name}</h1>
        </>
    )
}
export default PanelPage;