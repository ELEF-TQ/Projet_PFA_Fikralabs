import { Navigate, RouteProps as BaseRouteProps } from "react-router-dom";
import { retrieveUserSession } from "../lib/Encryption";
import React from "react";


interface ProtectedRouteProps {
  element: React.ReactNode;
  allowedRole: string; 
}

type FinalRouteProps = BaseRouteProps & ProtectedRouteProps;

const ProtectedRoute: React.FC<FinalRouteProps> = ({ element, allowedRole }) => {
  const user = retrieveUserSession();
  
  if (user && user.role === allowedRole) {
    return <>{element}</>; 
  } else {
    return <Navigate to="/login" />; 
  }
};

export default ProtectedRoute;
