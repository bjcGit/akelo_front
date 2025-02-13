import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, Card, FormLabel, FormControl, TextField, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { loginSuccess } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import RegistroUsuarioDialog from "./RegistroUsuarioDialog";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function EmcaliIcon() {
  return (
    <img
      src="/images/LOGO-EMCALI.png"
      alt="Emcali Icon"
      style={{
        height: 100,
        width: 273,
        margin: "0 auto",
        display: "block",
      }}
    />
  );
}

// Esquema de validación con Yup
const validationSchema = Yup.object({
  correo: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
});

export default function SignInCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values: { correo: string; password: string }, { setSubmitting }: any) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, values);
      const { token, user } = response.data;

      dispatch(loginSuccess({ token, user }));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const targetRoute = (() => {
        switch (user.rol) {
          case "ADMIN":
            return "/AdministrarEmpresa";
          case "USER":
            return "/AdministrarEmpresa";
          case "VIGILANCIA":
            return "/AdministrarEmpresa";
          case "COORDINADOR":
            return "/AdministrarEmpresa";
          default:
            Notify.warning("Rol no reconocido, redirigiendo a página por defecto.");
            return "/Login";
        }
      })();

      navigate(targetRoute);
    } catch (error: any) {
      console.error("Detalles del error:", error.response?.data);
      Notify.failure(error.response?.data?.message || "Ocurrió un error inesperado.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card variant="outlined" sx={{ padding: 4, width: "450px", margin: "auto" }}>
      <EmcaliIcon />
      <Typography component="h1" variant="h4" sx={{ textAlign: "center", mb: 2 }}>
        <strong>Iniciar Sesión</strong>
      </Typography>

      {/* Formik para manejar el formulario */}
      <Formik
        initialValues={{ correo: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormLabel htmlFor="correo">Correo</FormLabel>
              <Field as={TextField} id="correo" name="correo" placeholder="usuario@correo.com" fullWidth />
              <ErrorMessage name="correo" component="div" className="error-message" />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <Field as={TextField} type="password" id="password" name="password" placeholder="••••••" fullWidth />
              <ErrorMessage name="password" component="div" className="error-message" />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "#2A3036", mt: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Ingresando..." : "Ingresar"}
            </Button>
          </Form>
        )}
      </Formik>

      {/* Redirección a la página de registro */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant="body2">
          ¿No tienes una cuenta?{" "}
       
        </Typography>
        <RegistroUsuarioDialog/>
      </Box>
    </Card>
  );
}
