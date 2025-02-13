import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CheckIngreso = () => {
  const [open, setOpen] = React.useState(false);
  const [ingresoHora, setIngresoHora] = React.useState(""); // Estado para guardar la hora

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGuardarHora = () => {
    const currentTime = new Date().toLocaleTimeString();
    setIngresoHora(currentTime);
    console.log("Hora de ingreso registrada:", currentTime);
    setOpen(false); // Cierra el diálogo
  };

  const reloadPageAfterDelay = (delay: number) => {
    setTimeout(() => {
      window.location.reload();
    }, delay);
  };

  const formik = useFormik({
    initialValues: {
      Placa: "",
      Capacidad: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`http://localhost:3001/ver/ingreso`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            placa: values.Placa,
            capacidad: values.Capacidad,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json(); // Intenta obtener más información del error
          throw new Error(
            `Error al registrar el vehículo: ${errorData.message}`
          );
        }

        const data = await response.json();
        console.log("Vehículo registrado:", data);

        handleClose();
        resetForm();

        // Recargar la página después de 2 segundos (2000 ms)
        reloadPageAfterDelay(2000);
        Notify.success("Se registró el vehiculo exitosamente");
      } catch (error) {
        // Aquí se utiliza Notify.failure para mostrar el mensaje de error
        if (error instanceof Error) {
          Notify.failure(error.message || "Ocurrió un error inesperado");
        } else {
          Notify.failure("Ocurrió un error inesperado");
        }
      }
    },
  });

  return (
    <React.Fragment>
      <Button
        variant="contained"
        endIcon={<EventAvailableIcon />}
        onClick={handleClickOpen}
      >
        Confirmar hora
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Seguro que quiere registrar la hora de ingreso para este vehiculo?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Al darle click al boton "GUARDAR HORA DE INGRESO", esta registrando
            que el vehiculo ingresó a esta hora.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="error"
            variant="contained"
            endIcon={<CloseIcon />}
          >
            Cerrar
          </Button>
          <Button
            onClick={handleGuardarHora} // Se llama a la función que guarda la hora
            variant="contained"
            endIcon={<CheckIcon />}
          >
            Guardar hora de ingreso
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
