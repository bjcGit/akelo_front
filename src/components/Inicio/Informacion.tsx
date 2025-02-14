import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import EdgesensorHighRoundedIcon from "@mui/icons-material/EdgesensorHighRounded";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Solicitud",
    description:
      "This item could provide a snapshot of the most important metrics or data points related to the product.",
    imageLight: `url("/images/admin.jpg")`,
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: "Ingreso",
    description:
      "This item could provide information about the mobile app version of the product.",
    imageLight: `url("/images/vigilancia.jpg")`,
  },
  {
    icon: <DevicesRoundedIcon />,
    title: "Certificado",
    description:
      "This item could let users know the product is available on all platforms, such as web, mobile, and desktop.",
    imageLight: `url("/images/VertiLogo.jpg")`,
  },
];

interface InformacionCardProps {
  data: any; // Ajustar el tipo según la API
}

export default function InformacionCard() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);


  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Card
        elevation={6}
        style={{
          padding: "5rem",
          borderRadius: "10px",
        }}
      >
        <Box sx={{ width: { sm: "100%", md: "60%" } }}>
          <Typography
            component="h2"
            variant="h4"
            gutterBottom
            sx={{ color: "text.primary" }}
          >
            Procesos de Producción
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
          >
             Gestione los ingresos de los vehiculos, conductores y resitros de
            su empresa a la planta de tratamiento de aguas residuales de Emcali.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row-reverse" },
            gap: 2,
          }}
        >
          <div>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                flexDirection: "column",
                gap: 2,
                height: "100%",
              }}
            >
              {items.map(({ icon, title, description }, index) => (
                <Box
                  key={index}
                  component={Button}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    p: 2,
                    width: "100%",
                    textAlign: "left",
                    textTransform: "none",
                    backgroundColor:
                      selectedItemIndex === index
                        ? "action.selected"
                        : "inherit",
                    color:
                      selectedItemIndex === index
                        ? "text.primary"
                        : "text.secondary",
                  }}
                >
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {icon}
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body2">{description}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </div>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              width: { xs: "100%", md: "70%" },
            }}
          >
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: items[selectedItemIndex].imageLight, // Cambiar imagen dinámicamente
              }}
            />
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
