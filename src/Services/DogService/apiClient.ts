import axios from 'axios';
import type { AxiosInstance } from 'axios';

const DOG_API_URL = import.meta.env.VITE_DOG_API_URL;
const DOG_API_KEY = import.meta.env.VITE_DOG_API_KEY;

export const apiClient: AxiosInstance = axios.create({
  baseURL: DOG_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': DOG_API_KEY,
  },
});
