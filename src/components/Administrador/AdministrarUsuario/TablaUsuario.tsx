import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { BotonRegistrarUsuario } from "../AdministrarUsuario/BotonRegistrarUsuario";
import { ActualizarUsuario } from "../AdministrarUsuario/ActualizarUsuario";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface Empresa {
  nombre: string;
  id: string;
  refreshTable: () => void;
}

interface Rol {
  nombre: string;
  id: string;
  refreshTable: () => void;
}

interface Usuario {
  nombre: string;
  cedula: number;
  correo: string;
  empresa: Empresa;
  rol: Rol;
  id: string;
  refreshTable: () => void;
}

export const TablaUsuario: React.FC = () => {
  const [data, setData] = useState<Usuario[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const BuscarUsuario = async () => {
    try {
      Loading.dots();
      const response = await axios.get(`${baseUrl}/usuarios/obtenerusuarios`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const usuariosFiltrados: Usuario[] = response.data.map(
        (usuario: any) => ({
          id: usuario.id,
          nombre: usuario.nombre,
          cedula: usuario.cedula,
          correo: usuario.correo,
          empresa: usuario.empresa,
          rol: usuario.rol,
        })
      );

      setData(usuariosFiltrados);
      Loading.remove();
    } catch (error) {
      Loading.remove();
      Notify.failure(`${error}`);
    }
  };

  useEffect(() => {
    BuscarUsuario();
  }, []);

  const refreshTable = () => {
    BuscarUsuario();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const dataDisplayed = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      {<BotonRegistrarUsuario refreshTable={refreshTable} />}
      <Paper elevation={16}>
        <TableContainer>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#31343e" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>
                  <strong>Nombre</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>Cedula</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>Correo</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>Empresa</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>Rol</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>Acciones</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataDisplayed.map((usuario, index) => (
                <TableRow key={index}>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.cedula}</TableCell>
                  <TableCell>{usuario.correo}</TableCell>
                  <TableCell>{usuario.empresa.nombre}</TableCell>
                  <TableCell>{usuario.rol.nombre}</TableCell>
                  <TableCell>
                    <ActualizarUsuario
                      id={usuario.id}
                      nombre={usuario.nombre}
                      cedula={usuario.cedula}
                      correo={usuario.correo}
                      empresa={usuario.empresa.nombre}
                      rol={usuario.rol.nombre}
                      refreshTable={refreshTable}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};
