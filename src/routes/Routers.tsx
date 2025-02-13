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
import RegistroUsuarioDialog from "../pages/Login/RegistroUsuarioDialog";

const protectedRoutes = [
  { path: "/RgConductor", component: <RgConductor /> },
  { path: "/RgVactor", component: <RgVactor /> },
  { path: "/CrearS", component: <CrearS /> },
  { path: "/HistorialS", component: <HistorialS /> },
  { path: "/SolicitarC", component: <SolicitarC /> },
  { path: "/HistorialCer", component: <HistorialCer /> },
  { path: "/ConfirmarIngreso", component: <ConfirmarIngreso /> },
  { path: "/ConfirmarSalida", component: <ConfirmarSalida /> },
  { path: "/HistorialIngreso", component: <HistorialIngreso /> },
  { path: "/ConfirmarDescarga", component: <ConfirmarDescarga /> },
  { path: "/HistorialDescarga", component: <HistorialDescarga /> },
  { path: "/AdministrarEmpresa", component: <AdministrarEmpresa /> },
  { path: "/AdministrarUsuario", component: <AdministrarUsuario /> },
  { path: "/Registro", component: <RegistroUsuarioDialog /> },
];

const Routers = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/Error" element={<PaginaError />} />
      <Route path="/Login" element={<SignInSide />} />
      <Route path="/Registro" element={<RegistroUsuarioDialog />} />

      {/* Rutas protegidas con mapeo dinámico */}
      {protectedRoutes.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute allowedRoles={["ADMIN"]}>{component}</ProtectedRoute>}
        />
      ))}
    </Routes>
  );
};

export default Routers;
