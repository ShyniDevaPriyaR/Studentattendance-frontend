import React, { useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';

const StudentRegistration = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullName: '',
        phone: '',
        dob: '',
        email: '',
        qualification: '',
        collegeName: '',
        passedOutYear: '',
        gender: '',
        courseName: '',
        courseDuration: '',
        courseDuration: '',
        session: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        // Validation: simple check
        if (!formData.username || !formData.password) {
            alert("Please provide a username and password");
            return;
        }

        // Get existing students
        const existingStudents = JSON.parse(localStorage.getItem('students') || '[]');

        // Check if username already exists
        if (existingStudents.some(s => s.username === formData.username)) {
            alert("Username already exists! Please choose another.");
            return;
        }

        // Add new student
        existingStudents.push(formData);
        localStorage.setItem('students', JSON.stringify(existingStudents));

        alert("Registration Successful! Please Login.");
        navigate('/');
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Student <span style={styles.highlight}>Registration</span></h1>
                    <p style={styles.subtitle}>Join our academic community today</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.grid}>
                        {/* Personal Information */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>Personal Information</h3>
                            <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" />
                            <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                            <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
                            <Input label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                            <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                        </div>

                        {/* Academic Information */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>Academic Details</h3>
                            <Input label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="e.g. High School" />
                            <Input label="College Name" name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="Previous Institution" />
                            <Input label="Passed Out Year" name="passedOutYear" type="number" value={formData.passedOutYear} onChange={handleChange} placeholder="2023" />
                        </div>

                        {/* Course Information */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>Course Selection</h3>
                            <Input label="Course Name" name="courseName" value={formData.courseName} onChange={handleChange} placeholder="Computer Science" />
                            <Input label="Course Duration" name="courseDuration" value={formData.courseDuration} onChange={handleChange} placeholder="4 Years" />
                            <Select label="Session" name="session" value={formData.session} onChange={handleChange} options={['2025-2026', '2026-2027']} />
                        </div>

                        {/* Account & Documents */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>Account & Documents</h3>
                            <Input label="Username" name="username" value={formData.username} onChange={handleChange} placeholder="johndoe123" />
                            <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Upload Documents</label>
                                <input
                                    style={{ ...styles.input, padding: '0.5rem' }}
                                    type="file"
                                    name="file"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={styles.actions}>
                        <Button type="submit" variant="primary" style={styles.submitBtn}>
                            Register Student
                        </Button>
                        <p style={styles.loginHint}>
                            Already have an account? <Link to="/" style={styles.link}>Login here</Link>
                        </p>
                    </div>
                </form>
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

const Select = ({ label, name, value, onChange, options }) => (
    <div style={styles.formGroup}>
        <label style={styles.label}>{label}</label>
        <select style={styles.select} name={name} value={value} onChange={onChange} required>
            <option value="">Select {label}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const styles = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '2rem 1rem',
    },
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        padding: '3rem',
        overflow: 'hidden',
    },
    header: {
        textAlign: 'center',
        marginBottom: '3rem',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: '#2d3748',
        marginBottom: '0.5rem',
    },
    highlight: {
        background: 'var(--primary-gradient)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontStyle: 'italic',
    },
    subtitle: {
        color: '#718096',
        fontSize: '1.1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    sectionTitle: {
        fontSize: '1.2rem',
        color: '#4a5568',
        marginBottom: '1rem',
        borderBottom: '2px solid #e2e8f0',
        paddingBottom: '0.5rem',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#4a5568',
    },
    input: {
        padding: '0.75rem 1rem',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        outline: 'none',
    },
    select: {
        padding: '0.75rem 1rem',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        fontSize: '1rem',
        backgroundColor: 'white',
        outline: 'none',
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '2rem',
    },
    submitBtn: {
        width: '100%',
        maxWidth: '400px',
        padding: '1rem',
        fontSize: '1.1rem',
    },
    loginHint: {
        fontSize: '0.9rem',
        color: '#718096',
    },
    link: {
        color: '#667eea',
        fontWeight: '600',
    }
};

export default StudentRegistration;
