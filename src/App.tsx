import React from 'react';
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

function App() {
  return (
  <>
    <Box className='layout-main-wrapper'>
      <Box className='layout-main-topbar-wrapper'>
        <Topbar />
      </Box>
      <Box className='layout-main-sidebar-wrapper'>
      <Sidebar/>
      </Box>
      <Box className='layout-main-footer-wrapper'>
      {/* <Footer /> */}
      </Box>


      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/clinic-branch" element={<ClinicBranch />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} /> */}
      </Routes>
    </Box>
    <Login />
    <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
