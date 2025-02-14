import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { TablaEmpresa } from "../../components/Administrador/AdministrarEmpresa/TablaEmpresa";

const AdministrarEmpresa = () => {
  return (
    <>
      <Grid item xs={12} md={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Inicio
          </Link>
          <Typography color="text.primary">Administrar Empresa</Typography>
        </Breadcrumbs>
      </Grid>
      <br />
      <TablaEmpresa />
    </>
  );
};

export default AdministrarEmpresa;
