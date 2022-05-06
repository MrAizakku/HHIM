import React from 'react';
import { Link } from 'react-router-dom';

const About = () => { return (alert("Version: 1.0")); }
//need conditional logic for how user is logged in, showing conditional LOGIN or LOGOUT depending. Perhaps change to class component and track in context state?
const NavBar = () => {
    return (
        <div>
            <div className="text-center">
                <h1> Household Inventory Management System </h1>
            </div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        
                    <Link className="navbar-brand" to={{ pathname: "/" }}>HIMS</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="nav navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={{ pathname: "https://www.gcu.edu/" }} target="_blank">GCU Homepage</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create/household">New</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/list/households">Households</Link>
                            </li>
                        </ul>
                        <span className="navbar-text actions"><span className="btn btn-light action-button" role="button" onClick={About}>About</span></span>
                    </div>
                </div>
                </nav>
            </div>
         </div>
    );
}
export default NavBar;