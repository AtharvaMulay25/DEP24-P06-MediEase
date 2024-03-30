import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; 

export const LoggedInRoute = ({ children, shouldBeLoggedIn, routePath }) => {
  const { userRole } = useAuth();

  if ((!userRole && shouldBeLoggedIn) || (userRole && !shouldBeLoggedIn)) {
    return <Navigate to={routePath} />;
  }

  return children;
};

export const RoleBasedRoute = ({ children, allowedRoles, userRole }) => {
  // const { userRole } = useAuth();
  console.log("userRole: " + userRole);

  if (!userRole) {
    return <Navigate to="/signin" />;
  }

  console.log("allowedRoles: " + allowedRoles);

  // if (!allowedRoles.includes(userRole)) {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};
