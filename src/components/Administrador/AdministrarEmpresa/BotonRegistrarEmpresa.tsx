import * as React from "react";
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
import { useEmpresaStore } from "../../../store/actions/useEmpresaStore";

// Validación de Formik
const validationSchema = Yup.object({
  razon_social: Yup.string().required("El nombre de la empresa es obligatorio"),
  nit: Yup.string().required("El NIT de la empresa es obligatorio"),
  direccion: Yup.string().required("La direccion de la empresa es obligatoria"),
  barrio: Yup.string().required("El barrio es obligatorio"),
  comuna: Yup.string().required("La comuna de la empresa es obligatoria"),
  ciudad: Yup.string().required("La ciudad de la empresa es obligatoria"),
  departamento: Yup.string().required(
    "El departamento de la empresa es obligatorio"
  ),
  latitud: Yup.string(),
  longitud: Yup.string(),
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

export const BotonRegistrarEmpresa: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { addEmpresa, error } = useEmpresaStore();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      nit: "",
      razon_social: "",
      direccion: "",
      barrio: "",
      comuna: "",
      ciudad: "",
      departamento: "",
      latitud: "",
      longitud: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await addEmpresa(values);
        Notify.success("Empresa registrada exitosamente");
        setOpen(false);
        resetForm();
      } catch (error) {
        console.error("Error en la respuesta del servidor:", error);
        Notify.failure("Error al registrar la empresa");
      }
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
              id="razon_social"
              label="Razon Social"
              variant="outlined"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.razon_social}
              helperText={
                formik.touched.razon_social && formik.errors.razon_social
                  ? formik.errors.razon_social
                  : ""
              }
              error={
                formik.touched.razon_social &&
                Boolean(formik.errors.razon_social)
              }
            />

            <TextField
              id="nit"
              label="NIT de la empresa"
              variant="outlined"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nit}
              helperText={
                formik.touched.nit && formik.errors.nit ? formik.errors.nit : ""
              }
              error={formik.touched.nit && Boolean(formik.errors.nit)}
            />

            <TextField
              id="direccion"
              label="Direccion"
              variant="outlined"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.direccion}
              helperText={
                formik.touched.direccion && formik.errors.direccion
                  ? formik.errors.direccion
                  : ""
              }
              error={
                formik.touched.direccion && Boolean(formik.errors.direccion)
              }
            />
          </Box>
          <Box
            component="form"
            id="formulario-empresa"
            onSubmit={formik.handleSubmit}
            sx={{ "& > :not(style)": { m: 1, width: "31ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="comuna"
              label="Comuna"
              variant="outlined"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comuna}
              helperText={
                formik.touched.comuna && formik.errors.comuna
                  ? formik.errors.comuna
                  : ""
              }
              error={
                formik.touched.comuna && Boolean(formik.errors.comuna)
              }
            />

            <TextField
              id="barrio"
              label="Barrio"
              variant="outlined"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.barrio}
              helperText={
                formik.touched.barrio && formik.errors.barrio
                  ? formik.errors.barrio
                  : ""
              }
              error={formik.touched.barrio && Boolean(formik.errors.barrio)}
            />
            <TextField
              id="ciudad"
              label="Ciudad"
              variant="outlined"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ciudad}
              helperText={
                formik.touched.ciudad && formik.errors.ciudad
                  ? formik.errors.ciudad
                  : ""
              }
              error={formik.touched.ciudad && Boolean(formik.errors.ciudad)}
            />
          </Box>
          <Box
            component="form"
            id="formulario-empresa"
            onSubmit={formik.handleSubmit}
            sx={{ "& > :not(style)": { m: 1, width: "31ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="departamento"
              label="Departamento"
              variant="outlined"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.departamento}
              helperText={
                formik.touched.departamento && formik.errors.departamento
                  ? formik.errors.departamento
                  : ""
              }
              error={
                formik.touched.departamento && Boolean(formik.errors.departamento)
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
