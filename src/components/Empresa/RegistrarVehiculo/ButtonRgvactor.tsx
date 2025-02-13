import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Box from "@mui/material/Box";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { useFormik } from "formik";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CloseIcon from "@mui/icons-material/Close";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Validación de Formik
const validationSchema = Yup.object({
  Placa: Yup.string().required("La placa del vehículo es obligatoria"),
  Capacidad: Yup.number().required(
    "Debe ingresar la capacidad de carga del vehículo"
  ),
});

// Transición para el diálogo
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ButtonRgvactor: React.FC<{ refreshTable: () => void }> = ({
  refreshTable,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      Placa: "",
      Capacidad: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          `${baseUrl}/vehiculo`,
          {
            placa: values.Placa,
            capacidad: values.Capacidad,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Vehículo registrado:", response.data);

        handleClose();
        resetForm();

        if (refreshTable) refreshTable();
        Notify.success("Se registró el vehiculo exitosamente");
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Ocurrió un error inesperado";
        Notify.failure(errorMessage);
      }
    },
  });

  const handlePlacaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (value.length === 3 && !value.includes("-")) {
      value = value + "-";
    }

    formik.setFieldValue("Placa", value);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        endIcon={<ControlPointIcon />}
        sx={{ mb: 4 }}
      >
        Registrar un nuevo vehículo
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
      >
        <DialogTitle>{"Registrar nuevo vehículo"}</DialogTitle>

        <DialogContent>
          <Box
            component="form"
            id="formulario-vehiculo"
            onSubmit={formik.handleSubmit}
            sx={{ "& > :not(style)": { m: 1, width: "31ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="Placa"
              label="Placa del vehículo"
              variant="outlined"
              required
              onChange={handlePlacaChange}
              onBlur={formik.handleBlur}
              value={formik.values.Placa}
              helperText={
                formik.touched.Placa && formik.errors.Placa
                  ? formik.errors.Placa
                  : ""
              }
              error={formik.touched.Placa && Boolean(formik.errors.Placa)}
            />

            <TextField
              id="Capacidad"
              label="Capacidad del vehiculo"
              type="number"
              variant="outlined"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Capacidad}
              helperText={
                formik.touched.Capacidad && formik.errors.Capacidad
                  ? formik.errors.Capacidad
                  : ""
              }
              error={
                formik.touched.Capacidad && Boolean(formik.errors.Capacidad)
              }
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="error"
            endIcon={<CloseIcon />}
            onClick={handleClose}
          >
            Cerrar
          </Button>
          <Button
            variant="contained"
            onClick={() => formik.handleSubmit()}
            endIcon={<DoneOutlineIcon />}
            disabled={!formik.isValid || !formik.dirty}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
