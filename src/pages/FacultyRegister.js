import React, { useState } from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const FacultyRegister = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullName: '',
        phone: '',
        email: '',
        qualification: '',
        department: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Faculty Form submitted:', formData);
        // Add registration logic here
    };

    return (
        <div style={styles.page}>
            <div style={styles.overlay}></div>
            <div style={styles.container}>
                <div style={styles.leftPanel}>
                    <div style={styles.welcomeText}>
                        <h1>Faculty Portal</h1>
                        <p>Join our distinguished team of educators.</p>
                    </div>
                </div>

                <div style={styles.rightPanel}>
                    <div style={styles.header}>
                        <h2 style={styles.title}>Faculty Registration</h2>
                        <p style={styles.subtitle}>Create your secure account</p>
                    </div>

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.grid}>
                            <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Dr. Sarah Johnson" />
                            <Input label="Email ID" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="sarah@college.edu" />
                            <Input label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 987 654 321" />
                            <Input label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="PhD in Physics" />
                            <Input label="Department" name="department" value={formData.department} onChange={handleChange} placeholder="Science" />
                            <Input label="Username" name="username" value={formData.username} onChange={handleChange} />
                            <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
                        </div>

                        <Button type="submit" variant="faculty" style={styles.submitBtn}>
                            Register as Faculty
                        </Button>

                        <p style={styles.loginHint}>
                            Already registered? <Link to="/" style={styles.link}>Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Input = ({ label, name, type = "text", value, onChange, placeholder }) => (
    <div style={styles.formGroup}>
        <label style={styles.label}>{label}</label>
        <input
            style={styles.input}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
        />
    </div>
);

const styles = {
    page: {
        minHeight: '100vh',
        background: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(45, 55, 72, 0.9) 0%, rgba(26, 32, 44, 0.9) 100%)',
        zIndex: 1,
    },
    container: {
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        maxWidth: '1100px',
        width: '100%',
        overflow: 'hidden',
        minHeight: '600px',
    },
    leftPanel: {
        flex: '1',
        background: 'var(--faculty-gradient)',
        padding: '3rem',
        display: 'none', // Hidden on mobile, shown on desktop via media query logic (or inline style for now)
        '@media (minWidth: 768px)': {
            display: 'flex',
        },
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#2d3748',
        textAlign: 'center',
    },
    welcomeText: {
        maxWidth: '300px',
    },
    rightPanel: {
        flex: '1.5',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    header: {
        marginBottom: '2rem',
        textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        color: '#2d3748',
        marginBottom: '0.5rem',
    },
    subtitle: {
        color: '#718096',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    label: {
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#4a5568',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    input: {
        padding: '0.75rem',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        background: '#f7fafc',
        fontSize: '0.95rem',
        transition: 'border-color 0.2s',
    },
    submitBtn: {
        marginTop: '1rem',
        width: '100%',
    },
    loginHint: {
        textAlign: 'center',
        fontSize: '0.9rem',
        color: '#718096',
        marginTop: '1rem',
    },
    link: {
        color: '#48bb78',
        fontWeight: '600',
    }
};

export default FacultyRegister;
