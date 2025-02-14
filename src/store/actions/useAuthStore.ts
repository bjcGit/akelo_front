import { create } from "zustand";
import { api } from "../../hooks/axiosInstance";


interface User {
  id: string;
  nombre: string;
  rol: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (correo: string, password: string) => Promise<void>;
  logout: () => void;
  revalidateToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),

  login: async (correo, password) => {
    try {
      const response = await api.post<{ token: string; user: User }>("/auth/login", { correo, password });
      const { token, user } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      set({ user, token, isAuthenticated: true });
    } catch (error: any) {
      throw new Error(error.message || "Error en la autenticación");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({ user: null, token: null, isAuthenticated: false });
  },

  revalidateToken: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token disponible");

      const { user } = await api.get<{ user: User }>("/auth/revalidate");

      localStorage.setItem("user", JSON.stringify(user));

      set({ user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
}));
