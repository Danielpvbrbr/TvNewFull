import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.0.108:3002'
});

export default api;