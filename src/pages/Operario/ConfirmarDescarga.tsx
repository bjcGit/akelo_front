import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { PaginaComponent } from "../../components/PaginaPrincipal/PaginaComponent";

export default function ConfirmarDescarga() {
  return (
    <PaginaComponent>
      <Grid item xs={12} md={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Inicio
          </Link>
          <Typography color="text.primary">Aprobar Descarga</Typography>
        </Breadcrumbs>
      </Grid>
      <br />
    </PaginaComponent>
  );
}
