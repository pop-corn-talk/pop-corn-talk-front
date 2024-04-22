import { apiClient } from "./client";

export const getOtherUserInfo = async (userId) => {
  return await apiClient.get(`/users/${userId}/info`);
};

export const getUserInfo = async () => {
  return await apiClient.get(`/users/info`);
};

export const getUserInfoPage = async (pageNum) => {
  return await apiClient.get(`/users?pageNo=${pageNum}&pageSize=4`);
};
