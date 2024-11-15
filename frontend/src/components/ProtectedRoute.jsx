// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Хранится после логина

  if (!token || (role && userRole !== role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
