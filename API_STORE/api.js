import axios from 'axios';
import { app_config } from '../assets/app_config';

export const apiConnect = async (method, url, data = null) => {
    const API_ENDPOINT = `http://${app_config.apiUrl}:5000/api/v1`;
    console.log(`${API_ENDPOINT}${url}`);
    
    const res = await axios({
        method,
        url: `${API_ENDPOINT}${url}`,
        data,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });
    return res.data;
};
