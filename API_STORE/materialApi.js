import { apiConnect } from "./api";

export const GetAllMaterial = async () => {
    try {
        const response = await apiConnect('get', '/meterials/');       
        return response;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return null;
    }
};

