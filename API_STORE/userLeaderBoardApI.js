import { apiConnect } from "./api"

export const getRankForUser = async (groupId, testId, userId) => {
    try {
        const response = await apiConnect('get', `/leaderboards/users-ranks?groupId=${groupId}&testId=${testId}&userId=${userId}`);
        console.log("Url", `/leaderboards/users-ranks?groupId=${groupId}&testId=${testId}&userId=${userId}`);
        console.log(response);        
        return response;
    } catch (error) {
        console.error("API Error : ", error);
    }
}

export const getRankForWeek = async (start_date, end_date) => {
    try {
        console.log(start_date, end_date);
        
        const response = await apiConnect('get', `/leaderboards/weekly-leaderboard?&weekStart=${start_date}&weekEnd=${end_date}`);
        console.log("weekkly leader board", `leaderboards/weekly-leaderboard?&weekStart=${start_date}&weekEnd=${end_date}`);
        console.log(response);        
        return response;
    } catch (error) {
        console.error("API Error : ", error);
    }
}