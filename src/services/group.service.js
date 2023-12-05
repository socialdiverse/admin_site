import { apiClient } from "../helpers/api_helper";

const baseUrl = `groups`;

export const Get = (params) => apiClient.fetch(baseUrl, params);
export const Delete = (params) => apiClient.delete(baseUrl, params);
export const Update = (params) => apiClient.put(baseUrl, params);
