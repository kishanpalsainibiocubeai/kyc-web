import React,{useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Topbar from './components/Topbar';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
// import Specialities from './pages/Specialities';
// import Footer from './components/Footer';
// import ClinicBranch from './pages/ClinicBranch';
// import Doctors from './pages/Doctors';
// import Patients from './pages/Patients';
// import Appointments from './pages/Appointments';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './CustomTheme.css'
import Signup from './pages/Signup'
import { useLocation } from 'react-router-dom';
import Applicants from './pages/Applicants';

function App() {
  const [showSidebarTopbar, setShowSidebarTopbar] = useState(false)
  const location = useLocation();

  const fullPageUrls = {
    'login': 'login',
    'signup':'signup'
  }

  useEffect(() => {

    const str = location.pathname.replace(/^\/|\/$/g, '');
    console.log("str :" , str)
    if(!fullPageUrls[str as keyof typeof fullPageUrls]){
      setShowSidebarTopbar(true)
    }
  }, [])
  
  return (
    <>
      <Box className={`${showSidebarTopbar ? "layout-main-wrapper" : ""}`} >
        {showSidebarTopbar && (
          <>
            <Box className="layout-main-topbar-wrapper">
              <Topbar />
            </Box>
            <Box className="layout-main-sidebar-wrapper">
              <Sidebar />
            </Box>
          </>
        )}
        {/* <Box className='layout-main-footer-wrapper'>
      <Footer />
      </Box> */}

        <ToastContainer />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/applicants" element={<Applicants />} />
          
          {/* <Route path="/clinic-branch" element={<ClinicBranch />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} /> */}
        </Routes>
      </Box>
    </>
  );
}

export default App;
