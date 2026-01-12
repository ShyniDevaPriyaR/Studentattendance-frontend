import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StudentRegistration from './pages/StudentRegistration';
import FacultyRegister from './pages/FacultyRegister';
import FacultyPanel from './pages/FacultyPanel';
import StudentInfo from './pages/StudentInfo';
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register/student' element={<StudentRegistration />} />
          <Route path='/register/faculty' element={<FacultyRegister />} />
          <Route path='/facultypanel' element={<FacultyPanel />} />
          <Route path='/studentinfo' element={<StudentInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
