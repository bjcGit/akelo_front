import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function PyR() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      ></Box> */}
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: "text.primary",
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        Preguntas frecuentes
      </Typography>
      <Box sx={{ width: "100%" }}>
        {[
          {
            id: "panel1",
            question:
              "How do I contact customer support if I have a question or issue?",
            answer: (
              <>
                You can reach our customer support team by emailing{" "}
                <Link>support@email.com</Link> or calling our toll-free number.
                We&apos;re here to assist you promptly.
              </>
            ),
          },
          {
            id: "panel2",
            question:
              "Can I return the product if it doesn&apos;t meet my expectations?",
            answer:
              "Absolutely! We offer a hassle-free return policy. If you’re not completely satisfied, you can return the product within [number of days] days for a full refund or exchange.",
          },
          {
            id: "panel3",
            question:
              "What makes your product stand out from others in the market?",
            answer:
              "Our product distinguishes itself through its adaptability, durability, and innovative features. We prioritize user satisfaction and continually strive to exceed expectations in every aspect.",
          },
          {
            id: "panel4",
            question:
              "Is there a warranty on the product, and what does it cover?",
            answer:
              "Yes, our product comes with a [length of warranty] warranty. It covers defects in materials and workmanship. If you encounter any issues covered by the warranty, please contact our customer support for assistance.",
          },
        ].map(({ id, question, answer }) => (
          <Accordion
            key={id}
            expanded={expanded === id}
            onChange={handleChange(id)}
            sx={{
              mb: 2,
              boxShadow: "none",
              border: "1px solid #ddd", // Borde en todos los acordeones
              borderRadius: "8px", // Bordes redondeados
              "&:before": { display: "none" },
              ...(expanded === id && {
                backgroundColor: "#f9f9f9", // Fondo gris claro para el acordeón activo
                border: "1px solid #bbb", // Borde más oscuro en el acordeón activo
              }),
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${id}-content`}
              id={`${id}-header`}
              sx={{
                padding: "16px",
                "& .MuiAccordionSummary-content": {
                  margin: 0,
                  alignItems: "center",
                },
              }}
            >
              <Typography
                component="h3"
                variant="subtitle2"
                sx={{ fontWeight: expanded === id ? "bold" : "normal" }}
              >
                {question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "16px 16px 16px 24px" }}>
              <Typography variant="body2">{answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
