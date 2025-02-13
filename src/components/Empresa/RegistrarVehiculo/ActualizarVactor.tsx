import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Box from "@mui/material/Box";
import CreateIcon from "@mui/icons-material/Create";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { useFormik } from "formik";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CloseIcon from "@mui/icons-material/Close";
import { ButtonGroup } from "@mui/material";
import axios from "axios";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { EliminarVehiculo } from "./EliminarVehiculo";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const validationSchema = Yup.object({
  Placa: Yup.string().required("La placa del vehículo es obligatoria"),
  Capacidad: Yup.string().required(
    "Debe ingresar la capacidad de carga del vehículo"
  ),
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ActualizarVactorProps {
  placa: string;
  capacidad: string;
  id: string;
  refreshTable: () => void;
}

export const ActualizarVactor: React.FC<ActualizarVactorProps> = ({
  placa,
  capacidad,
  id,
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
      Placa: placa, // Usar la placa inicial recibida como prop
      Capacidad: capacidad, // Usar la capacidad inicial recibida como prop
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        Loading.dots(); // Si utilizas Notiflix para mostrar un indicador de carga

        const response = await axios.put(`${baseUrl}/vehiculo/${id}`, {
          placa: values.Placa,
          capacidad: Number(values.Capacidad), // Cambia la capacidad del vehículo
        });

        if (response.status === 200) {
          Notify.success("Información del vehículo actualizada");
          handleClose(); // Cerrar el diálogo al enviar

          refreshTable();
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Ocurrió un error inesperado";
        Notify.failure(errorMessage);
      } finally {
        Loading.remove(); // Elimina el indicador de carga
      }
    },
  });

  return (
    <React.Fragment>
      <ButtonGroup>
        <EliminarVehiculo refreshTable={refreshTable} id={id} />
        <Button variant="contained" onClick={handleClickOpen}>
          <CreateIcon />
        </Button>
      </ButtonGroup>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
      >
        <DialogTitle>{"Actualizar información de vehículo"}</DialogTitle>

        <DialogContent>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            id="actualizar-vehiculo"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="Placa"
              label="Placa del vehículo"
              variant="outlined"
              required
              onChange={formik.handleChange}
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
            onClick={() => formik.handleSubmit()} // Enviar el formulario
            endIcon={<DoneOutlineIcon />}
            disabled={!formik.values.Placa || !formik.values.Capacidad}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
