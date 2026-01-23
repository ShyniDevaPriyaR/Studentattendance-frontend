import React from 'react';
import { Link } from 'react-router-dom';
import aiTechLogo from "../images/aitech logo.webp"; // Using the correct existing logo file
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={aiTechLogo} alt="AI Tech Logo" />
                </Link>
                <ul className="navbar-menu">
                    <li>
                        <Link to="/" className="navbar-link"></Link>
                    </li>
                    {/* Add more links if needed */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
