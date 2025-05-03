// App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Loader from './components/loader';
import './Styles/App.css';

// Create a wrapper component to handle Navbar visibility
const Layout = ({ children, isAuthenticated, onLogout }) => {
  const location = useLocation();
  const showNavbar = !location.pathname.startsWith('/dashboard');
  
  return (
    <>
      {showNavbar && <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />}
      {children}
    </>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          const response = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser)); // Ensure user is properly parsed
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    // Redirect to home instead of login
    window.location.href = '/';
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}>
            <Home />
          </Layout>
        } />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}>
                <Login 
                  setIsAuthenticated={setIsAuthenticated} 
                  setUser={setUser} 
                />
              </Layout>
            )
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}>
                <Register 
                  setIsAuthenticated={setIsAuthenticated} 
                  setUser={setUser} 
                />
              </Layout>
            )
          } 
        />
        
        <Route 
          path="/dashboard/*" 
          element={
            isAuthenticated ? (
              <Dashboard 
                user={user} 
                onLogout={handleLogout} 
              />
            ) : (
              <Navigate to="/login" state={{ from: '/dashboard' }} replace />
            )
          } 
        />
        
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;