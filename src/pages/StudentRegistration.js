import React, { useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import './StudentRegistration.css';

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
            const submissionData = new FormData();
            submissionData.append('name', formData.fullName);
            submissionData.append('email', formData.email);
            submissionData.append('username', formData.username);
            submissionData.append('password', formData.password);
            submissionData.append('college', formData.collegeName);
            submissionData.append('qualification', formData.qualification);
            submissionData.append('year', formData.session);
            submissionData.append('parentContact', formData.phone);
            submissionData.append('role', 'student');

            // Fix: append gender, dob, course, duration as well if backend expects them or update backend schema.
            // Based on backend/index.js (Step 7), it spreads req.body.
            // But here we are sending FormData.
            // The backend uses upload.single('profilePic').
            // The backend does: const newStudent = { ...req.body, ... }
            // So we should append all fields.
            submissionData.append('dob', formData.dob);
            submissionData.append('gender', formData.gender);
            submissionData.append('courseName', formData.courseName);
            submissionData.append('courseDuration', formData.courseDuration);

            // Append the file if selected (it was stored in formData.file via handleChange)
            // Note: handleChange was modified slightly to handle files, need to double check
            if (formData.profilePic) {
                submissionData.append('profilePic', formData.profilePic);
            }

            const response = await fetch('http://localhost:6010/register', {
                method: 'POST',
                // Content-Type header not needed for FormData, browser sets it with boundary
                body: submissionData
            });

            const responseData = await response.json();

            if (response.ok) {
                alert("Registration Successful! Please Login.");
                navigate('/');
            } else {
                alert(`Registration Failed: ${responseData.message || responseData.error}`);
            }
        } catch (error) {
            console.error("Error registering:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="student-reg-page">
            <div className="student-reg-container">
                <div className="student-reg-header">
                    <h1 className="student-reg-title">Student <span className="highlight-text">Registration</span></h1>
                    <p className="student-reg-subtitle">Join our academic community today</p>
                </div>

                <form onSubmit={handleSubmit} className="student-reg-form">
                    <div className="form-grid">
                        {/* Personal Information */}
                        <div className="form-section">
                            <h3 className="section-title">Personal Information</h3>
                            <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" />
                            <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                            <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
                            <Input label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                            <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                        </div>

                        {/* Academic Information */}
                        <div className="form-section">
                            <h3 className="section-title">Academic Details</h3>
                            <Input label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="e.g. High School" />
                            <Input label="College Name" name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="Previous Institution" />
                            <Input label="Passed Out Year" name="passedOutYear" type="number" value={formData.passedOutYear} onChange={handleChange} placeholder="2023" />
                        </div>

                        {/* Course Information */}
                        <div className="form-section">
                            <h3 className="section-title">Course Selection</h3>
                            <Input label="Course Name" name="courseName" value={formData.courseName} onChange={handleChange} placeholder="Computer Science" />
                            <Input label="Course Duration" name="courseDuration" value={formData.courseDuration} onChange={handleChange} placeholder="4 Years" />
                            <Select label="Session" name="session" value={formData.session} onChange={handleChange} options={['2025-2026', '2026-2027']} />
                        </div>

                        {/* Account & Documents */}
                        <div className="form-section">
                            <h3 className="section-title">Account & Documents</h3>
                            <Input label="Username" name="username" value={formData.username} onChange={handleChange} placeholder="johndoe123" />
                            <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
                            <div className="form-group">
                                <label className="form-label">Upload Documents</label>
                                <input
                                    className="form-input"
                                    style={{ padding: '0.5rem' }}
                                    type="file"
                                    name="profilePic"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <Button type="submit" variant="primary" className="submit-btn-reg">
                            Register Student
                        </Button>
                        <p className="login-hint">
                            Already have an account? <Link to="/" className="link-highlight">Login here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Input = ({ label, name, type = "text", value, onChange, placeholder }) => (
    <div className="form-group">
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

const Select = ({ label, name, value, onChange, options }) => (
    <div className="form-group">
        <label className="form-label">{label}</label>
        <select className="form-select" name={name} value={value} onChange={onChange} required>
            <option value="">Select {label}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

export default StudentRegistration;
