import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:3000/',
  timeout: 3000,
});

export default axiosInstance;
