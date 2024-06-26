import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { BodyStyled, HeaderStyled, ServicesTags, ProfileClinicPageStyled } from "./styles";
import { Add, Check, Close, Edit, Store } from "@material-ui/icons";
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
import { ContentCopy } from "@mui/icons-material";
import MToolTip from "../../components/layout/components/mtooltip";
import Button from "../../components/layout/components/button/button";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { show } from "../../redux/toastSlice";

type RouteParamsT = {
    clinicId: string;
}
type ServicesT = {
    id: number;
    name: string;
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
    services?: Array<{ id: number, name: string }>;
}

const ClinicProfile = () => {
    const routeParams = useParams<RouteParamsT>();
    const [clinic, setClinic] = useState<ClinicT>({} as ClinicT);
    const [loading, setLoading] = useState(false);
    const [localization, setLocalization] = useState<{ address: string, lat: number, lng: number }>({} as { address: string, lat: number, lng: number });
    const markers = [localization];
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState<{ id: any, address: any }>();
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${localization.address}&key=${import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY}`;
    const [zoom, setZoom] = useState(10);
    const [copied, setCopied] = useState(false);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [serviceSelected, setServiceSelected] = useState(0);
    const [services, setServices] = useState<Array<ServicesT>>([]);
    const userLogged = useSelector(selectUser);
    const dispatch = useDispatch();
    const [newService, setNewService] = useState("");
    const [otherService, setOtherService] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [formEdit, setFormEdit] = useState({} as ClinicT);

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

    function copyAddress() {
        navigator.clipboard.writeText(`${clinic.address}, ${clinic.neighborhood}, ${clinic.number}, ${clinic.zip_code}`);
        setCopied(true);
        setTimeout(() => { setCopied(false) }, 1000);
    }

    //@ts-ignore
    const handleMarkerClick = (id, lat, lng, address) => {
        //@ts-ignore 
        mapRef?.panTo({ lat, lng });
        //@ts-ignore
        setInfoWindowData({ id, address });
        setIsOpen(true);
    };

    function getServices() {
        api.get("/services")
            .then(response => {
                setServices(response.data);
                response = response.data;
            })
            .catch(error => {
                console.log("Error:", error);
            });
    }

    useEffect(() => {
        getServices();
    }, [userLogged.role, otherService])

    function connectServiceAndClinic(service: number) {
        console.log("conectar-serviço")

        const newservice = services.find(s => s.id === service);

        api.post(`${ERoutes.CLINIC}/conectar-serviço`, {
            clinica: userLogged.id,
            servico: service
        })
            .then(response => {
                dispatch(
                    show({ message: "Serviço adicionado!", type: "success" })
                );

                if (!clinic.services) {
                    clinic.services = [];
                }
                const newServicesArray = [...clinic.services, { name: newservice?.name || "", id: service }];

                setClinic(prev => ({
                    ...prev,
                    services: newServicesArray
                }));
            })
            .catch(error => {
                console.log("Error:", error);
                dispatch(
                    show({ message: "Não foi possível conectar serviço", type: "error" })
                );
            })
            .finally(() => {
                setOtherService("");
                setIsOpenModal(false);
                setServiceSelected(0);
            })
    }

    function createNewService(service: string) {
        api.post(`/services`, {
            name: service
        })
            .then(response => {
                dispatch(show({ message: "Serviço criado!", type: "info" }));
            })
            .catch(error => {
                console.log("Error:", error);
                dispatch(show({ message: "Não foi possível criar serviço", type: "error" }));
            })
    }

    function deleteServiceFromClinic(id: number) {
        api.delete("/clinicas/conectar-serviço", { data: { clinica: userLogged.id, servico: id } })
            .then(response => {

                if (!clinic.services) {
                    clinic.services = [];
                }
                const updatedArr = clinic.services.filter(service => service.id != id);
                setClinic(prev => ({
                    ...prev,
                    services: updatedArr
                }));
            })
            .catch(error =>
                dispatch(show({ message: "Não foi possível conectar serviço", type: "danger" })))
    }

    function addService() {
        const serviceFound = services.find(service => {
            if (Number(serviceSelected) === service.id)
                return service.name;
        })?.id || otherService;

        if (!otherService) {
            if (typeof serviceFound === "number")
                connectServiceAndClinic(serviceFound);
        }
        else { /*Se o serviço não existir na lista, a clínica pode criar*/
            if (typeof serviceFound === "string") {
                createNewService(`${serviceFound}`);

                api.get("/services")
                    .then(response => {
                        setServices(response.data);
                        const newService = response.data.find(
                            (service: { name: string, id: number }) =>
                                otherService === service.name
                        );
                        newService && connectServiceAndClinic(newService.id);
                    })
                    .catch(error => {
                        console.log("Error:", error);
                    });
            }
        }

    }

    function saveAddress() {
        api.put(`/clinicas/${userLogged.id}`, formEdit)
            .then(response => {
                setClinic(prev => ({ ...formEdit, name: prev.name }));
                setFormEdit({} as ClinicT);
                setIsEditing(false);
                dispatch(show({ type: "success", message: "Endereço alterado" }));
            })
            .catch(error => {
                dispatch(show({ type: "error", message: "Não foi possível alterar endereço" }));
                setFormEdit({} as ClinicT);
                setIsEditing(false);
            })
    }

    const handleFieldChange = (field: string, value: any, changeFunc: Function) => {
        //@ts-ignore
        changeFunc(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <ProfileClinicPageStyled>
            <Modal show={isOpenModal} onHide={() => setIsOpenModal(false)}>
                <Modal.Header>Adicione um novo serviço a sua clínica</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Select aria-label="Selecione a clínica para conectar seu pet aqui"
                                    value={serviceSelected}
                                    onChange={(e) => setServiceSelected(Number(e.target.value))}
                                >
                                    <option value={0}>Qual o novo serviço da clínica?</option>
                                    {services.map(service => <option key={service.id} value={service.id}>{service.name}</option>)}
                                    <option value={services.length + 1}>Outro não listado</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        {
                            serviceSelected === services.length + 1 &&
                            <Form.Control type="text" placeholder="Digite..." value={otherService}
                                className="mt-3"
                                onChange={(e) => setOtherService(e.target.value)}
                            />
                        }
                        <Button className="mt-3" color="#FF41AD" outlined="none" type="button" onClick={() => addService()}>
                            Adicionar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {loading ?
                <Loading />
                :
                <>
                    <HeaderStyled>
                        <Section>
                            <Container className="d-flex justify-content-between align-items-center flex-column flex-lg-row">
                                <div className="d-flex flex-column align-items-center">
                                    <h4>Clínica/Hospital</h4>
                                    <span className="d-flex align-items-center">
                                        <Store className="me-2" />
                                        <h3 className="mb-0">{clinic.name}</h3>
                                    </span>
                                </div>
                                <ServicesTags className="d-flex flex-wrap">
                                    <>
                                        {
                                            clinic.services && clinic.services.length > 0 &&
                                            clinic.services.map(service =>
                                                <span key={service.name} className="d-flex align-items-center">{service.name}
                                                    <Close style={{ cursor: "pointer" }} onClick={() => deleteServiceFromClinic(service.id)} />
                                                </span>
                                            )
                                        }
                                        {
                                            userLogged.role === "clinica" &&
                                            <span
                                                key="ADD"
                                                style={{
                                                    backgroundColor: "var(--light-blue-100)",
                                                    color: "var(--dark-blue-500)",
                                                    border: "1px solid var(--dark-blue-500)",
                                                    cursor: "pointer"
                                                }}
                                                className="d-flex align-items-center"
                                                onClick={() => setIsOpenModal(true)}
                                            >
                                                <Add /> Adicionar
                                            </span>}

                                    </>
                                </ServicesTags>
                            </Container>
                        </Section>
                    </HeaderStyled>
                    <BodyStyled>
                        <Section>
                            <Container>
                                <div className="d-flex flex-column mb-4">
                                    <h3 className="mb-3">Endereço
                                        {
                                            userLogged.role === "clinica" &&
                                            <>
                                                {!isEditing ?
                                                    <Edit className="ms-3" onClick={() => setIsEditing(true)} />
                                                    :
                                                    <Check style={{ color: "green", cursor: "pointer" }} className="ms-3" onClick={() => saveAddress()} />
                                                }
                                            </>
                                        }
                                    </h3>
                                    {!isEditing ?
                                        <>
                                            <div className="d-flex align-items-center">
                                                <p className="me-4">{clinic.address}, {clinic.neighborhood}, nº {clinic.number} CEP {clinic.zip_code}</p>

                                                <MToolTip title="Copiar" id="copiar" className="d-flex justify-content-center align-items-center flex-column">
                                                    <ContentCopy onClick={copyAddress} />
                                                    {copied && <small style={{ color: "green" }}>Copiado!</small>}
                                                </MToolTip>
                                            </div>
                                        </> :
                                        <Form className="mb-4">
                                            <Row>
                                                <Form.Control placeholder="Rua" onChange={e => handleFieldChange("address", e.target.value, setFormEdit)} value={formEdit.address} />
                                                <Form.Control placeholder="Número" onChange={e => handleFieldChange("number", e.target.value, setFormEdit)} value={formEdit.number} />
                                                <Form.Control placeholder="Bairro" onChange={e => handleFieldChange("neighborhood", e.target.value, setFormEdit)} value={formEdit.neighborhood} />
                                                <Form.Control placeholder="CEP" onChange={e => handleFieldChange("zip_code", e.target.value, setFormEdit)} value={formEdit.zip_code} />
                                            </Row>
                                        </Form>
                                    }

                                    <div style={{ height: "60vw", width: "60vw" }}>
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
        </ProfileClinicPageStyled >
    )
}

export default ClinicProfile;