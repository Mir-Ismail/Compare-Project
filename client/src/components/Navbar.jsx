import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Market Match</Link>
      <div className="auth-buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn btn-primary">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;