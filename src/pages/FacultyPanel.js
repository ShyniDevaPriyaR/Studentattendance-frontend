import React, { useState, useEffect } from 'react';
import FacultySidebar from '../components/FacultySidebar';
import './FacultyPanel.css';

const FacultyPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [allStudents, setAllStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [summaryData, setSummaryData] = useState({ present: 0, absent: 0, pendingLeaves: 0 });

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    processData();
  }, [allStudents, date, searchTerm]);

  const fetchStudents = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:6010/api/students', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAllStudents(data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const processData = () => {
    if (!allStudents.length) return;

    let presentCount = 0;
    let absentCount = 0;
    let pendingLeavesCount = 0;

    // Filter by name if search term exists
    const filteredStudents = allStudents.filter(student =>
      (student.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const processedAttendance = filteredStudents.map((student, index) => {
      // Find attendance for the selected date
      const record = student.attendance?.find(a => a.date === date);

      // Check leaves
      const hasLeave = student.leaveRequests?.some(l => l.status === 'Pending');
      if (hasLeave) pendingLeavesCount++;

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
        id: student._id,
        name: student.name,
        date: date,
        punchIn,
        punchOut,
        status
      };
    });

    setAttendanceData(processedAttendance);
    setSummaryData({
      present: presentCount,
      absent: absentCount,
      pendingLeaves: pendingLeavesCount // Logic for total pending leaves across all students
    });
  };

  const handleApplyFilter = () => {
    processData();
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="faculty-panel-container">
      <FacultySidebar />

      <div className="main-content">
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
          <div className="card pending">
            <h3>Pending Leaves</h3>
            <div className="count">{summaryData.pendingLeaves}</div>
          </div>
        </div>

        {/* Section 2: Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search Student..."
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
            {/* <button className="btn-apply" onClick={handleApplyFilter}>Apply Filter</button> */}
            <button className="btn-clear" onClick={handleClearFilter}>Clear</button>
          </div>
        </div>

        {/* Section 3: Mark Attendance Table */}
        <div className="attendance-section">
          <h2>Mark Attendance</h2>
          <div className="table-responsive">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Student Name</th>
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

export default FacultyPanel;
