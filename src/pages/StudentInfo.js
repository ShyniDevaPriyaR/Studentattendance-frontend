import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./StudentInfo.css";

const StudentInfo = () => {
    const navigate = useNavigate();

    // State
    const [student, setStudent] = useState({
        name: "Student",
        username: "student_user",
        email: "student@example.com",
        college: "Engineering College",
        qualification: "B.Tech",
        year: 1,
        parentContact: "0000000000",
        profilePic: "https://i.pravatar.cc/150?img=12"
    });

    useEffect(() => {
        const currentUser = sessionStorage.getItem('currentUser');
        if (currentUser) {
            const parsedUser = JSON.parse(currentUser);
            setStudent(prev => ({
                ...prev,
                ...parsedUser,
                name: parsedUser.fullName || parsedUser.name || prev.name
            }));
        }
    }, []);

    // State
    const [trainerData, setTrainerData] = useState({ name: "", domain: "" });
    const [attendance, setAttendance] = useState({ inTime: null, outTime: null });
    const [leaveRequest, setLeaveRequest] = useState({ date: "", session: "Full Day", reason: "" });

    // Handlers
    const handleLogout = () => {
        // Clear auth tokens if any
        navigate('/');
    };

    const handleTrainerSave = () => {
        alert(`Trainer Info Saved:\nName: ${trainerData.name}\nDomain: ${trainerData.domain}`);
    };

    const handlePunch = (type) => {
        const now = new Date();
        const timeString = now.toLocaleTimeString();

        if (type === 'in') {
            setAttendance(prev => ({ ...prev, inTime: timeString }));
        } else {
            setAttendance(prev => ({ ...prev, outTime: timeString }));
        }
    };

    const handleLeaveSubmit = (e) => {
        e.preventDefault();
        console.log("Leave Request:", leaveRequest);
        alert("Leave Request Submitted Successfully!");
        setLeaveRequest({ date: "", session: "Full Day", reason: "" }); // Reset form
    };

    return (
        <div className='dashboard-container'>
            {/* Header */}
            <header className="dashboard-header">
                <h3>
                    Welcome, <span className="text-gradient">{student.name}</span>!
                </h3>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </header>

            <div className="dashboard-content">
                {/* Sidebar */}
                <aside className="student-sidebar">
                    <div className="profile-section">
                        <img src={student.profilePic} alt="Profile" className='profile-img' />
                        <h4>{student.name}</h4>
                        <span className="text-muted">{student.username}</span>
                    </div>

                    <div className="student-details">
                        <InfoItem label="Email" value={student.email} />
                        <InfoItem label="College" value={student.college} />
                        <InfoItem label="Qualification" value={student.qualification} />
                        <InfoItem label="Year" value={student.year} />
                        <InfoItem label="Parent Contact" value={student.parentContact} />
                    </div>
                </aside>

                {/* Main Content */}
                <main className="main-grid">

                    {/* Trainer Info Section */}
                    <section className="card-section">
                        <h5 className="section-title">Trainer Info</h5>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Trainer Name</label>
                                <select
                                    className="styled-select"
                                    value={trainerData.name}
                                    onChange={(e) => setTrainerData({ ...trainerData, name: e.target.value })}
                                >
                                    <option value="">Select Trainer</option>
                                    <option value="John Doe">John Doe</option>
                                    <option value="Jane Smith">Jane Smith</option>
                                    <option value="Mike Johnson">Mike Johnson</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Domain</label>
                                <select
                                    className="styled-select"
                                    value={trainerData.domain}
                                    onChange={(e) => setTrainerData({ ...trainerData, domain: e.target.value })}
                                >
                                    <option value="">Select Domain</option>
                                    <option value="MERN Stack">MERN Stack</option>
                                    <option value="Java">Java</option>
                                    <option value="Python">Python</option>
                                </select>
                            </div>
                        </div>
                        <button className="action-btn btn-primary" onClick={handleTrainerSave}>
                            Save Trainer Info
                        </button>
                    </section>

                    {/* Punch In/Out Section */}
                    <section className="card-section">
                        <h5 className="section-title">Punch In / Punch Out</h5>
                        <div className="time-display">
                            <div>Punch In Time: <span className="time-val">{attendance.inTime || "--:--:--"}</span></div>
                            <div style={{ marginTop: '0.5rem' }}>Punch Out Time: <span className="time-val">{attendance.outTime || "--:--:--"}</span></div>
                        </div>

                        <div className="attendance-controls">
                            <button className="punch-btn punch-in" onClick={() => handlePunch('in')}>
                                Punch In
                            </button>
                            <button className="punch-btn punch-out" onClick={() => handlePunch('out')}>
                                Punch Out
                            </button>
                        </div>
                    </section>

                    {/* Leave Request Section */}
                    <section className="card-section">
                        <h5 className="section-title">Leave Request Form</h5>
                        <form onSubmit={handleLeaveSubmit}>
                            <div className="form-row leave-form-row">
                                <div className="form-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        className="styled-input"
                                        required
                                        value={leaveRequest.date}
                                        onChange={(e) => setLeaveRequest({ ...leaveRequest, date: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Session</label>
                                    <select
                                        className="styled-select"
                                        value={leaveRequest.session}
                                        onChange={(e) => setLeaveRequest({ ...leaveRequest, session: e.target.value })}
                                    >
                                        <option value="Full Day">Full Day</option>
                                        <option value="FN">FN (Forenoon)</option>
                                        <option value="AN">AN (Afternoon)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label>Reason</label>
                                <textarea
                                    className="styled-textarea"
                                    placeholder="Enter your reason here..."
                                    required
                                    value={leaveRequest.reason}
                                    onChange={(e) => setLeaveRequest({ ...leaveRequest, reason: e.target.value })}
                                ></textarea>
                            </div>

                            <button type="submit" className="action-btn btn-primary">
                                Submit Leave Request
                            </button>
                        </form>
                    </section>

                </main>
            </div>
        </div>
    );
};

const InfoItem = ({ label, value }) => (
    <div className="detail-item">
        <span className="detail-label">{label}</span>
        <span className="detail-value">{value}</span>
    </div>
);

export default StudentInfo;
