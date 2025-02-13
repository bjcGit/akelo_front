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
import { ButtonRgvactor } from "./ButtonRgvactor";
import { ActualizarVactor } from "./ActualizarVactor";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface Vehiculo {
  placa: string;
  capacidad: string;
  id: string;
  refreshTable: () => void;
}

export const TableVehiculo: React.FC = () => {
  const [data, setData] = useState<Vehiculo[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchVehiculos = async () => {
    try {
      Loading.dots();
      const response = await axios.get(`${baseUrl}/vehiculo`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const vehiculosFiltrados: Vehiculo[] = response.data.map(
        (vehiculo: any) => ({
          id: vehiculo.id,
          placa: vehiculo.placa,
          capacidad: vehiculo.capacidad,
        })
      );

      setData(vehiculosFiltrados);
      Loading.remove();
    } catch (error) {
      Loading.remove();
      Notify.failure(`${error}`);
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const refreshTable = () => {
    fetchVehiculos();
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
      <ButtonRgvactor refreshTable={refreshTable} />
      <Paper elevation={16}>
        <TableContainer>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#555454" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>
                  <strong>Placa</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>Capacidad</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>Acciones</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataDisplayed.map((vehiculo, index) => (
                <TableRow key={index}>
                  <TableCell>{vehiculo.placa}</TableCell>
                  <TableCell>{vehiculo.capacidad}</TableCell>
                  <TableCell>
                    <ActualizarVactor
                      placa={vehiculo.placa}
                      capacidad={vehiculo.capacidad}
                      id={vehiculo.id}
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
