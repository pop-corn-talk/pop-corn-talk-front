import axios from "axios";
const url = process.env.REACT_APP_API_URL;
console.log("url", url);
export const apiClient = axios.create({
  baseURL: url,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});
