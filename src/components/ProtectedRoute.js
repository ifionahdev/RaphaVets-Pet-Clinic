import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('userRole');
  const location = useLocation();

  if (!userId) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  if (location.pathname.startsWith('/admin-pages')) {
    if (role === '3') {
      return <Navigate to="/vet" replace />;
    }
    if (role !== '2') {
      return <Navigate to="/user-home" replace />;
    }
  }

  if (location.pathname.startsWith('/vet')) {
    if (role === '2') {
      return <Navigate to="/admin-pages/dashboard" replace />;
    }
    if (role !== '3') {
      return <Navigate to="/user-home" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;