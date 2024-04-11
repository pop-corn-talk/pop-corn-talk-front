import { apiClient } from "./client";

export const loginApi = async (email, password) => {
  return apiClient.post("/users/login", { email, password }, null);
};

export const signUpApi = async (email, password) => {
  return apiClient.post("/users/signup", { email, password });
};
