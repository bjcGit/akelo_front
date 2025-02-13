import React from "react";
import { Grid, TextField, IconButton, Tooltip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface InputsDinamicosProps {
  campoExtra: Array<{
    nuevoCampo1: string;
    nuevoCampo2: string;
  }>;
  onFieldChange: (index: number, fieldName: string, value: string) => void;
  onRemove: (index: number) => void;
}

export default function InputsDinamicos({
  campoExtra,
  onFieldChange,
  onRemove,
}: InputsDinamicosProps) {
  return (
    <>
      {campoExtra.map((fields, index) => (
        <React.Fragment key={index}>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Lugar de procedencia"
              value={fields.nuevoCampo1}
              onChange={(e) =>
                onFieldChange(index, "nuevoCampo1", e.target.value)
              }
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Cantidad m3"
              type="number"
              value={fields.nuevoCampo2}
              onChange={(e) =>
                onFieldChange(index, "nuevoCampo2", e.target.value)
              }
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Tooltip
              title={
                campoExtra.length === 1
                  ? "Debe haber por lo menos una procedencia"
                  : "Eliminar Campo"
              }
            >
              <span>
                <IconButton
                  onClick={() => onRemove(index)}
                  disabled={campoExtra.length === 1}
                  sx={{
                    color: campoExtra.length === 1 ? "#bdbdbd" : "#ef5350",
                    "&:hover": {
                      backgroundColor:
                        campoExtra.length === 1
                          ? "transparent"
                          : "rgba(239, 83, 80, 0.04)",
                    },
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Grid>
        </React.Fragment>
      ))}
    </>
  );
}
