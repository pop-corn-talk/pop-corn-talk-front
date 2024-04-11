import { apiClient } from "./client";

export const getUserInfo = async (userId) => {
    return await apiClient.get(`http://localhost:8080/users/${userId}/info`);
}