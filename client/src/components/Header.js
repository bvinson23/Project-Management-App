import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../modules/authManager";
import "../App.css";
import { Collapse, Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";

const Header = ({ isLoggedIn }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <div>
                <Navbar dark expand="md">
                    <NavbarBrand tag={RRNavLink} to="/">Home</NavbarBrand>
                </Navbar>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/projects">Projects</NavLink>
                                </NavItem>
                                </>}
                            </Nav>
                </Collapse>
            </div>
        </>
            )
}