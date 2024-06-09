// axiosInstance.js
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const axiosInstance = axios.create({
    baseURL: 'https://ms.itmd-b1.com:5123/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = cookies.get('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
