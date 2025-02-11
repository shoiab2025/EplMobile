import { createContext, useContext, useEffect, useState } from "react";
import { colors } from "../assets/styles/colors";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [groupTheme, setGroupTheme] = useState(colors.main_gradient);

    useEffect(() => {
        if (authUser) {
          setUserLoggedIn(true);
        } else {
          setUserLoggedIn(false);
        }
      }, [authUser]);

      return (
        <AuthContext.Provider value={{ authUser, setAuthUser, userLoggedIn, setGroupTheme, groupTheme }}>
          {children}
        </AuthContext.Provider>
      );

}