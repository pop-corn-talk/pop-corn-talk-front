import { apiClient } from "./client";
const url = process.env.REACT_APP_API_URL_LOCAL;

export const loginApi = async (email, password) => {
  return apiClient.post("/users/login", { email, password });
};

export const signUpApi = async (email, password) => {
  return apiClient.post("/users/signup", { email, password });
};
