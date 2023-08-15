import React, { createContext, useState } from 'react'
export const AuthContext= createContext();
export default function AuthcontextProvider({children}) {
    let data=JSON.stringify(localStorage.getItem("token")) || "";
    const [isLogged, setIsLogged]=useState(true)
    // if(data){
    //   setIsLogged(true);
    // }
    // else{
    //   setIsLogged(false);
    // } 
    const login = () => {
        setIsLogged(true);
    };
    
      const logout = () => {
        localStorage.setItem("token",JSON.stringify(""));
        localStorage.setItem("loginUser",JSON.stringify(""));
        setIsLogged(false);
      };
      return (
        <AuthContext.Provider value={{ isLogged, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
}