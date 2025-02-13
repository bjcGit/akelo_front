import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { TablaHistorialS } from "../../components/Empresa/HistorialSolicitudes/TablaHistorialS";
import { PaginaComponent } from "../../components/PaginaPrincipal/PaginaComponent";

const HistorialS = () => {
  return (
    <PaginaComponent>
      <Grid item xs={12} md={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Inicio
          </Link>
          <Typography color="text.primary">Historial de Solicitudes</Typography>
        </Breadcrumbs>
      </Grid>
      <br />
      <TablaHistorialS />
    </PaginaComponent>
  );
};

export default HistorialS;
