import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useStore from '../store/store';

const ProtectedRoute = ({ children }) => {
  const user = useStore(state => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;