import { apiClient } from "./client";
const url = process.env.REACT_APP_API_URL_LOCAL;
export const getProducts = async () => {
  return await apiClient.get(`/products`);
};

export const order = async (productId) => {
  return await apiClient.post(`/exchanges/products/${productId}`);
};
