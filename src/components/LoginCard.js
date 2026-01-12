import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const LoginCard = ({ title, role, onLogin, registerPath }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        onLogin(credentials);
    };

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>{title}</h2>
            <p style={styles.subtitle}>Welcome back, please login.</p>

            <div style={styles.formGroup}>
                <input
                    style={styles.input}
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleChange}
                />
                <input
                    style={styles.input}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                />
            </div>

            <div style={styles.actions}>
                <Button
                    // We can override the background directly since Button merges styles now
                    style={{ ...styles.loginBtn, background: 'var(--login-gradient)' }}
                    onClick={handleLogin}
                >
                    Login as {role === 'faculty' ? 'Faculty' : 'Student'}
                </Button>
            </div>

            <div style={styles.links}>
                <Link to={registerPath} style={styles.registerLink}>
                    Register
                </Link>
                <span style={styles.divider}>|</span>
                <button style={styles.forgotBtn}>Forgot Password?</button>
            </div>
        </div >
    );
};

const styles = {
    card: {
        background: 'var(--white)',
        padding: '2.5rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        width: '100%',
        maxWidth: '380px', // Slightly smaller for better focus
        textAlign: 'center',
        transition: 'transform 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    title: {
        margin: 0,
        fontSize: '1.75rem',
        color: 'var(--text-dark)',
    },
    subtitle: {
        margin: 0,
        color: '#718096',
        fontSize: '0.9rem',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    input: {
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        fontSize: '1rem',
        background: '#f8fafc',
        outline: 'none',
        transition: 'border-color 0.2s',
        width: '100%',
    },
    actions: {
        width: '100%',
    },
    loginBtn: {
        width: '100%',
        padding: '0.5rem 1rem',
        fontSize: '0.9rem',
        fontWeight: '600',
        // Gradient is handled by Button component variants 'primary' and 'faculty'
    },
    links: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: '#718096',
    },
    registerLink: {
        color: '#667eea',
        fontWeight: '500',
        textDecoration: 'none',
    },
    divider: {
        color: '#cbd5e0',
    },
    forgotBtn: {
        background: 'none',
        border: 'none',
        color: '#718096',
        cursor: 'pointer',
        fontSize: 'inherit',
        textDecoration: 'underline',
        padding: 0,
    }
};

export default LoginCard;
