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
  Nombre: Yup.string().required("El nombre de la empresa es obligatorio"),
  Nit: Yup.string().required("El NIT de la empresa es obligatorio"),
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

export const BotonRegistrarEmpresa: React.FC<{ refreshTable: () => void }> = ({refreshTable}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      Nombre: "",
      Nit: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const response = await axios.post(
          `${baseUrl}/empresa`,
          {
            nombre: values.Nombre,
            nit: values.Nit,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Empresa registrada:", response.data);

        handleClose();
        resetForm();

        if (refreshTable) refreshTable();
        Notify.success("Se registró la empresa exitosamente");
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Ocurrió un error inesperado";
        console.error("Detalles del error:", error.response?.data);
        Notify.failure(errorMessage);
      }
      // Muestra los detalles específicos del error en la consola
    },
  });

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        endIcon={<ControlPointIcon />}
        sx={{ mb: 4 }}
      >
        Registrar una nueva empresa
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
      >
        <DialogTitle>{"Registrar nueva empresa"}</DialogTitle>

        <DialogContent>
          <Box
            component="form"
            id="formulario-empresa"
            onSubmit={formik.handleSubmit}
            sx={{ "& > :not(style)": { m: 1, width: "31ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="Nombre"
              label="Nombre de la empresa"
              variant="outlined"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Nombre}
              helperText={
                formik.touched.Nombre && formik.errors.Nombre
                  ? formik.errors.Nombre
                  : ""
              }
              error={formik.touched.Nombre && Boolean(formik.errors.Nombre)}
            />

            <TextField
              id="Nit"
              label="NIT de la empresa"
              type="number"
              variant="outlined"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Nit}
              helperText={
                formik.touched.Nit && formik.errors.Nit ? formik.errors.Nit : ""
              }
              error={formik.touched.Nit && Boolean(formik.errors.Nit)}
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
