import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, userSet] = useState(null);
  const [error, errorSet] = useState(null);

  const register = async (user) => {
    console.log(user);
  };

  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      userSet(data.user);
    } else {
      errorSet(data.message);
      errorSet(null);
    }
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
