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
import { EliminarEmpresa } from "../AdministrarEmpresa/EliminarEmpresa";
import { Empresa } from "../../../interfaces/Empresas";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const validationSchema = Yup.object({
  Nombre: Yup.string().required("El nombre de la empresa es obligatorio"),
  Nit: Yup.string().required("Debe ingresar el NIT de la empresa"),
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export const ActualizarEmpresa: React.FC<Empresa> = ({razon_social,nit,id_empresa,refreshTable,}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      razon_social: razon_social, // Usar la nombre inicial recibida como prop
      nit: nit, // Usar la capacidad inicial recibida como prop
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        Loading.dots(); // Si utilizas Notiflix para mostrar un indicador de carga

        const response = await axios.put(`${baseUrl}/empresa/${id_empresa}`, {
          razon_social: values.razon_social,
          nit: Number(values.nit),
        });

        if (response.status === 200) {
          Notify.success("Información de la empresa actualizada");
          handleClose(); // Cerrar el diálogo al enviar

          refreshTable();
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Ocurrió un error inesperado";
        Notify.failure(errorMessage);
      } finally {
        Loading.remove();
      }
    },
  });

  return (
    <React.Fragment>
      <ButtonGroup>
        <EliminarEmpresa 
          refreshTable={refreshTable} 
          id_empresa={id_empresa}

        />
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
        <DialogTitle>{"Actualizar información de la empresa"}</DialogTitle>

        <DialogContent>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            id="actualizar-empresa"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
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
              value={formik.values.razon_social}
              helperText={
                formik.touched.razon_social && formik.errors.razon_social
                  ? formik.errors.razon_social
                  : ""
              }
              error={formik.touched.razon_social && Boolean(formik.errors.razon_social)}
            />

            <TextField
              id="Nit"
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
            disabled={!formik.values.razon_social || !formik.values.nit}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
