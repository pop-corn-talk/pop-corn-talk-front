import { apiClient } from "./client";

export const getProducts = async () => {
    return await apiClient.get(`/products`);
}

export const order = async (productId) => {
    return await apiClient.post(`/exchanges/products/${productId}`);
}