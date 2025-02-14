import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/actions/useAuthStore"; // Importamos Zustand

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useAuthStore(); // Obtenemos el usuario del store

  if (!user) {
    // Si el usuario no está autenticado, redirigir al login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.rol)) {
    // Si el usuario no tiene permiso, redirigir a página de error o acceso denegado
    return <Navigate to="/Error" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
