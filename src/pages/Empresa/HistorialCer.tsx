import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { TableCondu } from "../../components/Empresa/RegistrarConductor/TableCondu";
import { PaginaComponent } from "../../components/PaginaPrincipal/PaginaComponent";

const HistorialCer = () => {
  return (
    <PaginaComponent>
      <Grid item xs={12} md={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Inicio
          </Link>
          <Typography color="text.primary">
            Historial de certificados
          </Typography>
        </Breadcrumbs>
      </Grid>
      <br />
      <TableCondu />
    </PaginaComponent>
  );
};

export default HistorialCer;
