import axios from "axios";

// const BASE_URL = "https://www.api.smrtnews.org/";
// const BASE_URL = "https://smartnews-backend.onrender.com";
const BASE_URL = "http://localhost:5000";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
