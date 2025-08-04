// App.jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Loader from "./components/loader";
import UserProfile from "./pages/UserProfile";
import "./Styles/App.css";
import { AuthProvider, useAuth } from "../public/Context/AuthContext";

const Layout = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const showNavbar = !location.pathname.startsWith("/dashboard");

  return (
    <>
      {showNavbar && (
        <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
      )}
      {children}
    </>
  );
};

const AppRoutes = () => {
  const {
    isAuthenticated,
    user,
    isLoading,
    logout,
    setIsAuthenticated,
    setUser,
  } = useAuth();

  if (isLoading) return <Loader />;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Layout>
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
            <Layout>
              <Register
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
              />
            </Layout>
          )
        }
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
