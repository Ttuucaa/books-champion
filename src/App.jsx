import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/auth/login/Login.jsx';
import Register from './components/auth/register/register.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import NotFound from './components/ui/NotFound.jsx';
import Protected from './components/routingandprotected/Protected.jsx';

// Componente interno que puede usar useNavigate
const AuthRoutes = ({ isAuthenticated, handleLogin, handleLogout }) => {
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard/*" 
        element={
          <Protected isSignedIn={isAuthenticated}>
            <Dashboard onLogout={handleLogout} />
          </Protected>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      <BrowserRouter>
        <AuthRoutes 
          isAuthenticated={isAuthenticated}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
}

export default App;
