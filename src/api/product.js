import { apiClient } from "./client";

export const createProduct = async () => {
  return apiClient.post("/products");
};

export const getProducts = async (todo) => {
  return apiClient.get("/products", { todo });
};

export const updateProduct = async (id, todo, isCompleted) => {
  return apiClient.put(`/products/${id}`, { todo, isCompleted });
};

export const deleteProduct = async (id) => {
  return apiClient.delete(`/products/${id}`);
};
