import { apiClient } from "../helpers/api_helper";

const baseUrl = `roles`;

export const Get = (params) => apiClient.fetch(baseUrl, params);
export const Create = (params) => apiClient.post(baseUrl, params);
export const UpdateRolePerms = (params) => apiClient.put("/role-perms", params);
export const Update = (params) => apiClient.put(baseUrl, params);
export const Delete = (params) => apiClient.delete(baseUrl, params);
