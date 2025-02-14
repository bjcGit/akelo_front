import { useEffect } from "react";
import Header from "../components/Inicio/Header";
import InformacionCard from "../components/Inicio/Informacion";
import Footer from "../components/Inicio/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


function PaginaInicio() {



  return (
    <>
      <Header />
      <InformacionCard />
      <Footer />
    </>
  );
}

export default PaginaInicio;
