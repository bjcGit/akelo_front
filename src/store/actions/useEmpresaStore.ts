import { create } from "zustand";
import { api } from "../../hooks/axiosInstance";
import { User } from "../../interfaces/Empresas";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface Empresa {
  id_empresa?: string;
  razon_social: string;
  nit: string;
  direccion: string;
  barrio: string;
  comuna: string;
  ciudad: string;
  departamento: string;
  latitud?: string;
  longitud?: string;
  user?: User;
}

interface EmpresaState {
  empresas: Empresa[];
  loading: boolean;
  error: string | null;
  fetchEmpresas: () => Promise<void>;
  addEmpresa: (empresa: Empresa) => Promise<void>;
  updateEmpresa: (empresa: Empresa) => Promise<void>;
  deleteEmpresa: (id_empresa: string) => Promise<void>;
}

export const useEmpresaStore = create<EmpresaState>((set, get) => ({
  empresas: [],
  loading: false,
  error: null,

  // 🔹 Obtener todas las empresas
  fetchEmpresas: async () => {
    set({ loading: true, error: null });
    try {
      const data = await api.get<Empresa[]>(`${baseUrl}/empresas`);
      set({ empresas: data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error al obtener empresas", loading: false });
    }
  },

  // 🔹 Agregar empresa
  addEmpresa: async (empresa) => {
    try {
      await api.post(`${baseUrl}/empresas`, empresa);
      await get().fetchEmpresas(); // 🔄 Recargar datos desde la API
    } catch (error: any) {
      set({ error: error.response?.data || "Error al agregar empresa" });
    }
  },

  // 🔹 Actualizar empresa
  updateEmpresa: async (empresa) => {
    try {
      await api.put(`${baseUrl}/empresas/${empresa.id_empresa}`, empresa);
      await get().fetchEmpresas(); // 🔄 Recargar datos desde la API
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error al actualizar empresa" });
    }
  },

  // 🔹 Eliminar empresa
  deleteEmpresa: async (id_empresa) => {
    try {
      await api.delete(`${baseUrl}/empresas/${id_empresa}`);
      await get().fetchEmpresas(); // 🔄 Recargar datos desde la API
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error al eliminar empresa" });
    }
  },
}));
