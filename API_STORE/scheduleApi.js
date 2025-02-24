import Toast from "react-native-toast-message";
import { apiConnect } from "./api";

export const getTestbyDate = async (date) => {
    try {
        const response = await apiConnect('get', `/schedulers/schedules/date?date=${date}`);
        console.log(response);
        
        return response;
    } catch (error) {        
        console.error("API Error:", error.response?.data || error.message);
    }
}