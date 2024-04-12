import { apiClient } from "./client";

export const getOtherUserInfo = async (userId) => {
  return await apiClient.get(`http://localhost:8080/users/${userId}/info`);
};

export const getUserInfo = async () => {
  return await apiClient.get(`http://localhost:8080/users/info`);
};

export const getUserInfoPage = async (pageNum) => {
  return await apiClient.get(`http://localhost:8080/users?pageNo=${pageNum}&pageSize=4`);
};
