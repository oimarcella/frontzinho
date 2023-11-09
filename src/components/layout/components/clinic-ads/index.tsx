import { useEffect, useState } from "react";
import { ERoutes } from "../../../../core/enums/routes";
import api from "../../../../services/api";
import { AddBlockStyled, ContainerClinicAds, LineAdds } from "./style";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/userSlice";
import Loading from "../loading";
import { useNavigate } from "react-router-dom";

type ClinicT = {
    name: string;
    address: string;
    number: string;
    neighborhood: string;
    role: string;
    cnpj: string;
    zip_code: string;
    id: number;
    services: Array<{ id: number, name: string }>;
}

type ClinicAdsPropsT = {
    orientation: "vertical" | "horizontal";
    quantity: number;
}

const ClinicAds = (props: ClinicAdsPropsT) => {
    const [clinics, setClinics] = useState<Array<ClinicT>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const userLogged = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        api.get(ERoutes.CLINIC)
            .then(response => {
                setClinics(getRandomClinics(response.data, props.quantity));
            })
            .catch(error => {
                console.log(`Erro: ${error.message}`);
            })
        setIsLoading(false);
    }, []);

    function getRandomClinics(arr: [], quantity: number) {
        let quantitySolicited = quantity;
        if (quantitySolicited > arr.length) {
            console.error("A quantidade solicitada é maior que o tamanho do array.");
            quantitySolicited = arr.length;
        }

        const randomPositions: ClinicT[] = [];
        const copyArr = [...arr];

        for (let i = 0; i < quantitySolicited; i++) {
            const randomIndex = Math.floor(Math.random() * copyArr.length);
            const selectedItem = copyArr.splice(randomIndex, 1)[0];
            randomPositions.push(selectedItem);
        }

        return randomPositions;
    }

    function handleClickCard(id: number) {
        navigate(`${ERoutes.CLINIC}/${id}`);
    }

    return (
        userLogged.role === "user" ?
            isLoading ?
                <Loading />
                :
                <ContainerClinicAds>
                    {
                        (clinics && clinics.length > 0) ?
                            <div className="d-flex flex-column">
                                <small style={{ color: '#adada' }}>Anúncio</small>

                                <LineAdds orientation={props.orientation}>
                                    {clinics.map((clinic, index) =>
                                        <AddBlockStyled key={index} onClick={() => handleClickCard(clinic.id)}>
                                            <strong>{clinic.name}</strong>
                                            <small>Parceiro PetPass</small>
                                            <p>Confira se existe algum valor promocional em vigência para os serviços da clínica.</p>
                                        </AddBlockStyled>
                                    )}
                                </LineAdds>
                            </div>
                            :
                            <>
                            </>
                    }
                </ContainerClinicAds >
            :
            <>
                {/* Para caso esse componente seja usado em alguma pagina em comum com clinica e vet */}
            </>
    )
}

export default ClinicAds;