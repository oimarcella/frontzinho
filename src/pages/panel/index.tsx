import { useState } from "react";
import { ContainerStyled, PagePanel } from "./styles";
import useWindowDimensions from "../../core/hooks/useWindowDimensions";
import Loading from "../../components/layout/components/loading";
import YourPets from "./components/your-pets";
import NearbyClinics from "./components/nearby-clinics";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import ClinicVets from "./components/clinic-vets";
import ClinicPets from "./components/clinic-pets";

const PanelPage = () => {
    const [isLoading, setLoading] = useState(false);
    const viewWidth = useWindowDimensions().width;
    const userLogged = useSelector(selectUser);

    return !isLoading ? (
        <PagePanel>
            <ContainerStyled>

                {
                    userLogged.role === "user" &&
                    <>
                        <YourPets />
                        <NearbyClinics />
                    </>

                }
                {
                    userLogged.role === "vet" &&
                    <>
                        <ClinicPets />
                    </>

                }
                {
                    userLogged.role === "clinica" &&
                    <>
                        <ClinicVets />
                        <ClinicPets />
                    </>

                }
            </ContainerStyled>
        </PagePanel >
    )
        :
        <Loading />
}
export default PanelPage;