import React, { useState, useEffect } from 'react';
import FacultySidebar from '../components/FacultySidebar';
import FacultyNavbar from '../components/FacultyNavbar';
import './FacultyPanel.css'; // Reusing panel styles for consistency

const FacultyLeaves = () => {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('http://localhost:6010/api/leaves', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setLeaves(data);
            }
        } catch (error) {
            console.error("Error fetching leaves:", error);
        }
    };

    return (
        <div className="faculty-panel-container">
            <FacultyNavbar />
            <FacultySidebar />

            <div className="main-content">
                <div className="dashboard-header">
                    <h1>Leave Requests</h1>
                    <p>Manage student leave applications</p>
                </div>

                <div className="attendance-section">
                    <div className="table-responsive">
                        <table className="attendance-table">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Date</th>
                                    <th>Session</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.map((leave, index) => (
                                    <tr key={index}>
                                        <td>{leave.studentName || 'Unknown'}</td>
                                        <td>{leave.date}</td>
                                        <td>{leave.session}</td>
                                        <td>{leave.reason}</td>
                                        <td>
                                            <span className={`status-badge ${(leave.status || "").toLowerCase()}`}>
                                                {leave.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {leaves.length === 0 && (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>No leave requests found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyLeaves;
