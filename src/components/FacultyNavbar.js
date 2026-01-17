import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FacultyNavbar.css';

const FacultyNavbar = () => {
    const navigate = useNavigate();
    const facultyName = "Prof. Smith"; // Mock name

    const handleLogout = () => {
        // Add logout logic here (clear tokens, etc.)
        navigate('/');
    };

    return (
        <nav className="faculty-navbar">
            <div className="navbar-brand">
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
