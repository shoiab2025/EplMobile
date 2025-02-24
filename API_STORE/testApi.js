import Toast from "react-native-toast-message";
import { apiConnect } from "./api";

export const getAllTest = async () => {
    try {
        const response = await apiConnect('get', '/tests/');
        return response;
    } catch (error) {        
        console.error("API Error:", error.response?.data || error.message);
    }
}

export const getAllTestById = async (id) => {
    try {        
        const response = await apiConnect('get', `/tests/${id}`);
        console.log(response);
        
        return response;
    } catch (error) {        
        console.error("API Error:", error.response?.data || error.message);
    }
}

export const getQuestionCategoryById = async (id) => {
    try {        
        const response = await apiConnect('get', `/questionCategory/question-categories/${id}`);        
        return response;
    } catch (error) {        
        console.error("API Error:", error.response?.data || error.message);
    }
}

export const submitTest = async (data) => {
    try {        
        const response = await apiConnect('post', '/tests/submit/', JSON.stringify(data));
        console.log("Test Response", response);
        return response;
    } catch (error) {        
        console.error("API Error:", error.response?.data || error.message);
        return error.message
    }
}