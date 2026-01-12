import React from 'react'
import "./Facultypan.css"



const FacultyPanel = () => {
  return (
    // <div className='faculty-container'>
     
    //   <div className="row min-vh-100">
    //     <div className="col-12 col-md-3 mb-3 mb-md-0 sidebar">
    //     <h2 className='text-warning'>Faculty Panel</h2>

    //       <ul className='list-unstyled list-group mt-3'>
    //         <li className='list-group-item border-white border-end-0 border-start-0 lis border-left-0 rounded-0'>Mark Attendance</li>
    //         <li className='list-group-item border-white border-end-0 border-start-0 lis'>Search Student</li>
    //         <li className='list-group-item border-white border-end-0 border-start-0 lis'>Leave Requests</li>
    //         <li className='list-group-item border-white border-end-0 border-start-0 rounded-0 lis'>Logout</li>
    //       </ul>
    //     </div>
    //     <div className="col-md-9">
    //       <div className='main'>
    //         <div className='papmain '>
    //           <div className='d-flex pap'>
    //             <div className='pap1 text-center border-0' >
    //               <p>Present</p>
    //               <h3>0</h3>
    //             </div>
    //             <div className='pap1 text-center border-0'>
    //               <p>Absent</p>
    //               <h3>6</h3>
    //             </div>
    //             <div className='pap1 text-center border-0'>
    //               <p>Pending Leaves</p>
    //               <h3>4</h3>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="filters ms-2 mt-3">
    //           <form class="d-flex  gap-3">
    //             <div className='d-flex'>
    //               <input class="form me-2 border-0 searchbar" type="search" placeholder="Search" aria-label="Search" />
    //               <button class="btn btn-outline-success searchbar" type="submit">Search</button>
    //             </div>
    //             <input type="date" className='rounded-1 border-0' />
    //             <button className="apply btn-warning border-0 rounded-1">Apply Filter</button>
    //             <button className="clear btn-primary border-0 rounded-1">Clear</button>
    //           </form>
    //         </div>

    //         <h3 className="table-title text-center text-warning mt-5">Mark Attendance</h3>
    //         <div className="table-wrapper me-5 ">
    //           <table className='table table-bordered  table-striped table-hover tableround'>
    //             <thead>
    //               <tr>
    //                 <th>Sno</th>
    //                 <th>Student Name</th>
    //                 <th>Attendance Date</th>
    //                 <th>Punch In Time </th>
    //                 <th>Punch Out Time</th>
    //                 <th>Status</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               <tr>
    //                 <td>1</td>
    //                 <td>priya</td>
    //                 <td>22</td>
    //                 <td>10:00</td>
    //                 <td>9:00</td>
    //                 <td>Absent</td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>




      <div className="faculty-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Faculty Panel</h2>
        <ul>
          <li>👤 Mark Attendance</li>
          <li>🔍 Search Student</li>
          <li>📄 Leave Requests</li>
          <li>🚪 Logout</li>
        </ul>
      </aside>

      {/* Content */}
      <main className="content">
        {/* Stats */}
        <div className="stats">
          <div className="card">
            <p>Present</p>
            <h3>0</h3>
          </div>
          <div className="card">
            <p>Absent</p>
            <h3>6</h3>
          </div>
          <div className="card">
            <p>Pending Leaves</p>
            <h3>4</h3>
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          <input type="text" placeholder="Search by name or course..." />
          <input type="date" />
          <button className="apply">Apply Filter</button>
          <button className="clear">Clear</button>
        </div>

        {/* Table */}
        <h3 className="title">Mark Attendance</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sno</th>
                <th>Student Name</th>
                <th>Date</th>
                <th>Punch In</th>
                <th>Punch Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="absent">Absent</td>
                </tr>
              
            </tbody>
          </table>
        </div>
      </main>
    </div>



  )
}

export default FacultyPanel
