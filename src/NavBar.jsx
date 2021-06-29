import React from "react";
import logo from './min.png';
import styled, { css } from "styled-components";

const Container = styled.div`
	border-right: 1px solid white;
    height: 100vh;
`;

const List = styled.ul`
	list-style-type: none;
	padding: 32px 0;
	margin: 0;
`;

const Item = styled.li`
	padding: 10px 20px;
	margin-bottom: 8px;
	${(props) =>
		props.active &&
		css`
			background: #9C709E;
			font-weight: bold;
		`};
		${(props) =>
			props.disabled &&
			css`
				background: #FFF;
				font-weight: bold;
			`};
`;

const Logo = styled.img`
padding: 32px;
width: 150px;
`;

const NavBar = () => {
	return (
		<Container>
			<Logo src={logo} className="App-logo" alt="App Logo" />
			<List>
				<Item active>Dashboard</Item>
				<Item>Calendar</Item>
				<Item disabled>Transactions</Item>
			</List>
		</Container>
	);
};

export { NavBar };
