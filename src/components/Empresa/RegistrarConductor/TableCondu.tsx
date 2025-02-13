import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ActualizarConductor } from "./ActualizarConductor";

interface Column {
  id: "ID" | "Nombre" | "Apellidos" | "Cedula" | "EPS" | "ARL" | "NivelARL";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "ID",
    label: "ID",
    minWidth: 150,
    format: (value: number) => value.toLocaleString("en-US"),
  },
  { id: "Nombre", label: "Nombre", minWidth: 150 },

  {
    id: "Apellidos",
    label: "Apellidos",
    minWidth: 150,
  },
  {
    id: "Cedula",
    label: "Cedula",
    minWidth: 150,
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "EPS",
    label: "EPS",
    minWidth: 150,
  },
  {
    id: "ARL",
    label: "ARL",
    minWidth: 150,
  },
  {
    id: "NivelARL",
    label: "Nvl.ARL",
    minWidth: 150,
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

interface Data {
  ID: number;
  Nombre: string;
  Apellidos: string;
  Cedula: number;
  EPS: string;
  ARL: string;
  NivelARL: number;
}

function createData(
  ID: number,
  Nombre: string,
  Apellidos: string,
  Cedula: number,
  EPS: string,
  ARL: string,
  NivelARL: number
): Data {
  return { ID, Nombre, Apellidos, Cedula, EPS, ARL, NivelARL };
}

const rows = [
  createData(
    1,
    "Anderson Santiago",
    "Mendoza Muñoz",
    1108642538,
    "Comfenalco",
    "NS",
    5
  ),
  createData(2, "erick", "Leiva", 64965, "Coosalud", "NS", 5),
  createData(3, "Michael Steven", "Correa", 65648484, "Comfenalco", "NS", 5),
  createData(4, "xxxx xxxx", "xxxx xxxx", 6456545, "xxxx", "NS", 5),
  createData(5, "zzzz zzzz", "zzz zzz", 1321354, "zzzzz", "NS", 5),
  createData(6, "vvvv vvv", "vvv vvv", 32154986, "vvvv", "NS", 5),
];

export const TableCondu = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={8}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre/s</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Cedula</TableCell>
              <TableCell>EPS</TableCell>
              <TableCell>ARL</TableCell>
              <TableCell>Nivel de riesgo de ARL</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.Nombre}
                  >
                    <TableCell>"""</TableCell>
                    <TableCell>"""</TableCell>
                    <TableCell>"""</TableCell>
                    <TableCell>"""</TableCell>
                    <TableCell>"""</TableCell>
                    <TableCell>"""</TableCell>
                    <TableCell>"""</TableCell>
                    <TableCell>"""</TableCell>
                    <TableCell>
                      <ActualizarConductor />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
