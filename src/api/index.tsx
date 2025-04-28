import axios from "axios";

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

request.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accesToken"); // yoki tokenni qanday saqlayotgan bo‘lsangiz
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
  );


export {request}