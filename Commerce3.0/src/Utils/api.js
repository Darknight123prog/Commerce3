// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "/api" // uses Vite proxy in development
    : import.meta.env.VITE_BACKEND_URL, // production backend
  withCredentials: true, // important for cookies (JWT)
});

export default api;
