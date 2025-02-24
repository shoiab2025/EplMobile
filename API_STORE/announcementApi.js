import { apiConnect } from "./api";

export const GetAllAnnouncements = async () => {
    try {
        const response = await apiConnect('get', '/announcements/');       
        return response;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return null;
    }
};


