import axios from 'axios';
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYjdkMzA3NC04MmVjLTQwMmYtOTcxYS1jN2M1Mjg4MzI1Y2IiLCJJZCI6IjU0ZWM5OWI4LTQ1ZWItNGVlMi1iODBjLWFmZWUwYTk2ZmViNyIsIkNvbXBhbnlJZCI6IjE5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiT3duZXIiLCJleHAiOjE3MTcxNzI5OTMsImlzcyI6IioiLCJhdWQiOiIqIn0.9fuXlJcehzcxHk4-qe6Jjt8LZdwfr1dhsf5t3NluWQ0";
const axiosInstance = axios.create({
    baseURL: 'https://ms.itmd-b1.com:5123/api/',
    headers: {
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${token}`
    },
});

export default axiosInstance;
