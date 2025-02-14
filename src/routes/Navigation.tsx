import { Routes, Route } from "react-router-dom";
import PaginaInicio from "../pages/PaginaInicio";
import { PaginaError } from "../pages/Error/PaginaError";
import SignInSide from "../pages/Login/SignInSide";
import ProtectedRoute from "./ProtectedRoute";
import RgConductor from "../pages/Empresa/RgConductor";
import RgVactor from "../pages/Empresa/RgVactor";
import CrearS from "../pages/Empresa/CrearS";
import HistorialS from "../pages/Empresa/HistorialS";
import SolicitarC from "../pages/Empresa/SolicitarC";
import HistorialCer from "../pages/Empresa/HistorialCer";
import ConfirmarIngreso from "../pages/Vigilancia/ConfirmarIngreso";
import ConfirmarSalida from "../pages/Vigilancia/ConfirmarSalida";
import HistorialIngreso from "../pages/Vigilancia/HistorialIngreso";
import ConfirmarDescarga from "../pages/Operario/ConfirmarDescarga";
import HistorialDescarga from "../pages/Operario/HistorialDescargas";
import AdministrarEmpresa from "../pages/Administrador/AdministrarEmpresa";
import AdministrarUsuario from "../pages/Administrador/AdministrarUsuario";
import { useAuthStore } from "../store/actions/useAuthStore";
import { DashboardLayout } from "../pages/Dashboard/DashboardLayout";


interface RoleRoute {
  path: string;
  component: JSX.Element;
}

const roleRoutes: { [key: string]: RoleRoute[] } = {
  ADMIN: [
    { path: "/dashboard", component: <AdministrarEmpresa /> },
    { path: "/AdministrarUsuario", component: <AdministrarUsuario /> },
    { path: "/ConfirmarDescarga", component: <ConfirmarDescarga /> },
    { path: "/HistorialDescarga", component: <HistorialDescarga /> },
    { path: "/ConfirmarIngreso", component: <ConfirmarIngreso /> },
    { path: "/ConfirmarSalida", component: <ConfirmarSalida /> },
    { path: "/HistorialIngreso", component: <HistorialIngreso /> },
    { path: "/RgConductor", component: <RgConductor /> },
    { path: "/RgVactor", component: <RgVactor /> },
    { path: "/CrearS", component: <CrearS /> },
    { path: "/HistorialS", component: <HistorialS /> },
    { path: "/SolicitarC", component: <SolicitarC /> },
    { path: "/HistorialCer", component: <HistorialCer /> },
  ],
};

export const Navigation = () => {
  const { user } = useAuthStore();
  return (
    <Routes>
    {/* Rutas públicas */}
    <Route path="/" element={<PaginaInicio />} />
    <Route path="/login" element={<SignInSide />} />
    <Route path="/error" element={<PaginaError />} />
    {user &&
      roleRoutes[user.rol]?.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute allowedRoles={[user.rol]}>
              <DashboardLayout>{component}</DashboardLayout>
            </ProtectedRoute>
          }
        />
      ))}
  </Routes>
  );
};
