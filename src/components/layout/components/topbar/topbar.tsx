import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavBarStyled, NavStyled, NavLinkStyled, NavbarBrandStyled, NavCollapseStyled, LinkStyledName } from "./topbar.styles";
import { FormattedMessage } from "react-intl";
import { ERoutes } from "../../../../core/enums/routes";
import Button from "../button/button";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../../redux/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import api from "../../../../services/api";
import { useEffect, useState } from "react";

type PetT = {
	id?: number;
	age: string;
	specie: string;
	name: string;
};
type VetT = {
	clinica_id: number;
};

const TopBarComponent = () => {

	const currentRoute = useLocation().pathname;
	const isHomeRoute = currentRoute == "/";
	const isLoginRoute = currentRoute == "/login";
	const isDiscoverRoute = currentRoute == "/ola";
	const styleMustBeDifferent = isHomeRoute || isLoginRoute || isDiscoverRoute;
	const userLogged = useSelector(selectUser);
	const dispatch = useDispatch();
	const location = useLocation();
	const urlParams = new URLSearchParams(location.search);
	const navigate = useNavigate();
	const [pets, setPets] = useState<PetT[]>([]);
	const [vet, setVet] = useState<VetT>({} as VetT);

	function redirect(link: string) {
		window.location.replace(link);
	}

	function getVetById() {
		api.get(`/vets/${userLogged.id}`)
			.then((response) => {
				setVet(response.data);
			})
			.catch(error => {
				console.log("Erro ao buscar dados do veterinario: ", error);
			});
	}

	function getPetsFromIdReceived() {

		api.get(`/${userLogged.role == "user" ? "users" : "clinicas"}/${userLogged.role === "vet" ? vet.clinica_id : userLogged.id}/pets`)
			.then((response) => {
				setPets(response.data.reverse());
			})
			.catch(error => {
				console.log("Erro: ", error);
			});
	}

	useEffect(() => {
		userLogged.role === "vet" &&
			getVetById();
	}, [userLogged.role])

	useEffect(() => {
		getPetsFromIdReceived()
	}, [userLogged, vet])

	return (
		urlParams.get("origin") !== "iframe" ? <NavBarStyled styleMustBeDifferent={styleMustBeDifferent} expand="lg">
			<Container>
				{!userLogged.id ?
					<NavbarBrandStyled as={Link} to={ERoutes.LOGIN}>
						<img src="/images/petpass_small_dark-v1.svg" className="img-fluid" />
					</NavbarBrandStyled>
					:
					<LinkStyledName className="mx-0 mx-md-3 d-flex flex-column" to={ERoutes.PANEL}>
						<strong>{userLogged.name.charAt(0).toUpperCase()}{userLogged.name.substring(1)}</strong>
						<span>{userLogged.role === "user" ? "Tutor" : userLogged.role === "clinica" ? "Clínica" : "Veterinário"}</span>
					</LinkStyledName>
				}
				{userLogged.id &&
					<>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<NavCollapseStyled id="basic-navbar-nav">
							<NavStyled className="me-auto d-flex flex-column flex-lg-row align-items-start justify-content-start align-items-lg-center justify-content-lg-between">

								<div className="d-flex flex-column flex-lg-row">
									{currentRoute !== "/not-found" &&
										<>
											{/* MENUS DO USUÁRIO LOGADO */}
											{/*userLogged.role !== "vet" &&
												<NavLinkStyled as={Link} to={ERoutes.PROFILE}>
													<FormattedMessage
														id="topbar_profile_link"
														defaultMessage="Perfil"
													/>
											</NavLinkStyled>*/}

											<NavLinkStyled as={Link} to={`${ERoutes.PANEL}`}>
												<FormattedMessage
													id="topbar_panel_link"
													defaultMessage="Início"
												/>
											</NavLinkStyled>
											{pets.length > 0 &&
												<NavLinkStyled as={Link} to={`${ERoutes.TIMELINE}/${pets[0].id}`}>
													<FormattedMessage
														id="topbar_historic_link"
														defaultMessage="Linha do tempo"
													/>
												</NavLinkStyled>
											}
											{
												userLogged.role === "clinica" &&
												<NavLinkStyled as={Link} to={`${ERoutes.CLINIC}/${userLogged.id}`}>
													Minha clínica
												</NavLinkStyled>
											}
										</>
									}
								</div>

								{/*
							(currentRoute == "/login" || currentRoute == "/") &&
							<div className="d-flex flex-column flex-lg-row">
								<Button outlined="outlined" color="#0B344E" className="mt-2 mt-lg-0" onClick={() => { redirect(ERoutes.SIGNUP) }}>Criar conta</Button>
							</div>*/
								}

								{userLogged.id &&
									<div className="d-flex flex-column flex-lg-row">
										<Button
											outlined="outlined"
											color="#0B344E"
											id="btn-logout"
											className="mt-2 mt-lg-0"
											onClick={() => {
												dispatch(logout());
												navigate(ERoutes.LOGIN);
											}}
											customStyles={{ border: "none" }}
										>
											<FontAwesomeIcon className="ms-0 ms-md-1" icon={faRightFromBracket} />
										</Button>
									</div>
								}
							</NavStyled>
						</NavCollapseStyled>
					</>
				}
				{
					(currentRoute == "/login" || currentRoute == "/") &&
					<div className="d-flex flex-column flex-lg-row">
						<Button outlined="outlined" color="#0B344E" className="mt-2 mt-lg-0" onClick={() => { redirect(ERoutes.SIGNUP) }}>Criar conta</Button>
					</div>
				}
			</Container>
		</NavBarStyled >
			:
			<div></div>
	)
};

export default TopBarComponent;
