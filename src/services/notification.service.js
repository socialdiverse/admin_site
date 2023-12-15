import { apiClient } from '../helpers/api_helper';

const baseUrl = `notifications`;

export const GetAll = (params) => apiClient.fetch(baseUrl, params);
