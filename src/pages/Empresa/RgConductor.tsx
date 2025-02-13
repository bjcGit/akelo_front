import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { ButtonCondu } from "../../components/Empresa/RegistrarConductor/ButtonCondu";
import { TableCondu } from "../../components/Empresa/RegistrarConductor/TableCondu";
import { PaginaComponent } from "../../components/PaginaPrincipal/PaginaComponent";

const RgConductor = () => {
  return (
    <PaginaComponent>
      <Grid item xs={12} md={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Inicio
          </Link>
          <Typography color="text.primary">Registrar Conductor</Typography>
        </Breadcrumbs>
      </Grid>
      <br />
      <ButtonCondu />
      <TableCondu />
    </PaginaComponent>
  );
};

export default RgConductor;
