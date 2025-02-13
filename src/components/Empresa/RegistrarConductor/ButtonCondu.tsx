import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import * as Yup from "yup";
import { useFormik } from "formik";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = Yup.object({
  Nombre: Yup.string().required("El nombre es obligatorio"),
  Cedula: Yup.number().required("El numero de cedula es obligatorio"),
  EPS: Yup.string().required("El nombre de la EPS es obligatorio"),
  ARL: Yup.string().required("Este campo es obligatorio"),
  NivelARL: Yup.string().required("Este campo es obligatorio"),
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ButtonCondu = () => {
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
      Apellidos: "",
      Cedula: "",
      EPS: "",
      ARL: "",
      NivelARL: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Registro validado", values);
    },
  });

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        endIcon={<ControlPointIcon />}
        sx={{ mb: 4 }}
      >
        Registrar un nuevo Conductor
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
      >
        <DialogTitle>{"Registrar nuevo conductor"}</DialogTitle>

        <DialogContent>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="Nombre"
                label="Nombre completo"
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
                style={{
                  width:
                    screenWidth < 600
                      ? "25ch"
                      : screenWidth < 836
                      ? "25ch"
                      : "52ch",
                }}
              />

              <TextField
                id="Cedula"
                label="Cedula"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Cedula}
                helperText={
                  formik.touched.Cedula && formik.errors.Cedula
                    ? formik.errors.Cedula
                    : ""
                }
                error={formik.touched.Cedula && Boolean(formik.errors.Cedula)}
              />
            </div>
            <div>
              <TextField
                id="EPS"
                label="EPS"
                variant="outlined"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.EPS}
                helperText={
                  formik.touched.EPS && formik.errors.EPS
                    ? formik.errors.EPS
                    : ""
                }
                error={formik.touched.EPS && Boolean(formik.errors.EPS)}
              />
              <TextField
                id="ARL"
                label="ARL"
                variant="outlined"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ARL}
                helperText={
                  formik.touched.ARL && formik.errors.ARL
                    ? formik.errors.ARL
                    : ""
                }
                error={formik.touched.ARL && Boolean(formik.errors.ARL)}
              />
              <TextField
                id="NivelARL"
                label="Nivel de riesgo de ARL"
                variant="outlined"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.NivelARL}
                helperText={
                  formik.touched.NivelARL && formik.errors.NivelARL
                    ? formik.errors.NivelARL
                    : ""
                }
                error={
                  formik.touched.NivelARL && Boolean(formik.errors.NivelARL)
                }
              />
            </div>
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
            onClick={handleClose}
            endIcon={<DoneOutlineIcon />}
            disabled={
              !formik.values.Nombre ||
              !formik.values.Cedula ||
              !formik.values.EPS ||
              !formik.values.ARL ||
              !formik.values.NivelARL
            }
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
