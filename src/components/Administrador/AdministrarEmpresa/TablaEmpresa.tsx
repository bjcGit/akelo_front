import React, { useEffect, useState } from "react";
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
import { useEmpresaStore } from "../../../store/actions/useEmpresaStore";
import { BotonRegistrarEmpresa } from "../AdministrarEmpresa/BotonRegistrarEmpresa";
import { ActualizarEmpresa } from "../AdministrarEmpresa/ActualizarEmpresa";
import { EliminarEmpresa } from "./EliminarEmpresa";

export const TablaEmpresa: React.FC = () => {
  const { empresas, fetchEmpresas, loading } = useEmpresaStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dataDisplayed = empresas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <BotonRegistrarEmpresa />
      <Paper elevation={16}>
        <TableContainer>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#31343e" }}>
              <TableRow>
                {["Razón Social", "NIT", "Usuario", "Acciones"].map((title) => (
                  <TableCell key={title} style={{ color: "white" }}>
                    <strong>{title}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Cargando...
                  </TableCell>
                </TableRow>
              ) : (
                dataDisplayed.map((empresa) => (
                  <TableRow key={empresa.id_empresa}>
                    <TableCell>{empresa.razon_social}</TableCell>
                    <TableCell>{empresa.nit}</TableCell>
                    <TableCell>{empresa.user?.nombre}</TableCell>
                    <TableCell>
                      {/* <ActualizarEmpresa empresa={empresa} /> */}
                      <EliminarEmpresa id_empresa={empresa.id_empresa} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={empresas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};
