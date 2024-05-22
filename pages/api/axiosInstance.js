import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://ms.itmd-b1.com:5123',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
