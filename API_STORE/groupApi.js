import { apiConnect } from "./api";

export const GetAllGroups = async () => {
    try {
        const response = await apiConnect('get', '/group/');
        console.log(response);  
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return error.message;
    }
};
