import { createContext, useContext, useEffect, useState } from "react";
import { colors } from "../assets/styles/colors";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [groupTheme, setGroupTheme] = useState(colors.main_gradient);
  const [group, setGroup] = useState(null);
  const [login, setLogin] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentRank, setCurrentRank] = useState(0)
// Empty dependency array ensures this runs only once

  useEffect(() => {
    if (authUser) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [authUser]);

  const logout = async () => {
        await AsyncStorage.removeItem('token');
        setUserLoggedIn(false);
    };


  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, userLoggedIn, setGroupTheme, groupTheme, logout, group, setGroup, setLogin, setUserLoggedIn, setCurrentRank, currentRank, setCurrentScore, currentScore }}>
      {children}
    </AuthContext.Provider>
  );

}