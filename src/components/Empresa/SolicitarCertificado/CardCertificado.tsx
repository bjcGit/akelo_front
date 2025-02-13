///import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, TextField } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import MenuItem from "@mui/material/MenuItem";

const currencies = [
  {
    value: "Age1",
    label: "2024",
  },
  {
    value: "Age2",
    label: "2025",
  },
  {
    value: "Age3",
    label: "2026",
  },
  {
    value: "Age4",
    label: "2027",
  },
  {
    value: "Age5",
    label: "2028",
  },
];

const meses = [
  {
    value: "mes1",
    label: "Enero",
  },
  {
    value: "mes2",
    label: "Febrero",
  },
  {
    value: "mes3",
    label: "Marzo",
  },
  {
    value: "mes4",
    label: "Abril",
  },
  {
    value: "mes5",
    label: "Mayo",
  },
  {
    value: "mes6",
    label: "Junio",
  },
  {
    value: "mes7",
    label: "Julio",
  },
  {
    value: "mes8",
    label: "Agosto",
  },
  {
    value: "mes9",
    label: "Septiembre",
  },
  {
    value: "mes10",
    label: "Octubre",
  },
  {
    value: "mes11",
    label: "Noviembre",
  },
  {
    value: "mes12",
    label: "Diciembre",
  },
];

const validationSchema = Yup.object({
  Año: Yup.string().required("El Año es obligatorio"),
  Mes: Yup.string().required("El mes es obligatorio"),
});

export const CardCertificado = () => {
  const formik = useFormik({
    initialValues: {
      Año: "",
      Mes: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Registro validado", values);
    },
  });
  return (
    <Card sx={{ maxWidth: 345, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Seleccione el periodo
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="Año"
            name="Año"
            label="Seleccione el Año"
            variant="outlined"
            select
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Año}
            helperText={
              formik.touched.Año && formik.errors.Año ? formik.errors.Año : ""
            }
            error={formik.touched.Año && Boolean(formik.errors.Año)}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="Mes"
            name="Mes"
            label="El mes es obligatorio"
            variant="outlined"
            select
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Mes}
            helperText={
              formik.touched.Mes && formik.errors.Mes ? formik.errors.Mes : ""
            }
            error={formik.touched.Mes && Boolean(formik.errors.Mes)}
          >
            {meses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="large"
          variant="contained"
          color="success"
          sx={{ width: "100%" }}
          disabled={!formik.values.Año || !formik.values.Mes}
        >
          Solicitar
        </Button>
      </CardActions>
    </Card>
  );
};
