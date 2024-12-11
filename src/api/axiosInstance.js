import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.95:3000/',
  timeout: 3000,
});

export default axiosInstance;
