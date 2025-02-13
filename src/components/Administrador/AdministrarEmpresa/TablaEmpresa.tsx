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
import { BotonRegistrarEmpresa } from "../AdministrarEmpresa/BotonRegistrarEmpresa";
import { ActualizarEmpresa } from "../AdministrarEmpresa/ActualizarEmpresa";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Report } from "notiflix/build/notiflix-report-aio";
import { Empresa } from "../../../interfaces/Empresas";
import { EliminarEmpresa } from "./EliminarEmpresa";

const baseUrl = import.meta.env.VITE_API_BASE_URL;


export const TablaEmpresa: React.FC = () => {
  const [data, setData] = useState<Empresa[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const ObtenerEmpresa = async () => {
    try {
      Loading.dots();
      const response = await axios.get(`${baseUrl}/empresas`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const empresasFiltradas: Empresa[] = response.data.map(
        (empresa: Empresa) => ({
          id_empresa: empresa.id_empresa,
          razon_social: empresa.razon_social,
          nit: empresa.nit,
          user: empresa.user
        })
      );

      setData(empresasFiltradas);
      Loading.remove();
    } catch (error) {
      Loading.remove();
      Report.failure("Failed to fetch", `${error}`, "Aceptar");
    }
  };

  useEffect(() => {
    ObtenerEmpresa();
  }, []);

  const refreshTable = () => {
    ObtenerEmpresa();
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
      <BotonRegistrarEmpresa refreshTable={refreshTable} />
      <Paper elevation={16}>
        <TableContainer>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#31343e" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>
                  <strong>Razon social</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>NIT</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>Usuario</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>Acciones</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataDisplayed.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.razon_social}</TableCell>
                  <TableCell>{data.nit}</TableCell>
                  <TableCell>{data.user.nombre}</TableCell>
                  <TableCell>
                    <ActualizarEmpresa
                      id_empresa={data.id_empresa}
                      razon_social={data.razon_social}
                      nit={data.nit}
                      direccion={data.direccion}
                      barrio={data.barrio}
                      comuna={data.comuna}
                      ciudad={data.ciudad}
                      departamento={data.departamento}
                      latitud={data.latitud}
                      longitud={data.longitud}
                      fecha_Creacion={data.fecha_Creacion}
                      estado={data.estado}
                      user={data.user}
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
