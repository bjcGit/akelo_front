import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import InputsDinamicos from "./InputsDinamicos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export interface FormData {
  vehiculo: string;
  conductor: string;
  fecha: string;
  cantidad: string;
  campoExtra: Array<{
    nuevoCampo1: string;
    nuevoCampo2: string;
  }>;
}

interface Vehiculo {
  placa: string;
}

const conductor = [
  "John Smith",
  "Emma Wilson",
  "Michael Brown",
  "Sarah Davis",
  "James Johnson",
];

//continuar con la migracion de funcioninputs a cartasolicitud en esta parte
export default function FormCard() {
  const [formData, setFormData] = useState<FormData>({
    vehiculo: "",
    conductor: "",
    fecha: "",
    cantidad: "",
    campoExtra: [{ nuevoCampo1: "", nuevoCampo2: "" }], // comenzar con dos inputs generados
  });

  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);

  // Lógica para obtener vehículos (migrada de FuncionInputs)
  useEffect(() => {
    const buscarVehiculos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/vehiculo`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const vehiculosFiltrados: Vehiculo[] = response.data.map(
          (vehiculo: any) => ({
            placa: vehiculo.placa,
          })
        );

        setVehiculos(vehiculosFiltrados);
      } catch (error) {
        console.error("Error al obtener los vehículos:", error);
      }
    };

    buscarVehiculos();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleExtraFieldChange = (
    index: number,
    fieldName: string,
    value: string
  ) => {
    setFormData((prev) => {
      const nuevoCampoExtra = [...prev.campoExtra];
      nuevoCampoExtra[index] = {
        ...nuevoCampoExtra[index],
        [fieldName]: value,
      };
      return {
        ...prev,
        campoExtra: nuevoCampoExtra,
      };
    });
  };

  const agregarCampoExtra = () => {
    setFormData((prev) => ({
      ...prev,
      campoExtra: [...prev.campoExtra, { nuevoCampo1: "", nuevoCampo2: "" }],
    }));
  };

  const quitarCampoExtra = (index: number) => {
    if (formData.campoExtra.length > 1) {
      // Prevent removing the last pair
      setFormData((prev) => ({
        ...prev,
        campoExtra: prev.campoExtra.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <Card
      sx={{
        maxWidth: 800,

        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <Typography
            variant="h5"
            component="h2"
            mb={3}
            sx={{
              fontWeight: 600,
            }}
          >
            Crear Solicitud
          </Typography>
        </div>

        <Grid
          container
          spacing={3}
          component="form"
          sx={{
            mb: 4,
          }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Seleccionar vehiculo"
              name="vehiculo"
              value={formData.vehiculo}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              {vehiculos.map((vehiculo) => (
                <MenuItem key={vehiculo.placa} value={vehiculo.placa}>
                  {vehiculo.placa}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Seleccionar conductor"
              name="conductor"
              value={formData.conductor}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              {conductor.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Seleccionar fecha"
              name="fecha"
              type="date"
              value={formData.fecha}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Cantidad total"
              name="cantidad"
              type="number"
              value={formData.cantidad}
              onChange={handleChange}
              fullWidth
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Grid>

          <InputsDinamicos
            campoExtra={formData.campoExtra}
            onFieldChange={handleExtraFieldChange}
            onRemove={quitarCampoExtra}
          />
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={agregarCampoExtra}
              fullWidth
              sx={{
                mb: 1,
              }}
              endIcon={<AddCircleOutlineIcon />}
            >
              Añadir procedencia
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              color="success"
              sx={{
                py: 1.5,
              }}
            >
              Guardar solicitud
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
