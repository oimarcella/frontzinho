import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { NavBarStyled, NavStyled, NavLinkStyled, NavbarBrandStyled } from "./topbar.styles";
import { FormattedMessage } from "react-intl";
import { ERoutes } from "../../../../core/enums/routes";
import Button from "../button/button";

const TopBarComponent = () => {

	const currentRoute = useLocation().pathname;
	const isHomeRoute = currentRoute == "/";
	const isLoginRoute = currentRoute == "/login";
	const isDiscoverRoute = currentRoute == "/ola";
	const userIsLogged = false;
	const styleMustBeDifferent = isHomeRoute || isLoginRoute || isDiscoverRoute;

	function redirect(link: string) {
		window.location.replace(link);
	}

	return (
		<NavBarStyled styleMustBeDifferent={styleMustBeDifferent} expand="lg">
			<Container>
				<NavbarBrandStyled as={Link} to={userIsLogged ? ERoutes.HOME : ERoutes.LOGIN}>
					<img src="/images/petpass_small_dark-v1.svg" className="img-fluid" />
				</NavbarBrandStyled>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<NavStyled className="me-auto d-flex flex-row align-items-center justify-content-between">

						<div className="d-flex flex-column flex-lg-row">
							{((currentRoute !== "/login") && (currentRoute !== "/not-found") && (userIsLogged)) &&
								<NavLinkStyled as={Link} to={ERoutes.PROFILE}>
									<FormattedMessage
										id="topbar_profile_link"
										defaultMessage="Perfil"
									/>
								</NavLinkStyled>
							}
						</div>

						{
							(currentRoute == "/login" || currentRoute == "/") &&
							<div className="d-flex flex-column flex-lg-row">
								<Button outlined="outlined" color="#0B344E" className="mt-2 mt-lg-0" onClick={() => { redirect(ERoutes.SIGNUP) }}>Criar conta</Button>
							</div>
						}
					</NavStyled>
				</Navbar.Collapse>
			</Container>
		</NavBarStyled >
	);
};

export default TopBarComponent;
