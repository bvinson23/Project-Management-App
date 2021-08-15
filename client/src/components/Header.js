import React, { useState } from "react";
import { NavLink, NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../modules/authManager";
import "../App.css";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from "reactstrap";

const Header = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand tag={RRNavLink} to="/">Home</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {isLoggedIn &&
                <>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/projects">Projects</NavLink>
                  </NavItem>
                  <NavItem>
                    <a aria-current="page" className="nav-link"
                      style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                  </NavItem>
                </>
              }
              {!isLoggedIn &&
                <>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavItem tag={RRNavLink} to="/register">Register</NavItem>
                  </NavItem>
                </>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Header;