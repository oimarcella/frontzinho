import { useState } from "react";
import { ContainerStyled, PagePanel } from "./styles";
import useWindowDimensions from "../../core/hooks/useWindowDimensions";
import Loading from "../../components/layout/components/loading";
import YourPets from "./components/your-pets";
import NearbyClinics from "./components/nearby-clinics";

const PanelPage = () => {
    const [isLoading, setLoading] = useState(false);
    const viewWidth = useWindowDimensions().width;

    return !isLoading ? (
        <PagePanel>
            <ContainerStyled>
                <YourPets />
                <NearbyClinics />
            </ContainerStyled>
        </PagePanel >
    )
        :
        <Loading />
}
export default PanelPage;