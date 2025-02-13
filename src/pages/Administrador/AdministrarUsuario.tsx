import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { TablaUsuario } from "../../components/Administrador/AdministrarUsuario/TablaUsuario";
import { PaginaComponent } from "../../components/PaginaPrincipal/PaginaComponent";

const AdministrarUsuario = () => {
  return (
    <PaginaComponent>
      <Grid item xs={12} md={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Inicio
          </Link>
          <Typography color="text.primary">Administrar Usuarios</Typography>
        </Breadcrumbs>
      </Grid>
      <br />
      <TablaUsuario />
    </PaginaComponent>
  );
};

export default AdministrarUsuario;
