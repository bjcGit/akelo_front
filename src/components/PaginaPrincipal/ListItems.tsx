import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HistoryIcon from "@mui/icons-material/History";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { RiSteering2Fill } from "react-icons/ri";
import { MdEditDocument } from "react-icons/md";
import { GrDocumentTime } from "react-icons/gr";
import { IoEnterOutline } from "react-icons/io5";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ApartmentIcon from "@mui/icons-material/Apartment";

interface NavigationMenuProps {
  open: boolean;
}

const allOptions = [
  {
    title: "Administrar empresa",
    icon: <ApartmentIcon />,
    route: "/AdministrarEmpresa",
  },
  {
    title: "Registrar Vehículo",
    icon: <LocalShippingIcon />,
    route: "/RgVactor",
  },
  {
    title: "Registrar Conductor",
    icon: <RiSteering2Fill size={23} />,
    route: "/RgConductor",
  },
  {
    title: "Crear solicitud",
    icon: <MdEditDocument size={23} />,
    route: "/CrearS",
  },
  {
    title: "Historial de solicitudes",
    icon: <HistoryIcon />,
    route: "/HistorialS",
  },
  {
    title: "Solicitar certificado",
    icon: <AssignmentIcon />,
    route: "/SolicitarC",
  },
  {
    title: "Historial certificados",
    icon: <GrDocumentTime size={22} />,
    route: "/HistorialCer",
  },
  {
    title: "Confirmar Ingreso",
    icon: <IoEnterOutline size={25} />,
    route: "/ConfirmarIngreso",
  },
  {
    title: "Confirmar Salida",
    icon: <LogoutIcon />,
    route: "/ConfirmarSalida",
  },
  {
    title: "Historial de Ingresos",
    icon: <HistoryIcon />,
    route: "/HistorialIngreso",
  },
  {
    title: "Aprobar Descarga",
    icon: <LocalShippingIcon />,
    route: "/ConfirmarDescarga",
  },
  {
    title: "Historial de Descargas",
    icon: <HistoryIcon />,
    route: "/HistorialDescarga",
  },
  {
    title: "Administrar Usuarios",
    icon: <ManageAccountsIcon />,
    route: "/AdministrarUsuario",
  },
];

const getFilteredOptions = (role: string) => {
  switch (role) {
    case "ADMIN":
      return allOptions.filter((option) =>
        [
          "Administrar empresa", 
          "Administrar Usuarios",
          "Aprobar Descarga", 
          "Historial de Descargas",
          "Confirmar Ingreso",
          "Confirmar Salida",
          "Historial de Ingresos",
          "Registrar Vehículo",
          "Registrar Conductor",
          "Crear solicitud",
          "Historial de solicitudes",
          "Solicitar certificado",
          "Historial certificados",

        ].includes(option.title)
      );
    case "USER":
      return allOptions.filter((option) =>
        [
          "Administrar empresa", 
          "Aprobar Descarga", 
          "Historial de Descargas",
          "Registrar Conductor",
          "Crear solicitud",
          "Historial de solicitudes",
          "Solicitar certificado",
          "Historial certificados",

        ].includes(option.title)
      );
    case "SUPER":
      return allOptions.filter((option) =>
        [
          "Confirmar Ingreso",
          "Confirmar Salida",
          "Historial de Ingresos",
        ].includes(option.title)
      );
    case "ASISTENTE":
      return allOptions.filter((option) =>
        [
          "Registrar Vehículo",
          "Registrar Conductor",
          "Crear solicitud",
          "Historial de solicitudes",
          "Solicitar certificado",
          "Historial certificados",
        ].includes(option.title)
      );
    default:
      return [];
  }
};

const NavigationMenu: React.FC<NavigationMenuProps> = ({ open }) => {
  const navigate = useNavigate();

  // Obtener el rol directamente desde el objeto `user` almacenado en localStorage
  const role = React.useMemo(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString); // Convertir de string a objeto
        return user.rol; // Acceder al campo 'rol'
      } catch (error) {
        console.error(
          "Error al parsear el objeto user desde localStorage:",
          error
        );
      }
    }
    return ""; // Valor predeterminado si no hay rol
  }, []);

  const options = getFilteredOptions(role);

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <List>
      {options.map((option, index) => (
        <ListItem key={index} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => handleNavigation(option.route)}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {option.icon}
            </ListItemIcon>
            <ListItemText
              primary={option.title}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NavigationMenu;
