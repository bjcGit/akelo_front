import * as React from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CloseIcon from "@mui/icons-material/Close";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Transición del diálogo
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RegistroUsuarioDialog() {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [userNotFound, setUserNotFound] = React.useState(false);
  const [userData, setUserData] = React.useState<any>(null);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearchValue("");
    setUserNotFound(false);
    setUserData(null);
  };

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    cc: Yup.string().required("La cédula es obligatoria"),
    correo: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
      .matches(/[a-z]/, "Debe contener al menos una minúscula")
      .matches(/\d/, "Debe contener al menos un número")
      .matches(/[@$!%*?&]/, "Debe contener al menos un símbolo especial")
      .required("La contraseña es obligatoria")
  });

  // Consultar usuario en el backend
  const handleSearch = async () => {
    setLoading(true);
    setUserNotFound(false);
    setUserData(null);

    try {
      const response = await axios.get(`${baseUrl}/usuarios/${searchValue}`);
      setUserData(response.data);
      Notify.success("Usuario encontrado en el sistema");
    } catch (error: any) {
      if (error.response?.status === 404) {
        setUserNotFound(true);
        Notify.warning(`No hay datos registrados para: ${searchValue}`);
      } else {
        Notify.failure("Error al buscar usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  // Registro de usuario
  const handleRegister = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      await axios.post(`${baseUrl}/auth/registro`, values);
      Notify.success("Usuario registrado exitosamente");
      handleClose();
      resetForm();
    } catch (error: any) {
      Notify.failure(error.response?.data?.message || "Ocurrió un error inesperado");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Registro
      </Button>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{"Buscar Usuario"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <TextField
              label="Ingrese la cédula"
              variant="outlined"
              fullWidth
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              disabled={loading}
            />
            <Button variant="contained" onClick={handleSearch} disabled={loading || !searchValue}>
              Buscar
            </Button>
          </Box>

          {loading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}

          {userNotFound && (
            <Formik
              initialValues={{
                nombre: "",
                cc: searchValue,
                correo: "",
                password: ""
              }}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Registrar Nuevo Usuario
                  </Typography>

                  <Field
                    as={TextField}
                    label="Nombre"
                    name="nombre"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <ErrorMessage name="nombre" component="div" className="error-message" />

                  <Field
                    as={TextField}
                    label="Cédula"
                    name="cc"
                    fullWidth
                    disabled
                    sx={{ mb: 2 }}
                  />
                  <ErrorMessage name="cc" component="div" className="error-message" />

                  <Field
                    as={TextField}
                    label="Correo"
                    name="correo"
                    type="email"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <ErrorMessage name="correo" component="div" className="error-message" />

                  <Field
                    as={TextField}
                    label="Contraseña"
                    name="password"
                    type="password"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <ErrorMessage name="password" component="div" className="error-message" />

                  <DialogActions>
                    <Button variant="contained" color="error" endIcon={<CloseIcon />} onClick={handleClose}>
                      Cerrar
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      endIcon={<DoneOutlineIcon />}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Guardando..." : "Guardar"}
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
