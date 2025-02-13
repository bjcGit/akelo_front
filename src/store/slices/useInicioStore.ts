import { create } from "zustand";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface InicioState {
  data: any; // Ajusta el tipo de dato según la estructura de la API
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useInicioStore = create<InicioState>((set) => ({
  data: null,
  loading: false,
  error: null,
  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${baseUrl}/empresas`);
      set({ data: response.data, loading: false });
    } catch (error) {
      set({ error: "Error al obtener datos", loading: false });
    }
  },
}));
