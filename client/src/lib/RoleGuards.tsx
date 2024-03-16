import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { retrieveUserSession } from "./Encryption";

interface GuardProps {
  element: JSX.Element;
}

const AdminGuard: ComponentType<GuardProps> = ({ element }) => {
  const user = retrieveUserSession();
  if (user && user.role === 'ADMIN') {
    return element;
  }
  return <Navigate to="/login" />;
};

const PompisteGuard: ComponentType<GuardProps> = ({ element }) => {
  const user = retrieveUserSession();
  if (user && user.role === 'POMPISTE') {
    return element;
  }
  return <Navigate to="/login" />;
};

const ClientGuard: ComponentType<GuardProps> = ({ element }) => {
  const user = retrieveUserSession();
  if (user && user.role === 'CLIENT') {
    return element;
  }
  return <Navigate to="/login" />;
};

export { AdminGuard, PompisteGuard, ClientGuard };
