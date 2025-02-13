import { useEffect } from "react";
import Header from "../components/Inicio/Header";
import InformacionCard from "../components/Inicio/Informacion";
import Footer from "../components/Inicio/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useInicioStore } from "../store/slices/useInicioStore";

function PaginaInicio() {
  const { data, loading, error, fetchData } = useInicioStore();

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Header />
      <InformacionCard data={data} />
      <Footer />
    </>
  );
}

export default PaginaInicio;
