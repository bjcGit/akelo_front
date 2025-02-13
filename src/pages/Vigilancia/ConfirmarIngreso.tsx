import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import TablaConfirmarI from "../../components/Empresa/ConfirmarIngreso/TablaConfirmarI";
import { PaginaComponent } from "../../components/PaginaPrincipal/PaginaComponent";

const ConfirmarIngreso = () => {
  return (
    <PaginaComponent>
      <Grid item xs={12} md={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Inicio
          </Link>
          <Typography color="text.primary">Confirmar Ingreso</Typography>
        </Breadcrumbs>
      </Grid>
      <br />
      <TablaConfirmarI />
    </PaginaComponent>
  );
};

export default ConfirmarIngreso;
