import React from 'react';
import './App.css';
import Home from "./pages/Home";
import AdminPanel from './pages/Admin';
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Doctors from './components/adminpanel/Doctors';
import Rendezvous from './components/adminpanel/Rendezvous';
import Patients from './components/adminpanel/Patients';
import Consultations from './components/adminpanel/Consultations';
import TimeSlots from './components/adminpanel/TimeSlots';
import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="registration" element={<Registration/>} />
      <Route path="login" element={<Login/>} />
      <Route path='/admin/' element={
        <ProtectedRoute requiredRole="admin">
          <AdminPanel />
        </ProtectedRoute>
      }>
        <Route index element={<Doctors />} />
        <Route path='doctors' element={<Doctors />} />
        <Route path='rendezvous' element={<Rendezvous />} />
        <Route path='patients' element={<Patients />} />
        <Route path='consultations' element={<Consultations />} />
        <Route path='timeslots' element={<TimeSlots />} />
      </Route>
    </Routes>
  )
}

export default App;