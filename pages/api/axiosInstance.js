import axios from 'axios';
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NzhiOGM5Zi02NmM3LTRhNjYtODdjMS03YWM2ZmUwMmRiNjciLCJJZCI6IjU0ZWM5OWI4LTQ1ZWItNGVlMi1iODBjLWFmZWUwYTk2ZmViNyIsIkNvbXBhbnlJZCI6IjE5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiT3duZXIiLCJleHAiOjE3MTY0NzY3NTIsImlzcyI6IioiLCJhdWQiOiIqIn0.4_u0EV45oa7wQF2xwXlMJ7jcFqs2q_jy1LfOFthWqFw";
const axiosInstance = axios.create({
    baseURL: 'https://ms.itmd-b1.com:5123',
    headers: {
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${token}`
    },
});

export default axiosInstance;
