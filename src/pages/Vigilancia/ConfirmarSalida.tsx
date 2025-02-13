import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { TablaSolicitud } from "../../components/Empresa/CrearSolicitud/TablaSolicitud";
import { PaginaComponent } from "../../components/PaginaPrincipal/PaginaComponent";

export default function ConfirmarSalida() {
  return (
    <PaginaComponent>
      <Grid item xs={12} md={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Inicio
          </Link>
          <Typography color="text.primary">Confirmar Salida</Typography>
        </Breadcrumbs>
      </Grid>
      <br />
      <TablaSolicitud />
    </PaginaComponent>
  );
}
