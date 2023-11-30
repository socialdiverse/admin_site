import { apiClient } from "../helpers/api_helper";

const resource  = 'auth';

export const Login = (data) => apiClient.post(`${resource}/login`, data);

export const LogoutApi = () => apiClient.fetch(`${resource}/logout`);

export const Register = (data) => apiClient.post(`${resource}/register`, data);

