import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "ID" | "Fecha" | "Vehiculo" | "Conductor" | "Metros3";
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
  { id: "Fecha", label: "Fecha", minWidth: 150 },

  {
    id: "Vehiculo",
    label: "Vehiculo",
    minWidth: 150,
  },
  {
    id: "Conductor",
    label: "Conductor",
    minWidth: 150,
  },
  {
    id: "Metros3",
    label: "Metros cubicos",
    minWidth: 150,
  },
];

interface Data {
  ID: number;
  Fecha: string;
  Vehiculo: string;
  Conductor: string;
  Metros3: string;
}

function createData(
  ID: number,
  Fecha: string,
  Vehiculo: string,
  Conductor: string,
  Metros3: string
): Data {
  return { ID, Fecha, Vehiculo, Conductor, Metros3 };
}

const rows = [
  createData(1, "Anderson Santiago", "Mendoza Muñoz", "", "Comfenalco"),
  createData(2, "erick", "Leiva", "", "Coosalud"),
  createData(3, "Michael Steven", "Correa", "", "Comfenalco"),
  createData(4, "xxxx xxxx", "xxxx xxxx", "", "xxxx"),
  createData(5, "zzzz zzzz", "zzz zzz", "", "zzzzz"),
  createData(6, "vvvv vvv", "vvv vvv", "", "vvvv"),
];

export const TablaSolicitud = () => {
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
              <TableCell>Fecha</TableCell>
              <TableCell>Vehiculo</TableCell>
              <TableCell>Conductor</TableCell>
              <TableCell>Metros Cubicos</TableCell>

              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.Fecha}>
                    <TableCell>"""</TableCell>
                    <TableCell>"""</TableCell>
                    <TableCell>"""</TableCell>
                    <TableCell>"""</TableCell>
                    <TableCell>"""</TableCell>

                    <TableCell></TableCell>
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
