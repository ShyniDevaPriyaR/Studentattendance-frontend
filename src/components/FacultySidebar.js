import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FacultySidebar.css';

const FacultySidebar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: 'Mark Attendance', icon: '📝', path: '/facultypanel' },
        { name: 'Search Student', icon: '🔍', path: '/search-student' },
        { name: 'Leave Requests', icon: '📩', path: '/leave-requests' },
    ];

    const handleLogout = () => {
        // Clear any auth tokens if needed
        navigate('/');
    };

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}></div>
            <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                ☰
            </button>
            <div className={`faculty-sidebar ${isOpen ? 'open' : ''}`}>

                <div className="sidebar-menu">
                    {menuItems.map((item, index) => (
                        <div key={index} className="menu-item" onClick={() => navigate(item.path)}>
                            <span className="icon">{item.icon}</span>
                            <span className="text">{item.name}</span>
                        </div>
                    ))}
                    <div className="menu-item logout" onClick={handleLogout}>
                        <span className="icon">🚪</span>
                        <span className="text">Logout</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FacultySidebar;
