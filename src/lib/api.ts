import { url } from "@/context/app.context";
import axios from "axios";

const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

export default api;