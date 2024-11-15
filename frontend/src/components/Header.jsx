// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white py-4">
      <nav className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Student Material Platform</h1>
        <div>
          {token ? (
            <>
              <Link className="px-4" to="/dashboard">
                Dashboard
              </Link>
              <Link className="px-4" to="/materials">
                Materials
              </Link>
              <button className="px-4" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="px-4" to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
