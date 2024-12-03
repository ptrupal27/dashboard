import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import '../styles/Navbar.css';
import "../components/css/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem('authenticated'); // Clear login session
  //   navigate('/'); // Redirect to login page
  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    navigate('/');
  };
  


  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">Task Manager</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/task-form">Add Task</Link>
        </li>
        <li>
          <Link to="/history">Task History</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
