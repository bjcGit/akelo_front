import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

export const PaginaError = () => {
  const navigate = useNavigate(); // Hook para redirección
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux

  const handleLogout = () => {
    // Llama a la acción logout de Redux
    dispatch(logout());

    // Redirige al usuario al login
    navigate("/Login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#227100",
        color: "white",
        textAlign: "center",
      }}
    >
      <img
        src="/images/LOGO-EMCALI-blanca.png"
        alt="Error icon"
        style={{ width: "400px" }}
      />
      <Typography variant="h1" sx={{ fontSize: "10rem", fontWeight: "bold" }}>
        Error
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 3 }}>
        A ocurrrido un error al procesar la peticion hecha, por favor vuelva a
        iniciar sesión
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleLogout}
          style={{ backgroundColor: "#ffffff", color: "black" }}
        >
          Volver al inicio
        </Button>
      </Box>
    </Box>
  );
};
