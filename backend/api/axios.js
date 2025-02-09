import axios from "axios";

const BASE_URL = process.env.BASE_URL;
const NEWS_URL = process.env.NEWS_API_URL;
console.log(NEWS_URL);
export const axiosNewsClient = axios.create({
  baseURL: NEWS_URL,
  headers: {
    Authorization: process.env.NEWS_API_KEY,
  },
});

export default axios.create({
  baseURL: BASE_URL,
});
