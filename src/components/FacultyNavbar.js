import React from 'react';
import { useNavigate } from 'react-router-dom';
import aiTechLogo from '../images/aitech logo.webp';
import './FacultyNavbar.css';

const FacultyNavbar = () => {
    const navigate = useNavigate();
    const facultyName = sessionStorage.getItem('userName') || sessionStorage.getItem('name') || "Faculty";

    const handleLogout = () => {
        // Clear session storage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('name');
        navigate('/');
    };

    return (
        <nav className="faculty-navbar">
            <div className="navbar-brand">
                <img src={aiTechLogo} alt="AI Tech Logo" className="faculty-logo" />
                Student<span>Portal</span>
            </div>
            <div className="navbar-actions">
                <span className="welcome-msg">Welcome, {facultyName}</span>
                <button className="btn-logout-nav" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default FacultyNavbar;
