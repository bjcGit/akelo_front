import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, Card, FormLabel, FormControl, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { useAuthStore } from "../../store/actions/useAuthStore";
import RegistroUsuarioDialog from "../Login/RegistroUsuarioDialog";

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

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (values: { correo: string; password: string }, { setSubmitting }: any) => {
    try {
      await login(values.correo, values.password);
      Notify.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (error: any) {
      Notify.failure(error.message);
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
