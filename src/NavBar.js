import React from 'react';
import { ReactSession } from 'react-client-session';
import { Container, Navbar, Nav } from "react-bootstrap";

const About = () => { return (alert("Version: 1.0")); }

const Logout = () => { 
    ReactSession.remove("email");
    ReactSession.remove("id");
    ReactSession.remove("first_name");
    this.forceUpdate();
}

const LoggedIn = () => (
    <>
        <Nav.Link className="nav-link" href="/create/household">New</Nav.Link>
        <Nav.Link className="nav-link" href="/list/households">Households</Nav.Link>
        <Nav.Link className="nav-link" role="button" onClick={Logout} href="/">Logout</Nav.Link>
    </>);

const NotLoggedIn = () => (
    <>
            <Nav.Link 
                className="nav-link" 
                href="/login"
            >Login</Nav.Link>
            <Nav.Link 
                className="nav-link" 
                href="/register"
            >Register</Nav.Link>
    </>);

const NavBar = () => {
    return (
        <>
            <div className="text-center bg-dark text-white">
                <h1> Household Inventory Management System </h1>
            </div>
            <Navbar bg="light" expand="sm">
                <Container fluid>
                    <Navbar.Brand href="/">HIMS
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto my-2 my-lg-0">
                            {ReactSession.get("email")==null ? NotLoggedIn() : LoggedIn() }
                            <Nav.Link className="nav-link" onClick={About}>About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar> 
            </>
    );
}
export default NavBar;