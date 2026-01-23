import React, { useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import './FacultyRegister.css';

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

    const navigate = useNavigate();

    const validateForm = () => {
        const { username, password, email, phone } = formData;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        if (!username || !password || !email || !phone) {
            alert("All fields are required.");
            return false;
        }

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        if (!phoneRegex.test(phone)) {
            alert("Phone number must be 10 digits.");
            return false;
        }

        if (!passwordRegex.test(password)) {
            alert("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await fetch('http://localhost:6010/faculty-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Faculty Registration Successful! Please Login.");
                navigate('/');
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration validation error:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="faculty-register-page">
            <div className="faculty-overlay"></div>
            <div className="faculty-container-card">
                <div className="left-panel">
                    <div className="welcome-text">
                        <h1>Faculty Portal</h1>
                        <p>Join our distinguished team of educators.</p>
                    </div>
                </div>

                <div className="right-panel">
                    <div className="auth-header">
                        <h2 className="auth-title">Faculty Registration</h2>
                        <p className="auth-subtitle">Create your secure account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-grid">
                            <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Dr. Sarah Johnson" />
                            <Input label="Email ID" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="sarah@college.edu" />
                            <Input label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 987 654 321" />
                            <Input label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="PhD in Physics" />
                            <Input label="Department" name="department" value={formData.department} onChange={handleChange} placeholder="Science" />
                            <Input label="Username" name="username" value={formData.username} onChange={handleChange} />
                            <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
                        </div>

                        <div className="submit-btn-wrapper">
                            <Button type="submit" variant="faculty" style={{ width: '100%' }}>
                                Register as Faculty
                            </Button>
                        </div>

                        <p className="login-hint">
                            Already registered? <Link to="/" className="link-highlight">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Input = ({ label, name, type = "text", value, onChange, placeholder }) => (
    <div className="form-group-custom">
        <label className="form-label">{label}</label>
        <input
            className="form-input"
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
        />
    </div>
);

export default FacultyRegister;
