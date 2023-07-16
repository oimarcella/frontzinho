import { Container } from "react-bootstrap";
import styled from "styled-components";

export const StyledFooter = styled.footer`
    background: #E7F2F8;
    box-sizing: border-box;
    display: block;
`;
export const ContentStyled = styled(Container)`
	padding-top: 70px;
	padding-bottom: 70px;
	img {
		height: 41px;
		display: inline-block;
	}
`;
export const RowStyled = styled.div`
	@media screen and (max-width: 767px) {
		button:nth-child(2){
			margin-top: 15px;
			margin-left: 35%;
		}
	}
`;
export const LogoStyled = styled.div`
	img:nth-child(2) {
		margin-left: 25px;
	}
	@media screen and (max-width: 512px){
		align-items: center;
		flex-direction: column;
		img:nth-child(1){
		margin-bottom: 20px;
		}
		img:nth-child(2) {
		margin-left: 0px;
	}
	}
`;
export const LgpdStyled = styled.div`
	padding: 30px 0;
	background-color: white;
	p {
		font-style: normal;
		font-size: 14px;
		font-weight: 400;
		line-height: 20px;
		text-align: center;
		color: #0B344E;
		max-width: 920px;
		margin: auto;
	}
	@media screen and (max-width: 512px){
		padding: 0, 15px;
  	}
`;