import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, userSet] = useState(null);
  const [error, errorSet] = useState(null);

  const register = async (user) => {
    console.log(user);
  };

  const login = async ({ email: identifer, password }) => {
    console.log(identifer, password);
  };

  const logout = async () => {
    console.log("Logout");
  };

  const checkUserLoggedIn = async (user) => {
    console.log("Check Login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
