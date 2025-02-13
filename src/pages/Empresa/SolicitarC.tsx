import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { CardCertificado } from "../../components/Empresa/SolicitarCertificado/CardCertificado";
import { PaginaComponent } from "../../components/PaginaPrincipal/PaginaComponent";

const SolicitarC = () => {
  return (
    <PaginaComponent>
      <Grid item xs={12} md={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Inicio
          </Link>
          <Typography color="text.primary">Solicitar Certificado</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CardCertificado />
      </Grid>
    </PaginaComponent>
  );
};

export default SolicitarC;
