import { Container } from "react-bootstrap";
import { BodyStyled, HeaderStyled, ServicesTags, ProfileClinicPageStyled } from "./styles";
import { Store } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { ERoutes } from "../../core/enums/routes";
import { Section } from "../../components/layout/components/styles/sections";
import Loading from "../../components/layout/components/loading";

type RouteParamsT = {
    clinicId: string;
}

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

const ClinicProfile = () => {
    const routeParams = useParams<RouteParamsT>();
    const [clinic, setClinic] = useState<ClinicT>({} as ClinicT);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        api.get(`${ERoutes.CLINIC}/${routeParams.clinicId}`)
            .then(response => {
                setClinic(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(`Erro: ${error.message}`);
                setLoading(false);
            })
    }, [routeParams.clinicId])

    return (
        <ProfileClinicPageStyled>
            {loading ?
                <Loading />
                :
                <>
                    <HeaderStyled>
                        <Section>
                            <Container className="d-flex justify-content-between align-items-center flex-column flex-lg-row">
                                <div className="d-flex flex-column">
                                    <h4>Clínica/Hospital</h4>
                                    <span className="d-flex align-items-center">
                                        <Store className="me-2" />
                                        <h3 className="mb-0">{clinic.name}</h3>
                                    </span>
                                </div>
                                <ServicesTags className="d-flex flex-wrap">
                                    {
                                        clinic.services && clinic.services.length > 0 &&
                                        clinic.services.map(service =>
                                            <span className="d-flex align-items-center">{service.name}</span>
                                        )
                                    }
                                </ServicesTags>
                            </Container>
                        </Section>
                    </HeaderStyled>
                    <BodyStyled>
                        <Section>
                            <Container>
                                <div className="d-flex flex-column mb-4">
                                    <h3 className="mb-3">Endereço</h3>
                                    <p> {clinic.address}, {clinic.neighborhood}, nº {clinic.number} CEP {clinic.zip_code}</p>
                                    <p></p>
                                </div>
                            </Container>
                        </Section>
                    </BodyStyled>
                </>
            }
        </ProfileClinicPageStyled>
    )
}

export default ClinicProfile;