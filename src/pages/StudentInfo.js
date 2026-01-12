import React from 'react'
import "./StudentInfo.css"

const StudentInfo = () => {


    return (
        <div className='dashboard-container'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>
                    Welcome <span className="text-warning">Nandhini</span> !
                </h3>
                <button className="btn btn-warning">Logout</button>
            </div>
            
            <div className="row">
            
                <div className="col-md-3 student-info">
                    <h5>Student Info</h5>
                  
                        <img src='' alt="Photo" className='mt-4' />
                        <br />
                        <label className='mt-3'>Name:</label>
                        <input type='text' name='name' className='border-0 stuinput ' />
                        <br />
                        <label className='mt-2'>Email:</label>
                        <input type='email' name="email" className='border-0  stuinput' />
                        <br />
                        <label className='mt-2'>College:</label>
                        <input type='text' name='college' className='border-0  stuinput' />
                        <br />
                        <label className='mt-2'>Qualification:</label>
                        <input type='text' name='qualification' className='border-0  stuinput' />
                        <br />
                        <label className='mt-2'>Year:</label>
                        <input type='number' name='year' className='border-0  stuinput' />
                        <br />
                        <label className='mt-2'>Parent Contact:</label>
                        <input type='number' name='parentcontact' className='border-0  stuinput' />
                        <br />
                        <label className='mt-2'>Username:</label>
                        <input type='text' name='username' className='border-0  stuinput' />

                </div>

              
                <div className="col-md-9">
              
                    <h5 className="section-title">Trainer Info</h5>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label>Trainer Name</label>
                            <select
                                className="form-select"
                            // value={trainer}
                            // onChange={(e) => setTrainer(e.target.value)}
                            >
                                <option>Select Trainer</option>
                                <option>Trainer A</option>
                                <option>Trainer B</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label>Domain</label>
                            <select
                                className="form-select"
                            // value={domain}
                            // onChange={(e) => setDomain(e.target.value)}
                            >
                                <option>Select Domain</option>
                                <option>MERN Stack</option>
                                <option>Java</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-warning mb-4">
                        Save Trainer Info
                    </button>

                   
                    <h5 className="section-title">Punch In/Out</h5>
                    <p>
                        <label>Punch In Time:</label>
                        <input
                             type='time'
                             name='puch_time'
                        />
                        {/* {" "}
                        {punchIn || "Not punched in"} */}
                    </p>
                    <p>
                        <label>Punch Out Time:</label>
                        <input
                            type='time'
                            name='punch_out'
                        />
                        {/* {" "}
                        {punchOut || "Not punched out"} */}
                    </p>

                    <button className="btn btn-success me-2"
                    // onClick={handlePunchIn}
                    >
                        Punch In
                    </button>
                    <button className="btn btn-danger"
                    // onClick={handlePunchOut}
                    >
                        Punch Out
                    </button>

                 
                    <h5 className="section-title mt-5">Leave Request Form</h5>
                    <div className="row">
                        <div className="col-md-4">
                            <input type="date" className="form-control" />
                        </div>
                        <div className="col-md-4">
                            <select className="form-select">
                                <option>Session</option>
                                <option>FN</option>
                                <option>AN</option>
                                <option>Full Day</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Reason"
                            />
                        </div>
                    </div>

                    <button className="btn btn-primary mt-3">
                        Submit Leave Request
                    </button>
                </div>
            </div>







            {/* <div className='row'>
                <div className='col '>
                    <aside className='asidebar'>
                        <h2 className='text-warning'>Student Info</h2>
                        <img src='' alt="Photo" className='mt-4' />
                        <br />
                        <label className='mt-3'>Name:</label>
                        <input type='text' name='name' className='border-0 stuinput ' />
                        <br />
                        <label className='mt-2'>Email:</label>
                        <input type='email' name="email" className='border-0  stuinput' />
                        <br />
                        <label className='mt-2'>College:</label>
                        <input type='text' name='college' className='border-0  stuinput' />
                        <br />
                        <label className='mt-2'>Qualification:</label>
                        <input type='text' name='qualification' className='border-0  stuinput' />
                        <br />
                        <label className='mt-2'>Year:</label>
                        <input type='number' name='year' className='border-0  stuinput' />
                        <br />
                        <label className='mt-2'>Parent Contact:</label>
                        <input type='number' name='parentcontact' className='border-0  stuinput' />
                        <br />
                        <label className='mt-2'>Username:</label>
                        <input type='text' name='username' className='border-0  stuinput' />

                    </aside>
                </div>

            </div> */}
        </div>

    )
}

export default StudentInfo
