import { apiClient } from "./client";
const url = process.env.REACT_APP_API_URL_LOCAL;

export const getOtherUserInfo = async (userId) => {
  return await apiClient.get(`/users/${userId}/info`);
};

export const getUserInfo = async () => {
  return await apiClient.get(`/users/info`);
};

export const getUserInfoPage = async (pageNum) => {
  return await apiClient.get(`/users?pageNo=${pageNum}&pageSize=4`);
};
