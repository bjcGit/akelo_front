import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Loading } from "notiflix/build/notiflix-loading-aio";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface EliminarUsuario {
  id: string;
  refreshTable: () => void;
}

export const EliminarUsuario: React.FC<EliminarUsuario> = ({
  id,
  refreshTable,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      Loading.dots(); // Mostrar indicador de carga
      const response = await axios.patch(
        `${baseUrl}/usuarios/desactivar/${id}`
      );

      if (response.status === 200) {
        Notify.success("Usuario eliminado correctamente");
        handleClose(); // Cerrar el diálogo al enviar
        refreshTable(); // Actualizar la tabla después de eliminar
      }
    } catch (error) {
      Notify.failure("Error al eliminar el usuario");
    } finally {
      Loading.remove(); // Eliminar el indicador de carga
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        <RemoveCircleOutlineIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"¿Desea eliminar el usuario?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Al darle click al boton "Eliminar" está borrando por completo este
            usuario y su informacion.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            endIcon={<CloseIcon />}
          >
            Cerrar
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            endIcon={<DoneOutlineIcon />}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
