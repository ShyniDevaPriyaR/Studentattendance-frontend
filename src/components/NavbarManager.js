import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import FacultyNavbar from './FacultyNavbar';

const NavbarManager = () => {
    const location = useLocation();

    // Faculty routes that should show FacultyNavbar
    const facultyRoutes = ['/facultypanel', '/faculty-attendance', '/leave-requests'];

    // Check if current path matches any faculty route
    const isFacultyRoute = facultyRoutes.some(route =>
        location.pathname.startsWith(route)
    );

    // Render appropriate navbar based on route
    return isFacultyRoute ? <FacultyNavbar /> : <Navbar />;
};

export default NavbarManager;
