import { Container } from "react-bootstrap";
import { BodyStyled, HeaderStyled, ServicesTags, ProfileClinicPageStyled } from "./styles";
import { Store } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import api from "../../services/api";
import { ERoutes } from "../../core/enums/routes";
import { Section } from "../../components/layout/components/section/sections";
import Loading from "../../components/layout/components/loading";
/*Google maps */
import {
    GoogleMap,
    InfoWindow,
    Marker,
    useLoadScript,
} from "@react-google-maps/api";
import axios from "axios";

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
    const [localization, setLocalization] = useState<{ address: string, lat: number, lng: number }>({} as { address: string, lat: number, lng: number });
    //console.log("🚀 ~ file: index.tsx:40 ~ ClinicProfile ~ localization:", localization)
    const markers = [localization];
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState<{ id: any, address: any }>();
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${localization.address}&key=${import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY}`;
    //const center = useMemo(() => ({ lat: localization.lat, lng: localization.lng }), []); //Starts with clinic cordinators
    const [zoom, setZoom] = useState(10);

    useEffect(() => {
        console.clear()
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

        //console.log("CLínica:", clinic.address)
        console.log("URL:", `https://api.opencagedata.com/geocode/v1/json?q=${clinic.address}`) //&key=${import.meta.env.VITE_REACT_APP_GEOCODINGAPI_KEY}

        clinic.address &&
            axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${clinic.address}&key=${import.meta.env.VITE_REACT_APP_GEOCODINGAPI_KEY}`)
                .then(response => {
                    setLocalization({ address: response.data?.results[0].formatted, ...response.data?.results[0].geometry })
                    setLoading(false);
                    setZoom(15);
                })
                .catch(error => {
                    console.error('Erro ao obter dados de geolocalização:', error);

                    setLoading(false);
                })
    }, [routeParams.clinicId, clinic.address])

    //@ts-ignore
    const onLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        markers?.forEach(({ lat, lng }) => bounds.extend({ lat: Number(lat), lng: Number(lng) }));
        map.fitBounds(bounds);
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY || "",
    });

    //@ts-ignore
    const handleMarkerClick = (id, lat, lng, address) => {
        //@ts-ignore 
        mapRef?.panTo({ lat, lng });
        //@ts-ignore
        setInfoWindowData({ id, address });
        setIsOpen(true);
    };

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
                                            <span key={service.name} className="d-flex align-items-center">{service.name}</span>
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

                                    <div style={{ height: "80vw", width: "80vw" }}>
                                        {(!isLoaded && loading) ? (
                                            <h1>Buscando mapa...</h1>
                                        ) : (isLoaded && !loading) ? (
                                            <>
                                                <h3 className="mb-3">Região</h3>
                                                <GoogleMap
                                                    //onLoad={onLoad}
                                                    mapContainerClassName="map-container"
                                                    center={{ lat: localization.lat, lng: localization.lng }}
                                                    zoom={15}
                                                >
                                                    {markers.map(({ address, lat, lng }, ind) => (
                                                        <Marker
                                                            key={ind}
                                                            position={{ lat, lng }}
                                                            onClick={() => {
                                                                handleMarkerClick(ind, lat, lng, address);
                                                            }}
                                                        >
                                                            {isOpen && infoWindowData?.id === ind && (
                                                                <InfoWindow
                                                                    onCloseClick={() => {
                                                                        setIsOpen(false);
                                                                    }}
                                                                >
                                                                    <h3>{infoWindowData.address}</h3>
                                                                </InfoWindow>
                                                            )}
                                                        </Marker>
                                                    ))}
                                                </GoogleMap>
                                            </>
                                        )
                                            :
                                            <h3>Não foi possível carregar o mapa da região</h3>
                                        }
                                    </div>
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