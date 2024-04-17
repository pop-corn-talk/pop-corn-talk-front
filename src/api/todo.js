import { apiClient } from "./client";
const url = process.env.REACT_APP_API_URL;

export const getTodoApi = async () => {
  return apiClient.get("/todos");
};

export const createTodoApi = async (todo) => {
  return apiClient.post("/todos", { todo });
};

export const updateTodoApi = async (id, todo, isCompleted) => {
  return apiClient.put(`/todos/${id}`, { todo, isCompleted });
};

export const deleteTodoApi = async (id) => {
  return apiClient.delete(`/todos/${id}`);
};
