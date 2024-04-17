import axios from "axios";

const url = process.env.REACT_APP_API_URL_LOCAL;
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
    config.headers["authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

export const imageClient = axios.create({
  baseURL: url,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Expose-Headers": "*",
  },
});

imageClient.interceptors.request.use((config) => {
  console.log("config", config.url);
  const accessToken = localStorage.getItem("access_token");

  if (accessToken && config.headers) {
    config.headers["authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

export const postClient = axios.create({
  baseURL: url,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Expose-Headers": "*",
  },
});

// 토큰 재발급
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
