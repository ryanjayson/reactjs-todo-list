import React from "react";
import Container from "react-bootstrap/Container";
import logo from "../assets/logo.png";
import Menu from "./HeaderMenuDropdown.js";

const Header = () => {
  return (
    <div className="header">
      <Container
        style={{
          paddingTop: 5,
          height: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <img
            src={logo}
            className="app-logo"
            alt="logo"
            style={{ width: 120, height: 40 }}
          />
          <Menu />
        </div>
      </Container>
    </div>
  );
};

export default Header;
