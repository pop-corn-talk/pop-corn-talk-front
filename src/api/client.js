import axios from "axios";
import { useNavigate } from "react-router";

const url = process.env.REACT_APP_API_URL;
console.log("url", url);
export const apiClient = axios.create({
  baseURL: url,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Expose-Headers": "*",
  },
});

apiClient.interceptors.request.use((config) => {
  console.log("config", config.url);
  const accessToken = localStorage.getItem("access_token");

  if (accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});



/////
const updateToken = (newToken) => {
  localStorage.setItem('access_token', newToken); // Assuming JWT is stored in localStorage
};

apiClient.interceptors.response.use((response) => {
  console.log("response.headers");
    console.log(response.headers);
    if (response.headers.authorization) {
      console.log("새로운 토큰 받기")
      console.log(response.headers.authorization)
      let newToken = response.headers.authorization;
      if (newToken && newToken.startsWith('Bearer')) {
        newToken = newToken.substring(7)
        updateToken(newToken);
        window.location.reload()
      }
    }
    console.log(response)
    return response;
  },
  (error) => {
    console.log("axios response 오류")
  }
);