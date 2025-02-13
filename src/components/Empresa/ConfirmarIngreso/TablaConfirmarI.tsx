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

//import { ActualizarVactor } from "./ActualizarVactor";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Report } from "notiflix/build/notiflix-report-aio";
import { CheckIngreso } from "./CheckIngreso";

interface Vehiculo {
  placa: string;
  capacidad: string;
}

const TablaConfirmarI: React.FC = () => {
  const [data, setData] = useState<Vehiculo[]>([]);
  const [page, setPage] = useState(0); //pagina actual
  const [rowsPerPage, setRowsPerPage] = useState(5); //filas por pagina

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        Loading.dots();
        const response = await fetch(`http://localhost:3001/ver/vehiculo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        console.log(data, "esta es la infomracion");

        // Extraer solo los campos necesarios: placa y capacidad
        const vehiculosFiltrados: Vehiculo[] = data.map((vehiculo: any) => ({
          placa: vehiculo.placa,
          capacidad: vehiculo.capacidad,
        }));

        setData(vehiculosFiltrados);
        Loading.remove();
      } catch (error) {
        Loading.remove();
        Report.failure("Failed to fetch", `${error}`, "Aceptar");
      }
    };

    fetchVehiculos();
  }, []);

  // Controlador para cambiar la página
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Controlador para cambiar la cantidad de filas por página
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reiniciar a la primera página cuando se cambien las filas por página
  };

  // Calcular las filas que se deben mostrar en la página actual
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const dataDisplayed = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper elevation={16}>
      <TableContainer>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#dddddd" }}>
            <TableRow>
              <TableCell>
                <strong>Empresa</strong>
              </TableCell>
              <TableCell>
                <strong>Fecha</strong>
              </TableCell>
              <TableCell>
                <strong>Placa</strong>
              </TableCell>
              <TableCell>
                <strong>Conductor</strong>
              </TableCell>
              <TableCell>
                <strong>Capacidad</strong>
              </TableCell>
              <TableCell>
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mostrar solo las filas correspondientes a la página actual */}
            {dataDisplayed.map((vehiculo, index) => (
              <TableRow key={index}>
                <TableCell>{vehiculo.placa}</TableCell>
                <TableCell>{vehiculo.capacidad}</TableCell>
                <TableCell>{vehiculo.capacidad}</TableCell>
                <TableCell>{vehiculo.capacidad}</TableCell>
                <TableCell>{vehiculo.capacidad}</TableCell>
                <TableCell>
                  <CheckIngreso />
                </TableCell>
                {/*<TableCell><ActualizarVactor /></TableCell>*/}
              </TableRow>
            ))}

            {/* Rellenar filas vacías para mantener la estructura de la tabla */}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]} // Opciones de filas por página
        component="div"
        count={data.length} // Total de filas
        rowsPerPage={rowsPerPage} // Filas por página actual
        page={page} // Página actual
        onPageChange={handleChangePage} // Controlador para cambiar de página
        onRowsPerPageChange={handleChangeRowsPerPage} // Controlador para cambiar filas por página
      />
    </Paper>
  );
};

export default TablaConfirmarI;
