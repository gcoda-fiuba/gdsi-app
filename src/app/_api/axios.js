import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.response.use(response => response, error => {
  const errorMsg = error.response?.data?.message || 'Error de comunicación con la API';
  throw new Error(errorMsg);
});

export default instance;