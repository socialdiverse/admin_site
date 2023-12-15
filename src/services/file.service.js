import { apiClient } from "../helpers/api_helper";

const baseUrl = `upload`;

export const PostFile = (file) => apiClient.postFile(baseUrl, file);
