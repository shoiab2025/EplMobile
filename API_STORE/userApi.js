import Toast from "react-native-toast-message";
import { apiConnect } from "./api";

export const UserRegisteration = async (data) => {  // <-- No {}
    try {
        console.log("User REsponse", data);
        const response = await apiConnect('post', '/users/signup', JSON.stringify(data));
        return response;
    } catch (error) {
        console.log(error);
        console.error("API Error:", error.response?.data || error.message);
        return error.response?.data
        
    }
}

export const UserLoggin = async (data) => {  // <-- No {}
    try {
        const response = await apiConnect('post', '/users/signin', data);
        return response ;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return error.response
    }
}


export const logout = async (data) => {
    try {
        const response = await apiConnect('post', '/users/signout', data);
        console.log(response);
        
        return response;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        
    }
}

export const ForgotPassword = async (data) => {
    try {        
        const response = await apiConnect('post', '/users/forgot-password', data);
        console.log(response);
        
        return response;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return error.response?.data
    }
}

export const ForgotRegId = async (data) => {
    try {
        console.log(data);
        
        const response = await apiConnect('post', '/users/forgot-regId', data);
        console.log(response);
                
        return response;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return response?.data
    }
} 

export const getUserTestHistoryById = async (data) => {
    try {
        console.log(data);
        
        const response = await apiConnect('get', `/submissions/user/${data}/tests`);
        return response?.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return  error.response?.data
    }
}

export const getUsersByRank =async (data) => {
    try {
        console.log(data);
        
        const response = await apiConnect('get', `/users/rank`);
        return response?.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return  error.response?.data
    }
}

export const setNewPassword = async (data) => {
    try {        
        const response = await apiConnect('post', `/reset-password`);
        return response?.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return  error.response?.data
    }
}