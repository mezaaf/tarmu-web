import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
