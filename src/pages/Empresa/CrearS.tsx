import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { PaginaComponent } from "../../components/PaginaPrincipal/PaginaComponent";
import CartaSolicitud from "../../components/Empresa/CrearSolicitud/CartaSolicitud";

const CrearS = () => {
  return (
    <PaginaComponent>
      <Grid item xs={12} md={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Inicio
          </Link>
          <Typography color="text.primary">Crear Solicitud</Typography>
        </Breadcrumbs>
      </Grid>
      <br />
      <CartaSolicitud />
    </PaginaComponent>
  );
};

export default CrearS;
