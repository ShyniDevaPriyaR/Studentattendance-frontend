import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
    const baseStyle = {
        padding: '0.75rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        border: 'none',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        color: 'var(--white)',
        outline: 'none',
    };

    const variants = {
        primary: {
            background: 'var(--primary-gradient)',
            boxShadow: '0 4px 6px rgba(102, 126, 234, 0.25)',
        },
        secondary: {
            background: 'var(--secondary-gradient)',
            color: 'var(--text-dark)',
            boxShadow: '0 4px 6px rgba(255, 154, 158, 0.25)',
        },
        faculty: {
            background: 'var(--faculty-gradient)',
            color: 'var(--text-dark)',
            boxShadow: '0 4px 6px rgba(132, 250, 176, 0.25)',
        },
        outline: {
            background: 'transparent',
            border: '2px solid var(--text-dark)',
            color: 'var(--text-dark)',
        }
    };

    return (
        <button
            type={type}
            style={{ ...baseStyle, ...variants[variant], ...props.style }}
            onClick={onClick}
            className={`btn-hover ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
