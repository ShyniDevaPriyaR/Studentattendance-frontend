import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <div className="container" style={styles.container}>
                <Link to="/" style={styles.logo}>
                    Student<span style={styles.logoHighlight}>Portal</span>
                </Link>
                <ul style={styles.menu}>
                    <li>
                        <Link to="/" style={styles.link}>Home</Link>
                    </li>
                    {/* Add more links if needed */}
                </ul>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        background: 'var(--primary-gradient)',
        padding: '1rem 0',
        color: 'var(--white)',
        boxShadow: 'var(--shadow-md)',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: '700',
        letterSpacing: '1px',
        textDecoration: 'none',
        color: 'var(--white)',
    },
    logoHighlight: {
        color: '#fbbf24', // Amber-400
    },
    menu: {
        display: 'flex',
        gap: '2rem',
        margin: 0,
    },
    link: {
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'opacity 0.3s ease',
        textDecoration: 'none',
        color: 'var(--white)',
    },
};

export default Navbar;
