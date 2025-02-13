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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Report } from "notiflix/build/notiflix-report-aio";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Validación de Formik
const validationSchema = Yup.object({
  Nombre: Yup.string().required("El nombre del usuario es obligatorio"),
  Cedula: Yup.number().required("La cedula es obligatoria"),
  Correo: Yup.string().required("El correo es obligatorio"),
  Empresa: Yup.string().required("La empresa es obligatorio"),
  Rol: Yup.string().required("El rol es obligatorio"),
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

export const BotonRegistrarUsuario: React.FC<{ refreshTable: () => void }> = ({
  refreshTable,
}) => {
  const [open, setOpen] = React.useState(false);

  //Manejador del select de empresa
  const handleEmpresaChange = (event: SelectChangeEvent<string>) => {
    formik.setFieldValue("Empresa", event.target.value);
  };

  //Manejador del select de rol
  const handleRolChange = (event: SelectChangeEvent<string>) => {
    formik.setFieldValue("Rol", event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      Nombre: "",
      Cedula: "",
      Correo: "",
      Empresa: "",
      Rol: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          `${baseUrl}/auth/register`,
          {
            nombre: values.Nombre,
            cedula: values.Cedula,
            correo: values.Correo,
            empresa: values.Empresa,
            rol: values.Rol,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Usuario registrado:", response.data);

        handleClose();
        resetForm();

        if (refreshTable) refreshTable();
        Notify.success("Se registró el usuario exitosamente");
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Ocurrió un error inesperado";
        console.error("Detalles del error:", error.response?.data);
        Notify.failure(errorMessage);
      }
      // Muestra los detalles específicos del error en la consola
    },
  });

  //Metodo get para traer las empresas
  interface Empresa {
    nombre: string;
    id: string;
    refreshTable: () => void;
  }

  const [data, setData] = React.useState<Empresa[]>([]);

  const BuscarEmpresa = async () => {
    try {
      Loading.dots();
      const response = await axios.get(`${baseUrl}/empresa`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const empresasFiltradas: Empresa[] = response.data.map(
        (empresa: any) => ({
          id: empresa.id,
          nombre: empresa.nombre,
        })
      );

      setData(empresasFiltradas);
      Loading.remove();
    } catch (error) {
      Loading.remove();
      Report.failure("Failed to fetch", `${error}`, "Aceptar");
    }
  };
  React.useEffect(() => {
    BuscarEmpresa();
  }, []);

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        endIcon={<ControlPointIcon />}
        sx={{ mb: 4 }}
      >
        Registrar un nuevo usuario
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
      >
        <DialogTitle>{"Registrar nuevo Usuario"}</DialogTitle>

        <DialogContent>
          <Box
            component="form"
            id="formulario-usuario"
            onSubmit={formik.handleSubmit}
            sx={{ "& > :not(style)": { m: 1, width: "45ch" } }}
            noValidate
            autoComplete="off"
          >
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
            />

            <TextField
              id="Cedula"
              label="Cedula"
              type="number"
              variant="outlined"
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

            <TextField
              id="Correo"
              label="Correo"
              variant="outlined"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Correo}
              helperText={
                formik.touched.Correo && formik.errors.Correo
                  ? formik.errors.Correo
                  : ""
              }
              error={formik.touched.Correo && Boolean(formik.errors.Correo)}
            />

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="empresa-select-label">Empresa</InputLabel>
              <Select
                labelId="empresa-select-label"
                id="empresa-select"
                value={formik.values.Empresa || ""} // Usa una cadena vacía si el valor es undefined
                label="Empresa *"
                onChange={handleEmpresaChange}
              >
                <MenuItem value="" disabled>
                  Seleccione una empresa
                </MenuItem>
                {data.map((empresa) => (
                  <MenuItem key={empresa.id} value={empresa.nombre}>
                    {empresa.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="rol-select-label">Rol</InputLabel>
              <Select
                labelId="rol-select-label"
                id="Rol"
                value={formik.values.Rol || ""} // Usa una cadena vacía si el valor es undefined
                label="Rol *"
                onChange={handleRolChange}
              >
                <MenuItem value="Vigilancia">Vigilancia</MenuItem>
                <MenuItem value="Operario">Operario</MenuItem>
                <MenuItem value="Administrador">Administrador</MenuItem>
                <MenuItem value="Coordinador">Coordinador</MenuItem>
                <MenuItem value="Conductor">Conductor</MenuItem>
              </Select>
            </FormControl>
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
