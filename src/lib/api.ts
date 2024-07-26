import config from "@/config/config";
import axios from "axios";

const api = axios.create({
  baseURL: config.url,
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