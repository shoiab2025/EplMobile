import axios from 'axios';

export const apiConnect = async (method, url, data = null) => {
    const API_ENDPOINT = "http://192.168.125.245:5000/api/v1";
    const res = await axios({
        method,
        url: `${API_ENDPOINT}${url}`,
        data,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });
    return res.data;
};
