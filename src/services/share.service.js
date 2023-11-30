import { apiClient } from "../helpers/api_helper";

const baseUrl = `files/upload`;

export const Upload = (files) => {
  let fileToUpload = files[0];
  const formData = new FormData();
  formData.append("file", fileToUpload, fileToUpload.name);
  return apiClient.post(baseUrl, formData).then((res) => {
    return { imagePath: import.meta.env.VITE_API_URL + "/" + res.imagePath };
  });
};
