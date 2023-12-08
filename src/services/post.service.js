import { apiClient } from '../helpers/api_helper';

const baseUrl = `posts`;

export const Get = (params) => apiClient.fetch(baseUrl, params);
export const Create = (params) => apiClient.post(baseUrl, params);
export const Delete = (params) => apiClient.delete(baseUrl, params);
export const Update = (params, id) => apiClient.put(baseUrl + `?id=${id}`, params);