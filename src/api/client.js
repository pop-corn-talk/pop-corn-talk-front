import axios from "axios";

const url = process.env.REACT_APP_API_URL_SERVER;
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

imageClient.interceptors.response.use(
  (response) => {
    console.log("response.headers");
    console.log(response.headers);
    if (response.headers.authorization) {
      console.log("새로운 토큰 받기");
      console.log(response.headers.authorization);
      let newToken = response.headers.authorization;
      if (newToken && newToken.startsWith("Bearer")) {
        newToken = newToken.substring(7);
        updateToken(newToken);
        //alert("새로운 토큰이 발급 되었습니다, ")
        //
        //window.location.reload()
        let originalRequest = response.config;
        let originalRequestString = JSON.stringify(originalRequest);
        console.log(originalRequestString.includes());
        if (!originalRequestString.includes("login")) {
          return apiClient(originalRequest);
        }
      }
    }
    console.log(response);
    return response;
  },
  (error) => {
    console.log("axios response 오류");
  }
);

export const postGetClient = axios.create({
  baseURL: url,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Expose-Headers": "*",
  },
});

export const postPostClient = axios.create({
  baseURL: url,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Expose-Headers": "*",
  },
});
postPostClient.interceptors.request.use((config) => {
  console.log("config", config.url);
  const accessToken = localStorage.getItem("access_token");

  if (accessToken && config.headers) {
    config.headers["authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

export const commentGetClient = axios.create({
  baseURL: url,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Expose-Headers": "*",
  },
});
export const commentPostClient = axios.create({
  baseURL: url,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Expose-Headers": "*",
  },
});
commentPostClient.interceptors.request.use((config) => {
  console.log("config", config.url);
  const accessToken = localStorage.getItem("access_token");

  if (accessToken && config.headers) {
    config.headers["authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});
commentPostClient.interceptors.response.use(
  (response) => {
    console.log("response.headers");
    console.log(response.headers);
    if (response.headers.authorization) {
      console.log("새로운 토큰 받기");
      console.log(response.headers.authorization);
      let newToken = response.headers.authorization;
      if (newToken && newToken.startsWith("Bearer")) {
        newToken = newToken.substring(7);
        updateToken(newToken);
        //alert("새로운 토큰이 발급 되었습니다, ")
        //
        //window.location.reload()
        let originalRequest = response.config;
        let originalRequestString = JSON.stringify(originalRequest);
        console.log(originalRequestString.includes());
        if (!originalRequestString.includes("login")) {
          return apiClient(originalRequest);
        }
      }
    }
    console.log(response);
    return response;
  },
  (error) => {
    console.log("axios response 오류");
  }
);
postPostClient.interceptors.response.use(
  (response) => {
    console.log("response.headers");
    console.log(response.headers);
    if (response.headers.authorization) {
      console.log("새로운 토큰 받기");
      console.log(response.headers.authorization);
      let newToken = response.headers.authorization;
      if (newToken && newToken.startsWith("Bearer")) {
        newToken = newToken.substring(7);
        updateToken(newToken);
        //alert("새로운 토큰이 발급 되었습니다, ")
        //
        //window.location.reload()
        let originalRequest = response.config;
        let originalRequestString = JSON.stringify(originalRequest);
        console.log(originalRequestString.includes());
        if (!originalRequestString.includes("login")) {
          return apiClient(originalRequest);
        }
      }
    }
    console.log(response);
    return response;
  },
  (error) => {
    console.log("axios response 오류");
  }
);
// 토큰 재발급
const updateToken = (newToken) => {
  localStorage.setItem("access_token", newToken); // Assuming JWT is stored in localStorage
};

// 토큰 재발급 메소드
apiClient.interceptors.response.use(
  (response) => {
    console.log("response.headers");
    console.log(response.headers);
    if (response.headers.authorization) {
      console.log("새로운 토큰 받기");
      console.log(response.headers.authorization);
      let newToken = response.headers.authorization;
      if (newToken && newToken.startsWith("Bearer")) {
        newToken = newToken.substring(7);
        updateToken(newToken);
        //alert("새로운 토큰이 발급 되었습니다, ")
        //
        //window.location.reload()
        let originalRequest = response.config;
        let originalRequestString = JSON.stringify(originalRequest);
        console.log(originalRequestString.includes());
        if (!originalRequestString.includes("login")) {
          return apiClient(originalRequest);
        }
      }
    }
    console.log(response);
    return response;
  },
  (error) => {
    console.log("axios response 오류");
  }
);
