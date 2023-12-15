import { apiClient } from '../helpers/api_helper';

const baseUrl = `perms`;

export const Get = (params) => apiClient.fetch(baseUrl, params);
export const Create = (params) => apiClient.post(baseUrl, params);
export const Update = (params) => apiClient.put(baseUrl, params);
export const Delete = (params) => apiClient.post(baseUrl, params);
