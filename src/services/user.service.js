import { apiClient } from "../helpers/api_helper";

const baseUrl = `users`;

export const Get = (params) => apiClient.fetch("users-roles", params);
export const Create = (params) => apiClient.post(baseUrl, params);
export const Delete = (params) => apiClient.delete(baseUrl, params);
export const Update = (params) => apiClient.put(baseUrl, params);
export const UpdateAvatar = (params) =>
  apiClient.post(baseUrl + "/change-avatar", params);
export const UpdatePassword = (params) =>
  apiClient.post(baseUrl + "/change-password", params);
