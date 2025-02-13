import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { TableVehiculo } from "../../components/Empresa/RegistrarVehiculo/TableVehiculo";
import { PaginaComponent } from "../../components/PaginaPrincipal/PaginaComponent";

const RgVactor = () => {
  return (
    <PaginaComponent>
      <Grid item xs={12} md={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Inicio
          </Link>
          <Typography color="text.primary">Registrar Vehiculo</Typography>
        </Breadcrumbs>
      </Grid>
      <br />
      {/*el boton de registrar un vehiculo esta importado en "TableVehiculo"*/}
      <TableVehiculo />
    </PaginaComponent>
  );
};

export default RgVactor;
