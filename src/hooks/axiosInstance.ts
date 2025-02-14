import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
});

// 🟢 Interceptor de solicitud: Agrega token solo si no es el login
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // ✅ Evitamos enviar el token en el login
    if (token && !config.url?.includes("/auth/login")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🟢 Interceptor de respuesta: Manejo automático de errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la respuesta:", error.response?.data || error);
    let errorMessage = "Ocurrió un error inesperado";

    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        errorMessage = data?.msg || "No autorizado. Inicia sesión nuevamente.";
      } else if (status === 403) {
        errorMessage = "No tienes permisos para realizar esta acción.";
      } else {
        errorMessage = data?.message || errorMessage;
      }
    }

    Notify.failure(errorMessage);
    return Promise.reject(error);
  }
);

// 🟢 Funciones reutilizables para las peticiones
export const api = {
  get: async <T>(url: string) => {
    const response = await axiosInstance.get<T>(url);
    return response.data;
  },

  post: async <T>(url: string, data?: any) => {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
  },

  put: async <T>(url: string, data?: any) => {
    const response = await axiosInstance.put<T>(url, data);
    return response.data;
  },

  delete: async <T>(url: string) => {
    const response = await axiosInstance.delete<T>(url);
    return response.data;
  },
};
