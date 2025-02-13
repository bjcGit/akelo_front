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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Report } from "notiflix/build/notiflix-report-aio";
import { EliminarUsuario } from "./EliminarUsuario";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const validationSchema = Yup.object({
  Nombre: Yup.string().required("El nombre del usuario es obligatorio"),
  Cedula: Yup.number().required("La cedula es obligatoria"),
  Correo: Yup.string().required("El correo es obligatorio"),
  Empresa: Yup.string().required("La empresa es obligatorio"),
  Rol: Yup.string().required("El rol es obligatorio"),
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ActualizarUsuario {
  nombre: string;
  cedula: number;
  correo: string;
  empresa: string;
  rol: string;
  id: string;

  refreshTable: () => void;
}

export const ActualizarUsuario: React.FC<ActualizarUsuario> = ({
  nombre,
  cedula,
  correo,
  empresa,
  rol,
  id,
  refreshTable,
}) => {
  const [open, setOpen] = React.useState(false);

  //Manejador del select de empresa
  const handleEmpresaChange = (event: SelectChangeEvent) => {
    formik.setFieldValue("Empresa", event.target.value);
  };

  //Manejador del select de rol
  const handleRolChange = (event: SelectChangeEvent) => {
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
      Nombre: nombre, // Usar la nombre inicial recibida como prop
      Cedula: cedula,
      Correo: correo,
      Empresa: empresa,
      Rol: rol, // Usar la capacidad inicial recibida como prop
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        Loading.dots(); // Si utilizas Notiflix para mostrar un indicador de carga

        const response = await axios.put(`${baseUrl}/usuario/${id}`, {
          nombre: values.Nombre,
          cedula: Number(values.Cedula),
          correo: values.Correo,
          empresa: values.Empresa,
          rol: values.Rol,
        });

        if (response.status === 200) {
          Notify.success("Información del usuario actualizada");
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
      <ButtonGroup>
        <EliminarUsuario refreshTable={refreshTable} id={id} />
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
        maxWidth="md"
      >
        <DialogTitle>{"Actualizar información de la empresa"}</DialogTitle>

        <DialogContent>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            id="actualizar-empresa"
            sx={{ "& > :not(style)": { m: 1, width: "45ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="Nombre"
              label="Nombre del usuario"
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
              <InputLabel id="demo-simple-select-required-label">
                Empresa
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={formik.values.Empresa}
                label="Empresa *"
                onChange={handleEmpresaChange}
              >
                {/* Mapeo de las empresas */}
                {data.map((empresa) => (
                  <MenuItem key={empresa.id} value={empresa.nombre}>
                    {empresa.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">
                Rol
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={formik.values.Rol}
                label="Rol *"
                onChange={handleRolChange}
              >
                <MenuItem value={"Vigilancia"}>Vigilancia</MenuItem>
                <MenuItem value={"Operario"}>Operario</MenuItem>
                <MenuItem value={"Administrador"}>Administrador</MenuItem>
                <MenuItem value={"Coordinador"}>
                  Coordinador de transporte
                </MenuItem>
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
            onClick={() => formik.handleSubmit()} // Enviar el formulario
            endIcon={<DoneOutlineIcon />}
            disabled={!formik.values.Nombre || !formik.values.Cedula}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
