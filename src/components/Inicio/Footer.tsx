import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
      {"Copyright © "}
      <Link color="text.secondary" href="https://www.emcali.com.co/">
        Emcali E.I.C.E. E.S.P.
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5", // Cambia el color aquí (puedes usar un color HEX, RGB o de la paleta de MUI)
        py: { xs: 6, sm: 10 }, // Padding vertical para el espacio
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 4, sm: 8 },
          textAlign: { sm: "center", md: "left" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              minWidth: { xs: "100%", sm: "60%" },
            }}
          >
            <div>
              {/* Foto de emcali */}
              <img
                src="/images/LOGO-EMCALI.png"
                alt="Emcali Icon"
                style={{
                  height: 80,
                  width: "auto",
                  display: "block",
                  marginBottom: "20px",
                }}
              />
              <Link
                color="text.secondary"
                variant="body2"
                href="https://www.emcali.com.co/es/web/guest/bc/-/knowledge_base/atencion-al-usuario/proteccion-de-datos-personales"
              >
                Políticas de Seguridad
              </Link>
              <Typography sx={{ display: "inline", mx: 0.5, opacity: 0.5 }}>
                &nbsp;•&nbsp;
              </Typography>
              <Link
                color="text.secondary"
                variant="body2"
                href="https://www.emcali.com.co/es/web/guest/bc/-/knowledge_base/atencion-al-usuario/terminos-y-condiciones-pagina-web"
              >
                Términos y Condiciones del Sitio
              </Link>
              <Copyright />
            </div>
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              Company
            </Typography>
            <Link color="text.secondary" variant="body2" href="#">
              About us
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Careers
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Press
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              Ubicación
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Av 2N entre Calles 10 y 11 <br /> CAM Torre EMCALI
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Horario de Atención:
              <br />
              8:00AM a 5:00PM
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
