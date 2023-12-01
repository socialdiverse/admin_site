import { apiClient } from "../helpers/api_helper";

const baseUrl = `options`;

export const Get = (params) => apiClient.fetch(baseUrl, params);
