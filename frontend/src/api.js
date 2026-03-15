import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const encryptFile = async (file, password, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('password', password);

  const response = await axios.post(`${API_URL}/encrypt`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob', // To download the file later
    onUploadProgress,
  });

  return response.data;
};

export const decryptFile = async (file, password, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('password', password);

  const response = await axios.post(`${API_URL}/decrypt`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob', // To download the file later
    onUploadProgress,
  });

  return response.data;
};
