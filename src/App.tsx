// src/App.tsx
import React from "react";
import Menubar from './components/Menubar/Menubar.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import { Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.tsx';

const App: React.FC = () => {

  const location = useLocation();

  return (
    <div className="app-shell">
      {location.pathname !== '/login' && location.pathname !== '/signup' && (<Menubar />)}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;