import React, {useContext} from "react";
import logo from "./../min.png";
import styled, { css } from "styled-components";
import {Link, useLocation, useNavigate } from "react-router-dom";


import { AuthContext } from "../ctx/AuthContext/Auth";

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
      background: #9c709e;
      font-weight: bold;
    `};
    a{
      text-decoration: none;
      color: #cdcdcd;
    }
`;

const Logo = styled.img`
  padding: 32px;
  width: 150px;
`;

const links = [
  { label: "Dashboard", url: "/dasboard" },
  { label: "Calendar", url: "/calendar" },
  { label: "Transactions", url: "/transactions" },
  { label: "Settings", url: "/settings" },
]

const NavBar = () => {
  const location = useLocation();
  const history = useNavigate();

  const{firebase, setUser} = useContext(AuthContext);
  const handleLogout = () => {
    console.log("Ciao!");
    firebase
    .auth()
    .signOut()
    .then(()=>{
      setUser(null);
      history('/');
    })
  };
  return (
    <Container>
      <Logo src={logo} className="App-logo" alt="App Logo" />
      <List>
        {links.map((link) => {
          const active = location.pathname ===link.url;
          return (
            <Item active={active}>
            <Link to={`${link.url}`}>{link.label}</Link>
            </Item>
          );
        })}
        <Item onClick={handleLogout}>Logout</Item>

      </List>
    </Container>
  );
};
export { NavBar };
