import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    let flag = false;
    localStorage.getItem("token") ? flag=true : flag=false
    const [auth, setAuth] = useState({});
    const [isLoggedin, setIsLoggedin] = useState(flag);

    return (
        <AuthContext.Provider value={{ auth, setAuth,isLoggedin, setIsLoggedin }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;