// src/App.tsx
import React, { JSX, useContext } from 'react';
import Menubar from './components/Menubar/Menubar.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.tsx';
import { AppContext } from './context/AppContext.tsx';
import Courses from './pages/Courses/Courses.tsx';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { auth } = useContext(AppContext);
  console.log(auth);
  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App: React.FC = () => {

  const location = useLocation();

  return (
    <div className="app-shell">
      {location.pathname !== '/login' && location.pathname !== '/signup' && (<Menubar />)}
      <Routes>
        <Route path="/dashboard"
               element={<PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </div>
  );
};

export default App;