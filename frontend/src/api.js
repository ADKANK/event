import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,  // Get the API URL from the environment
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN); // Get the token from local storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Set the token in the Authorization header
    }
    return config; // Return the config
},
    (error) => {
        return Promise.reject(error); // Return the error
    });

export default api;