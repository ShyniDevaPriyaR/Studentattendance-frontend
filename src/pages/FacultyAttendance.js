import React, { useState, useEffect } from 'react';
import FacultySidebar from '../components/FacultySidebar';
import './FacultyPanel.css'; // Reusing panel styles for consistency

const FacultyAttendance = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [allFaculty, setAllFaculty] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [summaryData, setSummaryData] = useState({ present: 0, absent: 0 });
    const [message, setMessage] = useState({ text: '', type: '' });
    const [currentFacultyId, setCurrentFacultyId] = useState('');
    const [todayRecord, setTodayRecord] = useState(null);

    useEffect(() => {
        // Get faculty ID from session storage
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            setCurrentFacultyId(userId);
        }
        fetchFaculty();
    }, []);

    useEffect(() => {
        processData();
        checkTodayRecord();
    }, [allFaculty, date, searchTerm, currentFacultyId]);

    const fetchFaculty = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('http://localhost:6010/api/faculties', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setAllFaculty(data);
            }
        } catch (error) {
            console.error("Error fetching faculty:", error);
        }
    };

    const checkTodayRecord = () => {
        if (!currentFacultyId || !allFaculty.length) return;

        const today = new Date().toISOString().split('T')[0];
        const currentFaculty = allFaculty.find(f => f._id === currentFacultyId);
        if (currentFaculty && currentFaculty.attendance) {
            const record = currentFaculty.attendance.find(a => a.date === today);
            setTodayRecord(record || null);
        }
    };

    const handlePunchIn = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const now = new Date();
            const currentDate = now.toISOString().split('T')[0];
            const currentTime = now.toTimeString().split(' ')[0];

            const response = await fetch(`http://localhost:6010/api/faculty/${currentFacultyId}/attendance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    date: currentDate,
                    type: 'in',
                    time: currentTime
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ text: 'Punched In successfully!', type: 'success' });
                fetchFaculty(); // Refresh data
                setTimeout(() => setMessage({ text: '', type: '' }), 3000);
            } else {
                setMessage({ text: data.message || 'Error punching in', type: 'error' });
                setTimeout(() => setMessage({ text: '', type: '' }), 3000);
            }
        } catch (error) {
            setMessage({ text: 'Error punching in', type: 'error' });
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        }
    };

    const handlePunchOut = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const now = new Date();
            const currentDate = now.toISOString().split('T')[0];
            const currentTime = now.toTimeString().split(' ')[0];

            const response = await fetch(`http://localhost:6010/api/faculty/${currentFacultyId}/attendance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    date: currentDate,
                    type: 'out',
                    time: currentTime
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ text: 'Punched Out successfully!', type: 'success' });
                fetchFaculty(); // Refresh data
                setTimeout(() => setMessage({ text: '', type: '' }), 3000);
            } else {
                setMessage({ text: data.message || 'Error punching out', type: 'error' });
                setTimeout(() => setMessage({ text: '', type: '' }), 3000);
            }
        } catch (error) {
            setMessage({ text: 'Error punching out', type: 'error' });
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        }
    };

    const processData = () => {
        if (!allFaculty.length) return;

        let presentCount = 0;
        let absentCount = 0;

        // Filter by name if search term exists
        const filteredFaculty = allFaculty.filter(faculty =>
            (faculty.name || "").toLowerCase().includes(searchTerm.toLowerCase())
        );

        const processedAttendance = filteredFaculty.map((faculty, index) => {
            // Find attendance for the selected date
            const record = faculty.attendance?.find(a => a.date === date);

            let status = 'Absent';
            let punchIn = '-';
            let punchOut = '-';

            if (record) {
                status = record.status || 'Present';
                punchIn = record.inTime || '-';
                punchOut = record.outTime || '-';
                presentCount++;
            } else {
                absentCount++;
            }

            return {
                id: faculty._id,
                name: faculty.name,
                date: date,
                punchIn,
                punchOut,
                status
            };
        });

        setAttendanceData(processedAttendance);
        setSummaryData({
            present: presentCount,
            absent: absentCount
        });
    };

    const handleClearFilter = () => {
        setSearchTerm('');
        setDate(new Date().toISOString().split('T')[0]);
    };

    return (
        <div className="faculty-panel-container">
            <FacultySidebar />

            <div className="main-content">
                {/* Message Display */}
                {message.text && (
                    <div className={`message-box ${message.type}`}>
                        {message.text}
                    </div>
                )}

                {/* My Attendance Section */}
                <div className="my-attendance-section">
                    <h2>My Attendance</h2>
                    <div className="punch-buttons">
                        <button
                            className="btn-punch-in"
                            onClick={handlePunchIn}
                            disabled={todayRecord && todayRecord.inTime}
                        >
                            Punch In
                        </button>
                        <button
                            className="btn-punch-out"
                            onClick={handlePunchOut}
                            disabled={!todayRecord || !todayRecord.inTime || todayRecord.outTime}
                        >
                            Punch Out
                        </button>
                    </div>
                    {todayRecord && (
                        <div className="today-status">
                            <p>Today's Status: <strong>{todayRecord.status || 'Present'}</strong></p>
                            <p>Punch In: <strong>{todayRecord.inTime || '-'}</strong></p>
                            <p>Punch Out: <strong>{todayRecord.outTime || '-'}</strong></p>
                        </div>
                    )}
                </div>

                {/* Section 1: Summary Cards */}
                <div className="summary-cards">
                    <div className="card present">
                        <h3>Present</h3>
                        <div className="count">{summaryData.present}</div>
                    </div>
                    <div className="card absent">
                        <h3>Absent</h3>
                        <div className="count">{summaryData.absent}</div>
                    </div>
                </div>

                {/* Section 2: Filters */}
                <div className="filters-section">
                    <div className="filter-group">
                        <input
                            type="text"
                            placeholder="Search Faculty..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="date-input"
                        />
                        <button className="btn-clear" onClick={handleClearFilter}>Clear</button>
                    </div>
                </div>

                {/* Section 3: Faculty Attendance Table */}
                <div className="attendance-section">
                    <h2>Faculty Attendance</h2>
                    <div className="table-responsive">
                        <table className="attendance-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Faculty Name</th>
                                    <th>Date</th>
                                    <th>Punch In</th>
                                    <th>Punch Out</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceData.map((record, index) => (
                                    <tr key={record.id}>
                                        <td>{index + 1}</td>
                                        <td>{record.name}</td>
                                        <td>{record.date}</td>
                                        <td>{record.punchIn}</td>
                                        <td>{record.punchOut}</td>
                                        <td>
                                            <span className={`status-badge ${(record.status || "").toLowerCase()}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {attendanceData.length === 0 && (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center' }}>No records found for this date.</td>
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

export default FacultyAttendance;
