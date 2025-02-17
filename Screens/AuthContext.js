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

      return (
        <AuthContext.Provider value={{ authUser, setAuthUser, userLoggedIn, setGroupTheme, groupTheme , setUserLoggedIn}}>
          {children}
        </AuthContext.Provider>
      );

}