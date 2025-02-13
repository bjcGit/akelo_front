import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice"; // Importamos la acción para cerrar sesión

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: any) => state.auth); // Obtenemos el estado de autenticación

  const handleLogin = () => {
    navigate("/Login");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirige al inicio después de cerrar sesión
  };

  return (
    <Box component="header" position="relative">
      <Box component="nav" position="absolute" top="0.5rem" width="100%">
        <Container>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{
              backgroundImage: `url('/images/background.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "0 16px",
              height: "100px",
            }}
          >
            {/* Logotipo */}
            <Box
              component="img"
              src="/images/LOGO-EMCALI-blanca.png"
              alt="EMCALI"
              sx={{ height: "70px", width: "auto" }}
            />

            {/* Botón de Login o Logout */}
            {isAuthenticated ? (
              <Box display="flex" alignItems="center" gap={2}>
                <Typography color="white">Bienvenido, {user?.nombre}</Typography>
                <Button
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    "&:hover": { backgroundColor: "#cacaca" },
                  }}
                  variant="outlined"
                  size="large"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </Button>
              </Box>
            ) : (
              <Button
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  "&:hover": { backgroundColor: "#cacaca" },
                }}
                variant="outlined"
                size="large"
                onClick={handleLogin}
              >
                Iniciar Sesión
              </Button>
            )}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Header;
