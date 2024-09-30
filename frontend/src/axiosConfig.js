// axiosConfig.js
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000'; // Change to your API's base URL

export const setAuthorizationHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default axios;