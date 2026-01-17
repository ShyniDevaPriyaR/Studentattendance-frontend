import React, { useState } from 'react';
import FacultySidebar from '../components/FacultySidebar';
import FacultyNavbar from '../components/FacultyNavbar';
import './FacultyPanel.css';

const FacultyPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState('');

  // Mock Data for Summary Cards
  const summaryData = {
    present: 45,
    absent: 5,
    pendingLeaves: 3
  };

  // Mock Data for Attendance Table
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: 'John Doe', date: '2023-10-25', punchIn: '09:00 AM', punchOut: '05:00 PM', status: 'Present' },
    { id: 2, name: 'Jane Smith', date: '2023-10-25', punchIn: '09:15 AM', punchOut: '05:10 PM', status: 'Present' },
    { id: 3, name: 'Michael Johnson', date: '2023-10-25', punchIn: '-', punchOut: '-', status: 'Absent' },
    { id: 4, name: 'Emily Davis', date: '2023-10-25', punchIn: '08:55 AM', punchOut: '04:55 PM', status: 'Present' },
    { id: 5, name: 'Robert Wilson', date: '2023-10-25', punchIn: '-', punchOut: '-', status: 'Absent' },
  ]);

  const handleApplyFilter = () => {
    // Implement filter logic here if needed for demo
    console.log('Filtering by:', searchTerm, date);
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    setDate('');
  };

  return (
    <div className="faculty-panel-container">
      <FacultyNavbar />
      <FacultySidebar />

      <div className="main-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back, Faculty</p>
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
            <button className="btn-apply" onClick={handleApplyFilter}>Apply Filter</button>
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
                      <span className={`status-badge ${record.status.toLowerCase()}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyPanel;
